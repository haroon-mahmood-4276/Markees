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
        Schema::create('hall_owners', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('subscription_id')->constrained();
            $table->string('name')->nullable();
            $table->string('subdomain')->unique();
            $table->string('email')->unique()->nullable();
            $table->string('phone')->unique();
            $table->string('cnic', 15)->unique();
            $table->string('ntn')->unique();
            $table->string('password')->nullable();
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
        Schema::dropIfExists('hall_owners');
    }
};
