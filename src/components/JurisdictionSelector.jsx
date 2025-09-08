import React from 'react';
import { ChevronDown } from 'lucide-react';

const JurisdictionSelector = ({ 
  value, 
  onChange, 
  variant = 'dropdown',
  className = '' 
}) => {
  const jurisdictions = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Other'
  ];

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 pr-10 bg-surface border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
        >
          <option value="">Select Jurisdiction</option>
          {jurisdictions.map((jurisdiction) => (
            <option key={jurisdiction} value={jurisdiction}>
              {jurisdiction}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none" />
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      {jurisdictions.map((jurisdiction) => (
        <button
          key={jurisdiction}
          onClick={() => onChange(jurisdiction)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            value === jurisdiction
              ? 'bg-primary text-white'
              : 'bg-surface text-text-primary border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {jurisdiction}
        </button>
      ))}
    </div>
  );
};

export default JurisdictionSelector;