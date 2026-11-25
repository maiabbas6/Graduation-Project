<?php

namespace App\Http\Middleware;

use App\Jobs\SystemLogJob;
use App\Models\SystemLog;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

class SystemLogMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $userId = null;
        if(Auth::check()){
            $userId = Auth::id();
        }
        SystemLogJob::dispatch([
            'user_id' => $userId,
            'ip' => $request->ip(),
            'route' => $request->uri()->path(),
            'info' => [
                'request_body' => $request->json(),
                'request_method' => $request->method(),

            ]
        ]);
        return $next($request);
    }
}
