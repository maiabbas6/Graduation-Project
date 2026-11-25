<?php

namespace App\Services;

use App\Models\AiChat;
use App\Models\AiMessage;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Http;

class OtpService
{



    static function send(User $user,string $otp){
        $token = env('WHATSAPP_API_KEY');

         $res = Http::withoutVerifying()->withHeader("content-type","application/x-www-form-urlencoded")->post(
             'https://api.ultramsg.com/instance185818/messages/chat?token='.$token.'&to='.self::normalizeSyrianPhone($user->phone).'&body='."otp is ".$otp,
             
             );

             return $res->getBody();
    }

    static private function normalizeSyrianPhone(string $phone): string
{
    // Remove spaces, dashes, parentheses, etc.
    $phone = preg_replace('/[^\d+]/', '', trim($phone));

    // Already in international format
    if (str_starts_with($phone, '+963')) {
        return $phone;
    }

    // Local format (e.g. 0987654321)
    if (str_starts_with($phone, '0')) {
        return '+963' . substr($phone, 1);
    }

    // Optional: handle numbers starting with 963 but missing +
    if (str_starts_with($phone, '963')) {
        return '+' . $phone;
    }

    // Return as-is or throw an exception depending on your needs
    return $phone;
}



}
