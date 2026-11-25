<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        $user = AuthService::create($request->validated());
        $user->assignRole('client');
        $user->loadAllRelations();
        $token = AuthService::authenticate($user);

        return $this->success([
            'user' => UserResource::make($user),
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request){
        if(Auth::attempt(['phone' => $request->phone, 'password' => $request->password])){
            $user = Auth::user();
            $token = AuthService::authenticate($user);
            $user->loadAllRelations();
            return $this->success([
                'user' => UserResource::make($user),
                'token' => $token
            ]);
        }
        return $this->fail('Unauthenticated',401);
    }

    /**
     * @OA\Get(
     *     path="/auth/profile",
     *     summary="Get authenticated user profile",
     *     description="Returns the currently authenticated user with their employee data",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="User profile data",
     *         @OA\JsonContent(
     *             allOf={
     *                 @OA\Schema(ref="#/components/schemas/SuccessResponse"),
     *                 @OA\Schema(
     *                     @OA\Property(property="data", ref="#/components/schemas/User")
     *                 )
     *             }
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function profile(Request $request){
        $user = $request->user()->load([
            'employee',
            'appointments' => fn($q) => $q->take(3),
            'medicalRecords' => fn($q) => $q->take(3),
        ]);
        return $this->success(UserResource::make($user));
    }
}
