<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
class TaskTimeLogResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'started_at' => $this->started_at,
            'stopped_at' => $this->stopped_at
        ];
    }
}
