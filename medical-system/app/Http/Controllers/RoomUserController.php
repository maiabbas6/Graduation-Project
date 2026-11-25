<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomUser\CreateRoomUserRequest;
use App\Http\Requests\RoomUser\DeleteRoomUserRequest;
use App\Http\Requests\RoomUser\IndexRoomUserRequest;
use App\Http\Requests\RoomUser\ShowRoomUserRequest;
use App\Http\Requests\RoomUser\UpdateRoomUserRequest;
use App\Http\Resources\RoomUserResource;
use App\Models\RoomUser;

class RoomUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexRoomUserRequest $request)
    {
        $query = RoomUser::query()->with(['user', 'room']);

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->integer('user_id'));
        }
        if ($request->filled('room_id')) {
            $query->where('room_id', $request->integer('room_id'));
        }
        if ($request->filled('active')) {
            $active = $request->boolean('active');
            $active ? $query->whereNull('left_at') : $query->whereNotNull('left_at');
        }

        $roomUsers = $query->orderByDesc('created_at')->paginate($request->integer('per_page', 10));

        return $this->success(RoomUserResource::collection($roomUsers)->additional([
                'current_page' => $roomUsers->currentPage(),
                'per_page' => $roomUsers->perPage(),
                'total' => $roomUsers->total(),
                'last_page' => $roomUsers->lastPage(),
        ]));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRoomUserRequest $request)
    {
        $roomUser = RoomUser::create($request->validated());

        return $this->success(
            RoomUserResource::make($roomUser->load(['user', 'room'])),
            'created',
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowRoomUserRequest $request, RoomUser $roomUser)
    {
        return $this->success(
            RoomUserResource::make($roomUser->load(['user', 'room']))
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoomUserRequest $request, RoomUser $roomUser)
    {
        $roomUser->update($request->validated());

        return $this->success(
            RoomUserResource::make($roomUser->load(['user', 'room'])),
            'updated'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteRoomUserRequest $request, RoomUser $roomUser)
    {
        $roomUser->delete();
        return $this->success(null, 'deleted');
    }
}
