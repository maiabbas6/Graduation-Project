<?php

namespace App\Http\Controllers;

use App\Http\Requests\MedicalRecord\CreateMedicalRecordRequest;
use App\Http\Requests\MedicalRecord\DeleteMedicalRecordRequest;
use App\Http\Requests\MedicalRecord\IndexMedicalRecordRequest;
use App\Http\Requests\MedicalRecord\ShowMedicalRecordRequest;
use App\Http\Requests\MedicalRecord\UpdateMedicalRecordRequest;
use App\Http\Resources\MedicalRecordResource;
use App\Models\MedicalRecord;
use App\Models\User;
use App\Services\AttatchmentService;
use Illuminate\Support\Facades\Auth;

class MedicalRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexMedicalRecordRequest $request)
    {
        $query = MedicalRecord::query()->with(['user', 'employee.user', 'attatchments']);

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->integer('user_id'));
        }
        if ($request->filled('employee_id')) {
            $query->where('employee_id', $request->integer('employee_id'));
        }
        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }
        if ($request->filled('start_date')) {
            $query->whereDate('date', '>=', $request->input('start_date'));
        }
        if ($request->filled('end_date')) {
            $query->whereDate('date', '<=', $request->input('end_date'));
        }

        $records = $query->orderByDesc('date')->paginate($request->integer('per_page', 10));

        return $this->success(MedicalRecordResource::collection($records));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateMedicalRecordRequest $request)
    {
        $data = $request->validated();

        $user = isset($data['user_id'])
            ? User::findOrFail($data['user_id'])
            : Auth::user();

        $data['employee_id'] = $data['employee_id'] ?? (Auth::user()->employee?->id ?? null);
        unset($data['user_id'], $data['attatchments']);

        $record = $user->medicalRecords()->create($data);

        if ($request->hasFile('attatchments')) {
            AttatchmentService::store($record, $request->file('attatchments'), 'medical-records');
        }

        return $this->success(
            MedicalRecordResource::make($record->load(['user', 'employee.user', 'attatchments'])),
            'created',
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowMedicalRecordRequest $request, MedicalRecord $medicalRecord)
    {
        return $this->success(
            MedicalRecordResource::make($medicalRecord->load(['user', 'employee.user', 'attatchments','medicalPlans']))
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicalRecordRequest $request, MedicalRecord $medicalRecord)
    {
        $medicalRecord->update($request->validated());

        if ($request->hasFile('attatchments')) {
            AttatchmentService::store($medicalRecord, $request->file('attatchments'), 'medical-records');
        }

        return $this->success(
            MedicalRecordResource::make($medicalRecord->load(['user', 'employee.user', 'attatchments'])),
            'updated'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteMedicalRecordRequest $request, MedicalRecord $medicalRecord)
    {
        $medicalRecord->delete();
        return $this->success(null, 'deleted');
    }
}
