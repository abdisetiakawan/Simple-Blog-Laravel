import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface ControlsProps {
  activeTab: "all" | "trash";
  setActiveTab: (tab: "all" | "trash") => void;
  statusFilter: "all" | "draft" | "published";
  setStatusFilter: (filter: "all" | "draft" | "published") => void;
  fetchPosts: () => void;
  fetchTrashedPosts: () => void;
}

export default function Controls({
  activeTab,
  setActiveTab,
  statusFilter,
  setStatusFilter,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Link href="/admin/create">
        <Button className="bg-lime-400 hover:bg-lime-500 text-black font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 transition-transform hover:translate-x-2 hover:translate-y-2 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <Plus className="w-5 h-5 mr-2" />
          CREATE POST
        </Button>
      </Link>

      <div className="flex gap-2">
        <Button
          onClick={() => setActiveTab("all")}
          className={`font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
            activeTab === "all"
              ? "bg-yellow-400 text-black"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          ALL POSTS
        </Button>
        <Button
          onClick={() => setActiveTab("trash")}
          className={`font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
            activeTab === "trash"
              ? "bg-red-400 text-black"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          TRASH
        </Button>
      </div>

      {activeTab === "all" && (
        <div className="flex gap-2">
          <Button
            onClick={() => setStatusFilter("all")}
            className={`font-black border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
              statusFilter === "all" ? "bg-blue-400" : "bg-white"
            } text-black`}
          >
            ALL
          </Button>
          <Button
            onClick={() => setStatusFilter("published")}
            className={`font-black border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
              statusFilter === "published" ? "bg-green-400" : "bg-white"
            } text-black`}
          >
            PUBLISHED
          </Button>
          <Button
            onClick={() => setStatusFilter("draft")}
            className={`font-black border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
              statusFilter === "draft" ? "bg-orange-400" : "bg-white"
            } text-black`}
          >
            DRAFTS
          </Button>
        </div>
      )}
    </div>
  );
}
