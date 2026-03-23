<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VirtualAssistantInteraction extends Model
{
    use HasFactory;

    protected $table = 'virtual_assistant_interactions';

    protected $fillable = [
        'prompt',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
