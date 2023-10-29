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
        Schema::create('hall_slots', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('hall_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();

            $table->string('slot_name', 30)->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->json('days')->nullable();

            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();

            $table->tinyInteger('interval')->nullable();

            $table->boolean('overnight')->default(0);
            $table->boolean('active')->default(0);

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
        Schema::dropIfExists('hall_shifts');
    }
};
