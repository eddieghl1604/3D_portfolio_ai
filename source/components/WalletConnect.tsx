import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { toast } from 'sonner';

export default function WalletConnect() {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected(!connected);
    toast.success(connected ? 'Wallet disconnected' : 'Wallet connected (Demo)');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleConnect}
      className={`border-primary/50 hover:bg-primary/10 ${
        connected ? 'border-glow-cyan' : ''
      }`}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {connected ? '0x7a9f...3d2c' : 'Connect'}
    </Button>
  );
}
