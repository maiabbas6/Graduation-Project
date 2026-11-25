<?php

namespace App\Http\Controllers;

use App\Http\Requests\Schedule\CreateScheduleRequest;
use App\Http\Requests\Schedule\ScheduleIndexRequest;
use App\Http\Requests\Schedule\UpdateScheduleRequest;
use App\Http\Resources\ScheduleResource;
use App\Models\Schedule;
use App\Services\ScheduleService;
use Illuminate\Support\Facades\Auth;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ScheduleIndexRequest $request)
    {
        $employee = Auth::user()->employee;

        $query = $employee === null
            ? Schedule::query()
            : ScheduleService::getEmployeeSchedule($employee);

        return $this->success(
            ScheduleResource::collection(
                $query->orderBy('day')->orderBy('start_at')->get()
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateScheduleRequest $request)
    {
        return $this->success(
            ScheduleResource::make(
                ScheduleService::addSchedule($request->validated()),
            )
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        return $this->success(
            ScheduleResource::make($schedule->load('employee.user'))
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduleRequest $request, Schedule $schedule)
    {
        if (Auth::user()->employee !== null && $schedule->employee_id !== Auth::user()->employee->id) {
            return $this->fail('Forbidden', 403);
        }

        return $this->success(
            ScheduleResource::make(
                ScheduleService::updateSchedule($schedule, $request->validated()),
            ),
            'updated'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        if (Auth::user()->employee !== null && $schedule->employee_id !== Auth::user()->employee->id) {
            return $this->fail('Forbidden', 403);
        }

        ScheduleService::deleteSchedule($schedule);

        return $this->success(null, 'deleted');
    }
}
