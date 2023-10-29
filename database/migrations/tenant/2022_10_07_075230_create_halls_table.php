<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('halls', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 30)->nullable();
            $table->text('description')->nullable();
            $table->string('short_label', 30)->unique();
            $table->float('price')->default(0);
            $table->integer('min_capacity')->default(0);
            $table->integer('max_capacity')->default(0);
            $table->boolean('active')->default(false);
            $table->integer('created_at')->nullable();
            $table->integer('updated_at')->nullable();
            $table->integer('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('halls');
    }
};
