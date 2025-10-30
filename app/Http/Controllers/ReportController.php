<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Http\Requests\ReportRequest;
use App\Repositories\ReportRepository;
use App\Services\PdfService;

class ReportController extends Controller
{
    protected $reports;
    protected $pdfService;

    public function __construct(ReportRepository $reports, PdfService $pdfService)
    {
        $this->reports = $reports;
        $this->pdfService = $pdfService;
    }

    public function indexTimeAllocationCategory(ReportRequest $request)
    {
        $start = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfMonth();
        $end = $request->end_date ? Carbon::parse($request->end_date)->endOfDay() : Carbon::now()->endOfMonth();

        $durationsByCategory = $this->reports->getTimeAllocationByCategory(auth()->id(), $start, $end);

        return response()->json([
            'status' => 'success',
            'message' => 'Alocação de tempo por categoria listada com sucesso!',
            'data' => $durationsByCategory,
        ]);
    }

    public function indexIncomesCategory(ReportRequest $request)
    {
        $start = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfMonth();
        $end = $request->end_date ? Carbon::parse($request->end_date)->endOfDay() : Carbon::now()->endOfMonth();

        $incomesByCategory = $this->reports->getIncomesByCategory(auth()->id(), $start, $end);

        return response()->json([
            'status' => 'success',
            'message' => 'Entrada por categoria listada com sucesso!',
            'data' => $incomesByCategory,
        ]);
    }

    public function indexExpensesCategory(ReportRequest $request)
    {
        $start = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfMonth();
        $end = $request->end_date ? Carbon::parse($request->end_date)->endOfDay() : Carbon::now()->endOfMonth();

        $expensesByCategory = $this->reports->getExpensesByCategory(auth()->id(), $start, $end);

        return response()->json([
            'status' => 'success',
            'message' => 'Saídas por categoria listadas com sucesso!',
            'data' => $expensesByCategory,
        ]);
    }

    public function indexIncomeAndExpenses(ReportRequest $request)
    {
        $start = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfMonth();
        $end = $request->end_date ? Carbon::parse($request->end_date)->endOfDay() : Carbon::now()->endOfMonth();

        $incomeAndExpenses = $this->reports->getIncomeAndExpenses(auth()->id(), $start, $end);

        return response()->json([
            'status' => 'success',
            'message' => 'Receitas e despesas listadas com sucesso!',
            'data' => $incomeAndExpenses,
        ]);
    }

    public function exportTimeAllocationCategoryPdf(ReportRequest $request)
    {
        $userId = auth()->id();
        $start = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfMonth();
        $end = $request->end_date ? Carbon::parse($request->end_date)->endOfDay() : Carbon::now()->endOfMonth();

        $data = $this->reports->getTimeAllocationByCategory($userId, $start, $end);

        $columns = ['Categoria', 'Tempo (hh:mm:ss)', 'Segundos'];
        $rows = $data->map(fn($item) => [
            $item['category_name'],
            $item['duration'],
            $item['seconds']
        ])->toArray();

        $pdfOutput = $this->pdfService->generatePdf('Alocação de Tempo por Categoria', $columns, $rows);

        return response($pdfOutput)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="time_allocation.pdf"');
    }

    public function exportIncomesCategoryPdf(ReportRequest $request)
    {
        $userId = auth()->id();
        $start = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfMonth();
        $end = $request->end_date ? Carbon::parse($request->end_date)->endOfDay() : Carbon::now()->endOfMonth();

        $data = $this->reports->getIncomesByCategory($userId, $start, $end);

        $columns = ['Categoria', 'Total'];
        $rows = $data->map(fn($item) => [
            $item['category_name'],
            'R$ ' . number_format($item['total_amount'] / 100, 2, ',', '.')
        ])->toArray();

        $pdfOutput = $this->pdfService->generatePdf('Entradas por Categoria', $columns, $rows);

        return response($pdfOutput)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="entradas_por_categoria.pdf"');
    }

    public function exportExpensesCategoryPdf(ReportRequest $request)
    {
        $userId = auth()->id();
        $start = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfMonth();
        $end = $request->end_date ? Carbon::parse($request->end_date)->endOfDay() : Carbon::now()->endOfMonth();

        $data = $this->reports->getExpensesByCategory($userId, $start, $end);

        $columns = ['Categoria', 'Total'];
        $rows = $data->map(fn($item) => [
            $item['category_name'],
            'R$ ' . number_format($item['total_amount'] / 100, 2, ',', '.')
        ])->toArray();

        $pdfOutput = $this->pdfService->generatePdf('Saídas por Categoria', $columns, $rows);

        return response($pdfOutput)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="saidas_por_categoria.pdf"');
    }

    public function exportIncomeAndExpensesPdf(ReportRequest $request)
    {
        $userId = auth()->id();
        $start = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfMonth();
        $end = $request->end_date ? Carbon::parse($request->end_date)->endOfDay() : Carbon::now()->endOfMonth();

        $data = $this->reports->getIncomeAndExpenses($userId, $start, $end);

        $columns = ['Tipo', 'Valor', 'Data'];
        $rows = $data->map(fn($item) => [
            ucfirst($item['type']),
            'R$ ' . number_format($item['amount'] / 100, 2, ',', '.'),
            Carbon::parse($item['transaction_date'])->format('d/m/Y')
        ])->toArray();

        $pdfOutput = $this->pdfService->generatePdf('Receitas e Despesas', $columns, $rows);

        return response($pdfOutput)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="receitas_e_despesas.pdf"');
    }

}
