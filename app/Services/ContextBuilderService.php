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

    private const FINANCE_KEYWORDS = [
        'gasto', 'gastos', 'despesa', 'despesas', 'receita', 'receitas',
        'financ', 'dinheiro', 'saldo', 'extrato', 'transação', 'transações',
        'pagamento', 'pagamentos', 'custo', 'custos', 'orçamento', 'budget',
        'renda', 'salário', 'income', 'expense', 'quanto gastei', 'quanto ganhei',
        'quanto tenho', 'sobrou', 'faltou', 'deficit', 'superavit',
    ];

    private const TASK_KEYWORDS = [
        'tarefa', 'tarefas', 'task', 'tasks', 'pendente', 'pendentes',
        'prazo', 'prazos', 'deadline', 'urgente', 'urgentes', 'prioridade',
        'concluí', 'concluída', 'concluídas', 'atrasada', 'atrasadas',
        'produtividade', 'progresso', 'tempo gasto', 'horas trabalhadas',
        'o que falta', 'o que tenho', 'atividade', 'atividades',
        'backlog', 'andamento', 'em progresso', 'fazer',
    ];

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
        $prompt = mb_strtolower($prompt);

        $needsFinance = $this->matches($prompt, self::FINANCE_KEYWORDS);
        $needsTasks   = $this->matches($prompt, self::TASK_KEYWORDS);

        if (! $needsFinance && ! $needsTasks) {
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

    private function buildHeader()
    {
        return implode("\n", [
            '[CONTEXTO DO USUÁRIO]',
            'Nome: ' . $this->user->nickname,
            'Data atual: ' . $this->now->format('d/m/Y H:i'),
            'Dia da semana: ' . $this->now->translatedFormat('l'),
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
                    $status,
                    $priority,
                    $task->title,
                    $category,
                    $deadline->format('d/m/Y'),
                    $daysLabel
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
        $lines = ['--- REGISTROS DE TEMPO (últimos 7 dias) ---'];

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
        $lines = ['--- FINANCEIRO (mês atual) ---'];

        $monthStart = $this->now->copy()->startOfMonth()->toDateString();
        $monthEnd   = $this->now->copy()->endOfMonth()->toDateString();

        $transactions = FinancialTransaction::with('category')
            ->where('user_id', $this->user->id)
            ->whereBetween('transaction_date', [$monthStart, $monthEnd])
            ->orderBy('transaction_date')
            ->get();

        $totalIncome  = $transactions->where('type', 'income')->sum('amount') / 100;
        $totalExpense = $transactions->where('type', 'expense')->sum('amount') / 100;
        $balance      = $totalIncome - $totalExpense;

        $lines[] = sprintf('Receitas: R$ %s', number_format($totalIncome, 2, ',', '.'));
        $lines[] = sprintf('Despesas: R$ %s', number_format($totalExpense, 2, ',', '.'));
        $lines[] = sprintf('Saldo do mês: R$ %s', number_format($balance, 2, ',', '.'));

        if ($balance < 0) {
            $lines[] = 'ALERTA: Saldo negativo no mês.';
        }

        $expenseByCategory = $transactions
            ->where('type', 'expense')
            ->groupBy('category_id')
            ->map(function ($group) {
                return [
                    'name'   => $group->first()->category?->name ?? 'Sem categoria',
                    'amount' => $group->sum('amount') / 100,
                ];
            })
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
                $count  = $transactions->where('category_id', $cat->id)->count();
                $total  = $transactions->where('category_id', $cat->id)->sum('amount') / 100;
                $lines[] = sprintf(
                    '  [Categoria Financeira] %s — %d transação(ões) | R$ %s no mês',
                    $cat->name,
                    $count,
                    number_format($total, 2, ',', '.')
                );
            }
        }

        return implode("\n", $lines);
    }

    private function buildPreviousMonthComparison()
    {
        $prevStart = $this->now->copy()->subMonth()->startOfMonth()->toDateString();
        $prevEnd   = $this->now->copy()->subMonth()->endOfMonth()->toDateString();

        $prevTransactions = FinancialTransaction::where('user_id', $this->user->id)
            ->whereBetween('transaction_date', [$prevStart, $prevEnd])
            ->get();

        $prevIncome  = $prevTransactions->where('type', 'income')->sum('amount') / 100;
        $prevExpense = $prevTransactions->where('type', 'expense')->sum('amount') / 100;

        if ($prevIncome == 0 && $prevExpense == 0) {
            return 'Comparativo mês anterior: sem dados.';
        }

        return sprintf(
            'Mês anterior — Receitas: R$ %s | Despesas: R$ %s',
            number_format($prevIncome, 2, ',', '.'),
            number_format($prevExpense, 2, ',', '.')
        );
    }

    private function matches($prompt, $keywords)
    {
        foreach ($keywords as $keyword) {
            if (str_contains($prompt, $keyword)) {
                return true;
            }
        }
        return false;
    }

    private function formatSeconds($seconds)
    {
        $hours   = intdiv($seconds, 3600);
        $minutes = intdiv($seconds % 3600, 60);

        if ($hours > 0) {
            return "{$hours}h {$minutes}min";
        }

        return "{$minutes}min";
    }

    private function deadlineLabel($deadline)
    {
        $diff = $this->now->copy()->startOfDay()->diffInDays($deadline->copy()->startOfDay(), false);

        if ($diff < 0) {
            return 'ATRASADA há ' . abs($diff) . ' dia(s)';
        }

        if ($diff == 0) {
            return 'vence HOJE';
        }

        if ($diff == 1) {
            return 'vence amanhã';
        }

        return "vence em {$diff} dias";
    }
}
