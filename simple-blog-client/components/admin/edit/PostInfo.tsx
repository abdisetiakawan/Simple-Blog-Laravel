import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";

interface AdminPost {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  deleted_at: string | null;
}

interface PostInfoProps {
  post: AdminPost;
  onDelete: () => void;
  error: string;
}

export default function PostInfo({ post, onDelete, error }: PostInfoProps) {
  return (
    <>
      <Card className="bg-cyan-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 transform rotate-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-black mb-2">POST INFO</h2>
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
              </div>
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
              <p className="text-sm font-bold text-gray-700">
                Slug: {post.slug || "No slug"}
              </p>
            </div>
            <Button
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-black border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              TRASH IT
            </Button>
          </div>
        </div>
      </Card>
      {error && (
        <Card className="bg-red-500 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 transform -rotate-1">
          <div className="p-4">
            <p className="text-white font-black text-lg">
              {error.toUpperCase()}
            </p>
          </div>
        </Card>
      )}
    </>
  );
}
