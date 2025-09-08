import React from 'react';
import { cn } from '../utils/cn';

interface TextInputProps {
  variant?: 'default' | 'multiline';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TextInput({ 
  variant = 'default', 
  placeholder, 
  value, 
  onChange, 
  className 
}: TextInputProps) {
  const baseClasses = "bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg px-4 py-2 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent w-full";

  if (variant === 'multiline') {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className={cn(baseClasses, "resize-none", className)}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(baseClasses, className)}
    />
  );
}