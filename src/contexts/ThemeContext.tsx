import { createContext, useContext, useState, ReactNode } from 'react';

export type ViewMode = 'worker' | 'business';

interface ThemeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isPrimaryColor: (color: string) => boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('worker');

  const isPrimaryColor = (color: string) => {
    if (viewMode === 'worker') {
      return color.includes('emerald') || color.includes('green');
    }
    return color.includes('blue') || color.includes('sky');
  };

  return (
    <ThemeContext.Provider value={{ viewMode, setViewMode, isPrimaryColor }}>
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
