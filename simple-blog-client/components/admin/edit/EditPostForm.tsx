import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Save, Eye } from "lucide-react";
import WYSIWYGEditor from "@/components/wysiwyg-editor";

interface EditPostFormProps {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  status: "draft" | "published";
  setStatus: (status: "draft" | "published") => void;
  handleSubmit: (e: React.FormEvent) => void;
  handlePreview: () => void;
  loading: boolean;
}

export default function EditPostForm({
  title,
  setTitle,
  content,
  setContent,
  status,
  setStatus,
  handleSubmit,
  handlePreview,
  loading,
}: EditPostFormProps) {
  return (
    <Card className="bg-yellow-200 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div>
          <label className="block text-black font-black text-xl mb-3 transform rotate-1">
            POST TITLE
          </label>
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
          <label className="block text-black font-black text-xl mb-3 transform -rotate-1">
            CONTENT
          </label>
          <WYSIWYGEditor
            content={content}
            onChange={setContent}
            placeholder="WRITE YOUR CHAOTIC CONTENT HERE..."
          />
        </div>

        <div>
          <label className="block text-black font-black text-xl mb-3 transform rotate-1">
            STATUS
          </label>
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={() => setStatus("draft")}
              className={`font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                status === "draft"
                  ? "bg-orange-400 text-black"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              DRAFT
            </Button>
            <Button
              type="button"
              onClick={() => setStatus("published")}
              className={`font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                status === "published"
                  ? "bg-green-400 text-black"
                  : "bg-white text-black hover:bg-gray-100"
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
            {loading ? "UPDATING..." : "UPDATE POST"}
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
  );
}
