import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function CryptoTicker() {
  const [prices] = useState([
    { symbol: 'BTC', price: 43250.85, change: 2.45 },
    { symbol: 'ETH', price: 2285.42, change: -1.23 },
    { symbol: 'SOL', price: 98.76, change: 5.67 },
    { symbol: 'BNB', price: 315.32, change: 1.89 },
    { symbol: 'XRP', price: 0.58, change: -0.45 },
  ]);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-card/80 backdrop-blur-lg border-b border-primary/20 overflow-hidden">
      <div className="flex animate-slide-left whitespace-nowrap py-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-8 mr-8">
            {prices.map((crypto) => (
              <div key={`${i}-${crypto.symbol}`} className="flex items-center space-x-2 text-sm">
                <span className="text-primary font-bold">{crypto.symbol}</span>
                <span className="text-foreground">${crypto.price.toLocaleString()}</span>
                <span
                  className={`flex items-center ${
                    crypto.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {crypto.change > 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(crypto.change)}%
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
