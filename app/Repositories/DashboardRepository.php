<?php

namespace App\Repositories;

use App\Models\Task;
use App\Models\FinancialTransaction;
use App\Models\TaskTimeLog;
use Carbon\Carbon;

class DashboardRepository
{
    public function getTaskSummary($userId, $startDate, $endDate)
    {

        $startOfMonth = $startDate
            ? Carbon::parse($startDate)->startOfDay()->toDateString()
            : Carbon::now()->startOfMonth()->toDateString();

        $endOfMonth = $endDate
            ? Carbon::parse($endDate)->endOfDay()->toDateString()
            : Carbon::now()->endOfMonth()->toDateString();

        $tasks = Task::where('user_id', $userId)
            ->whereBetween('deadline', [$startOfMonth, $endOfMonth])
            ->get();

        $statusCount = $tasks->groupBy('status')->map->count();

        return (object) [
            'to_do' => $statusCount->get('to_do', 0),
            'in_progress' => $statusCount->get('in_progress', 0),
            'done' => $statusCount->get('done', 0),
        ];
    }

    public function getFinancialSummary($userId, $startDate, $endDate)
    {


        $startOfMonth = $startDate
            ? Carbon::parse($startDate)->startOfDay()->toDateString()
            : Carbon::now()->startOfMonth()->toDateString();

        $endOfMonth = $endDate
            ? Carbon::parse($endDate)->endOfDay()->toDateString()
            : Carbon::now()->endOfMonth()->toDateString();

        $transactions = FinancialTransaction::where('user_id', $userId)
            ->whereBetween('transaction_date', [$startOfMonth, $endOfMonth])
            ->get();

        $typeSum = $transactions->groupBy('type')->map->sum('amount');

        return (object) [
            'expense' => $typeSum->get('expense', 0),
            'income'  => $typeSum->get('income', 0),
            'total'   => $typeSum->get('income', 0) - $typeSum->get('expense', 0),
        ];
    }

    public function getTimeDistribution($userId, $startDate, $endDate)
    {

        $startOfMonth = $startDate
            ? Carbon::parse($startDate)->startOfDay()->toDateString()
            : Carbon::now()->startOfMonth()->toDateString();

        $endOfMonth = $endDate
            ? Carbon::parse($endDate)->endOfDay()->toDateString()
            : Carbon::now()->endOfMonth()->toDateString();

        $timeLogs = TaskTimeLog::where('user_id', $userId)
            ->whereBetween('started_at', [$startOfMonth, $endOfMonth])
            ->whereNotNull('stopped_at')
            ->get(['started_at', 'stopped_at']);

        $dailyTotals = [];

        foreach ($timeLogs as $log) {
            $logStart = Carbon::parse($log->started_at);
            $logEnd = Carbon::parse($log->stopped_at);

            for ($date = $logStart->copy()->startOfDay(); $date <= $logEnd->copy()->startOfDay(); $date->addDay()) {
                $dayStart = $date->copy()->startOfDay();
                $dayEnd = $date->copy()->endOfDay();

                $periodStart = $logStart->greaterThan($dayStart) ? $logStart : $dayStart;
                $periodEnd = $logEnd->lessThan($dayEnd) ? $logEnd : $dayEnd;

                $seconds = max(0, $periodEnd->timestamp - $periodStart->timestamp);

                $dailyTotals[$date->toDateString()] = ($dailyTotals[$date->toDateString()] ?? 0) + $seconds;
            }
        }

        ksort($dailyTotals);

        $weekDays = [
            1 => 'Segunda-Feira', 2 => 'Terça-Feira', 3 => 'Quarta-Feira',
            4 => 'Quinta-Feira', 5 => 'Sexta-Feira', 6 => 'Sábado', 7 => 'Domingo'
        ];

        return collect($dailyTotals)->map(function ($seconds, $day) use ($weekDays) {
            $dateObj = new \DateTime($day);
            $weekDay = $weekDays[(int)$dateObj->format('N')];

            return (object)[
                'date' => $dateObj->format('d/m/Y') . ' - ' . $weekDay,
                'duration' => gmdate('H:i:s', $seconds),
                'seconds' => $seconds,
            ];
        })->values();
    }
}
