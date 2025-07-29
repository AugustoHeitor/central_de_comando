<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 

class AuthController extends Controller
{
    public function login(LoginRequest $request) 
    {
        try{

            $credentials = $request->only('email', 'password');

            if (Auth::attempt($credentials)) {
                    $request->session()->regenerate();

                    $user = Auth::user();

                    $token = $user->createToken('login-token')->plainTextToken;

                    $request->session()->put('auth_token', $token);

                    return response()->json([
                        'status' => 'success',
                        'message' => 'Login realizado com sucesso!',
                        'data' => [
                            'redirect_url' => url('/dashboard')
                        ], 
                    ], 200);
            }
    
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao fazer login',
                'data' => [], 
            ], 401);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [], 
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try{

            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect('/login');
        
        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [], 
            ], 500);
            
        }
    }
}