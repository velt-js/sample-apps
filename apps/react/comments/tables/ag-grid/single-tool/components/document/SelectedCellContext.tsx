'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedCellContextType {
  selectedCellId: string | null;
  setSelectedCellId: (id: string | null) => void;
}

const SelectedCellContext = createContext<SelectedCellContextType | undefined>(undefined);

export function SelectedCellProvider({ children }: { children: ReactNode }) {
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);

  return (
    <SelectedCellContext.Provider value={{ selectedCellId, setSelectedCellId }}>
      {children}
    </SelectedCellContext.Provider>
  );
}

export function useSelectedCell() {
  const context = useContext(SelectedCellContext);
  if (context === undefined) {
    throw new Error('useSelectedCell must be used within a SelectedCellProvider');
  }
  return context;
}
