<?php

namespace App\Http\Controllers;

use App\Http\Pipelines\Appointment\AppointmentStatisticsPipeline;
use App\Http\Pipelines\Employee\EmployeePipeline;
use App\Http\Requests\Appointment\AppointmentStatisticsRequest;
use App\Http\Requests\Employee\IndexEmployeeRequest;
use App\Models\AiChat;
use App\Models\AiMessage;
use App\Models\Appointment;
use App\Models\Attatchment;
use App\Models\Attendances;
use App\Models\Employee;
use App\Models\Room;
use App\Models\RoomService;
use App\Models\Section;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Barryvdh\DomPDF\Facade\Pdf;

class StatisticsController extends Controller
{
    public function index(){
        $counts = [
            'ai_chats' => AiChat::count(),
            'ai_message' => AiMessage::count(),
            'appointments' => Appointment::count(),
            'attatchments' => Attatchment::count(),
            'attendances' => Attendances::count(),
            'employees' => Employee::count(), // todo
            'roles' => Role::count(),
            'rooms' => Room::count(),
            'room_services' => RoomService::count(),
            'section' => Section::count(),
            'users'=> User::count(),
        ];
        return $this->success([
            'counts' => $counts
        ]);
    }


    public function employees(IndexEmployeeRequest $request){
        $employees = Employee::query();
        $employees->withCount(['appointments','attendances'])->with(['section','user','attendances']);
        return $this->success(EmployeePipeline::make($employees)->paginate());
    }


    public function appointmentsStatistics(AppointmentStatisticsRequest $request){
        $query = AppointmentStatisticsPipeline::make(Appointment::query()->orderByDesc('created_at'));

        return $this->success($query->paginate());
    }

    public function clientsStatistics(){
        $users = User::query()->whereHas('roles',function ($query){
            $query->where('name', 'client');
        })->withCount(['appointments','medicalRecords','chats'])->orderByDesc('appointments_count');
        return $this->success($users->paginate());
    }

    public function topEmployees(){
        $employees = Employee::query()
            ->with(['user', 'section'])
            ->select('employees.*')
            ->selectRaw('(SELECT COUNT(DISTINCT user_id) FROM appointments WHERE appointments.employee_id = employees.id AND status = ?) as clients_count', ['closed'])
            ->selectRaw('(SELECT COALESCE(SUM(TIMESTAMPDIFF(MINUTE, appointment_date_time, appointment_closed_at)), 0) FROM appointments WHERE appointments.employee_id = employees.id AND status = ?) as work_minutes', ['closed'])
            ->orderByDesc('clients_count')
            ->orderByDesc('work_minutes')
            ->limit(5)
            ->get();

        return $this->success($employees);
    }

    public function exportStatistics()
    {
        $counts = [
            'ai_chats' => AiChat::count(),
            'ai_messages' => AiMessage::count(),
            'appointments' => Appointment::count(),
            'attachments' => Attatchment::count(),
            'attendances' => Attendances::count(),
            'employees' => Employee::count(),
            'roles' => Role::count(),
            'rooms' => Room::count(),
            'room_services' => RoomService::count(),
            'sections' => Section::count(),
            'users' => User::count(),
        ];

        $pdf = Pdf::loadView('exports.statistics', ['counts' => $counts]);

        return $pdf->download('statistics.pdf');
    }

}
