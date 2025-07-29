<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('financial_transactions', function (Blueprint $table) {
            $table->id(); 
            $table->string('title', 200);
            $table->enum('type', ['income', 'expense']); 
            $table->unsignedBigInteger('category_id'); 
            $table->unsignedBigInteger('user_id');
            $table->bigInteger('amount');
            $table->date('transaction_date'); 
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('financial_categories')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('financial_transactions');
    }
};