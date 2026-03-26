<?php

namespace App\Services;

use App\Models\Task;
use App\Models\TaskCategory;
use App\Models\TaskTimeLog;
use App\Models\FinancialTransaction;
use App\Models\FinancialCategory;
use Carbon\Carbon;

class ContextBuilderService
{
    private $user;
    private $now;

    private const INTENT_THRESHOLD = 0.90;

    private const FINANCE_KEYWORDS = [

        'quanto gastei'    => 3.0,
        'quanto ganhei'    => 3.0,
        'quanto tenho'     => 3.0,
        'sobrou'           => 3.0,
        'faltou'           => 3.0,
        'saldo do mês'     => 3.0,
        'extrato'          => 3.0,
        'superavit'        => 3.0,
        'deficit'          => 3.0,

        'financ'           => 2.0,
        'transação'        => 2.0,
        'transações'       => 2.0,
        'receita'          => 2.0,
        'receitas'         => 2.0,
        'despesa'          => 2.0,
        'despesas'         => 2.0,
        'orçamento'        => 2.0,
        'salário'          => 2.0,
        'pagamento'        => 2.0,
        'pagamentos'       => 2.0,
        'budget'           => 2.0,
        'income'           => 2.0,
        'expense'          => 2.0,
        'renda'            => 2.0,

        'gasto'            => 1.0,
        'gastos'           => 1.0,
        'custo'            => 1.0,
        'custos'           => 1.0,
        'dinheiro'         => 1.0,
        'saldo'            => 1.0,
    ];

    private const TASK_KEYWORDS = [

        'tarefas atrasadas'    => 3.0,
        'tarefa atrasada'      => 3.0,
        'o que falta fazer'    => 3.0,
        'o que tenho pra fazer'=> 3.0,
        'horas trabalhadas'    => 3.0,
        'tempo gasto'          => 3.0,
        'backlog'              => 3.0,
        'em progresso'         => 3.0,

        'tarefa'               => 2.0,
        'tarefas'              => 2.0,
        'task'                 => 2.0,
        'tasks'                => 2.0,
        'prazo'                => 2.0,
        'prazos'               => 2.0,
        'deadline'             => 2.0,
        'urgente'              => 2.0,
        'urgentes'             => 2.0,
        'prioridade'           => 2.0,
        'produtividade'        => 2.0,
        'progresso'            => 2.0,
        'concluí'              => 2.0,
        'concluída'            => 2.0,
        'concluídas'           => 2.0,

        'pendente'             => 1.0,
        'pendentes'            => 1.0,
        'atrasada'             => 1.0,
        'atrasadas'            => 1.0,
        'atividade'            => 1.0,
        'atividades'           => 1.0,
        'andamento'            => 1.0,
        'fazer'                => 1.0,
    ];

    private const NEGATION_WORDS = [
        'não', 'nao', 'nunca', 'jamais', 'sem',
        'exceto', 'excluindo', 'ignore', 'ignora',
        'tirando', 'apenas', 'somente',
    ];

    private const NEGATION_PENALTY = 2.5;

    private const COMBO_BOOST = 0.15;

    private const STATUS_LABELS = [
        'to_do'       => 'A fazer',
        'in_progress' => 'Em andamento',
        'done'        => 'Finalizado',
    ];
    private const PRIORITY_LABELS = [
        'low'    => 'Baixa',
        'medium' => 'Média',
        'urgent' => 'Urgente',
    ];

    public function __construct()
    {
        $this->user = auth()->user();
        $this->now  = Carbon::now();
    }

    public function build($prompt)
    {
        [$needsFinance, $needsTasks] = $this->detectIntents($prompt);

        if (!$needsFinance && !$needsTasks) {
            $needsFinance = true;
            $needsTasks   = true;
        }

        $blocks   = [];
        $blocks[] = $this->buildHeader();

        if ($needsTasks) {
            $blocks[] = $this->buildTasksBlock();
            $blocks[] = $this->buildTimeLogsBlock();
        }

        if ($needsFinance) {
            $blocks[] = $this->buildFinancialBlock();
        }

        $blocks[] = '[FIM DO CONTEXTO]';

        return implode("\n\n", array_filter($blocks));
    }

    // ---------------------------------------------------------------
    // Intent detection
    // ---------------------------------------------------------------

    private function detectIntents($prompt)
    {
        $normalized = $this->normalizePrompt($prompt);
        $tokens     = $this->tokenize($normalized);

        $rawFinance = $this->scoreKeywords($tokens, self::FINANCE_KEYWORDS);
        $rawTask    = $this->scoreKeywords($tokens, self::TASK_KEYWORDS);

        if ($rawFinance > 0 && $rawTask > 0) {
            $rawFinance += self::COMBO_BOOST;
            $rawTask    += self::COMBO_BOOST;
        }

        $maxFinance = $this->maxPossibleScore(self::FINANCE_KEYWORDS);
        $maxTask    = $this->maxPossibleScore(self::TASK_KEYWORDS);

        $scoreFinance = $maxFinance > 0 ? min($rawFinance / $maxFinance, 1.0) : 0.0;
        $scoreTask    = $maxTask    > 0 ? min($rawTask    / $maxTask,    1.0) : 0.0;

        return [
            $scoreFinance >= self::INTENT_THRESHOLD,
            $scoreTask    >= self::INTENT_THRESHOLD,
        ];
    }

    private function scoreKeywords($tokens, $keywords)
    {
        $joined = implode(' ', $tokens);
        $score  = 0.0;

        foreach ($keywords as $keyword => $weight) {
            $kwTokens = $this->tokenize($keyword);
            $kwStr    = implode(' ', $kwTokens);

            $occurrences = substr_count($joined, $kwStr);

            if ($occurrences === 0) {
                continue;
            }

            $offset = 0;

            for ($i = 0; $i < $occurrences; $i++) {
                $pos = strpos($joined, $kwStr, $offset);
                if ($pos === false) {
                    break;
                }

                $effectiveWeight = $this->isNegated($joined, $pos)
                    ? $weight / self::NEGATION_PENALTY
                    : $weight;

                $score  += $effectiveWeight;
                $offset  = $pos + strlen($kwStr);
            }
        }

        return $score;
    }

    private function isNegated($text, $pos)
    {

        $before = mb_substr($text, 0, $pos);
        $prev   = array_slice(
            array_filter(explode(' ', $before)),
            -4
        );

        foreach ($prev as $token) {
            if (in_array(trim($token), self::NEGATION_WORDS, true)) {
                return true;
            }
        }

        return false;
    }
    private function maxPossibleScore($keywords)
    {
        return array_sum($keywords);
    }

    // ---------------------------------------------------------------
    // String helpers
    // ---------------------------------------------------------------

    private function normalizePrompt($prompt)
    {
        $prompt = strip_tags($prompt);
        $prompt = mb_strtolower($prompt, 'UTF-8');
        $prompt = preg_replace('/[^\p{L}\p{N}\s]/u', ' ', $prompt);
        $prompt = preg_replace('/\s+/', ' ', $prompt);

        return trim($prompt);
    }

    private function tokenize($text)
    {
        return array_values(array_filter(explode(' ', $text)));
    }

    // ---------------------------------------------------------------
    // Context builders (inalterados)
    // ---------------------------------------------------------------

    private function buildHeader()
    {
        return implode("\n", [
            '[CONTEXTO DO USUÁRIO]',
            'Nome: '            . $this->user->nickname,
            'Data atual: '      . $this->now->format('d/m/Y H:i'),
            'Dia da semana: '   . $this->now->translatedFormat('l'),
        ]);
    }

    private function buildTasksBlock()
    {
        $lines = ['--- TAREFAS ---'];

        $openTasks = Task::with('category')
            ->where('user_id', $this->user->id)
            ->whereIn('status', ['to_do', 'in_progress'])
            ->orderByRaw("CASE priority WHEN 'urgent' THEN 1 WHEN 'medium' THEN 2 WHEN 'low' THEN 3 ELSE 4 END")
            ->orderBy('deadline')
            ->get();

        $lines[] = "Tarefas abertas ({$openTasks->count()}):";

        if ($openTasks->isEmpty()) {
            $lines[] = '  Nenhuma tarefa aberta.';
        } else {
            foreach ($openTasks as $task) {
                $deadline  = Carbon::parse($task->deadline);
                $daysLabel = $this->deadlineLabel($deadline);
                $category  = $task->category?->name ?? 'Sem categoria';
                $status    = self::STATUS_LABELS[$task->status]     ?? $task->status;
                $priority  = self::PRIORITY_LABELS[$task->priority] ?? $task->priority;

                $lines[] = sprintf(
                    '  [%s][%s] %s | Categoria: %s | Prazo: %s (%s)',
                    $status, $priority, $task->title,
                    $category, $deadline->format('d/m/Y'), $daysLabel
                );
            }
        }

        $overdueTasks = Task::where('user_id', $this->user->id)
            ->whereIn('status', ['to_do', 'in_progress'])
            ->whereDate('deadline', '<', $this->now->toDateString())
            ->count();

        $lines[] = "Tarefas atrasadas: {$overdueTasks}";

        $doneTasks = Task::where('user_id', $this->user->id)
            ->where('status', 'done')
            ->whereMonth('completed_at', $this->now->month)
            ->whereYear('completed_at', $this->now->year)
            ->count();

        $lines[] = "Tarefas concluídas no mês: {$doneTasks}";

        $totalTasks = Task::where('user_id', $this->user->id)->count();
        $totalDone  = Task::where('user_id', $this->user->id)->where('status', 'done')->count();
        $rate       = $totalTasks > 0 ? round(($totalDone / $totalTasks) * 100, 1) : 0;

        $lines[] = "Taxa de conclusão geral: {$rate}% ({$totalDone}/{$totalTasks})";

        $taskCategories = TaskCategory::where('user_id', $this->user->id)->get();

        $lines[] = 'Categorias de tarefas (módulo Tarefas):';
        if ($taskCategories->isEmpty()) {
            $lines[] = '  Nenhuma categoria de tarefa cadastrada.';
        } else {
            foreach ($taskCategories as $cat) {
                $count   = Task::where('user_id', $this->user->id)->where('category_id', $cat->id)->count();
                $lines[] = sprintf('  [Categoria de Tarefa] %s — %d tarefa(s) no total', $cat->name, $count);
            }
        }

        return implode("\n", $lines);
    }

    private function buildTimeLogsBlock()
    {
        $lines     = ['--- REGISTROS DE TEMPO (últimos 7 dias) ---'];
        $weekStart = $this->now->copy()->subDays(7)->startOfDay();

        $logs = TaskTimeLog::with('task')
            ->where('user_id', $this->user->id)
            ->where('started_at', '>=', $weekStart)
            ->whereNotNull('duration_seconds')
            ->get();

        if ($logs->isEmpty()) {
            $lines[] = 'Nenhum registro de tempo na última semana.';
            return implode("\n", $lines);
        }

        $activeSession = TaskTimeLog::with('task')
            ->where('user_id', $this->user->id)
            ->whereNull('stopped_at')
            ->first();

        if ($activeSession) {
            $elapsed = $this->now->diffInSeconds(Carbon::parse($activeSession->started_at));
            $lines[] = 'Sessão ativa agora: "' . ($activeSession->task?->title ?? 'N/A') . '" — ' . $this->formatSeconds($elapsed);
        }

        $totalSeconds = $logs->sum('duration_seconds');
        $lines[]      = 'Total registrado na semana: ' . $this->formatSeconds($totalSeconds);

        $byTask = $logs->groupBy('task_id')->map(function ($group) {
            return [
                'title'   => $group->first()->task?->title ?? 'Tarefa removida',
                'seconds' => $group->sum('duration_seconds'),
            ];
        })->sortByDesc('seconds')->take(5);

        $lines[] = 'Top tarefas por tempo investido:';
        foreach ($byTask as $item) {
            $lines[] = sprintf('  %s: %s', $item['title'], $this->formatSeconds($item['seconds']));
        }

        return implode("\n", $lines);
    }

    private function buildFinancialBlock()
    {
        $lines      = ['--- FINANCEIRO (mês atual) ---'];
        $monthStart = $this->now->copy()->startOfMonth()->toDateString();
        $monthEnd   = $this->now->copy()->endOfMonth()->toDateString();

        $transactions = FinancialTransaction::with('category')
            ->where('user_id', $this->user->id)
            ->whereBetween('transaction_date', [$monthStart, $monthEnd])
            ->orderBy('transaction_date')
            ->get();

        $totalIncome  = $transactions->where('type', 'income')->sum('amount')  / 100;
        $totalExpense = $transactions->where('type', 'expense')->sum('amount') / 100;
        $balance      = $totalIncome - $totalExpense;

        $lines[] = sprintf('Receitas: R$ %s', number_format($totalIncome,  2, ',', '.'));
        $lines[] = sprintf('Despesas: R$ %s', number_format($totalExpense, 2, ',', '.'));
        $lines[] = sprintf('Saldo do mês: R$ %s', number_format($balance,  2, ',', '.'));

        if ($balance < 0) {
            $lines[] = 'ALERTA: Saldo negativo no mês.';
        }

        $expenseByCategory = $transactions
            ->where('type', 'expense')
            ->groupBy('category_id')
            ->map(fn($g) => [
                'name'   => $g->first()->category?->name ?? 'Sem categoria',
                'amount' => $g->sum('amount') / 100,
            ])
            ->sortByDesc('amount');

        $lines[] = 'Despesas por categoria:';
        foreach ($expenseByCategory as $cat) {
            $lines[] = sprintf('  %s: R$ %s', $cat['name'], number_format($cat['amount'], 2, ',', '.'));
        }

        $lines[] = 'Últimas transações do mês:';
        foreach ($transactions->take(10) as $tx) {
            $lines[] = sprintf(
                '  [%s] %s | %s | R$ %s',
                $tx->type === 'income' ? 'RECEITA' : 'DESPESA',
                Carbon::parse($tx->transaction_date)->format('d/m'),
                $tx->title,
                number_format($tx->amount / 100, 2, ',', '.')
            );
        }

        $lines[] = $this->buildPreviousMonthComparison();

        $financialCategories = FinancialCategory::where('user_id', $this->user->id)->get();

        $lines[] = 'Categorias financeiras (módulo Financeiro):';
        if ($financialCategories->isEmpty()) {
            $lines[] = '  Nenhuma categoria financeira cadastrada.';
        } else {
            foreach ($financialCategories as $cat) {
                $count   = $transactions->where('category_id', $cat->id)->count();
                $total   = $transactions->where('category_id', $cat->id)->sum('amount') / 100;
                $lines[] = sprintf(
                    '  [Categoria Financeira] %s — %d transação(ões) | R$ %s no mês',
                    $cat->name, $count, number_format($total, 2, ',', '.')
                );
            }
        }

        return implode("\n", $lines);
    }

    private function buildPreviousMonthComparison()
    {
        $prevStart = $this->now->copy()->subMonth()->startOfMonth()->toDateString();
        $prevEnd   = $this->now->copy()->subMonth()->endOfMonth()->toDateString();

        $prev = FinancialTransaction::where('user_id', $this->user->id)
            ->whereBetween('transaction_date', [$prevStart, $prevEnd])
            ->get();

        $prevIncome  = $prev->where('type', 'income')->sum('amount')  / 100;
        $prevExpense = $prev->where('type', 'expense')->sum('amount') / 100;

        if ($prevIncome == 0 && $prevExpense == 0) {
            return 'Comparativo mês anterior: sem dados.';
        }

        return sprintf(
            'Mês anterior — Receitas: R$ %s | Despesas: R$ %s',
            number_format($prevIncome,  2, ',', '.'),
            number_format($prevExpense, 2, ',', '.')
        );
    }

    // ---------------------------------------------------------------
    // Formatters
    // ---------------------------------------------------------------

    private function formatSeconds($seconds)
    {
        $hours   = intdiv($seconds, 3600);
        $minutes = intdiv($seconds % 3600, 60);

        return $hours > 0 ? "{$hours}h {$minutes}min" : "{$minutes}min";
    }

    private function deadlineLabel($deadline)
    {
        $diff = $this->now->copy()->startOfDay()
                          ->diffInDays($deadline->copy()->startOfDay(), false);

        if ($diff < 0)  return 'ATRASADA há ' . abs($diff) . ' dia(s)';
        if ($diff == 0) return 'vence HOJE';
        if ($diff == 1) return 'vence amanhã';

        return "vence em {$diff} dias";
    }
}
