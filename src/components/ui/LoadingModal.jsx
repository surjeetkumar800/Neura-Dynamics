// app/components/ui/LoadingModal.jsx
"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function LoadingModal({
  open,
  title = "Validating your details",
  description = "Please wait, do not refresh this page",
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center space-y-4 animate-in fade-in zoom-in">
        <Loader2 className="h-10 w-10 mx-auto animate-spin text-primary" />

        <h2 className="text-lg font-semibold text-gray-900">
          {title}
        </h2>

        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>,
    document.body
  );
}
