<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::first();

        for ($i = 1; $i <= 10; $i++) {
            $title = "Postingan Ke-" . $i;
            $status = ($i <= 5) ? 'published' : 'draft';

            Post::create([
                'user_id' => $admin->id,
                'title' => $title,
                'slug' => Str::slug($title),
                'content' => 'Ini adalah konten dari ' . $title,
                'thumbnail' => 'https://placehold.co/150?text=' . urlencode($title) . '&font=roboto',
                'status' => $status,
                'published_at' => ($status === 'published') ? now() : null,
            ]);
        }
    }
}
