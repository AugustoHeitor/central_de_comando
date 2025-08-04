<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Resources\Json\JsonResource;

class DashboardTaskResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'to_do' => $this->to_do,
            'in_progress' => $this->in_progress,
            'done' => $this->done,
        ];
    }
}