
import React from 'react';
import Header from '@/components/Header';
import FarmWizard from '@/components/farm-wizard/FarmWizard';
import { FarmWizardProvider } from '@/contexts/FarmWizardContext';
import { ExternalLink } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Create New Farm</h1>
              <p className="text-gray-600">
                Define parameters for your new Dexponent farm using the step-by-step wizard below.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-2 bg-white px-4 py-2 rounded-md border border-gray-200 shadow-sm">
              <span className="text-sm font-medium">Testnet:</span>
              <a 
                href="https://sepolia.etherscan.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-dex-purple hover:underline flex items-center"
              >
                Sepolia <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>
          
          <FarmWizardProvider>
            <FarmWizard />
          </FarmWizardProvider>
        </div>
      </main>
      
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          <p>© 2025 Dexponent Protocol. All rights reserved.</p>
          <p className="mt-2">
            <a 
              href="https://github.com/dexponent/farm-wizard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-dex-purple hover:underline flex items-center justify-center gap-1"
            >
              <span>View on GitHub</span> <ExternalLink size={14} />
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
