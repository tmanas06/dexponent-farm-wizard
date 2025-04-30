
import React from 'react';
import Header from '@/components/Header';
import FarmWizard from '@/components/farm-wizard/FarmWizard';
import { FarmWizardProvider } from '@/contexts/FarmWizardContext';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Farm</h1>
            <p className="text-gray-600">
              Define parameters for your new Dexponent farm using the step-by-step wizard below.
            </p>
          </div>
          
          <FarmWizardProvider>
            <FarmWizard />
          </FarmWizardProvider>
        </div>
      </main>
      
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          <p>© 2025 Dexponent Protocol. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
