<?php

namespace App\Services;

use App\Models\Appointment;
use App\Models\Cost;
use App\Models\RoomServiceUser;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Services\NotificationService;

class CostService
{
    static public function generateForAppointment(Appointment $appointment): ?Cost
    {
        if ($appointment->status !== 'closed' || !$appointment->appointment_closed_at) {
            return null;
        }

        $existing = Cost::where('appointment_id', $appointment->id)->first();
        if ($existing) {
            return $existing;
        }

        $employee = $appointment->employee;
        if (!$employee) {
            return null;
        }

        $start = Carbon::parse($appointment->appointment_date_time);
        $end = Carbon::parse($appointment->appointment_closed_at);
        $hours = max($start->diffInMinutes($end) / 60, 0.5);

        $amount = round($employee->hour_rate * $hours, 2);

        $cost = Cost::create([
            'user_id' => $appointment->user_id,
            'appointment_id' => $appointment->id,
            'description' => "Appointment #{$appointment->id} - {$appointment->type}",
            'amount' => $amount,
            'status' => 'unpaid',
        ]);

        NotificationService::send(
            $cost->user,
            'New Bill Generated',
            "A new bill of amount {$amount} has been generated for your appointment.",
            'cost',
            $cost
        );

        return $cost;
    }

    static public function generateForRoomService(RoomServiceUser $rsu): ?Cost
    {
        if ($rsu->status !== 'done') {
            return null;
        }

        $existing = Cost::where('room_service_user_id', $rsu->id)->first();
        if ($existing) {
            return $existing;
        }

        $roomService = $rsu->roomService;
        if (!$roomService) {
            return null;
        }

        $cost = Cost::create([
            'user_id' => $rsu->user_id,
            'room_service_user_id' => $rsu->id,
            'description' => "Room Service: {$roomService->name}",
            'amount' => $roomService->price,
            'status' => 'unpaid',
        ]);

        NotificationService::send(
            $cost->user,
            'New Bill Generated',
            "A new bill of amount {$roomService->price} has been generated for room service: {$roomService->name}.",
            'cost',
            $cost
        );

        return $cost;
    }

    static public function markAsPaid(Cost $cost): Cost
    {
        $cost->update([
            'status' => 'paid',
            'paid_at' => Carbon::now(),
        ]);

        NotificationService::send(
            $cost->user,
            'Bill Paid',
            "Your bill #{$cost->id} has been marked as paid.",
            'cost',
            $cost
        );

        return $cost->fresh();
    }

    static public function markAsUnpaid(Cost $cost): Cost
    {
        $cost->update([
            'status' => 'unpaid',
            'paid_at' => null,
        ]);

        return $cost->fresh();
    }

    static public function getUserTotalUnpaid(User $user): float
    {
        return (float) Cost::where('user_id', $user->id)
            ->where('status', 'unpaid')
            ->sum('amount');
    }

    static public function getUserTotalPaid(User $user): float
    {
        return (float) Cost::where('user_id', $user->id)
            ->where('status', 'paid')
            ->sum('amount');
    }
}
