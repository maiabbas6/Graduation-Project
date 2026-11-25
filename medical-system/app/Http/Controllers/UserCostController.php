<?php

namespace App\Http\Controllers;

use App\Http\Pipelines\Cost\UserCostPipeline;
use App\Http\Requests\Cost\IndexCostRequest;
use App\Http\Requests\Cost\ShowCostRequest;
use App\Http\Resources\CostResource;
use App\Models\Cost;
use App\Services\CostService;
use Illuminate\Support\Facades\Auth;

class UserCostController extends Controller
{
    public function index(IndexCostRequest $request)
    {
        $query = Cost::query()
            ->with(['appointment', 'roomServiceUser.roomService']);

        $costs = UserCostPipeline::make($query)->paginate($request->integer('per_page', 15));

        return $this->success(CostResource::collection($costs));
    }

    public function show(ShowCostRequest $request, Cost $cost)
    {
        return $this->success(
            CostResource::make($cost->load(['appointment', 'roomServiceUser.roomService']))
        );
    }

    public function summary()
    {
        $user = Auth::user();

        return $this->success([
            'total_paid' => CostService::getUserTotalPaid($user),
            'total_unpaid' => CostService::getUserTotalUnpaid($user),
            'total' => CostService::getUserTotalPaid($user) + CostService::getUserTotalUnpaid($user),
        ]);
    }
}
