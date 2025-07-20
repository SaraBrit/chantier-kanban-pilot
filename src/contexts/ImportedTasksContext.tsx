import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Task } from '@/types/project';

interface ProjectTasks {
  [projectId: string]: Task[];
}

interface ImportedTasksContextType {
  importedTasks: ProjectTasks;
  getTasksForProject: (projectId: string) => Task[];
  addImportedTasks: (projectId: string, tasks: Task[]) => void;
  clearImportedTasks: (projectId?: string) => void;
  removeImportedTask: (projectId: string, taskId: string) => void;
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
  const [importedTasks, setImportedTasks] = useState<ProjectTasks>({});

  const getTasksForProject = useCallback((projectId: string): Task[] => {
    return importedTasks[projectId] || [];
  }, [importedTasks]);

  const addImportedTasks = useCallback((projectId: string, tasks: Task[]) => {
    setImportedTasks(prev => ({
      ...prev,
      [projectId]: [...(prev[projectId] || []), ...tasks]
    }));
  }, []);

  const clearImportedTasks = useCallback((projectId?: string) => {
    if (projectId) {
      setImportedTasks(prev => {
        const newTasks = { ...prev };
        delete newTasks[projectId];
        return newTasks;
      });
    } else {
      setImportedTasks({});
    }
  }, []);

  const removeImportedTask = useCallback((projectId: string, taskId: string) => {
    setImportedTasks(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || []).filter(task => task.id !== taskId)
    }));
  }, []);

  const value = {
    importedTasks,
    getTasksForProject,
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