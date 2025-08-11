import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, LogOut } from "lucide-react";

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-black border-b-4 border-black p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-4xl font-black text-white transform rotate-1">
          ADMIN CHAOS
        </h1>
        <div className="flex gap-4">
          <Link href="/">
            <Button className="bg-cyan-400 hover:bg-cyan-500 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Eye className="w-5 h-5 mr-2" />
              VIEW BLOG
            </Button>
          </Link>
          <Button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <LogOut className="w-5 h-5 mr-2" />
            LOGOUT
          </Button>
        </div>
      </div>
    </header>
  );
}
