<?php

namespace App\Http\Controllers;

use App\Services\VirtualAssistantService;
use App\Http\Requests\VirtualAssistant\SendMessageRequest;
use App\Models\VirtualAssistantInteraction;

class VirtualAssistantController extends Controller
{
    protected $virtualAssistantService;

    public function __construct(VirtualAssistantService $virtualAssistantService)
    {
        $this->virtualAssistantService = $virtualAssistantService;
    }

    public function sendMessage(SendMessageRequest $request)
    {
        try {

            $data = $request->validated();
            $userMessage = $data['message'];

            $response = $this->virtualAssistantService->generateContent($userMessage);

            if ($response['status'] != "success") {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Ocorreu um erro desconhecido ao enviar a mensagem!',
                    'data' => [],
                ], 500);
            }

            $message = $this->virtualAssistantService->extractResponseText($response['data']);

            return response()->json([
                'status' => 'success',
                'message' => 'Mensagem enviada com sucesso!',
                'data' => [
                    "message" => $message,
                    "type" => "text"
                ],
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);

        }
    }

    public function indexMessages(){
        try {

            $messages = [];

            $response = VirtualAssistantInteraction::where('user_id', auth()->id())
                ->where('has_error', false)
                ->orderBy('id', 'desc')
                ->take(6)
                ->get()
                ->sortBy('id');

            if($response){
                $messages = $this->buildMessageHistory($response);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Mensagens listadas com sucesso!',
                'data' => $messages
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }

    }

    private function buildMessageHistory($messages)
    {

        $messageHistory = [];

        if ($messages->isNotEmpty()) {

            foreach($messages as $message) {

                $messageHistory[] = [
                    "text" => $message['prompt'],
                    "senderType" => "user"
                ];

                $messageHistory[] = [
                    "text" => $this->virtualAssistantService->extractResponseText($message['response']),
                    "senderType" => "atlas"
                ];

            }


        }

        return $messageHistory;
    }


}
