<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\VirtualAssistantInteraction;

class VirtualAssistantService
{
    private string $apiKey;
    private string $baseUrl;
    private string $systemInstruction;
    private string $model;

    public function __construct()
    {
        $this->apiKey           = config('services.gemini.key');
        $this->model            = config('services.gemini.model', 'gemini-2.0-flash');
        $this->systemInstruction = config('virtualAssistant.system_instruction');
        $this->baseUrl          = "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent";
    }
    public function generateContent($prompt)
    {

        $prompt = trim($prompt);

        if ($prompt === '') {
            return [
                'status'  => 'error',
                'message' => 'O prompt não pode estar vazio.',
                'data'    => [],
            ];
        }

        if (!auth()->check()) {
            return [
                'status'  => 'error',
                'message' => 'Usuário não autenticado.',
                'data'    => [],
            ];
        }

        $interactions       = $this->indexInteraction();
        $interactionHistory = $this->buildInteractionHistory($interactions, $prompt);
        $currentInteraction = $this->storeInteraction($prompt);

        if (!$currentInteraction) {
            return [
                'status'  => 'error',
                'message' => 'Ocorreu um erro ao registrar a interação.',
                'data'    => [],
            ];
        }

        $response = Http::timeout(30)->retry(3, 2000)
            ->withHeaders([
                'x-goog-api-key' => $this->apiKey,
                'Content-Type'   => 'application/json',
            ])
            ->post($this->baseUrl, [
                'system_instruction' => [
                    'parts' => [
                        ['text' => $this->systemInstruction],
                    ],
                ],
                'contents' => $interactionHistory,
            ]);

        $responseData = $response->json();

        if ($response->failed()) {
            $this->updateInteraction($currentInteraction->id, $responseData, true);

            return [
                'status'  => 'error',
                'message' => $responseData,
                'data'    => [],
            ];
        }

        $this->updateInteraction($currentInteraction->id, $responseData, false);

        return [
            'status'  => 'success',
            'message' => 'Conteúdo gerado com sucesso!',
            'data'    => $responseData,
        ];
    }
    private function storeInteraction($prompt)
    {
        try {
            $interaction          = new VirtualAssistantInteraction();
            $interaction->user_id = auth()->id();
            $interaction->prompt  = $prompt;
            $interaction->save();

            return $interaction;
        } catch (\Throwable $e) {
            return null;
        }
    }
    private function updateInteraction($id, $response = null, $hasError = false)
    {
        try {

            $interaction = VirtualAssistantInteraction::find($id);

            if (!$interaction) {
                return null;
            }

            $interaction->response  = is_array($response) ? json_encode($response) : $response;
            $interaction->has_error = $hasError;
            $interaction->save();

            return $interaction;
        } catch (\Throwable $e) {
            return null;
        }
    }
    private function indexInteraction()
    {
        try {

            return VirtualAssistantInteraction::where('user_id', auth()->id())
                ->where('has_error', false)
                ->orderBy('id', 'asc')
                ->latest()
                ->take(6)
                ->get();

        } catch (\Throwable $e) {
            return [];
        }
    }
    private function buildInteractionHistory($interactions, $currentPrompt)
    {
        $interactionHistory = [];

        if ($interactions->isNotEmpty()) {

            $interactionHistory = $interactions

                ->filter(fn($interaction) => ! empty($interaction->response))
                ->flatMap(fn($interaction) => [
                    [
                        'role'  => 'user',
                        'parts' => [['text' => $interaction->prompt]],
                    ],
                    [
                        'role'  => 'model',
                        'parts' => [['text' => $this->extractResponseText($interaction->response)]],
                    ],
                ])
                ->values()
                ->toArray();
        }

        $interactionHistory[] = [
            'role'  => 'user',
            'parts' => [['text' => $currentPrompt]],
        ];

        return $interactionHistory;
    }
    public function extractResponseText($response)
    {
        if (empty($response)) {
            return '';
        }

        $data = is_string($response) ? json_decode($response, true) : $response;

        return $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
    }
}
