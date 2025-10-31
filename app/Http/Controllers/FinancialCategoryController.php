<?php

namespace App\Http\Controllers;

use App\Models\FinancialCategory;
use App\Http\Requests\FinancialCategoryRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\FinancialCategoryResource;

class FinancialCategoryController extends Controller
{

    public function index()
    {
        try{

            $categories = FinancialCategory::where('user_id', auth()->id())->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Categorias listadas com sucesso!',
                'data' => FinancialCategoryResource::collection($categories),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    public function store(FinancialCategoryRequest $request)
    {
        try{

            $category = FinancialCategory::create([
                'name' => $request->name,
                'user_id' => Auth::id(),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Categoria criada com sucesso!',
                'data' => new FinancialCategoryResource($category),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    public function update(FinancialCategoryRequest $request, $id)
    {
        try{
            $category = FinancialCategory::find($id);

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
                'data' => new FinancialCategoryResource($category),
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
            $category = FinancialCategory::find($id);

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
