import React from 'react';

const FrameButton = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-600 shadow-lg hover:shadow-xl',
    secondary: 'bg-surface text-text-primary border border-gray-200 hover:bg-gray-50 shadow-md hover:shadow-lg',
    accent: 'bg-accent text-white hover:bg-green-600 shadow-lg hover:shadow-xl',
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed transform-none hover:scale-100';

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${disabled ? disabledClasses : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export { FrameButton };
export default FrameButton;
