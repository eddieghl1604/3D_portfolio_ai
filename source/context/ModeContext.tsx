import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

export type SiteMode = 'web2' | 'web3';

interface ModeContextValue {
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
  toggleMode: () => void;
}

const STORAGE_KEY = 'portfolio-mode';
const DEFAULT_MODE: SiteMode = 'web3';

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

function getInitialMode(): SiteMode {
  if (typeof window === 'undefined') return DEFAULT_MODE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'web2' || stored === 'web3' ? stored : DEFAULT_MODE;
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<SiteMode>(getInitialMode);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  const setMode = useCallback((next: SiteMode) => setModeState(next), []);
  const toggleMode = useCallback(
    () => setModeState((prev) => (prev === 'web3' ? 'web2' : 'web3')),
    []
  );

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return ctx;
}
