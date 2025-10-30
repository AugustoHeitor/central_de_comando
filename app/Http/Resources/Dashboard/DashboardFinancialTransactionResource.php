<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Resources\Json\JsonResource;

class DashboardFinancialTransactionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'expense' => $this->expense,
            'income' => $this->income,
            'total' => $this->total,
        ];
    }
}
