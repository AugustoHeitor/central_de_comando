<?php

namespace App\Services;

use FPDF;

class PdfService
{
    protected $pdf;

    public function __construct()
    {
        $this->pdf = new FPDF();
    }

    public function generatePdf(string $title, array $columns, array $rows)
    {
        $this->pdf->AddPage();

        // Título
        $this->pdf->SetFont('Arial', 'B', 16);
        $this->pdf->Cell(0, 10, mb_convert_encoding($title, 'ISO-8859-1', 'UTF-8'), 0, 1, 'C');
        $this->pdf->Ln(5);

        // Cálculo largura colunas
        $pageWidth = $this->pdf->GetPageWidth() - 20; // margem 10mm cada lado
        $colWidth = $pageWidth / count($columns);

        // Colunas
        $this->pdf->SetFont('Arial', 'B', 12);
        foreach ($columns as $col) {
            $this->pdf->Cell($colWidth, 10, mb_convert_encoding($col, 'ISO-8859-1', 'UTF-8'), 1, 0, 'C');
        }
        $this->pdf->Ln();

        // Linhas
        $this->pdf->SetFont('Arial', '', 12);
        foreach ($rows as $row) {
            foreach ($row as $cell) {
                $this->pdf->Cell($colWidth, 10, mb_convert_encoding($cell, 'ISO-8859-1', 'UTF-8'), 1, 0, 'C');
            }
            $this->pdf->Ln();
        }

        return $this->pdf->Output('S');
    }
}
