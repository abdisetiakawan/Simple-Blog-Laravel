"use client"

import { useState, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Link from "next/link"

interface PostWithUser {
  id: number
  title: string
  slug: string
  content: string
  thumbnail: string
  published_at: string
  user: {
    id: number
    name: string
  }
}

export default function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [post, setPost] = useState<PostWithUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchPost()
  }, [slug])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:8000/api/posts/${slug}`)
      const data = await response.json()

      if (data.success) {
        setPost(data.data)
      } else {
        setError(data.message || "Post not found")
      }
    } catch (error) {
      setError("Failed to load post")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-300 flex items-center justify-center">
        <div className="bg-black text-white font-black text-3xl p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(255,0,255,1)] transform rotate-2">
          LOADING POST...
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-red-300 flex items-center justify-center">
        <div className="bg-black text-white font-black text-3xl p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(255,0,0,1)] transform -rotate-2">
          POST NOT FOUND!
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pink-300">
      {/* Header */}
      <header className="bg-black border-b-4 border-black p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-black text-white transform rotate-1">BRUTAL READ</h1>
          <Link href="/">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <ArrowLeft className="w-5 h-5 mr-2" />
              BACK TO BLOG
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
          <div className="p-8">
            {/* Featured Image */}
            <img
              src={post.thumbnail || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-64 object-cover border-4 border-black mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            />

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight transform rotate-1">
              {post.title.toUpperCase()}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b-4 border-black">
              <div className="flex items-center bg-lime-400 px-4 py-2 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                <User className="w-5 h-5 mr-2" />
                <span className="font-black text-black">{post.user.name.toUpperCase()}</span>
              </div>
              <div className="flex items-center bg-cyan-400 px-4 py-2 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="font-black text-black">
                  {new Date(post.published_at).toLocaleDateString().toUpperCase()}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="brutal-content text-black font-bold text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button className="bg-red-500 hover:bg-red-600 text-white font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-8 py-4 text-xl transform rotate-2 transition-transform hover:translate-x-2 hover:translate-y-2 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <ArrowLeft className="w-5 h-5 mr-2" />
              BACK TO CHAOS
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}