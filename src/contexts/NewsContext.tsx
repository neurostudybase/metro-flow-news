import React, { createContext, useContext, useState, useCallback } from 'react';
import { articles as staticArticles, categories, coverImages, type Article } from '@/data/mockData';

interface PublishedNewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  source: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  publishedAt: string;
}

interface NewsContextType {
  allArticles: Article[];
  publishedAiNews: PublishedNewsItem[];
  publishNews: (item: Omit<PublishedNewsItem, 'id' | 'publishedAt'>) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

// Map Russian category names to internal category IDs
const CATEGORY_MAP: Record<string, string> = {
  'Новости': 'news',
  'Город': 'city',
  'Происшествия': 'incidents',
  'Бизнес': 'business',
  'Спорт': 'sports',
  'Культура': 'culture',
  'Политика': 'politics',
  'Общество': 'society',
};

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [publishedAiNews, setPublishedAiNews] = useState<PublishedNewsItem[]>([]);

  const publishNews = useCallback((item: Omit<PublishedNewsItem, 'id' | 'publishedAt'>) => {
    const newItem: PublishedNewsItem = {
      ...item,
      id: `ai-news-${Date.now()}`,
      publishedAt: new Date().toISOString(),
    };
    setPublishedAiNews(prev => [newItem, ...prev]);
  }, []);

  // Convert AI-published news to Article format and merge with static articles
  const aiArticles: Article[] = publishedAiNews.map((news, i) => ({
    id: news.id,
    title: news.title,
    slug: news.id,
    excerpt: news.content.slice(0, 200) + '...',
    categoryId: CATEGORY_MAP[news.category] || 'news',
    authorId: 'a1', // AI author
    publishedAt: news.publishedAt,
    views: 0,
    commentsCount: 0,
    coverIndex: i % 6,
    isBreaking: i === 0 && publishedAiNews.length <= 3, // First AI news is breaking
    isTop: false,
    isRecommended: false,
    isOpinion: false,
    isReportage: false,
  }));

  const allArticles = [...aiArticles, ...staticArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <NewsContext.Provider value={{ allArticles, publishedAiNews, publishNews }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error('useNews must be used within NewsProvider');
  return ctx;
};
