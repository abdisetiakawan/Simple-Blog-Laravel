"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, AlertTriangle, Trash2, RotateCcw, Save, Plus } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type: "delete" | "restore" | "save" | "create" | "force-delete";
  loading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type,
  loading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const getTypeConfig = () => {
    switch (type) {
      case "delete":
        return {
          icon: <Trash2 className="w-8 h-8" />,
          bgColor: "bg-red-400",
          confirmBg: "bg-red-500 hover:bg-red-600",
          confirmText: "DELETE IT!",
        };
      case "force-delete":
        return {
          icon: <AlertTriangle className="w-8 h-8" />,
          bgColor: "bg-red-800",
          confirmBg: "bg-red-600 hover:bg-red-700",
          confirmText: "DESTROY FOREVER!",
          textColor: "text-white",
        };
      case "restore":
        return {
          icon: <RotateCcw className="w-8 h-8" />,
          bgColor: "bg-green-400",
          confirmBg: "bg-green-500 hover:bg-green-600",
          confirmText: "RESTORE IT!",
        };
      case "save":
        return {
          icon: <Save className="w-8 h-8" />,
          bgColor: "bg-blue-400",
          confirmBg: "bg-blue-500 hover:bg-blue-600",
          confirmText: "SAVE IT!",
        };
      case "create":
        return {
          icon: <Plus className="w-8 h-8" />,
          bgColor: "bg-lime-400",
          confirmBg: "bg-lime-500 hover:bg-lime-600",
          confirmText: "CREATE IT!",
        };
      default:
        return {
          icon: <AlertTriangle className="w-8 h-8" />,
          bgColor: "bg-yellow-400",
          confirmBg: "bg-yellow-500 hover:bg-yellow-600",
          confirmText: "CONFIRM!",
        };
    }
  };

  const config = getTypeConfig();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <Card
        className={`relative ${config.bgColor} border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform ${
          type === "force-delete" ? "rotate-2" : "-rotate-1"
        } max-w-md w-full animate-in zoom-in-95 duration-200`}
      >
        <div className="p-8">
          {/* Close Button */}
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-2"
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className={`p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                type === "force-delete"
                  ? "bg-red-600 text-white"
                  : "bg-white text-black"
              } transform rotate-3`}
            >
              {config.icon}
            </div>
          </div>

          {/* Title */}
          <h2 className={`text-3xl font-black ${config.textColor} text-center mb-4 transform -rotate-1`}>
            {title.toUpperCase()}
          </h2>

          {/* Message */}
          <p className={`text-lg font-bold ${config.textColor} text-center mb-8 leading-tight`}>
            {message}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={onClose}
              disabled={loading}
              className="bg-gray-400 hover:bg-gray-500 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-3 transform rotate-1 transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              CANCEL
            </Button>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className={`${config.confirmBg} text-white font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-3 transform -rotate-1 transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
            >
              {loading ? "PROCESSING..." : config.confirmText}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
