import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AIModule, AIModuleId, AITask, AITaskStatus, AILogEntry, AISettings } from '@/types/ai';
import { defaultModules, defaultTasks, defaultLogs, defaultSettings } from '@/data/aiMockData';

interface AIContextType {
  modules: AIModule[];
  tasks: AITask[];
  logs: AILogEntry[];
  settings: AISettings;
  toggleModule: (id: AIModuleId) => void;
  updateModule: (id: AIModuleId, updates: Partial<AIModule>) => void;
  updateSettings: (updates: Partial<AISettings>) => void;
  updateTaskStatus: (taskId: string, status: AITaskStatus, reason?: string) => void;
  createTask: (task: Omit<AITask, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteTask: (taskId: string) => void;
  addLog: (entry: Omit<AILogEntry, 'id' | 'timestamp'>) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [modules, setModules] = useState<AIModule[]>(defaultModules);
  const [tasks, setTasks] = useState<AITask[]>(defaultTasks);
  const [logs, setLogs] = useState<AILogEntry[]>(defaultLogs);
  const [settings, setSettings] = useState<AISettings>(defaultSettings);

  const toggleModule = useCallback((id: AIModuleId) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  }, []);

  const updateModule = useCallback((id: AIModuleId, updates: Partial<AIModule>) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  }, []);

  const updateSettings = useCallback((updates: Partial<AISettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const updateTaskStatus = useCallback((taskId: string, status: AITaskStatus, reason?: string) => {
    const now = new Date().toISOString();
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const updated: AITask = { ...t, status, updatedAt: now };
      if (status === 'approved') { updated.approvedBy = 'Администратор'; updated.approvedAt = now; }
      if (status === 'rejected' && reason) updated.rejectedReason = reason;
      return updated;
    }));
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      addLog({ moduleId: task.moduleId, action: `Статус → ${status}`, details: `Задача "${task.description}"${reason ? ` — ${reason}` : ''}`, result: 'success' });
    }
  }, [tasks]);

  const createTask = useCallback((task: Omit<AITask, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newTask: AITask = { ...task, id: `task-${Date.now()}`, createdAt: now, updatedAt: now };
    setTasks(prev => [newTask, ...prev]);
    addLog({ moduleId: task.moduleId, action: 'Создание задачи', details: task.description, result: 'success' });
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  }, []);

  const addLog = useCallback((entry: Omit<AILogEntry, 'id' | 'timestamp'>) => {
    const newEntry: AILogEntry = { ...entry, id: `log-${Date.now()}`, timestamp: new Date().toISOString() };
    setLogs(prev => [newEntry, ...prev]);
  }, []);

  return (
    <AIContext.Provider value={{ modules, tasks, logs, settings, toggleModule, updateModule, updateSettings, updateTaskStatus, createTask, deleteTask, addLog }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const ctx = useContext(AIContext);
  if (!ctx) throw new Error('useAI must be used within AIProvider');
  return ctx;
};
