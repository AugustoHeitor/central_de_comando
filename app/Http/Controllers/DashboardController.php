<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Task;
use App\Models\FinancialTransaction;
use App\Models\TaskTimeLog;
use App\Http\Resources\Dashboard\DashboardTaskResource;
use App\Http\Resources\Dashboard\DashboardFinancialTransactionResource;
use App\Http\Resources\Dashboard\DashboardTimeDistributionResource;
use App\Http\Requests\DashboardRequest;

class DashboardController extends Controller
{
    public function indexTasks(DashboardRequest $request)
    {
        try {

            $startOfMonth = $request->start_date
                ? Carbon::parse($request->start_date)->startOfDay()->toDateString()
                : Carbon::now()->startOfMonth()->toDateString();

            $endOfMonth = $request->end_date
                ? Carbon::parse($request->end_date)->endOfDay()->toDateString()
                : Carbon::now()->endOfMonth()->toDateString();

            $tasks = Task::where('user_id', auth()->id())->whereDate('deadline', '>=', $startOfMonth)->whereDate('deadline', '<=', $endOfMonth)->get();

            $statusCount = $tasks->groupBy('status')->map->count();

            $data = [
                'to_do' => $statusCount->get('to_do', 0),
                'in_progress' => $statusCount->get('in_progress', 0),
                'done' => $statusCount->get('done', 0),
            ];

            $dataObject = (object) $data;

            return response()->json([
                'status' => 'success',
                'message' => 'Tarefas listadas com sucesso!',
                'data' => new DashboardTaskResource($dataObject),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }
    public function indexFinancialTransactions(DashboardRequest $request)
    {
        try {

            $startOfMonth = $request->start_date
                ? Carbon::parse($request->start_date)->startOfDay()->toDateString()
                : Carbon::now()->startOfMonth()->toDateString();

            $endOfMonth = $request->end_date
                ? Carbon::parse($request->end_date)->endOfDay()->toDateString()
                : Carbon::now()->endOfMonth()->toDateString();

            $transactions = FinancialTransaction::where('user_id', auth()->id())
            ->whereDate('transaction_date', '>=', $startOfMonth)
            ->whereDate('transaction_date', '<=', $endOfMonth)
            ->get();

            $typeSum = $transactions->groupBy('type')->map(function ($items) {
                return $items->sum('amount');
            });

            $data = [
                'expense' => $typeSum->get('expense', 0),
                'income' => $typeSum->get('income', 0),
                'total' => $typeSum->get('income', 0) - $typeSum->get('expense', 0),
            ];

            $dataObject = (object) $data;


            return response()->json([
                'status' => 'success',
                'message' => 'Transações financeiras listadas com sucesso!',
                'data' => new DashboardFinancialTransactionResource($dataObject),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    public function indexTimeDistribution(DashboardRequest $request){
        try {

            $startOfMonth = $request->start_date
                ? Carbon::parse($request->start_date)->startOfDay()->toDateString()
                : Carbon::now()->startOfMonth()->toDateString();

            $endOfMonth = $request->end_date
                ? Carbon::parse($request->end_date)->endOfDay()->toDateString()
                : Carbon::now()->endOfMonth()->toDateString();

            $timeLogs = TaskTimeLog::select([
                'started_at',
                'stopped_at',
            ])
            ->where('user_id', auth()->id())
            ->whereDate('started_at', '>=', $startOfMonth)
            ->whereDate('stopped_at', '<=', $endOfMonth)
            ->whereNotNull('stopped_at')
            ->get();

            foreach ($timeLogs as $log) {
                $start = Carbon::parse($log->started_at);
                $end = Carbon::parse($log->stopped_at);

                for ($date = $start->copy()->startOfDay(); $date <= $end->copy()->startOfDay(); $date->addDay()) {
                    $dayStart = $date->copy()->startOfDay();
                    $dayEnd = $date->copy()->endOfDay();

                    $periodStart = $start->greaterThan($dayStart) ? $start : $dayStart;
                    $periodEnd = $end->lessThan($dayEnd) ? $end : $dayEnd;

                    $seconds = max(0, $periodEnd->timestamp - $periodStart->timestamp);

                    $dayKey = $date->toDateString();
                    if (!isset($dailyTotals[$dayKey])) {
                        $dailyTotals[$dayKey] = 0;
                    }
                    $dailyTotals[$dayKey] += $seconds;
                }
            }

            $dailyTotalsFormatted = [];
            ksort($dailyTotals);

            $weekDays = [
                1 => 'Segunda-Feira',
                2 => 'Terça-Feira',
                3 => 'Quarta-Feira',
                4 => 'Quinta-Feira',
                5 => 'Sexta-Feira',
                6 => 'Sábado',
                7 => 'Domingo'
            ];

            foreach ($dailyTotals as $day => $seconds) {
                $dateObj = new \DateTime($day);
                $weekDay = $weekDays[(int)$dateObj->format('N')];
                $formattedDate = $dateObj->format('d/m/Y') . ' - ' . $weekDay;

                $dailyTotalsFormatted[] = [
                    'date' => $formattedDate,
                    'duration' => gmdate('H:i:s', $seconds),
                    'seconds' => $seconds
                ];
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Distribuição de tempo listada com sucesso!',
                'data' => $dailyTotalsFormatted,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }
}
