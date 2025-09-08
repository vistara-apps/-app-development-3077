import React from 'react';
import { ChevronDown } from 'lucide-react';

interface JurisdictionSelectorProps {
  value: string;
  onChange: (value: string) => void;
  variant?: 'dropdown' | 'buttonGroup';
}

const jurisdictions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'eu', label: 'European Union' },
];

export function JurisdictionSelector({ value, onChange, variant = 'dropdown' }: JurisdictionSelectorProps) {
  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-white/20 text-white border border-white/30 rounded-lg px-4 py-2 pr-8 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent w-full"
        >
          <option value="">Select Jurisdiction</option>
          {jurisdictions.map((jurisdiction) => (
            <option key={jurisdiction.value} value={jurisdiction.value} className="text-gray-900">
              {jurisdiction.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {jurisdictions.map((jurisdiction) => (
        <button
          key={jurisdiction.value}
          onClick={() => onChange(jurisdiction.value)}
          className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
            value === jurisdiction.value
              ? 'bg-accent text-white'
              : 'bg-white/20 text-white/80 hover:bg-white/30'
          }`}
        >
          {jurisdiction.label}
        </button>
      ))}
    </div>
  );
}