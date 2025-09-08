import React from 'react';

const TextInput = ({ 
  value, 
  onChange, 
  placeholder,
  variant = 'default',
  className = '',
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200';
  
  const variants = {
    default: 'bg-surface text-text-primary placeholder-text-secondary',
    multiline: 'bg-surface text-text-primary placeholder-text-secondary resize-vertical min-h-24',
  };

  const Component = variant === 'multiline' ? 'textarea' : 'input';

  return (
    <Component
      type={variant === 'multiline' ? undefined : 'text'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export { TextInput };
export default TextInput;
