import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the Context
const BackgroundContext = createContext(undefined);

// Create the Provider
export function BackgroundProvider({ children }) {
  // Default to 'light' (White Header)
  const [theme, setTheme] = useState('light');

  const updateTheme = useCallback((newTheme) => {
    setTheme(newTheme);
  }, []);

  return (
    <BackgroundContext.Provider value={{ theme, updateTheme }}>
      {children}
    </BackgroundContext.Provider>
  );
}

// Create the Hook
export function useBackgroundTheme() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackgroundTheme must be used within a BackgroundProvider');
  }
  return context;
}