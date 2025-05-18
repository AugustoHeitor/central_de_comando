<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'full_name' => $this->full_name,
            'nickname' => $this->nickname,
            'photo' => $this->photo,
            'email' => $this->email,
        ];
    }
}