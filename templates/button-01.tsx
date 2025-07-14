"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Button_01Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onConfirm?: () => void;
  confirmText?: string;
  slideText?: string;
  icon?: React.ReactNode;
  variant?: "delete" | "confirm" | "warning";
}

export default function Button_01({ 
  className, 
  onConfirm,
  confirmText = "Deleted",
  slideText = "Slide to Delete",
  icon,
  variant = "delete",
  ...props 
}: Button_01Props) {
  const [confirmed, setConfirmed] = useState(false);

  const variantStyles = {
    delete: {
      slider: "bg-red-500 text-white",
      button: "text-red-600 bg-red-100 hover:bg-red-200"
    },
    confirm: {
      slider: "bg-green-500 text-white", 
      button: "text-green-600 bg-green-100 hover:bg-green-200"
    },
    warning: {
      slider: "bg-yellow-500 text-white",
      button: "text-yellow-600 bg-yellow-100 hover:bg-yellow-200"
    }
  };

  const handleDragEnd = (_, info) => {
    if (info.point.x > 120) {
      setConfirmed(true);
      onConfirm?.();
    }
  };

  return (
    <div className="relative w-[180px] h-11">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 140 }}
        onDragEnd={handleDragEnd}
        className={cn(
          "absolute top-0 left-0 h-full w-[40px]",
          "flex items-center justify-center",
          "rounded-xl cursor-pointer z-10 transition-colors",
          variantStyles[variant].slider
        )}
        whileDrag={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {icon || <Trash2 className="w-4 h-4" />}
      </motion.div>
      <Button
        disabled={confirmed}
        className={cn(
          "w-full h-full rounded-xl pl-[48px] font-medium transition-all",
          variantStyles[variant].button,
          confirmed && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {confirmed ? confirmText : slideText}
      </Button>
    </div>
  );
}

export { Button_01 };