import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Task } from '@/types/project';

interface ImportedTasksContextType {
  importedTasks: Task[];
  addImportedTasks: (tasks: Task[]) => void;
  clearImportedTasks: () => void;
  removeImportedTask: (taskId: string) => void;
}

const ImportedTasksContext = createContext<ImportedTasksContextType | undefined>(undefined);

export const useImportedTasks = () => {
  const context = useContext(ImportedTasksContext);
  if (!context) {
    throw new Error('useImportedTasks must be used within an ImportedTasksProvider');
  }
  return context;
};

interface ImportedTasksProviderProps {
  children: ReactNode;
}

export const ImportedTasksProvider: React.FC<ImportedTasksProviderProps> = ({ children }) => {
  const [importedTasks, setImportedTasks] = useState<Task[]>([]);

  const addImportedTasks = useCallback((tasks: Task[]) => {
    setImportedTasks(prev => [...prev, ...tasks]);
  }, []);

  const clearImportedTasks = useCallback(() => {
    setImportedTasks([]);
  }, []);

  const removeImportedTask = useCallback((taskId: string) => {
    setImportedTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  const value = {
    importedTasks,
    addImportedTasks,
    clearImportedTasks,
    removeImportedTask
  };

  return (
    <ImportedTasksContext.Provider value={value}>
      {children}
    </ImportedTasksContext.Provider>
  );
};