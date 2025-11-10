import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    const statuses = [
      'Initializing...',
      'Connecting to portfolio...',
      'Decrypting identity...',
      'Loading neural networks...',
      'Synchronizing protocols...',
      'Ready.',
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 25;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });

      if (currentIndex < statuses.length - 1 && progress > (currentIndex + 1) * 15) {
        currentIndex++;
        setStatus(statuses[currentIndex]);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete, progress]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      >
        <div className="w-full max-w-md px-8">
          <div className="text-center mb-8">
            <div style={{ fontSize: '50px' }}>
            <motion.h1
              className="text-7xl font-bold text-gradient-cyber mb-2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              EDDIE GAN
            </motion.h1>
            <p className="text-primary text-xl font-mono">{status}</p>
          </div>
          </div>

          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-cyber"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary opacity-50 blur-sm"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="mt-4 text-center">
            <span className="text-muted-foreground text-2xl font-mono">
              {Math.floor(progress)}%
            </span>
          </div>

          <div className="mt-8 flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
