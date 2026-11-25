<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomService\CreateRoomServiceRequest;
use App\Http\Requests\RoomService\UpdateRoomServiceRequest;
use App\Http\Resources\RoomServiceResource;
use App\Models\RoomService;

class RoomServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->success(RoomServiceResource::collection(RoomService::query()->orderByDesc('created_at')->get() ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRoomServiceRequest $request)
    {
        $roomService = RoomService::create($request->validated());
        return $this->success(RoomServiceResource::make($roomService), 'created', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(RoomService $roomService)
    {
        return $this->success(RoomServiceResource::make($roomService));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoomService $roomService)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoomServiceRequest $request, RoomService $roomService)
    {
        $roomService->update($request->validated());
        return $this->success(RoomServiceResource::make($roomService), 'updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoomService $roomService)
    {
        $roomService->delete();
        return $this->success(null, 'deleted');
    }
}
