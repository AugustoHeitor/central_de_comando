<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Task;
use App\Models\FinancialTransaction;
use App\Http\Resources\Dashboard\DashboardTaskResource;
use App\Http\Resources\Dashboard\DashboardFinancialTransactionResource;
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

            $tasks = Task::whereDate('deadline', '>=', $startOfMonth)
                        ->whereDate('deadline', '<=', $endOfMonth)
                        ->get();

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

            $transactions = FinancialTransaction::whereDate('transaction_date', '>=', $startOfMonth)
                ->whereDate('transaction_date', '<=', $endOfMonth)->get();


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
}