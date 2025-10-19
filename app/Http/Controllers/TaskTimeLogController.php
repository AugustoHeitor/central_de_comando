<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskTimeLog;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\TaskTimeLogResource;
use App\Http\Requests\TaskTimeLog\UpdateTaskTimeLogRequest;
use App\Http\Requests\TaskTimeLog\StartTaskTimeLogRequest;
use App\Http\Requests\TaskTimeLog\StopTaskTimeLogRequest;

class TaskTimeLogController extends Controller
{

    public function startTimeLog(StartTaskTimeLogRequest $request, $task_id)
    {

        $user_id = Auth::id();
        $data = $request->validated();

        $task = Task::where('id', $task_id)
            ->where('user_id', $user_id)
            ->first();

        if (!$task) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tarefa não encontrada!',
                'data' => [],
            ], 404);
        }

        $activeLog = TaskTimeLog::where('user_id', $user_id)
        ->where('stopped_at', null)
        ->first();

        if ($activeLog) {
            return response()->json([
                'status' => 'error',
                'message' => 'Você já tem uma tarefa em execução. Finalize-a antes de iniciar esta.',
            ], 400);
        }

        $log = TaskTimeLog::create([
            'task_id' => $task->id,
            'user_id' => $user_id,
            'started_at' => $data['started_at'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Registro de Tempo iniciado com sucesso!',
            'data' => new TaskTimeLogResource($log),
        ], 201);
    }

    public function stopTimeLog(StopTaskTimeLogRequest $request, $task_id)
    {
        try{

            $user_id = Auth::id();
            $data = $request->validated();

            $log = TaskTimeLog::where('task_id', $task_id)
            ->where('user_id', $user_id)
            ->where('stopped_at', null)
            ->first();

            if (!$log) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Nenhum registro de tempo em andamento encontrado.',
                ], 404);
            }

            $duration = $log->started_at->diffInSeconds($data['stopped_at']);
            $duration = (int) $duration;

            $log->update([
                'stopped_at' => $data['stopped_at'],
                'duration_seconds' => $duration,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Registro de tempo finalizado com sucesso!',
                'data' =>  new TaskTimeLogResource($log),
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }

    }

    public function update(UpdateTaskTimeLogRequest $request, $time_log_id)
    {
        try{

            $data = $request->validated();

            $user_id = Auth::id();

            $time_log = TaskTimeLog::where('id', $time_log_id)
            ->where('user_id', $user_id)->first();

            if (!$time_log) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Nenhum registro de tempo em andamento encontrado.',
                    'data' =>  [],
                ], 404);
            }

            $time_log->started_at = $data['started_at'];
            $time_log->stopped_at = $data['stopped_at'];

            if ($time_log->stopped_at->lte($time_log->started_at)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'A data de término deve ser maior que a data de início.',
                    'data' =>  [],
                ], 422);
            }

            $time_log->duration_seconds = $time_log->started_at->diffInSeconds($time_log->stopped_at);
            $time_log->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Registro de tempo finalizado com sucesso!',
                'data' =>  new TaskTimeLogResource($time_log),
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }

    }

    public function destroy($time_log_id)
    {

        try {

            $user_id = Auth::id();

            $log = TaskTimeLog::where('id', $time_log_id)
            ->where('user_id', $user_id)
            ->first();

            if (!$log) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Registro de tempo não encontrado.',
                ], 404);
            }

            $log->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Registro de tempo deletado com sucesso!',
                'data' => []
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

}



