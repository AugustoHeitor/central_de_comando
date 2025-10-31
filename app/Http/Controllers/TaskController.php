<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Requests\Task\IndexTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\TaskCategory;
use Carbon\Carbon;
use App\Models\Task;

class TaskController extends Controller
{

    public function store(StoreTaskRequest $request){
        try{
            $data = $request->validated();

            $category = TaskCategory::find($data['category_id']);

            if (!$category) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Categoria não encontrada!',
                    'data' => [],
                ]);
            }

            if ($category->user_id !== auth()->id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Ocorreu um erro ao tentar criar a tarefa!',
                    'data' => [],
                ], 500);
            }

            $task = new Task();
            $task->title = $data['title'];
            $task->description = $data['description'] ?? null;
            $task->status = $data['status'];
            $task->priority = $data['priority'];
            $task->category_id = $data['category_id'];
            $task->user_id = auth()->id();
            $task->deadline = $data['deadline'];

            if($data['status'] === 'done'){
                $task->completed_at = Carbon::now('UTC');
            }

            $task->save();
            $task->load('timeLogs');

            return response()->json([
                'status' => 'success',
                'message' => 'Tarefa criada com sucesso!',
                'data' => new TaskResource($task),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    public function update(UpdateTaskRequest $request, $id){
        try{

            $data = $request->validated();
            $task = Task::find($id);

            if (!$task) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Tarefa não encontrada!',
                    'data' => [],
                ], 404);
            }

            if ($task->user_id !== auth()->id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Ocorreu um erro ao tentar atualizar a tarefa!',
                    'data' => [],
                ], 403);
            }

            if(isset($data['category_id'])){
                $category = TaskCategory::find($data['category_id']);

                if (!$category) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Categoria não encontrada!',
                        'data' => [],
                    ]);
                }

                if ($category->user_id !== auth()->id()) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Ocorreu um erro ao tentar atualizar a tarefa!',
                        'data' => [],
                    ], 403);
                }
            }

            if (isset($data['title'])) $task->title = $data['title'];
            if (isset($data['description'])) $task->description = $data['description'];
            if (isset($data['status'])) {
                $task->status = $data['status'];
                if ($data['status'] === 'done') {
                    $task->completed_at = Carbon::now('UTC');
                } else {
                    $task->completed_at = null;
                }
            }

            if (isset($data['priority'])) $task->priority = $data['priority'];
            if (isset($data['category_id'])) $task->category_id = $data['category_id'];
            if (isset($data['deadline'])) $task->deadline = $data['deadline'];

            $task->save();
            $task->load('timeLogs');

            return response()->json([
                'status' => 'success',
                'message' => 'Tarefa atualizada com sucesso!',
                'data' => new TaskResource($task),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    public function index(IndexTaskRequest $request){
        try {

            $params = $request->validated();

            $user_id = auth()->id();

            $query = Task::where('user_id', $user_id)->with('timeLogs');

            if (!empty($params['status'])) {
                $query->where('status', $params['status']);
            }

            if (!empty($params['priority'])) {
                $query->where('priority', $params['priority']);
            }

            if (!empty($params['category'])) {
                $query->where('category_id', $params['category']);
            }

            if (!empty($params['start_deadline']) && !empty($params['end_deadline'])) {
                $query->whereBetween('deadline', [
                    $params['start_deadline'],
                    $params['end_deadline']
                ]);
            } elseif (!empty($params['start_deadline'])) {
                $query->where('deadline', '>=', $params['start_deadline']);
            } elseif (!empty($params['end_deadline'])) {
                $query->where('deadline', '<=', $params['end_deadline']);
            }

            $tasks = $query->orderBy('id')->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Tarefas listadas com sucesso!',
                'data' => TaskResource::collection($tasks)
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {

            $task = Task::find($id);

            if (!$task) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Tarefa não encontrada!',
                    'data' => [],
                ], 404);
            }

            if ($task->user_id !== auth()->id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Ocorreu um erro ao tentar deletar a tarefa!',
                    'data' => [],
                ], 403);
            }

            $task->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Tarefa deletada com sucesso!',
                'data' => [],
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
