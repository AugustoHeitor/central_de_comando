<?php

namespace App\Http\Controllers;

use App\Http\Requests\Tag\StoreTagRequest;
use App\Http\Requests\Tag\UpdateTagRequest;
use App\Http\Requests\Tag\IndexTagRequest;

use App\Http\Resources\TagResource;
use App\Models\Tag;

class TagController extends Controller
{

    public function store(StoreTagRequest $request){
        try{

            $data = $request->validated();

            $tag = new Tag();
            $tag->name = $data['name'];
            $tag->description = $data['description'] ?? null;
            $tag->color = $data['color'] ?? null;
            $tag->icon = $data['icon'] ?? null;
            $tag->is_active = $data['is_active'] ?? true;
            $tag->user_id = auth()->id();

            $tag->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Tag criada com sucesso!',
                'data' => new TagResource($tag),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    public function update(UpdateTagRequest $request, $id){
        try{

            $data = $request->validated();
            $tag = Tag::find($id);

            if (!$tag) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Tag não encontrada!',
                    'data' => [],
                ], 404);
            }

            if ($tag->user_id !== auth()->id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Ocorreu um erro ao tentar atualizar a tag!',
                    'data' => [],
                ], 403);
            }

            if (isset($data['name'])) $tag->name = $data['name'];

            if (isset($data['description'])) $tag->description = $data['description'];

            if (isset($data['color'])) $tag->color = $data['color'];

            if (isset($data['icon'])) $tag->icon = $data['icon'];

            if (isset($data['is_active'])) $tag->is_active = $data['is_active'];

            $tag->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Tag atualizada com sucesso!',
                'data' => new TagResource($tag),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    public function index(IndexTagRequest $request){
        try {

            $params = $request->validated();

            $user_id = auth()->id();

            $query = Tag::where('user_id', $user_id);

            if (array_key_exists('is_active', $params) && !is_null($params['is_active'])) {
                $query->where('is_active', $params['is_active']);
            }

            $tags = $query->orderBy('id')->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Tags listadas com sucesso!',
                'data' => TagResource::collection($tags)
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

            $tag = Tag::find($id);

            if (!$tag) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Tag não encontrada!',
                    'data' => [],
                ], 404);
            }

            if ($tag->user_id !== auth()->id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Ocorreu um erro ao tentar deletar a tag!',
                    'data' => [],
                ], 403);
            }

            $tag->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Tag deletada com sucesso!',
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
