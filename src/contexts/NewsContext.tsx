import React, { createContext, useContext, useState, useCallback } from 'react';

export type NewsStatus = 'draft' | 'pending_review' | 'published' | 'rejected';

export interface AINewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  source: string;
  sourceUrl: string;
  status: NewsStatus;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  publishedAt: string | null;
}

interface NewsContextType {
  newsItems: AINewsItem[];
  publishNews: (item: Omit<AINewsItem, 'id' | 'createdAt' | 'publishedAt' | 'status'> & { status?: NewsStatus }) => void;
  updateNewsStatus: (id: string, status: NewsStatus) => void;
  deleteNews: (id: string) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [newsItems, setNewsItems] = useState<AINewsItem[]>([]);

  const publishNews = useCallback((item: Omit<AINewsItem, 'id' | 'createdAt' | 'publishedAt' | 'status'> & { status?: NewsStatus }) => {
    const now = new Date().toISOString();
    const status = item.status || 'published';
    const newItem: AINewsItem = {
      ...item,
      id: `ai-news-${Date.now()}`,
      status,
      createdAt: now,
      publishedAt: status === 'published' ? now : null,
    };
    setNewsItems(prev => [newItem, ...prev]);
  }, []);

  const updateNewsStatus = useCallback((id: string, status: NewsStatus) => {
    setNewsItems(prev => prev.map(n =>
      n.id === id
        ? { ...n, status, publishedAt: status === 'published' ? new Date().toISOString() : n.publishedAt }
        : n
    ));
  }, []);

  const deleteNews = useCallback((id: string) => {
    setNewsItems(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NewsContext.Provider value={{ newsItems, publishNews, updateNewsStatus, deleteNews }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error('useNews must be used within NewsProvider');
  return ctx;
};
