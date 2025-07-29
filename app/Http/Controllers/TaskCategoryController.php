<?php

namespace App\Http\Controllers;

use App\Models\TaskCategory;
use Illuminate\Http\Request;
use App\Http\Requests\TaskCategoryRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\TaskCategoryResource;

class TaskCategoryController extends Controller
{

    public function index()
    {
        try{

            $categories = TaskCategory::where('user_id', auth()->id())->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Categorias listadas com sucesso!',
                'data' => TaskCategoryResource::collection($categories),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [], 
            ], 500);
        }
    }

    public function store(TaskCategoryRequest $request)
    {
        try{

            $category = TaskCategory::create([
                'name' => $request->name,
                'user_id' => Auth::id(),  
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Categoria criada com sucesso!',
                'data' => new TaskCategoryResource($category),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [], 
            ], 500);
        }
    }

    public function update(TaskCategoryRequest $request, $id)
    {
        try{
            $category = TaskCategory::find($id);

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
                    'message' => 'Ocorreu um erro ao tentar atualizar categoria!',
                    'data' => [],
                ], 500);
            }

            $category->name = $request->name;
            $category->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Categoria atualizada com sucesso!',
                'data' => new TaskCategoryResource($category),
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
        try{
            $category = TaskCategory::find($id);

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
                    'message' => 'Ocorreu um erro ao tentar atualizar categoria!',
                    'data' => [],
                ], 500);
            }

            $category->delete();
                
            return response()->json([
                'status' => 'success',
                'message' => 'Categoria deletada com sucesso!',
                'data' => [],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [], 
            ], 500);
        }
    }
}