<?php

namespace App\Repositories;

use App\Models\TaskTimeLog;
use App\Models\FinancialTransaction;
use Carbon\Carbon;

class ReportRepository
{
    public function getTimeAllocationByCategory($userId, Carbon $start, Carbon $end)
    {
        $timeLogs = TaskTimeLog::select([
            'task_time_logs.started_at',
            'task_time_logs.stopped_at',
            'task_categories.name as category_name',
        ])
        ->join('tasks', 'tasks.id', '=', 'task_time_logs.task_id')
        ->join('task_categories', 'task_categories.id', '=', 'tasks.category_id')
        ->where('task_time_logs.user_id', $userId)
        ->whereDate('task_time_logs.started_at', '>=', $start)
        ->whereDate('task_time_logs.stopped_at', '<=', $end)
        ->whereNotNull('task_time_logs.stopped_at')
        ->get();

        return $timeLogs->groupBy('category_name')->map(function ($logs, $categoryName) {
            $totalSeconds = 0;
            foreach ($logs as $log) {
                $totalSeconds += abs(Carbon::parse($log->stopped_at)->diffInSeconds(Carbon::parse($log->started_at)));
            }

            $hours = floor($totalSeconds / 3600);
            $minutes = floor(($totalSeconds % 3600) / 60);
            $seconds = $totalSeconds % 60;

            return [
                'category_name' => $categoryName,
                'duration' => sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds),
                'seconds' => $totalSeconds,
            ];
        })->values();
    }

    public function getIncomesByCategory($userId, Carbon $start, Carbon $end)
    {
        $incomes = FinancialTransaction::select([
            'financial_transactions.amount',
            'financial_categories.name as category_name',
        ])
        ->join('financial_categories', 'financial_categories.id', '=', 'financial_transactions.category_id')
        ->where('financial_transactions.user_id', $userId)
        ->whereDate('financial_transactions.transaction_date', '>=', $start)
        ->whereDate('financial_transactions.transaction_date', '<=', $end)
        ->where('financial_transactions.type', 'income')
        ->get();

        return $incomes->groupBy('category_name')->map(function ($group) {
            return [
                'category_name' => $group->first()->category_name,
                'total_amount' => $group->sum('amount'),
            ];
        })->values();
    }

    public function getExpensesByCategory($userId, Carbon $start, Carbon $end)
    {
        $expenses = FinancialTransaction::select([
            'financial_transactions.amount',
            'financial_categories.name as category_name',
        ])
        ->join('financial_categories', 'financial_categories.id', '=', 'financial_transactions.category_id')
        ->where('financial_transactions.user_id', $userId)
        ->whereDate('financial_transactions.transaction_date', '>=', $start)
        ->whereDate('financial_transactions.transaction_date', '<=', $end)
        ->where('financial_transactions.type', 'expense')
        ->get();

        return $expenses->groupBy('category_name')->map(function ($group) {
            return [
                'category_name' => $group->first()->category_name,
                'total_amount' => $group->sum('amount'),
            ];
        })->values();
    }

    public function getIncomeAndExpenses($userId, Carbon $start, Carbon $end)
    {
        return FinancialTransaction::select([
            'financial_transactions.amount',
            'financial_transactions.type',
            'financial_transactions.transaction_date',
        ])
        ->join('financial_categories', 'financial_categories.id', '=', 'financial_transactions.category_id')
        ->where('financial_transactions.user_id', $userId)
        ->whereDate('financial_transactions.transaction_date', '>=', $start)
        ->whereDate('financial_transactions.transaction_date', '<=', $end)
        ->get();
    }
}
