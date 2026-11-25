<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatRequest;
use App\Http\Resources\AiChatResource;
use App\Http\Resources\AiMessageResource;
use App\Models\AiChat;
use App\Services\AiChatService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class AiController extends Controller
{
    public function newChat(ChatRequest $request){
        $imageBase64 = null;
        $imagePath = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imagePath = $file->store('chat-images', 'public');
            $imageBase64 = base64_encode(file_get_contents(storage_path("app/public/{$imagePath}")));
        }

        $chat = AiChatService::newChat(
            Auth::user(),
            $request->message,
            $imageBase64,
            $imagePath
        );
        return $this->success(AiChatResource::make($chat->load("messages")));
    }

    public function index(){
        $chats = Auth::user()->chats()->paginate(10);
        return $this->success(AiChatResource::collection($chats));
    }

    public function show($chat){
        $chat = AiChat::findOrFail($chat);
        if(Auth::id() != $chat->user_id){
            return $this->fail("not your chat",403);
        }
        return $this->success(AiChatResource::make($chat->load("messages")));
    }

    public function sendMessage(ChatRequest $request,$chat){
        $chat = AiChat::findOrFail($chat);
        if(Auth::id() != $chat->user_id){
            return $this->fail("not your chat",403);
        }

        $imageBase64 = null;
        $imagePath = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imagePath = $file->store('chat-images', 'public');
            $imageBase64 = base64_encode(file_get_contents(storage_path("app/public/{$imagePath}")));
        }

        return $this->success(
            AiMessageResource::make(
                AiChatService::messageChat(
                    $chat,
                    $request->message,
                    $imageBase64,
                    $imagePath
                )
            )
        );
    }
}
