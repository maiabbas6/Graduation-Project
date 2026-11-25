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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete();
            $table->foreignId('room_id')->nullable()->constrained('rooms')->nullOnDelete();

            $table->timestamp('appointment_date_time')->index();
            $table->text('description');

            $table->timestamp('appointment_closed_at')->nullable();

            $table->enum('status',[
                'waiting',
                'canceled',
                'suspended',
                'closed',
                'pending',
            ])->default('pending');

            $table->enum('type',[
                'consultation',
                'follow-up',
                'routine-check',
                'urgent',
                'surgery',
            ]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
