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

        try{

            $data = $request->validated();
            $user = auth()->user();

            if (Hash::check($request->current_password, $user->password)) {

                if (isset($data['full_name'])) {
                    $user->full_name = $data['full_name'];
                }

                if (isset($data['nickname'])) {
                    $user->nickname = $data['nickname'];
                }

                if (isset($data['new_password'])) {
                    $user->password = Hash::make($data['new_password']);
                }

                if ($request->hasFile('photo')) {

                    if ($user->photo) {
                        $filePath = str_replace('/storage/', '', $user->photo);

                            if (Storage::disk('public')->exists($filePath)) {
                                Storage::disk('public')->delete($filePath);
                            }

                        }

                        $path = $request->file('photo')->store("$user->id/images", 'public');
                        $user->photo = "/storage/$path";
                }

                $user->save();

                $user->photo = asset($user->photo);

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

         } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);

        }
    }
}
