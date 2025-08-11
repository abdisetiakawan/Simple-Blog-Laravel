"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

interface ToastAlertProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

export default function ToastAlert({
  isOpen,
  onClose,
  title,
  message,
  type,
  duration = 5000,
}: ToastAlertProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const getTypeConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          bgColor: "bg-green-400",
          textColor: "text-black",
          borderColor: "border-black",
          shadowColor: "rgba(0,255,0,1)",
        };
      case "error":
        return {
          icon: <XCircle className="w-6 h-6" />,
          bgColor: "bg-red-400",
          textColor: "text-black",
          borderColor: "border-black",
          shadowColor: "rgba(255,0,0,1)",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-6 h-6" />,
          bgColor: "bg-yellow-400",
          textColor: "text-black",
          borderColor: "border-black",
          shadowColor: "rgba(255,255,0,1)",
        };
      case "info":
        return {
          icon: <Info className="w-6 h-6" />,
          bgColor: "bg-cyan-400",
          textColor: "text-black",
          borderColor: "border-black",
          shadowColor: "rgba(0,255,255,1)",
        };
      default:
        return {
          icon: <Info className="w-6 h-6" />,
          bgColor: "bg-gray-400",
          textColor: "text-black",
          borderColor: "border-black",
          shadowColor: "rgba(128,128,128,1)",
        };
    }
  };

  if (!isOpen) return null;

  const config = getTypeConfig();

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card
        className={`${config.bgColor} ${config.borderColor} border-4 shadow-[6px_6px_0px_0px_${config.shadowColor}] transform ${
          type === "error" ? "rotate-2" : "-rotate-1"
        } max-w-sm transition-all duration-300 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="p-6">
          {/* Close Button */}
          <Button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-1"
          >
            <X className="w-3 h-3" />
          </Button>

          {/* Content */}
          <div className="flex items-start gap-3">
            <div className={`${config.textColor} mt-1`}>{config.icon}</div>
            <div className="flex-1">
              <h3 className={`font-black text-lg ${config.textColor} mb-1`}>
                {title.toUpperCase()}
              </h3>
              <p
                className={`font-bold ${config.textColor} text-sm leading-tight`}
              >
                {message}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
