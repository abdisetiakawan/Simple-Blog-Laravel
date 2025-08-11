<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use App\Http\Traits\ApiResponserTrait;

class PostController extends Controller
{
    use ApiResponserTrait;

    public function index(Request $request)
    {
        $query = Post::with('user:id,name');

        if ($request->has('status') && in_array($request->status, ['draft', 'published'])) {
            $query->where('status', $request->status);
        }

        $posts = $query->latest()->paginate($request->per_page ?? 10);

        return $this->successResponse('Posts retrieved successfully.', $posts->toArray());
    }

    public function trashed()
    {
        $posts = Post::onlyTrashed()->with('user:id,name')->get();
        return $this->successResponse('Trashed posts retrieved successfully.', $posts->toArray());
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'status' => 'required|in:draft,published',
            ]);
        } catch (ValidationException $e) {
            return $this->errorResponse('Validation Error', $e->errors(), 422);
        }

        $slug = Str::slug($request->title);
        $originalSlug = $slug;
        $count = 1;

        while (Post::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        $post = new Post($request->all());
        $post->user_id = auth()->id();
        $post->slug = $slug;
        $post->published_at = ($request->status == 'published') ? now() : null;
        $post->save();

        return $this->successResponse('Post created successfully.', $post->toArray(), 201);
    }

    public function show($id)
    {
        try {
            $post = Post::with('user:id,name')->findOrFail($id);
            return $this->successResponse('Post retrieved successfully.', $post->toArray());
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Post not found.', [], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $post = Post::findOrFail($id);
            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'status' => 'required|in:draft,published',
            ]);

            $slug = Str::slug($request->title);
            $originalSlug = $slug;
            $count = 1;

            while (Post::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                $slug = $originalSlug . '-' . $count++;
            }

            $post->fill($request->all());
            $post->slug = $slug;
            $post->published_at = ($request->status == 'published') ? now() : null;
            $post->save();

            return $this->successResponse('Post updated successfully.', $post->toArray());
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Post not found.', [], 404);
        } catch (ValidationException $e) {
            return $this->errorResponse('Validation Error', $e->errors(), 422);
        }
    }

    public function destroy($id)
    {
        try {
            $post = Post::findOrFail($id);
            $post->delete();
            return $this->successResponse('Post moved to trash successfully.', []);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Post not found.', [], 404);
        }
    }

    public function restore($id)
    {
        try {
            $post = Post::onlyTrashed()->findOrFail($id);
            $post->restore();
            return $this->successResponse('Post restored successfully.', []);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Post not found in trash.', [], 404);
        }
    }

    public function forceDelete($id)
    {
        try {
            $post = Post::onlyTrashed()->findOrFail($id);
            $post->forceDelete();
            return $this->successResponse('Post permanently deleted.', []);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Post not found in trash.', [], 404);
        }
    }
}
