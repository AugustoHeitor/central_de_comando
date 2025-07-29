<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\FinancialTransaction\StoreFinancialTransactionRequest;
use App\Http\Requests\FinancialTransaction\UpdateFinancialTransactionRequest;
use App\Http\Requests\FinancialTransaction\IndexFinancialTransactionRequest;
use App\Http\Resources\FinancialTransactionResource;
use App\Models\FinancialCategory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\FinancialTransaction;

class FinancialTransactionController extends Controller
{
    
    public function store(StoreFinancialTransactionRequest $request){
        try{
            $data = $request->validated();

            $category = FinancialCategory::find($data['category_id']);

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
                    'message' => 'Ocorreu um erro ao tentar criar a transação!',
                    'data' => [],
                ], 500);
            }

            $transaction = new FinancialTransaction();

            $transaction->title = $data['title'];
            $transaction->type = $data['type'];
            $transaction->amount = $data['amount'];
            $transaction->transaction_date = $data['transaction_date'];
            $transaction->category_id = $data['category_id'];
            $transaction->user_id = auth()->id(); 
        
            $transaction->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Transação criada com sucesso!',
                'data' => new FinancialTransactionResource($transaction),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [], 
            ], 500);
        }
    }

    public function update(UpdateFinancialTransactionRequest $request, $id){
        try{

            $data = $request->validated();
            $transaction = FinancialTransaction::find($id);

            if (!$transaction) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Transação não encontrada!',
                    'data' => [],
                ], 404);
            }

            if ($transaction->user_id !== auth()->id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Ocorreu um erro ao tentar atualizar a tarefa!',
                    'data' => [],
                ], 403);
            }

            if(isset($data['category_id'])){
                $category = FinancialCategory::find($data['category_id']);   

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
                        'message' => 'Ocorreu um erro ao tentar atualizar a transação!',
                        'data' => [],
                    ], 403);
                }
            }
  
            if (isset($data['title'])) $transaction->title = $data['title'];
            if (isset($data['type'])) $transaction->type = $data['type'];
            if (isset($data['amount'])) $transaction->amount = $data['amount'];
            if (isset($data['transaction_date'])) $transaction->transaction_date = $data['transaction_date'];
            if (isset($data['category_id'])) $transaction->category_id = $data['category_id'];

            $transaction->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Transação atualizada com sucesso!',
                'data' => new FinancialTransactionResource($transaction),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [], 
            ], 500);
        }
    }

    public function index(IndexFinancialTransactionRequest $request){
        try {

            $params = $request->validated();

            $user_id = auth()->id();

            $query = FinancialTransaction::where('user_id', $user_id);

            if (!empty($params['type'])) {
                $query->where('type', $params['type']);
            }

            if (!empty($params['category'])) {
                $query->where('category_id', $params['category']);
            }

            if (!empty($params['start_date']) && !empty($params['end_date'])) {
                $query->whereBetween('transaction_date', [
                    $params['start_date'],
                    $params['end_date']
                ]);
            } 
           
            $transactions = $query->orderBy('id')->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Transações listadas com sucesso!',
                'data' => FinancialTransactionResource::collection($transactions)
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

            $transaction = FinancialTransaction::find($id);

            if (!$transaction) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Transação não encontrada!',
                    'data' => [],
                ], 404);
            }

            if ($transaction->user_id !== auth()->id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Ocorreu um erro ao tentar deletar a tarefa!',
                    'data' => [],
                ], 403);
            }

            $transaction->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Transação deletada com sucesso!',
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
