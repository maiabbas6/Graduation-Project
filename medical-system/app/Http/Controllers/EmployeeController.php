<?php

namespace App\Http\Controllers;

use App\Http\Pipelines\Employee\EmployeePipeline;
use App\Http\Requests\Employee\CreateEmployeeRequest;
use App\Http\Requests\Employee\IndexEmployeeRequest;
use App\Http\Requests\Employee\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use App\Services\EmployeeService;
use App\Services\AppointmentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexEmployeeRequest $request)
    {
        $employees = EmployeePipeline::make(Employee::query()->with(['user', 'section']))->paginate();
        return $this->success(EmployeeResource::collection($employees));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateEmployeeRequest $request)
    {
        return $this->success(
            EmployeeResource::make(EmployeeService::createEmployee($request->validated())),
            'Employee created successfully',
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return $this->success(EmployeeResource::make(EmployeeService::getEmployee($employee)));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        return $this->success(
            EmployeeResource::make(EmployeeService::updateEmployee($employee, $request->validated())),
            'Employee updated successfully'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        EmployeeService::deleteEmployee($employee);
        return $this->success(null, 'Employee deleted successfully');
    }

    public function getClients(){
        return $this->success(
            EmployeeService::getEmployeeClients(Auth::user()->employee)
        );
    }

    public function getAvailableSlots(Request $request, Employee $employee)
    {
        $request->validate([
            'date' => 'required|date'
        ]);

        return $this->success(
            AppointmentService::getAvailableSlots($employee, $request->date)
        );
    }

    public function attendanceScheduleDiff(Employee $employee)
    {
        $employee = EmployeeService::getEmployee($employee);

        return $this->success(
            EmployeeService::getAttendanceScheduleDiff($employee)
        );
    }

    public function attendances(Request $request, Employee $employee)
    {
        return $this->success(
            EmployeeService::getEmployeeAttendances($employee, $request->integer('per_page', 10))
        );
    }
}