<?php

namespace App\Http\Controllers;

use App\Http\Requests\Attendances\CreateAttendancesRequest;
use App\Http\Requests\Attendances\DeleteAttendancesRequest;
use App\Http\Requests\Attendances\IndexAttendancesRequest;
use App\Http\Requests\Attendances\ShowAttendancesRequest;
use App\Http\Requests\Attendances\UpdateAttendancesRequest;
use App\Http\Resources\AttendancesResource;
use App\Models\Attendances;

class AttendancesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexAttendancesRequest $request)
    {
        $query = Attendances::query()->with('employee.user');

        if ($request->filled('employee_id')) {
            $query->where('employee_id', $request->integer('employee_id'));
        }
        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }
        if ($request->filled('start_date')) {
            $query->where('date_time', '>=', $request->input('start_date'));
        }
        if ($request->filled('end_date')) {
            $query->where('date_time', '<=', $request->input('end_date'));
        }

        $attendances = $query->orderByDesc('date_time')->paginate($request->integer('per_page', 10));

        return $this->success(AttendancesResource::collection($attendances));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateAttendancesRequest $request)
    {
        $attendance = Attendances::create($request->validated());

        return $this->success(
            AttendancesResource::make($attendance->load('employee.user')),
            'created',
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowAttendancesRequest $request, Attendances $attendances)
    {
        return $this->success(
            AttendancesResource::make($attendances->load('employee.user'))
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttendancesRequest $request, Attendances $attendances)
    {
        $attendances->update($request->validated());

        return $this->success(
            AttendancesResource::make($attendances->load('employee.user')),
            'updated'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteAttendancesRequest $request, Attendances $attendances)
    {
        $attendances->delete();
        return $this->success(null, 'deleted');
    }
}