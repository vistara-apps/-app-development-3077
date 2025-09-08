import React from 'react';
import { cn } from '../utils/cn';

interface FrameButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function FrameButton({ 
  variant = 'primary', 
  children, 
  onClick, 
  disabled = false,
  className 
}: FrameButtonProps) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl",
    secondary: "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}