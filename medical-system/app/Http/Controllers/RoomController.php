<?php

namespace App\Http\Controllers;

use App\Http\Requests\Room\CreateRoomRequest;
use App\Http\Requests\Room\UpdateRoomRequest;
use App\Http\Resources\RoomResource;

use App\Models\Room;


class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return $this->success(Room::query()->orderByDesc('created_at')->paginate(10));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRoomRequest $request)
    {
        $room = Room::create($request->validated());
        return $this->success(RoomResource::make($room));
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        return $this->success(RoomResource::make($room->load(['appointments'])));
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoomRequest $request, Room $room)
    {
        $room->update($request->validated());
        return $this->success(RoomResource::make($room));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        $room->delete();
        return $this->success(null, 'deleted');
    }
}
