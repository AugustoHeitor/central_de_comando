<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Task;
use App\Models\FinancialTransaction;

class DashboardController extends Controller
{
    public function indexTasks()
    {
        try {

            $startOfMonth = Carbon::now()->startOfMonth()->toDateString();
            $endOfMonth = Carbon::now()->endOfMonth()->toDateString();

            $tasks = Task::whereDate('due_date', '>=', $startOfMonth)
                         ->whereDate('due_date', '<=', $endOfMonth)
                         ->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Tarefas listadas com sucesso!',
                'data' => TaskResource::collection($tasks),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    public function indexFinancialTransactions()
    {
        try {
            $endOfMonth = Carbon::now()->endOfMonth()->toDateString();

            $transactions = FinancialTransaction::whereDate('transaction_date', '<=', $endOfMonth)
                                                ->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Transações financeiras listadas com sucesso!',
                'data' => FinancialTransactionResource::collection($transactions),
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