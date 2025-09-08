import React, { useState } from 'react';
import { Search, MapPin, FileText, AlertCircle } from 'lucide-react';
import FrameButton from './FrameButton';
import InfoCard from './InfoCard';
import JurisdictionSelector from './JurisdictionSelector';
import TextInput from './TextInput';
import { generateLegalAdvice } from '../services/openai';
import { usePaymentContext } from '../hooks/usePaymentContext';

const QueryInterface = () => {
  const [query, setQuery] = useState('');
  const [jurisdiction, setJurisdiction] = useState('United States');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const { createSession } = usePaymentContext();

  const handleSubmit = async () => {
    if (!query.trim()) return;
    
    if (!paid) {
      setShowPayment(true);
      return;
    }

    setLoading(true);
    try {
      const advice = await generateLegalAdvice(query, jurisdiction);
      setResponse(advice);
    } catch (error) {
      setResponse('Sorry, there was an error processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      await createSession('$0.01');
      setPaid(true);
      setShowPayment(false);
      handleSubmit();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again or connect your wallet.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Query Input Section */}
      <InfoCard title="Describe Your Legal Situation" className="w-full">
        <div className="space-y-4">
          <TextInput
            value={query}
            onChange={setQuery}
            placeholder="e.g., My landlord is trying to evict me without proper notice..."
            variant="multiline"
          />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="w-5 h-5 text-text-secondary" />
              <JurisdictionSelector
                value={jurisdiction}
                onChange={setJurisdiction}
                className="flex-1"
              />
            </div>
            
            <FrameButton
              onClick={handleSubmit}
              disabled={!query.trim() || loading}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              {loading ? 'Analyzing...' : 'Get Legal Advice'}
            </FrameButton>
          </div>
        </div>
      </InfoCard>

      {/* Payment Modal */}
      {showPayment && (
        <InfoCard variant="actionable" className="border-accent">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">Premium Legal Advice</h3>
            <p className="text-text-secondary">
              Get detailed, jurisdiction-specific legal guidance for just $0.01
            </p>
            <div className="flex gap-3 justify-center">
              <FrameButton variant="secondary" onClick={() => setShowPayment(false)}>
                Cancel
              </FrameButton>
              <FrameButton variant="accent" onClick={handlePayment}>
                Pay & Continue
              </FrameButton>
            </div>
          </div>
        </InfoCard>
      )}

      {/* Response Section */}
      {response && (
        <InfoCard title="Legal Guidance" className="w-full">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> This is general legal information, not legal advice. 
                Consult with a qualified attorney for specific legal matters.
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-text-primary">
                {response}
              </div>
            </div>
          </div>
        </InfoCard>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InfoCard variant="actionable" className="text-center cursor-pointer hover:scale-105">
          <FileText className="w-8 h-8 text-accent mx-auto mb-2" />
          <h4 className="font-semibold text-text-primary">Document Templates</h4>
          <p className="text-sm text-text-secondary">Ready-to-use legal forms</p>
        </InfoCard>
        
        <InfoCard variant="actionable" className="text-center cursor-pointer hover:scale-105">
          <Search className="w-8 h-8 text-primary mx-auto mb-2" />
          <h4 className="font-semibold text-text-primary">Know Your Rights</h4>
          <p className="text-sm text-text-secondary">Common legal situations</p>
        </InfoCard>
        
        <InfoCard variant="actionable" className="text-center cursor-pointer hover:scale-105">
          <MapPin className="w-8 h-8 text-accent mx-auto mb-2" />
          <h4 className="font-semibold text-text-primary">Local Resources</h4>
          <p className="text-sm text-text-secondary">Find help in your area</p>
        </InfoCard>
      </div>
    </div>
  );
};

export default QueryInterface;