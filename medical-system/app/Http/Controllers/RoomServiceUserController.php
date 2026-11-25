<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomServiceUser\CreateRoomServiceUserRequest;
use App\Http\Requests\RoomServiceUser\UpdateRoomServiceUserRequest;
use App\Http\Requests\RoomServiceUser\UpdateRoomServiceUserStatusRequest;
use App\Http\Resources\RoomServiceUserResource;
use App\Models\RoomServiceUser;
use App\Services\CostService;
use App\Services\NotificationService;
use Illuminate\Support\Facades\Auth;

class RoomServiceUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->success(
            RoomServiceUserResource::collection(
                RoomServiceUser::query()
                    ->with(['roomService', 'room', 'user', 'employee'])
                    ->paginate(10)
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRoomServiceUserRequest $request)
    {
        $data = $request->validated();
        if(!$request->has('user_id')){
            $data['user_id'] = Auth::id();
        }
        $roomServiceUser = RoomServiceUser::create($data);
        return $this->success(
            RoomServiceUserResource::make($roomServiceUser->load(['roomService', 'room', 'user', 'employee'])),
            'created',
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(RoomServiceUser $roomServiceUser)
    {
        return $this->success(
            RoomServiceUserResource::make($roomServiceUser->load(['roomService', 'room', 'user', 'employee']))
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoomServiceUserRequest $request, RoomServiceUser $roomServiceUser)
    {
        $roomServiceUser->update($request->validated());
        return $this->success(
            RoomServiceUserResource::make($roomServiceUser->load(['roomService', 'room', 'user', 'employee'])),
            'updated'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoomServiceUser $roomServiceUser)
    {
        $roomServiceUser->delete();
        return $this->success(null, 'deleted');
    }

    /**
     * Update the status of the specified resource.
     */
    public function changeStatus(UpdateRoomServiceUserStatusRequest $request, RoomServiceUser $roomServiceUser)
    {
        $status = $request->validated()['status'];
        $roomServiceUser->update(['status' => $status]);

        if ($status === 'done') {
            CostService::generateForRoomService($roomServiceUser);
        }

        NotificationService::send(
            $roomServiceUser->user,
            'Room Service Status Updated',
            "Your room service request status has been updated to: {$status}.",
            'room_service_user',
            $roomServiceUser
        );

        return $this->success(RoomServiceUserResource::make($roomServiceUser), 'updated');
    }
}
