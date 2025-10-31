<?php

namespace App\Services;
use Illuminate\Support\Facades\Storage;
use FPDF;

class PdfService
{
    protected $pdf;

    public function __construct()
    {
        $this->pdf = new FPDF();
    }

    /**
     * Gera PDF corporativo com header profissional e tabela limpa
     *
     * @param string $title Título do relatório
     * @param array $columns Cabeçalhos da tabela
     * @param array $rows Dados da tabela
     * @return string Conteúdo PDF em string
     */
    public function generatePdf(string $title, array $columns, array $rows)
    {
        $user = auth()->user();

        $this->pdf->AddPage();

        // ================= HEADER CLEAN E PROFISSIONAL =================
        $headerHeight = 28;

        // Fundo com gradiente visual (azul corporativo)
        $this->pdf->SetFillColor(41, 128, 185); // Azul profissional
        $this->pdf->Rect(0, 0, $this->pdf->GetPageWidth(), $headerHeight, 'F');

        // Logo do projeto (mais à esquerda)
        $logoPath = public_path('imgs/satellite-light.png');
        if (file_exists($logoPath)) {
            $this->pdf->Image($logoPath, 20, 5, 12);
        }

        // Nome do projeto (ao lado da logo, mais à esquerda)
        $this->pdf->SetTextColor(255, 255, 255);
        $this->pdf->SetFont('Arial', 'B', 14);
        $this->pdf->SetXY(33, 7);
        $this->pdf->Cell(80, 6, mb_convert_encoding('Central de Comando', 'ISO-8859-1', 'UTF-8'), 0, 0, 'L');

        // Data de geração (abaixo do nome do projeto)
        $this->pdf->SetFont('Arial', '', 8);
        $this->pdf->SetXY(33, 15);
        $dataGeracao = 'Gerado em: ' . date('d/m/Y \à\s H:i');
        $this->pdf->Cell(80, 4, mb_convert_encoding($dataGeracao, 'ISO-8859-1', 'UTF-8'), 0, 0, 'L');

        // Área do usuário (lado direito) - foto e nickname em coluna centralizada
        if ($user) {
            // Foto do usuário
            $userPhotoPath = $user->photo && Storage::disk('public')->exists(ltrim(str_replace('/storage/', '', $user->photo), '/'))
            ? storage_path('app/public/' . ltrim(str_replace('/storage/', '', $user->photo), '/'))
            : public_path('imgs/photo-default.png');

            if (file_exists($userPhotoPath)) {
                // Foto de perfil harmônica: 16x16mm
                $photoSize = 16;
                $photoX = $this->pdf->GetPageWidth() - 26;
                $photoY = 4;

                // Fundo branco para destacar a foto
                $this->pdf->SetFillColor(255, 255, 255);
                $this->pdf->Rect($photoX - 1, $photoY - 1, $photoSize + 2, $photoSize + 2, 'F');

                $this->pdf->Image($userPhotoPath, $photoX, $photoY, $photoSize, $photoSize);
            }

            // Nickname centralizado abaixo da foto
            $this->pdf->SetFont('Arial', 'B', 8);
            $nickname = $user->nickname ?? 'Usuário';
            // Centralizar o texto em relação à foto
            $this->pdf->SetXY($this->pdf->GetPageWidth() - 34, 22);
            $this->pdf->Cell(32, 3, mb_convert_encoding($nickname, 'ISO-8859-1', 'UTF-8'), 0, 0, 'C');
        }

        $this->pdf->Ln(15);

        // ================= TÍTULO DO RELATÓRIO =================
        $this->pdf->SetTextColor(52, 73, 94); // Cinza escuro profissional
        $this->pdf->SetFont('Arial', 'B', 14);
        $this->pdf->Cell(0, 8, mb_convert_encoding($title, 'ISO-8859-1', 'UTF-8'), 0, 1, 'C');
        $this->pdf->Ln(3);

        // ================= TABELA LIMPA =================
        $pageWidth = $this->pdf->GetPageWidth() - 20;
        $colWidth = $pageWidth / count($columns);

        // Cabeçalho da tabela com cores profissionais
        $this->pdf->SetFont('Arial', 'B', 10);
        $this->pdf->SetFillColor(52, 73, 94); // Azul escuro
        $this->pdf->SetTextColor(255, 255, 255);
        $this->pdf->SetDrawColor(200, 200, 200);

        foreach ($columns as $col) {
            $this->pdf->Cell($colWidth, 8, mb_convert_encoding($col, 'ISO-8859-1', 'UTF-8'), 1, 0, 'C', true);
        }
        $this->pdf->Ln();

        // Linhas da tabela com alternância sutil
        $this->pdf->SetFont('Arial', '', 9);
        $this->pdf->SetTextColor(60, 60, 60);
        $fill = false;

        foreach ($rows as $row) {
            if ($fill) {
                $this->pdf->SetFillColor(248, 249, 250); // Cinza muito claro
            }

            foreach ($row as $cell) {
                $this->pdf->Cell($colWidth, 7, mb_convert_encoding($cell, 'ISO-8859-1', 'UTF-8'), 1, 0, 'C', $fill);
            }
            $this->pdf->Ln();
            $fill = !$fill;
        }

        return $this->pdf->Output('S');
    }
}
