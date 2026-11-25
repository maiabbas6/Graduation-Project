<?php

namespace App\Http\Controllers;

use App\Http\Resources\SystemLogResource;
use App\Models\SystemLog;

use Illuminate\Support\Carbon;

class SystemLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $logs = SystemLog::query();

        if(request()->has('user_id')){
            $logs->where('user_id',request()->input('user_id'));
        }
        if(request()->has('start_date')){
            $logs->where('created_at','>',Carbon::parse(request()->input('start_date')));
        }
        if(request()->has('end_date')){
            $logs->where('created_at','<',Carbon::parse(request()->input('end_date')));
        }

        $logs->orderByDesc('created_at');

        $logs = $logs->paginate(10);

        return $this->success(
            [
                'data' => SystemLogResource::collection($logs),
                'pages' => $logs->lastPage()
            ]
        );
    }


    /**
     * Display the specified resource.
     */
    public function show(SystemLog $systemLog)
    {
        return $this->success(SystemLogResource::make($systemLog->load('user')));
    }


}
