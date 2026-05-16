import { useMode, type SiteMode } from '@/context/ModeContext';
import { Globe, Boxes } from 'lucide-react';
import { cn } from '@/lib/utils';

const OPTIONS: { value: SiteMode; label: string; icon: typeof Globe }[] = [
  { value: 'web2', label: 'Web2', icon: Globe },
  { value: 'web3', label: 'Web3', icon: Boxes },
];

export default function ModeToggle({ className }: { className?: string }) {
  const { mode, setMode } = useMode();

  return (
    <div
      role="group"
      aria-label="Toggle between Web2 and Web3 portfolio"
      className={cn(
        'relative inline-flex items-center rounded-full border border-primary/30 bg-muted/40 backdrop-blur p-1',
        className
      )}
    >
      {/* Sliding indicator */}
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-transform duration-300 ease-out"
        style={{ transform: mode === 'web3' ? 'translateX(calc(100% + 0.25rem))' : 'translateX(0)' }}
      />
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = mode === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            aria-pressed={isActive}
            className={cn(
              'relative z-10 flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors',
              isActive ? 'text-primary-foreground' : 'text-foreground/70 hover:text-foreground'
            )}
          >
            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
