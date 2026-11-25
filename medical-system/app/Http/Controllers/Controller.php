<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Response;

abstract class Controller
{
    public function success($data = null,$message = 'success',$code = 200){
        return Response::json([
            'data' => $data,
            'success' => true,
            'code' => $code,
            'message' => $message
        ],$code);
    }


    public function fail($message = 'fail',$code = 400){
        return Response::json([
            'data' => null,
            'success' => false,
            'code' => $code,
            'message' => $message
        ],$code);
    }
}
