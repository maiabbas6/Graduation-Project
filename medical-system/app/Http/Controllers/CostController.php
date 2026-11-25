<?php

namespace App\Http\Controllers;

use App\Http\Pipelines\Cost\CostPipeline;
use App\Http\Requests\Cost\DeleteCostRequest;
use App\Http\Requests\Cost\IndexCostRequest;
use App\Http\Requests\Cost\ShowCostRequest;
use App\Http\Requests\Cost\StoreCostRequest;
use App\Http\Requests\Cost\UpdateCostRequest;
use App\Http\Resources\CostResource;
use App\Models\Cost;
use App\Services\CostService;
use Barryvdh\DomPDF\Facade\Pdf;

class CostController extends Controller
{
    public function index(IndexCostRequest $request)
    {
        $query = Cost::query()->with(['user', 'appointment', 'roomServiceUser.roomService']);

        $costs = CostPipeline::make($query)->paginate($request->integer('per_page', 15));

        return $this->success(CostResource::collection($costs));
    }

    public function show(ShowCostRequest $request, Cost $cost)
    {
        return $this->success(
            CostResource::make($cost->load(['user', 'appointment', 'roomServiceUser.roomService']))
        );
    }

    public function store(StoreCostRequest $request)
    {
        $cost = Cost::create($request->validated());

        return $this->success(
            CostResource::make($cost->load(['user', 'appointment', 'roomServiceUser.roomService'])),
            'created',
            201
        );
    }

    public function update(UpdateCostRequest $request, Cost $cost)
    {
        $cost->update($request->validated());

        return $this->success(
            CostResource::make($cost->fresh()->load(['user', 'appointment', 'roomServiceUser.roomService'])),
            'updated'
        );
    }

    public function destroy(DeleteCostRequest $request, Cost $cost)
    {
        $cost->delete();
        return $this->success(null, 'deleted');
    }

    public function markAsPaid(Cost $cost)
    {
        $cost = CostService::markAsPaid($cost);

        return $this->success(
            CostResource::make($cost->load(['user', 'appointment', 'roomServiceUser.roomService'])),
            'marked as paid'
        );
    }

    public function markAsUnpaid(Cost $cost)
    {
        $cost = CostService::markAsUnpaid($cost);

        return $this->success(
            CostResource::make($cost->load(['user', 'appointment', 'roomServiceUser.roomService'])),
            'marked as unpaid'
        );
    }

    public function exportBill(Cost $cost)
    {
        $cost->load(['user', 'appointment', 'roomServiceUser.roomService']);

        $pdf = Pdf::loadView('exports.bill', ['cost' => $cost]);

        return $pdf->download("bill-{$cost->id}.pdf");
    }
}
