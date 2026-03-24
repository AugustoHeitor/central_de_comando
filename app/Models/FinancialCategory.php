<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinancialCategory extends Model
{
    use HasFactory;

    protected $table = 'financial_categories';

    protected $fillable = ['name', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function financialTransactions()
    {
        return $this->hasMany(Task::class, 'category_id');
    }

}
