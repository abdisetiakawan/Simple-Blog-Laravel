"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, User, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  published_at: string;
}

interface Pagination {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export default function PublicBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (search?: string, page: number = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      params.append("page", page.toString());
      params.append("per_page", "10");

      const response = await fetch(`http://localhost:8000/api/posts?${params}`);
      const data = await response.json();

      if (data.success && data.data && Array.isArray(data.data.data)) {
        setPosts(data.data.data);
        setPagination({
          current_page: data.data.current_page,
          last_page: data.data.last_page,
          total: data.data.total,
          per_page: data.data.per_page,
          next_page_url: data.data.next_page_url,
          prev_page_url: data.data.prev_page_url,
        });
      } else {
        setPosts([]);
        setPagination(null);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts(searchTerm);
  };

  const handlePageChange = (page: number) => {
    fetchPosts(searchTerm, page);
  };

  return (
    <div className="min-h-screen bg-yellow-300">
      {/* Header */}
      <header className="bg-black border-b-4 border-black p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-black text-white transform -rotate-1">
            BRUTAL BLOG
          </h1>
          <Link href="/admin">
            <Button className="bg-hot-pink-500 hover:bg-hot-pink-600 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1 transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <User className="w-5 h-5 mr-2" />
              ADMIN
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Search */}
        <Card className="bg-lime-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 transform -rotate-1">
          <form onSubmit={handleSearch} className="p-6">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="SEARCH POSTS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border-4 border-black text-black font-bold placeholder:text-gray-600 text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
              <Button
                type="submit"
                className="bg-cyan-400 hover:bg-cyan-500 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-8 transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <Search className="w-5 h-5 mr-2" />
                FIND IT!
              </Button>
            </div>
          </form>
        </Card>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="bg-black text-white font-black text-2xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,0,255,1)] inline-block transform rotate-2">
              LOADING POSTS...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card
                key={post.id}
                className={`border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform ${
                  index % 3 === 0
                    ? "rotate-1 bg-pink-400"
                    : index % 3 === 1
                      ? "-rotate-1 bg-blue-400"
                      : "rotate-2 bg-green-400"
                } hover:translate-x-2 hover:translate-y-2 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer`}
              >
                <div className="p-6">
                  <img
                    src={post.thumbnail || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover border-4 border-black mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                  <h2 className="text-2xl font-black text-black mb-3 leading-tight">
                    {post.title.toUpperCase()}
                  </h2>
                  <p className="text-black font-bold mb-4 line-clamp-3">
                    {post.content.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-black font-bold">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(post.published_at).toLocaleDateString()}
                    </div>
                    <Link href={`/post/${post.slug}`}>
                      <Button className="bg-black text-white font-black border-4 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-gray-800 transition-transform hover:translate-x-1 hover:translate-y-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        READ
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-red-500 text-white font-black text-3xl p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] inline-block transform -rotate-2">
              NO POSTS FOUND!
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {pagination && pagination.last_page > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={!pagination.prev_page_url || loading}
              className="bg-white hover:bg-gray-100 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              PREVIOUS
            </Button>
            <span className="text-black font-black text-lg">
              PAGE {pagination.current_page} OF {pagination.last_page}
            </span>
            <Button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={!pagination.next_page_url || loading}
              className="bg-white hover:bg-gray-100 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              NEXT
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-black mt-16 p-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white font-black text-xl transform rotate-1">
            BRUTAL BLOG © 2024 - MADE WITH CHAOS & CODE
          </p>
        </div>
      </footer>
    </div>
  );
}
