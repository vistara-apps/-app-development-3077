import React, { useState } from 'react';
import { Search, FileText, MapPin } from 'lucide-react';
import { FrameButton } from './FrameButton';
import { InfoCard } from './InfoCard';
import { JurisdictionSelector } from './JurisdictionSelector';
import { TextInput } from './TextInput';

interface LegalQueryFormProps {
  onSubmit: (query: string, jurisdiction: string, type: 'summary' | 'template' | 'steps') => void;
  loading: boolean;
}

export function LegalQueryForm({ onSubmit, loading }: LegalQueryFormProps) {
  const [query, setQuery] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [queryType, setQueryType] = useState<'summary' | 'template' | 'steps'>('summary');

  const handleSubmit = () => {
    if (!query.trim() || !jurisdiction) return;
    onSubmit(query, jurisdiction, queryType);
  };

  return (
    <InfoCard className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-semibold text-white">Legal Query</h2>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Describe your legal situation
          </label>
          <TextInput
            variant="multiline"
            placeholder="e.g., My landlord is refusing to return my security deposit..."
            value={query}
            onChange={setQuery}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Jurisdiction
          </label>
          <JurisdictionSelector
            value={jurisdiction}
            onChange={setJurisdiction}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            What do you need?
          </label>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setQueryType('summary')}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                queryType === 'summary'
                  ? 'bg-accent text-white'
                  : 'bg-white/20 text-white/80 hover:bg-white/30'
              }`}
            >
              Legal Summary
            </button>
            <button
              onClick={() => setQueryType('steps')}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                queryType === 'steps'
                  ? 'bg-accent text-white'
                  : 'bg-white/20 text-white/80 hover:bg-white/30'
              }`}
            >
              Action Steps
            </button>
            <button
              onClick={() => setQueryType('template')}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-1 ${
                queryType === 'template'
                  ? 'bg-accent text-white'
                  : 'bg-white/20 text-white/80 hover:bg-white/30'
              }`}
            >
              <FileText className="w-4 h-4" />
              Template
            </button>
          </div>
        </div>

        <FrameButton
          onClick={handleSubmit}
          disabled={!query.trim() || !jurisdiction || loading}
          className="w-full"
        >
          {loading ? 'Generating Advice...' : 'Get Legal Advice'}
        </FrameButton>
      </div>
    </InfoCard>
  );
}