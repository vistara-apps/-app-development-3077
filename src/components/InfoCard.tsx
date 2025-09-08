import React from 'react';
import { cn } from '../utils/cn';

interface InfoCardProps {
  variant?: 'default' | 'actionable';
  children: React.ReactNode;
  className?: string;
}

export function InfoCard({ variant = 'default', children, className }: InfoCardProps) {
  const baseClasses = "glass-card rounded-lg p-4 shadow-card";
  
  const variantClasses = {
    default: "bg-white/10",
    actionable: "bg-white/15 border-l-4 border-accent"
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  );
}