import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Task, JournalDeChantier } from '@/types/project';

interface ProgressContextType {
  journalProgress: { [taskId: string]: number };
  updateJournalProgress: (taskId: string, progress: number) => void;
  calculateTaskProgress: (taskId: string, baseProgress: number) => number;
  calculateProjectProgress: (tasks: Task[]) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [journalProgress, setJournalProgress] = useState<{ [taskId: string]: number }>({});

  const updateJournalProgress = useCallback((taskId: string, progress: number) => {
    setJournalProgress(prev => ({
      ...prev,
      [taskId]: progress
    }));
  }, []);

  const calculateTaskProgress = useCallback((taskId: string, baseProgress: number) => {
    const journalBonus = journalProgress[taskId] || 0;
    return Math.min(100, baseProgress + journalBonus);
  }, [journalProgress]);

  const calculateProjectProgress = useCallback((tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    
    const totalProgress = tasks.reduce((acc, task) => {
      return acc + calculateTaskProgress(task.id, task.progress);
    }, 0);
    
    return Math.round(totalProgress / tasks.length);
  }, [calculateTaskProgress]);

  const value = {
    journalProgress,
    updateJournalProgress,
    calculateTaskProgress,
    calculateProjectProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};