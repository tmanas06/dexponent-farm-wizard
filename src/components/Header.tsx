
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full px-6 py-4 border-b border-gray-200", className)}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-2 w-10 h-10 bg-gradient-purple rounded-lg flex items-center justify-center text-white font-bold">
            D
          </div>
          <h1 className="text-2xl font-bold">Dexponent</h1>
          <span className="text-xs bg-dex-purple px-2 py-0.5 text-white rounded ml-2 -mt-3">
            BETA
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-sm text-gray-600 hover:text-dex-purple transition-colors">
            Documentation
          </button>
          <button className="text-sm text-gray-600 hover:text-dex-purple transition-colors">
            Join Discord
          </button>
          <button className="bg-dex-purple text-white px-4 py-1.5 rounded-md text-sm hover:opacity-90 transition-opacity">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
