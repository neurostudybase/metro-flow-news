import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryById, categoryColors, formatTime } from '@/data/mockData';
import { useNews } from '@/contexts/NewsContext';
import { Phone, Mail, Camera } from 'lucide-react';

const tabs = [
  { id: 'main', label: 'Главное' },
  { id: 'incidents', label: 'ЧП' },
  { id: 'politics', label: 'Политика' },
  { id: 'sports', label: 'Спорт' },
];

const RightPanel = () => {
  const [activeTab, setActiveTab] = useState('main');
  const { allArticles } = useNews();

  const getTabArticles = () => {
    if (activeTab === 'main') return allArticles.slice(0, 10);
    return allArticles.filter(a => a.categoryId === activeTab).slice(0, 10);
  };

  const tabArticles = getTabArticles();

  return (
    <div className="right-rail-sticky space-y-5">
      {/* Tab panel */}
      <div className="bg-card rounded-lg p-3">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn text-xs font-medium px-2.5 py-1.5 rounded-md ${
                activeTab === tab.id ? 'active' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col">
          {tabArticles.map((article, i) => {
            const cat = getCategoryById(article.categoryId);
            return (
              <Link
                key={article.id}
                to={`/article/${article.slug}`}
                className="news-item flex items-start gap-2 py-2 px-1 border-b border-border/50 last:border-0 rounded-sm"
              >
                <span className="text-xs text-muted-foreground font-medium whitespace-nowrap mt-0.5">
                  {formatTime(article.publishedAt)}
                </span>
                <span className="text-sm leading-tight line-clamp-2">{article.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Report news widget */}
      <div className="bg-card rounded-lg p-4">
        <h3 className="font-bold text-sm mb-2">Сообщить новость</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Стали свидетелем события? Расскажите нам!
        </p>
        <div className="flex gap-2 mb-3">
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground text-xs font-medium py-2 rounded-md hover:opacity-90 transition-opacity">
            <Phone className="w-3.5 h-3.5" />
            Позвонить
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-secondary text-secondary-foreground text-xs font-medium py-2 rounded-md hover:bg-secondary/80 transition-colors">
            <Mail className="w-3.5 h-3.5" />
            Написать
          </button>
        </div>
        <button className="w-full flex items-center justify-center gap-1.5 border border-border text-xs font-medium py-2 rounded-md hover:bg-secondary transition-colors">
          <Camera className="w-3.5 h-3.5" />
          Отправить фото/видео
        </button>
      </div>

      {/* Popular */}
      <div className="bg-card rounded-lg p-4">
        <h3 className="font-bold text-sm mb-3">Популярное</h3>
        <div className="flex flex-col gap-2">
          {allArticles.slice(0, 5).sort((a, b) => b.views - a.views).map((article, i) => (
            <Link key={article.id} to={`/article/${article.slug}`} className="news-item flex items-start gap-2 py-1.5 px-1 rounded-sm">
              <span className="text-lg font-bold text-muted-foreground/40 leading-none mt-0.5">{i + 1}</span>
              <span className="text-sm leading-tight line-clamp-2">{article.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
