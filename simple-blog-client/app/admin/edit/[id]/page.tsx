"use client";

import type React from "react";
import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/confirm-modal";
import ToastAlert from "@/components/toast-alert";
import { useToast } from "@/hooks/use-toast";
import PreviewModal from "@/components/preview-modal";
import PostInfo from "@/components/admin/edit/PostInfo";
import EditPostForm from "@/components/admin/edit/EditPostForm";

interface AdminPost {
  id: number;
  user_id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
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

export default function EditPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [post, setPost] = useState<AdminPost | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "save" | "delete";
    loading: boolean;
  }>({
    isOpen: false,
    type: "save",
    loading: false,
  });
  const { toast, showToast, hideToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("blog_token");
        if (!token) {
          router.push("/admin");
          return;
        }

        const response = await fetch(
          `http://localhost:8000/api/admin/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          const postData = data.data?.data || data.data;
          setPost(postData);
          setTitle(postData.title || "");
          setContent(postData.content || "");
          setStatus(postData.status || "draft");
        } else {
          setError(data.message || "Failed to load post");
          showToast("Error", data.message || "Failed to load post", "error");
        }
      } catch {
        const errorMsg = "Network error occurred";
        setError(errorMsg);
        showToast("Error", errorMsg, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, router, showToast]);

  const handlePreview = () => {
    if (!title.trim() && !content.trim()) {
      showToast(
        "Preview Error",
        "Please add some title or content to preview!",
        "warning"
      );
      return;
    }
    setShowPreviewModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmModal({ isOpen: true, type: "save", loading: false });
  };

  const handleDelete = () => {
    setConfirmModal({ isOpen: true, type: "delete", loading: false });
  };

  const confirmAction = async () => {
    setConfirmModal((prev) => ({ ...prev, loading: true }));
    const token = localStorage.getItem("blog_token");
    if (!token) {
      router.push("/admin");
      return;
    }

    try {
      let response;
      if (confirmModal.type === "save") {
        response = await fetch(`http://localhost:8000/api/admin/posts/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content, status }),
        });
      } else {
        response = await fetch(`http://localhost:8000/api/admin/posts/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      if (response.ok) {
        const successMessage =
          confirmModal.type === "save"
            ? `Post "${title}" updated successfully!`
            : `Post "${title}" moved to trash!`;
        showToast("Success", successMessage, "success");
        setTimeout(() => router.push("/admin"), 2000);
      } else {
        const data = await response.json();
        throw new Error(data.message || "Operation failed");
      }
    } catch (err: unknown) {
      const message = (err as Error).message;
      setError(message);
      showToast("Error", message, "error");
    } finally {
      setConfirmModal({ isOpen: false, type: "save", loading: false });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-300 flex items-center justify-center">
        <div className="bg-black text-white font-black text-3xl p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(255,165,0,1)] transform rotate-2">
          LOADING POST...
        </div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="min-h-screen bg-red-300 flex items-center justify-center">
        <div className="bg-black text-white font-black text-3xl p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(255,0,0,1)] transform -rotate-2">
          {error.toUpperCase()}
        </div>
      </div>
    );
  }

  const modalConfig =
    confirmModal.type === "save"
      ? {
          title: "Update Post?",
          message: `Are you sure you want to update "${title}" as ${status}?`,
        }
      : {
          title: "Move to Trash?",
          message: `Are you sure you want to move "${title}" to trash? You can restore it later.`,
        };

  return (
    <div className="min-h-screen bg-orange-300">
      <header className="bg-black border-b-4 border-black p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-black text-white transform rotate-1">
            EDIT CHAOS
          </h1>
          <Link href="/admin">
            <Button className="bg-red-500 hover:bg-red-600 text-white font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <ArrowLeft className="w-5 h-5 mr-2" />
              BACK
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {post && <PostInfo post={post} onDelete={handleDelete} error={error} />}
        <EditPostForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          status={status}
          setStatus={setStatus}
          handleSubmit={handleSubmit}
          handlePreview={handlePreview}
          loading={confirmModal.loading}
        />
      </main>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmAction}
        title={modalConfig.title}
        message={modalConfig.message}
        type={confirmModal.type}
        loading={confirmModal.loading}
      />

      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title={title}
        content={content}
        status={status}
        author={post?.user?.name || "Admin User"}
      />

      <ToastAlert
        isOpen={toast.isOpen}
        onClose={hideToast}
        title={toast.title}
        message={toast.message}
        type={toast.type}
      />
    </div>
  );
}
