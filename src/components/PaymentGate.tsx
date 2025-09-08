import React, { useState } from 'react';
import { Wallet, Lock } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { FrameButton } from './FrameButton';
import { InfoCard } from './InfoCard';
import { usePaymentContext } from '../hooks/usePaymentContext';

interface PaymentGateProps {
  onPaymentSuccess: () => void;
  cost: string;
  description: string;
}

export function PaymentGate({ onPaymentSuccess, cost, description }: PaymentGateProps) {
  const { isConnected } = useAccount();
  const { createSession } = usePaymentContext();
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setPaying(true);
    setError(null);
    
    try {
      await createSession();
      onPaymentSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setPaying(false);
    }
  };

  return (
    <InfoCard className="text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Lock className="w-8 h-8 text-white" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Premium Legal Advice</h3>
          <p className="text-white/80 mb-1">{description}</p>
          <p className="text-accent font-semibold text-lg">{cost}</p>
        </div>

        {!isConnected ? (
          <div className="space-y-3">
            <p className="text-white/70 text-sm">Connect your wallet to access premium features</p>
            <ConnectButton />
          </div>
        ) : (
          <div className="space-y-3 w-full">
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
            
            <FrameButton
              onClick={handlePayment}
              disabled={paying}
              className="w-full flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              {paying ? 'Processing Payment...' : `Pay ${cost}`}
            </FrameButton>
          </div>
        )}
      </div>
    </InfoCard>
  );
}