<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Traits\ApiResponserTrait;

class PostController extends Controller
{
    use ApiResponserTrait;

    public function index(Request $request)
    {
        $query = Post::query();

        if ($request->has('status') && in_array($request->status, ['draft', 'published'])) {
            $query->where('status', $request->status);
        } else {
            $query->where('status', 'published');
        }

        $query->whereNotNull('published_at');

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $posts = $query->latest('published_at')->paginate($request->per_page ?? 10);

        return $this->successResponse('Posts retrieved successfully.', $posts->toArray());
    }

    public function show($slug)
    {
        try {
            $post = Post::with('user:id,name')
                ->where('slug', $slug)
                ->where('status', 'published')
                ->whereNotNull('published_at')
                ->firstOrFail();

            return $this->successResponse('Post retrieved successfully.', $post->toArray());
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Post not found.', [], 404);
        }
    }
}
