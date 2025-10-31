<?php

namespace App\Http\Resources\Dashboard;
use Illuminate\Http\Resources\Json\JsonResource;
class DashboardTimeDistributionResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'date'     => $this->date,
            'duration' => $this->duration,
            'seconds'  => $this->seconds,
        ];
    }
}
