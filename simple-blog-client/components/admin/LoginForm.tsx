import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface LoginFormProps {
  onLogin: (token: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const token = data.data?.token || data.token;
        onLogin(token);
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-400 flex items-center justify-center p-6">
      <Card className="bg-yellow-300 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 max-w-md w-full">
        <div className="p-8">
          <h1 className="text-4xl font-black text-black mb-8 text-center transform rotate-1">
            ADMIN LOGIN
          </h1>

          {error && (
            <div className="bg-red-500 text-white font-black p-4 border-4 border-black mb-6 transform rotate-1">
              {error.toUpperCase()}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-4 border-black text-black font-bold placeholder:text-gray-600 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-4 border-black text-black font-bold placeholder:text-gray-600 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-lime-400 hover:bg-lime-500 text-black font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-xl py-6 transform rotate-1 transition-transform hover:translate-x-2 hover:translate-y-2 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              {loading ? "LOGGING IN..." : "BREAK IN!"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/">
              <Button className="bg-cyan-400 hover:bg-cyan-500 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                BACK TO BLOG
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
