<?php

namespace App\Services;

use App\Models\AiChat;
use App\Models\AiMessage;
use App\Models\Employee;
use App\Models\Section;
use App\Models\User;
use Illuminate\Support\Facades\Http;

class AiChatService
{
    private static function sanitizeUtf8(string $text): string
    {
        return mb_convert_encoding($text, 'UTF-8', 'UTF-8');
    }

    private static function userContext(User $user): string
    {
        $appointments = $user->appointments->map(fn ($a) => [
            'id' => $a->id,
            'employee_name' => trim(($a->employee?->user?->first_name ?? '').' '.($a->employee?->user?->last_name ?? '')),
            'room' => $a->room?->name,
            'date_time' => $a->appointment_date_time?->format('Y-m-d H:i'),
            'description' => $a->description,
            'status' => $a->status,
            'type' => $a->type,
        ]);

        $medicalRecords = $user->medicalRecords->map(fn ($m) => [
            'id' => $m->id,
            'employee_name' => trim(($m->employee?->user?->first_name ?? '').' '.($m->employee?->user?->last_name ?? '')),
            'date' => $m->date?->format('Y-m-d'),
            'description' => $m->description,
            'type' => $m->type,
        ]);

        $sections = Section::all()->map(fn ($s) => [
            'id' => $s->id,
            'name' => $s->name,
            'icon' => $s->icon,
        ])->values();

        $employees = Employee::with('user')->get()->map(fn ($e) => [
            'id' => $e->id,
            'section_id' => $e->section_id,
            'specialization'=> $e->specialization,
            'qualifications'=> $e->qualifications,
            'employee_name' => trim(($e->user?->first_name ?? '').' '.($e->user?->last_name ?? '')),
        ])->values();

        return json_encode([
            'user' => [
                'name' => trim(($user->first_name ?? '').' '.($user->last_name ?? '')),
                'phone' => $user->phone,
                'birth' => $user->birth?->format('Y-m-d'),
                'gender' => $user->gender,
                'address' => $user->address,
            ],
            'appointments' => $appointments,
            'medical_records' => $medicalRecords,
            'sections' => $sections,
            'employees' => $employees
        ], JSON_UNESCAPED_UNICODE);
    }

    public static function newChat(User $user, string $message, ?string $imageBase64 = null, ?string $imagePath = null): AiChat
    {
        $key = env('GOOGLE_API_KEY');
        $message = self::sanitizeUtf8($message);

        $parts = [
            ['text' => $message],
            ['text' => 'user context '.self::userContext($user)],
        ];

        if ($imageBase64) {
            $parts[] = [
                'inline_data' => [
                    'mime_type' => 'image/jpeg',
                    'data' => $imageBase64,
                ],
            ];
        }

        $sys_prompt = [
            'system_instruction' => [
                'parts' => [
                    'text' => 'You are a smart assistant specialized in answering medical questions only. Follow these rules strictly:1. Always start your answer with a short, relevant title for the topic on the very first line.2. Starting from the second line, write the medical answer. You may use Markdown formatting, symbols and emojis as you see fit.3. Always reply in the same language the user used to ask the question.4. At the end of the answer, add a simple plain-text medical disclaimer stating that this consultation does not replace a visit to a doctor.',
                ],
            ],
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => $parts,
                ],
            ],
            'generationConfig' => [
                'temperature' => 0.2,
            ],
        ];

        $response = Http::withoutVerifying()->post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key='.$key,
            $sys_prompt,

        );

        if ($response->getStatusCode() == 200) {
            $response = json_decode($response, true);


            $text = explode("\n",self::sanitizeUtf8($response['candidates'][0]['content']['parts'][0]['text']));

            $title = $text[0];

            $chat = $user->chats()->create([
                'title' => trim($title),
            ]);
            $answer = trim(implode("\n", array_slice($text, 1)));
            $chat->messages()->create([
                'question' => $message,
                'answer' => $answer,
                'image_path' => $imagePath,
            ]);

            return $chat;
        }
        throw new \Exception('', 500);
    }

    public static function messageChat(AiChat $chat, string $message, ?string $imageBase64 = null, ?string $imagePath = null): AiMessage
    {
        $key = env('GOOGLE_API_KEY');
        $message = self::sanitizeUtf8($message);
        $oldMessages = $chat->messages;

        $parts = [
            ['text' => $message],
            ['text' => 'old messages '.json_encode($oldMessages)],
            ['text' => 'user context '.self::userContext($chat->user)],
        ];

        if ($imageBase64) {
            $parts[] = [
                'inline_data' => [
                    'mime_type' => 'image/jpeg',
                    'data' => $imageBase64,
                ],
            ];
        }

        $sys_prompt = [
            'system_instruction' => [
                'parts' => [
                    'text' => 'You are a smart assistant specialized in answering medical questions only. Follow these rules strictly:1. Write the medical answer using normal paragraphs and Markdown formatting, symbols and emojis as you see fit.2. Always reply in the same language the user used to ask the question.3. At the end of the answer, add a simple plain-text medical disclaimer stating that this consultation does not replace a visit to a doctor.',
                ],
            ],
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => $parts,
                ],
            ],
            'generationConfig' => [
                'temperature' => 0.2,
            ],
        ];

        $response = Http::withoutVerifying()->post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key='.$key,
            $sys_prompt,

        );

        if ($response->getStatusCode() == 200) {
            $response = json_decode($response, true);

            $text = self::sanitizeUtf8($response['candidates'][0]['content']['parts'][0]['text']);

            $message = $chat->messages()->create([
                'question' => $message,
                'answer' => $text,
                'image_path' => $imagePath,
            ]);

            return $message;
        }
        throw new \Exception('', 500);
    }
}
