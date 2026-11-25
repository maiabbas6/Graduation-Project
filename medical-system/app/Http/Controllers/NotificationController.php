<?php

namespace App\Http\Controllers;

use App\Http\Requests\Notification\IndexNotificationRequest;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Display a listing of the authenticated user's notifications.
     */
    public function index(IndexNotificationRequest $request)
    {
        $pp = $request->integer('per_page', 20);

        $notifications = Auth::user()
            ->notifications()
            ->paginate($pp);

        if(Auth::user()->hasRole('admin')){
            $notifications = Notification::query()->paginate($pp);
        }

        return $this->success(NotificationResource::collection($notifications));
    }
}
