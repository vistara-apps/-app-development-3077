import React from 'react';
import Header from './components/Header';
import QueryInterface from './components/QueryInterface';
import StatsCard from './components/StatsCard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 px-4 sm:px-6 pb-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Legal Guidance Made
                <span className="gradient-text"> Simple</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
                Get instant, plain-language legal advice powered by AI. 
                Understand your rights and know exactly what steps to take.
              </p>
            </div>

            {/* Stats */}
            <StatsCard />

            {/* Main Interface */}
            <QueryInterface />

            {/* Footer */}
            <footer className="text-center py-8 text-gray-300">
              <p className="text-sm">
                © 2024 LegalEase Frame. Empowering users with accessible legal information.
              </p>
              <p className="text-xs mt-2 opacity-70">
                Not a substitute for professional legal advice. Always consult with qualified attorneys for specific legal matters.
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;