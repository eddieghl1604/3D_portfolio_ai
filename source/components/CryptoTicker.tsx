import { useEffect, useState, useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cryptoCache } from '@/lib/cryptoOptimization';
import { captureException } from '@/lib/sentry';

interface CryptoPrice {
  symbol: string;
  price: number;
  change: number;
}

// CoinGecko API mapping
const CRYPTO_MAP: Record<string, { id: string; symbol: string }> = {
  BTC: { id: 'bitcoin', symbol: 'BTC' },
  ETH: { id: 'ethereum', symbol: 'ETH' },
  SOL: { id: 'solana', symbol: 'SOL' },
  BNB: { id: 'binancecoin', symbol: 'BNB' },
  XRP: { id: 'ripple', symbol: 'XRP' },
};

const DEFAULT_PRICES: CryptoPrice[] = [
  { symbol: 'BTC', price: 43250.85, change: 2.45 },
  { symbol: 'ETH', price: 2285.42, change: -1.23 },
  { symbol: 'SOL', price: 98.76, change: 5.67 },
  { symbol: 'BNB', price: 315.32, change: 1.89 },
  { symbol: 'XRP', price: 0.58, change: -0.45 },
];

const CACHE_KEY = 'crypto_prices';
const CACHE_TTL = 30000; // 30 seconds

export default function CryptoTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>(DEFAULT_PRICES);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pricesRef = useRef<CryptoPrice[]>(DEFAULT_PRICES);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isVisibleRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    pricesRef.current = prices;
  }, [prices]);

  const fetchCryptoPrices = async () => {
    // Only fetch if ticker is visible (optimization)
    if (!isVisibleRef.current) {
      return;
    }

    try {
      const cryptoIds = Object.values(CRYPTO_MAP).map(c => c.id).join(',');
      
      // Use cache with TTL
      const data = await cryptoCache.get(
        CACHE_KEY,
        async () => {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd&include_24hr_change=true`,
            {
              headers: {
                'Accept': 'application/json',
              },
              // Add timeout
              signal: AbortSignal.timeout(5000),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Failed to fetch crypto prices`);
          }

          return await response.json();
        },
        CACHE_TTL
      );
      
      const newPrices: CryptoPrice[] = Object.entries(CRYPTO_MAP).map(([symbol, { id }]) => {
        const cryptoData = data[id];
        if (cryptoData) {
          return {
            symbol,
            price: cryptoData.usd || 0,
            change: cryptoData.usd_24h_change || 0,
          };
        }
        // Fallback to current prices if API fails for specific coin
        const fallbackPrice = pricesRef.current.find(p => p.symbol === symbol);
        return fallbackPrice || { symbol, price: 0, change: 0 };
      });

      setPrices(newPrices);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
      
      // Track error with Sentry
      captureException(error, {
        tags: { component: 'CryptoTicker', type: 'api-error' },
        level: 'warning',
      });

      // Keep existing prices on error
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately on mount if visible
    if (visible) {
      fetchCryptoPrices();
    }

    // Set up interval to fetch every 30 seconds (only when visible)
    if (visible) {
      intervalRef.current = setInterval(() => {
        if (isVisibleRef.current) {
          fetchCryptoPrices();
        }
      }, 30000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [visible]);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeVisible = window.scrollY > 100;
      setVisible(shouldBeVisible);
      isVisibleRef.current = shouldBeVisible;
      
      // Fetch immediately when becoming visible
      if (shouldBeVisible && pricesRef.current === DEFAULT_PRICES) {
        fetchCryptoPrices();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-card/80 backdrop-blur-lg border-b border-primary/20 overflow-hidden">
      <div className="flex animate-slide-left whitespace-nowrap py-1.5 sm:py-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 mr-4 sm:mr-6 md:mr-8">
            {prices.map((crypto) => (
              <div key={`${i}-${crypto.symbol}`} className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm">
                <span className="text-primary font-bold">{crypto.symbol}</span>
                <span className="text-foreground">
                  ${isLoading ? '...' : crypto.price.toLocaleString(undefined, { 
                    minimumFractionDigits: crypto.price < 1 ? 2 : 0,
                    maximumFractionDigits: crypto.price < 1 ? 4 : 2
                  })}
                </span>
                <span
                  className={`flex items-center ${
                    crypto.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {crypto.change > 0 ? (
                    <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                  )}
                  {isLoading ? '...' : Math.abs(crypto.change).toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
