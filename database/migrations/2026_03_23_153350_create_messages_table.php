<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('virtual_assistant_interactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->text('prompt');

            $table->json('response')->nullable();

            $table->boolean('has_error')->default(false);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('virtual_assistant_interactions');
    }
};
