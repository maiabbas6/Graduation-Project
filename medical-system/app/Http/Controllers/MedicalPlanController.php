<?php

namespace App\Http\Controllers;

use App\Http\Requests\MedicalPlan\CreateMedicalPlanRequest;
use App\Http\Requests\MedicalPlan\DeleteMedicalPlanRequest;
use App\Http\Requests\MedicalPlan\IndexMedicalPlanRequest;
use App\Http\Requests\MedicalPlan\ShowMedicalPlanRequest;
use App\Http\Requests\MedicalPlan\UpdateMedicalPlanRequest;
use App\Http\Resources\MedicalPlanResource;
use App\Models\MedicalPlan;
use Illuminate\Support\Facades\Auth;

class MedicalPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexMedicalPlanRequest $request)
    {
        $query = MedicalPlan::query()->with(['employee.user', 'medicalRecord']);

        if ($request->filled('employee_id')) {
            $query->where('employee_id', $request->integer('employee_id'));
        }
        if ($request->filled('medical_record_id')) {
            $query->where('medical_record_id', $request->integer('medical_record_id'));
        }

        $plans = $query->orderByDesc('created_at')->paginate($request->integer('per_page', 10));

        return $this->success($plans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateMedicalPlanRequest $request)
    {
        $data = $request->validated();
        $data['employee_id'] = $data['employee_id'] ?? (Auth::user()->employee?->id ?? null);

        $plan = MedicalPlan::create($data);

        return $this->success(
            MedicalPlanResource::make($plan->load(['employee.user', 'medicalRecord'])),
            'created',
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowMedicalPlanRequest $request, MedicalPlan $medicalPlan)
    {
        return $this->success(
            MedicalPlanResource::make($medicalPlan->load(['employee.user', 'medicalRecord']))
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicalPlanRequest $request, MedicalPlan $medicalPlan)
    {
        $medicalPlan->update($request->validated());

        return $this->success(
            MedicalPlanResource::make($medicalPlan->load(['employee.user', 'medicalRecord'])),
            'updated'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteMedicalPlanRequest $request, MedicalPlan $medicalPlan)
    {
        $medicalPlan->delete();
        return $this->success(null, 'deleted');
    }

    public function myMedicalPlans()
    {
        $plans = Auth::user()->medicalPlans()
            ->with(['employee.user', 'medicalRecord'])
            ->orderByDesc('medical_plans.created_at')
            ->paginate(10);

        return $this->success(MedicalPlanResource::collection($plans));
    }
}
