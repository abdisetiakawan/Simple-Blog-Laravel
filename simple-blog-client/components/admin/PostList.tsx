import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Trash2, RotateCcw, X, AlertTriangle } from "lucide-react";

interface AdminPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user?: {
    id: number;
    name: string;
  };
}

interface PostListProps {
  posts: AdminPost[];
  loading: boolean;
  activeTab: "all" | "trash";
  handleDeletePost: (id: number, title: string) => void;
  handleRestorePost: (id: number, title: string) => void;
  handleForceDeletePost: (id: number, title: string) => void;
}

export default function PostList({
  posts,
  loading,
  activeTab,
  handleDeletePost,
  handleRestorePost,
  handleForceDeletePost,
}: PostListProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="bg-black text-white font-black text-2xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,0,255,1)] inline-block transform rotate-2">
          LOADING...
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-500 text-white font-black text-3xl p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] inline-block transform -rotate-2">
          {activeTab === "all" ? "NO POSTS YET!" : "TRASH IS EMPTY!"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <Card
          key={post.id}
          className={`border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform ${
            index % 2 === 0 ? "rotate-1 bg-pink-200" : "-rotate-1 bg-blue-200"
          }`}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-black text-black mb-2">
                  {post.title?.toUpperCase() || "UNTITLED"}
                </h3>
                <div className="flex gap-2 mb-2">
                  <Badge
                    className={`font-black border-2 border-black ${
                      post.status === "published"
                        ? "bg-green-400 text-black"
                        : "bg-orange-400 text-black"
                    }`}
                  >
                    {post.status?.toUpperCase() || "UNKNOWN"}
                  </Badge>
                  {post.deleted_at && (
                    <Badge className="bg-red-500 text-white font-black border-2 border-black">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      TRASHED
                    </Badge>
                  )}
                </div>
                <p className="text-black font-bold mb-2">
                  {post.content
                    ? post.content.substring(0, 200) + "..."
                    : "No content"}
                </p>
                <p className="text-sm font-bold text-gray-700">
                  Created:{" "}
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString()
                    : "Unknown"}
                  {post.published_at &&
                    ` | Published: ${new Date(
                      post.published_at
                    ).toLocaleDateString()}`}
                </p>
              </div>

              <div className="flex gap-2 ml-4">
                {activeTab === "all" ? (
                  <>
                    <Link href={`/admin/edit/${post.id}`}>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-black border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      onClick={() =>
                        handleDeletePost(post.id, post.title || "Untitled")
                      }
                      className="bg-red-500 hover:bg-red-600 text-white font-black border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() =>
                        handleRestorePost(post.id, post.title || "Untitled")
                      }
                      className="bg-green-500 hover:bg-green-600 text-white font-black border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() =>
                        handleForceDeletePost(post.id, post.title || "Untitled")
                      }
                      className="bg-black hover:bg-gray-800 text-white font-black border-4 border-red-500 shadow-[3px_3px_0px_0px_rgba(255,0,0,1)]"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
