<?php

namespace App\Http\Controllers;

use App\Http\Pipelines\Appointment\AppointmentPipeline;
use App\Http\Requests\Appointment\CloseAppointmentRequest;
use App\Http\Requests\Appointment\CreateAppointmentRequest;
use App\Http\Requests\Appointment\DeleteAppointmentRequest;
use App\Http\Requests\Appointment\IndexAppointmentRequest;
use App\Http\Requests\Appointment\NextAppointmentRequest;
use App\Http\Requests\Appointment\ShowAppointmentRequest;
use App\Http\Requests\Appointment\UpdateAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use App\Services\AppointmentService;
use App\Services\AttatchmentService;
use App\Services\CostService;
use App\Services\NotificationService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexAppointmentRequest $request)
    {
        $appointment = AppointmentPipeline::make(Appointment::query())->get();

        return $this->success(AppointmentResource::collection($appointment));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateAppointmentRequest $request)
    {

        return $this->success(AppointmentService::createByUser($request->validated(), Auth::user()));
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowAppointmentRequest $request, Appointment $appointment)
    {
        
        return $this->success(AppointmentResource::make($appointment->load(['user', 'employee.user', 'room', 'attatchments'])));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppointmentRequest $request, Appointment $appointment)
    {
        return $this->success(AppointmentService::update($appointment, $request->validated()), 'updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteAppointmentRequest $request, Appointment $appointment)
    {
        AppointmentService::delete($appointment);

        return $this->success(null, 'deleted');
    }

    public function close(CloseAppointmentRequest $request)
    {

        $appointment = Appointment::findOrFail($request->appointment_id);

        if ($appointment->status != 'waiting' && $appointment->status != 'pending') {
            return $this->fail('unable to close appointment', 409);
        }

        $appointment->appointment_closed_at = Carbon::now();
        $appointment->status = 'closed';
        $appointment->save();

        $record = $request->validated()['medical_record'];

        $record['employee_id'] = $appointment->employee_id;
        $record['date'] = $appointment->appointment_closed_at;

        $medicalRecord = $appointment->user->medicalRecords()->create($record);

        if ($request->hasFile('attatchments')) {
            AttatchmentService::store($medicalRecord, $request->file('attatchments'), 'medical-records');
        }

        CostService::generateForAppointment($appointment);

        NotificationService::send(
            $appointment->user,
            'Appointment Closed',
            'Your appointment has been closed and medical records have been updated.',
            'appointment',
            $appointment
        );

        return $this->success($appointment->load('user.medicalRecords.attatchments'));
    }

    public function nextAppointment(NextAppointmentRequest $request)
    {
        $appointment = AppointmentService::getNextAppointment(Auth::user());

        if (!$appointment) {
            return $this->success(null);
        }

        return $this->success(
            AppointmentResource::make($appointment->load(['employee.user', 'room']))
        );
    }
}
