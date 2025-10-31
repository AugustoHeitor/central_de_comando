<?php

namespace App\Http\Controllers;

use App\Http\Resources\Dashboard\DashboardTaskResource;
use App\Http\Resources\Dashboard\DashboardFinancialTransactionResource;
use App\Http\Resources\Dashboard\DashboardTimeDistributionResource;
use App\Http\Requests\DashboardRequest;

use App\Repositories\DashboardRepository;

class DashboardController extends Controller
{
    protected $dashboard;

    public function __construct(DashboardRepository $dashboard)
    {
        $this->dashboard = $dashboard;
    }

    public function indexTasks(DashboardRequest $request)
    {
        $data = $this->dashboard->getTaskSummary(auth()->id(), $request->start_date, $request->end_date);

        return response()->json([
            'status' => 'success',
            'message' => 'Tarefas listadas com sucesso!',
            'data' => new DashboardTaskResource($data),
        ]);
    }

    public function indexFinancialTransactions(DashboardRequest $request)
    {
        $data = $this->dashboard->getFinancialSummary(auth()->id(), $request->start_date, $request->end_date);

        return response()->json([
            'status' => 'success',
            'message' => 'Transações financeiras listadas com sucesso!',
            'data' => new DashboardFinancialTransactionResource($data),
        ]);
    }

    public function indexTimeDistribution(DashboardRequest $request)
    {
        $data = $this->dashboard->getTimeDistribution(auth()->id(), $request->start_date, $request->end_date);

        return response()->json([
            'status' => 'success',
            'message' => 'Distribuição de tempo listada com sucesso!',
            'data' => DashboardTimeDistributionResource::collection($data),
        ]);
    }
}


