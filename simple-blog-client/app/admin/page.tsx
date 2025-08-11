"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  RotateCcw,
  X,
  Eye,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import ConfirmModal from "@/components/confirm-modal";
import ToastAlert from "@/components/toast-alert";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import Controls from "@/components/admin/Controls";
import PostList from "@/components/admin/PostList";
import LoginForm from "@/components/admin/LoginForm";

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

interface Pagination {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [trashedPosts, setTrashedPosts] = useState<AdminPost[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "trash">("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "draft" | "published"
  >("all");
  const [token, setToken] = useState<string>("");
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "delete" | "restore" | "force-delete";
    postId: number | null;
    postTitle: string;
    loading: boolean;
  }>({
    isOpen: false,
    type: "delete",
    postId: null,
    postTitle: "",
    loading: false,
  });

  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    const savedToken = localStorage.getItem("blog_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      if (activeTab === "all") {
        fetchPosts(token);
      } else {
        fetchTrashedPosts(token);
      }
    }
  }, [token, activeTab, statusFilter]);

  const fetchPosts = async (authToken: string, page: number = 1) => {
    {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      params.append("page", page.toString());

      try {
        const response = await fetch(
          `http://localhost:8000/api/admin/posts?${params}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.success) {
          setPosts(data.data.data || []);
          setPagination(data.data);
        } else {
          showToast("Error", data.message || "Failed to fetch posts", "error");
        }
      } catch (error) {
        showToast("Error", "Failed to fetch posts", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchTrashedPosts = async (authToken: string) => {
    {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8000/api/admin/posts/trashed",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.success) {
          setTrashedPosts(data.data || []);
        } else {
          showToast(
            "Error",
            data.message || "Failed to fetch trashed posts",
            "error"
          );
        }
      } catch (error) {
        showToast("Error", "Failed to fetch trashed posts", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAction = (
    type: "delete" | "restore" | "force-delete",
    postId: number,
    postTitle: string
  ) => {
    setConfirmModal({
      isOpen: true,
      type,
      postId,
      postTitle,
      loading: false,
    });
  };

  const confirmAction = async () => {
    {
      if (!confirmModal.postId) return;

      setConfirmModal((prev) => ({ ...prev, loading: true }));

      const { type, postId, postTitle } = confirmModal;
      let url = `http://localhost:8000/api/admin/posts/${postId}`;
      let method = "DELETE";
      let successMessage = "";

      switch (type) {
        case "restore":
          url += "/restore";
          method = "PATCH";
          successMessage = `Post "${postTitle}" restored successfully!`;
          break;
        case "force-delete":
          url += "/force";
          successMessage = `Post "${postTitle}" permanently deleted!`;
          break;
        default:
          successMessage = `Post "${postTitle}" moved to trash successfully!`;
      }

      try {
        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          showToast("Success", successMessage, "success");
          if (activeTab === "all") {
            fetchPosts(token);
          } else {
            fetchTrashedPosts(token);
          }
        } else {
          throw new Error("Operation failed");
        }
      } catch (error) {
        showToast("Error", "Operation failed. Please try again.", "error");
      } finally {
        setConfirmModal({
          isOpen: false,
          type: "delete",
          postId: null,
          postTitle: "",
          loading: false,
        });
      }
    }
  };

  const handlePageChange = (page: number) => {
    if (token) {
      fetchPosts(token, page);
    }
  };

  const handleLogout = () => {
    {
      localStorage.removeItem("blog_token");
      setToken("");
      showToast("Goodbye", "Successfully logged out!", "info");
    }
  };

  if (!token) {
    return (
      <LoginForm
        onLogin={(newToken) => {
          setToken(newToken);
          localStorage.setItem("blog_token", newToken);
          showToast("Welcome", "Successfully logged in!", "success");
        }}
      />
    );
  }

  const getModalConfig = () => {
    {
      const { type, postTitle } = confirmModal;
      switch (type) {
        case "delete":
          return {
            title: "Move to Trash?",
            message: `Are you sure you want to move "${postTitle}" to trash? You can restore it later.`,
          };
        case "restore":
          return {
            title: "Restore Post?",
            message: `Are you sure you want to restore "${postTitle}" from trash?`,
          };
        case "force-delete":
          return {
            title: "Delete Forever?",
            message: `Are you sure you want to permanently delete "${postTitle}"? This action cannot be undone!`,
          };
        default:
          return { title: "", message: "" };
      }
    }
  };
  const modalConfig = getModalConfig();

  return (
    <div className="min-h-screen bg-purple-300">
      <AdminHeader onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto p-6">
        <Controls
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          fetchPosts={() => fetchPosts(token)}
          fetchTrashedPosts={() => fetchTrashedPosts(token)}
        />
        <PostList
          posts={activeTab === "all" ? posts : trashedPosts}
          loading={loading}
          activeTab={activeTab}
          handleDeletePost={(id, title) => handleAction("delete", id, title)}
          handleRestorePost={(id, title) => handleAction("restore", id, title)}
          handleForceDeletePost={(id, title) =>
            handleAction("force-delete", id, title)
          }
        />

        {activeTab === "all" && pagination && pagination.last_page > 1 && (
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
      </main>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() =>
          setConfirmModal({ ...confirmModal, isOpen: false, loading: false })
        }
        onConfirm={confirmAction}
        title={modalConfig.title}
        message={modalConfig.message}
        type={confirmModal.type}
        loading={confirmModal.loading}
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
