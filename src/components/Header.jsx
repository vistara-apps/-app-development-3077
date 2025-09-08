import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Scale, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full p-4 sm:p-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">LegalEase Frame</h1>
            <p className="text-sm text-gray-200">Understand your rights, act with confidence</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-accent/20 rounded-full">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-white font-medium">AI-Powered</span>
          </div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;