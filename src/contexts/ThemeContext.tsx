import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type ViewMode = 'worker' | 'business';

interface ThemeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  userName: string;
  organizationName: string;
  isPrimaryColor: (color: string) => boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const WORKER_NAMES = {
  worker: 'Yvonne Chen',
  business: 'Mark Anderson',
};

const ORG_NAMES = {
  worker: 'Springfield Workers Co-op',
  business: 'Acme Insights Inc',
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    // Persist mode in localStorage
    const saved = localStorage.getItem('poems-view-mode');
    return (saved as ViewMode) || 'worker';
  });

  useEffect(() => {
    localStorage.setItem('poems-view-mode', viewMode);
  }, [viewMode]);

  const isPrimaryColor = (color: string) => {
    if (viewMode === 'worker') {
      return color.includes('emerald') || color.includes('green');
    }
    return color.includes('blue') || color.includes('sky');
  };

  const userName = WORKER_NAMES[viewMode];
  const organizationName = ORG_NAMES[viewMode];

  return (
    <ThemeContext.Provider value={{ viewMode, setViewMode, userName, organizationName, isPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Helper function to get theme-aware color classes
export function getThemeColor(viewMode: ViewMode, variant: 'primary' | 'secondary' | 'accent' = 'primary') {
  const colorMap = {
    worker: {
      primary: 'emerald',
      secondary: 'green',
      accent: 'teal',
    },
    business: {
      primary: 'blue',
      secondary: 'sky',
      accent: 'indigo',
    },
  };

  return colorMap[viewMode][variant];
}

