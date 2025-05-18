<?php

namespace App\Http\Controllers;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function update(UpdateUserRequest $request)
    {

        $data = $request->all();
        $user = auth()->user();

        if (Hash::check($request->current_password, $user->password)) {

            $data = $request->all();

            if ($request->has('full_name')) {
                $user->full_name = $data['full_name'];
            }

            if ($request->has('nickname')) {
                $user->nickname = $data['nickname'];
            }

            if ($request->has('new_password')) {
                $user->password = Hash::make($data['new_password']);
            }

            if ($request->hasFile('photo')) {

                   if ($user->photo) {
                        $filePath = str_replace('/storage/', '', $user->photo);
                        if (Storage::disk('public')->exists($filePath)) {
                            Storage::disk('public')->delete($filePath);
                        }
                    }
                    
                    $path = $request->file('photo')->store('profile_photos', 'public');
                    $user->photo = '/storage/' . $path;
            }

            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Dados atualizados com sucesso!',
                'data' => new UserResource($user),
            ], 200);
        }else{
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao salvar os dados',
                'data' => [], 
            ], 401);
        }
        
    }
}
