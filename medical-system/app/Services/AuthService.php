<?php

namespace App\Services;

use App\Exceptions\Auth\NoRoleException;
use App\Models\User;

class AuthService
{
    static public function create(array $data){
        return User::create($data);
    }

    static public function authenticate(User $user,$name = 'Auth token'){
        if(!$user->roles()->exists()){
            throw new NoRoleException();
        }
        return $user->createToken($name)->plainTextToken;
    }


}
