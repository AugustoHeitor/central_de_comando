<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description, 
            'status' => $this->status,
            'priority' => $this->priority,
            'category_id' => $this->category_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'completed_at' => $this->completed_at ? $this->completed_at : null,
            'deadline' => $this->deadline
        ];
    }
}