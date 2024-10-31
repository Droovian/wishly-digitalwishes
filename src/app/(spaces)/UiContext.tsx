// spaces/UIContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isSidebarVisible: boolean;
  setSidebarVisible: (visible: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(true);

  const contextValue: UIContextType = {
    isSidebarVisible,
    setSidebarVisible,
  };

  return <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>;
};

export const useUIContext = (): UIContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return context;
};
