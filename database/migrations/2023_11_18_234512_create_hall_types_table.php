<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hall_types', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->uuid('parent_id')->nullable()->default(null);

            $table->integer('created_at')->nullable();
            $table->integer('updated_at')->nullable();
            $table->integer('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hall_types');
    }
};
