import React from 'react';

const InfoCard = ({ 
  children, 
  variant = 'default',
  title,
  className = '',
  ...props 
}) => {
  const baseClasses = 'p-6 rounded-lg shadow-card transition-all duration-200 ease-in-out';
  
  const variants = {
    default: 'glass-card text-white',
    actionable: 'bg-surface border border-gray-200 hover:shadow-lg hover:border-accent',
  };

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default InfoCard;