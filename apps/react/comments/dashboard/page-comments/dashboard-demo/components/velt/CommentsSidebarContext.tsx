"use client";

import React, { createContext, useContext, useState } from 'react';

interface CommentsSidebarContextType {
  isOpen: boolean;
  isFullscreen: boolean;
  toggleCommentsSidebar: () => void;
  openCommentsSidebar: () => void;
  closeCommentsSidebar: () => void;
  toggleFullscreen: () => void;
}

const CommentsSidebarContext = createContext<CommentsSidebarContextType | undefined>(undefined);

export function CommentsSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleCommentsSidebar = () => {
    setIsOpen(!isOpen);
  };

  const openCommentsSidebar = () => {
    setIsOpen(true);
  };

  const closeCommentsSidebar = () => {
    setIsOpen(false);
    setIsFullscreen(false); // Reset fullscreen when closing
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <CommentsSidebarContext.Provider value={{ isOpen, isFullscreen, toggleCommentsSidebar, openCommentsSidebar, closeCommentsSidebar, toggleFullscreen }}>
      {children}
    </CommentsSidebarContext.Provider>
  );
}

export function useCommentsSidebar() {
  const context = useContext(CommentsSidebarContext);
  if (context === undefined) {
    throw new Error('useCommentsSidebar must be used within a CommentsSidebarProvider');
  }
  return context;
}
