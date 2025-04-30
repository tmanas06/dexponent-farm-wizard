import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/components/context/WalletContext';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWallet();
  const { toast } = useToast();

  const openDiscord = () => {
    window.open('https://discord.com/invite/yermEKz6rc', '_blank');
  };

  const openDocumentation = () => {
    window.open('https://docs.dexponent.io', '_blank');
  };

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
          <Button 
            variant="ghost" 
            size="sm"
            className="text-sm text-gray-600 hover:text-dex-purple transition-colors flex items-center gap-1"
            onClick={openDocumentation}
          >
            Documentation <ExternalLink size={14} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-sm text-gray-600 hover:text-dex-purple transition-colors flex items-center gap-1"
            onClick={openDiscord}
          >
            Join Discord <ExternalLink size={14} />
          </Button>
          
          {account ? (
            <Button 
              className="bg-dex-purple text-white px-4 py-1.5 rounded-md text-sm hover:opacity-90 transition-opacity"
              onClick={disconnectWallet}
            >
              {account.slice(0, 6) + '...' + account.slice(-4)}
            </Button>
          ) : (
            <Button 
              className="bg-dex-purple text-white px-4 py-1.5 rounded-md text-sm hover:opacity-90 transition-opacity"
              disabled={isConnecting}
              onClick={connectWallet}
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
