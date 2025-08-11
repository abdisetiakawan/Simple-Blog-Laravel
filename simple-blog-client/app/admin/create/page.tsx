"use client"

import type React from "react"
import WYSIWYGEditor from "@/components/wysiwyg-editor"
import ConfirmModal from "@/components/confirm-modal"
import ToastAlert from "@/components/toast-alert"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import PreviewModal from "@/components/preview-modal"

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const { toast, showToast, hideToast } = useToast()
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmModal(true)
  }
  const handlePreview = () => {
    if (!title.trim() && !content.trim()) {
      showToast("Preview Error", "Please add some title or content to preview!", "warning")
      return
    }
    setShowPreviewModal(true)
  }
  const confirmCreate = async () => {
    setLoading(true)
    setError("")
    setShowConfirmModal(false)

    try {
      const token = localStorage.getItem("blog_token")
      if (!token) {
        router.push("/admin")
        return
      }

      const response = await fetch("http://localhost:8000/api/admin/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, status }),
      })

      const data = await response.json()

      if (data.success) {
        showToast("Success", `Post "${title}" created successfully!`, "success")
        setTimeout(() => {
          router.push("/admin")
        }, 2000)
      } else {
        setError(data.message || "Failed to create post")
        showToast("Error", data.message || "Failed to create post", "error")
      }
    } catch {
      const errorMsg = "Network error occurred"
      setError(errorMsg)
      showToast("Error", errorMsg, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-300">
      {/* Header */}
      <header className="bg-black border-b-4 border-black p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-black text-white transform -rotate-1">CREATE CHAOS</h1>
          <Link href="/admin">
            <Button className="bg-red-500 hover:bg-red-600 text-white font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <ArrowLeft className="w-5 h-5 mr-2" />
              BACK
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {error && (
          <Card className="bg-red-500 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 transform rotate-1">
            <div className="p-4">
              <p className="text-white font-black text-lg">{error.toUpperCase()}</p>
            </div>
          </Card>
        )}

        <Card className="bg-yellow-200 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-black font-black text-xl mb-3 transform rotate-1">POST TITLE</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ENTER YOUR BRUTAL TITLE..."
                className="bg-white border-4 border-black text-black font-bold placeholder:text-gray-600 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                required
              />
            </div>

            <div>
              <label className="block text-black font-black text-xl mb-3 transform -rotate-1">CONTENT</label>
              <WYSIWYGEditor content={content} onChange={setContent} placeholder="WRITE YOUR CHAOTIC CONTENT HERE..." />
            </div>

            <div>
              <label className="block text-black font-black text-xl mb-3 transform rotate-1">STATUS</label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => setStatus("draft")}
                  className={`font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                    status === "draft" ? "bg-orange-400 text-black" : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  DRAFT
                </Button>
                <Button
                  type="button"
                  onClick={() => setStatus("published")}
                  className={`font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                    status === "published" ? "bg-green-400 text-black" : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  PUBLISHED
                </Button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-lime-400 hover:bg-lime-500 text-black font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-8 py-4 text-xl transform rotate-1 transition-transform hover:translate-x-2 hover:translate-y-2 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <Save className="w-5 h-5 mr-2" />
                {loading ? "CREATING..." : "CREATE POST"}
              </Button>

             <Button
                type="button"
                onClick={handlePreview}
                className="bg-cyan-400 hover:bg-cyan-500 text-black font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-8 py-4 text-xl transform -rotate-1 transition-transform hover:translate-x-2 hover:translate-y-2 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <Eye className="w-5 h-5 mr-2" />
                PREVIEW
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmCreate}
        title="Create Post?"
        message={`Are you sure you want to create "${title}" as ${status}?`}
        type="create"
        loading={loading}
      />
      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title={title}
        content={content}
        status={status}
        author={"Admin User"}
      />

      {/* Toast Alert */}
      <ToastAlert
        isOpen={toast.isOpen}
        onClose={hideToast}
        title={toast.title}
        message={toast.message}
        type={toast.type}
      />
    </div>
  )
}
