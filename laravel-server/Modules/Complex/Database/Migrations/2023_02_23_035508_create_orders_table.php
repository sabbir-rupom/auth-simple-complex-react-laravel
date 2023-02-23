<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->string('order_number')->unique();
            $table->foreignId('buyer_id')->constrained('buyers');
            $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->bigInteger('customer_location_id')->unsigned()->nullable();
            $table->date('order_date');
            $table->date('delivery_date')->comment('Delivery date must be >= Order date');
            $table->string('delivery_time')->default('12:00');
            $table->string('attachment')->nullable()->comment('Allowed files: JPG / JPEG / PNG / PDF');
            $table->foreignId('user_id')->constrained('users');
            $table->text('remark')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
