"use client";

import { useState, useCallback } from "react";

interface ToastState {
  isOpen: boolean;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const showToast = useCallback(
    (
      title: string,
      message: string,
      type: "success" | "error" | "warning" | "info" = "info"
    ) => {
      setToast({
        isOpen: true,
        title,
        message,
        type,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
}
