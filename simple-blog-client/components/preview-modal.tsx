"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Calendar, User, Eye } from "lucide-react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  status: "draft" | "published";
  author?: string;
}

export default function PreviewModal({
  isOpen,
  onClose,
  title,
  content,
  status,
  author = "Admin User",
}: PreviewModalProps) {
  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-pink-300 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-black border-b-4 border-black p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-400 p-2 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform rotate-2">
              <Eye className="w-6 h-6 text-black" />
            </div>
            <h2 className="text-2xl font-black text-white transform rotate-1">
              PREVIEW MODE
            </h2>
          </div>
          <Button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-2 transform -rotate-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          <Card className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            <div className="p-8">
              {/* Featured Image Placeholder */}
              <div className="w-full h-64 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 border-4 border-black mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <div className="bg-black text-white font-black text-xl p-4 border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transform -rotate-2">
                  FEATURED IMAGE
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <Badge
                  className={`font-black border-4 border-black text-lg px-4 py-2 transform rotate-2 ${
                    status === "published"
                      ? "bg-green-400 text-black shadow-[4px_4px_0px_0px_rgba(0,255,0,1)]"
                      : "bg-orange-400 text-black shadow-[4px_4px_0px_0px_rgba(255,165,0,1)]"
                  }`}
                >
                  {status === "published" ? "🚀 LIVE POST" : "📝 DRAFT MODE"}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight transform -rotate-1">
                {title ? title.toUpperCase() : "YOUR BRUTAL TITLE HERE"}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b-4 border-black">
                <div className="flex items-center bg-lime-400 px-4 py-2 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                  <User className="w-5 h-5 mr-2" />
                  <span className="font-black text-black">
                    {author.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center bg-cyan-400 px-4 py-2 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-black text-black">
                    {currentDate.toUpperCase()}
                  </span>
                </div>
                {status === "draft" && (
                  <div className="flex items-center bg-yellow-400 px-4 py-2 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform rotate-2">
                    <span className="font-black text-black">
                      ⚠️ PREVIEW ONLY
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {content ? (
                  <div
                    className="brutal-content text-black font-bold text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-300 border-4 border-black p-8 transform rotate-2 inline-block">
                      <p className="font-black text-black text-xl">
                        NO CONTENT YET!
                      </p>
                      <p className="font-bold text-gray-700 mt-2">
                        Start writing your brutal content...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Preview Notice */}
              <div className="mt-8 pt-6 border-t-4 border-black">
                <div className="bg-black text-white p-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,0,1)] transform -rotate-1">
                  <p className="font-black text-center">
                    🔥 THIS IS A PREVIEW -{" "}
                    {status === "published"
                      ? "READY TO GO LIVE!"
                      : "SAVE AS PUBLISHED TO MAKE IT LIVE!"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="bg-black border-t-4 border-black p-4">
          <div className="flex justify-center gap-4">
            <Button
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-3 transform rotate-1 transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              CLOSE PREVIEW
            </Button>
            <Button
              onClick={onClose}
              className="bg-lime-400 hover:bg-lime-500 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-3 transform -rotate-1 transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              BACK TO EDIT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
