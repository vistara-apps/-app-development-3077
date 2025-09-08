import React, { useState } from 'react';
import { Scale, Sparkles } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { LegalQueryForm } from './components/LegalQueryForm';
import { LegalAdviceDisplay } from './components/LegalAdviceDisplay';
import { PaymentGate } from './components/PaymentGate';
import { InfoCard } from './components/InfoCard';
import { useOpenAI, type LegalAdviceRequest, type LegalAdviceResponse } from './hooks/useOpenAI';

export default function App() {
  const { isConnected } = useAccount();
  const { generateLegalAdvice, loading, error } = useOpenAI();
  const [advice, setAdvice] = useState<LegalAdviceResponse | null>(null);
  const [showPaymentGate, setShowPaymentGate] = useState(false);
  const [pendingRequest, setPendingRequest] = useState<LegalAdviceRequest | null>(null);

  const handleQuery = async (query: string, jurisdiction: string, type: 'summary' | 'template' | 'steps') => {
    const request: LegalAdviceRequest = { query, jurisdiction, requestType: type };
    
    // Show payment gate for premium features
    if (type === 'template' && isConnected) {
      setPendingRequest(request);
      setShowPaymentGate(true);
      return;
    }

    try {
      const result = await generateLegalAdvice(request);
      setAdvice(result);
    } catch (err) {
      console.error('Failed to generate advice:', err);
    }
  };

  const handlePaymentSuccess = async () => {
    setShowPaymentGate(false);
    if (pendingRequest) {
      try {
        const result = await generateLegalAdvice(pendingRequest);
        setAdvice(result);
      } catch (err) {
        console.error('Failed to generate advice after payment:', err);
      }
      setPendingRequest(null);
    }
  };

  const resetForm = () => {
    setAdvice(null);
    setShowPaymentGate(false);
    setPendingRequest(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">LegalEase Frame</h1>
              <p className="text-white/70 text-sm">Understand your rights, act with confidence</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ConnectButton />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Query Form */}
          <div className="space-y-6">
            <LegalQueryForm onSubmit={handleQuery} loading={loading} />
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Scale className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-white font-medium">Plain Language</h3>
                  <p className="text-white/70 text-sm">Easy-to-understand legal explanations</p>
                </div>
              </InfoCard>
              
              <InfoCard className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-white font-medium">AI-Powered</h3>
                  <p className="text-white/70 text-sm">Advanced AI for accurate guidance</p>
                </div>
              </InfoCard>
            </div>

            {error && (
              <InfoCard variant="default">
                <div className="flex items-center gap-2 text-red-300">
                  <span className="text-red-400">⚠️</span>
                  <p className="text-sm">{error}</p>
                </div>
              </InfoCard>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {showPaymentGate && (
              <PaymentGate
                onPaymentSuccess={handlePaymentSuccess}
                cost="$0.001"
                description="Get professional document templates and detailed guidance"
              />
            )}

            {advice && !showPaymentGate && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Legal Advice</h2>
                  <button
                    onClick={resetForm}
                    className="text-white/70 hover:text-white text-sm underline"
                  >
                    New Query
                  </button>
                </div>
                <LegalAdviceDisplay advice={advice} />
              </div>
            )}

            {!advice && !showPaymentGate && !loading && (
              <InfoCard className="text-center">
                <div className="py-12">
                  <Scale className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">Ready to Help</h3>
                  <p className="text-white/70">
                    Submit a legal query to get started with plain-language explanations and actionable guidance.
                  </p>
                </div>
              </InfoCard>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <InfoCard>
            <p className="text-white/60 text-sm">
              LegalEase Frame provides educational information only. Always consult qualified legal professionals for specific advice.
            </p>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}