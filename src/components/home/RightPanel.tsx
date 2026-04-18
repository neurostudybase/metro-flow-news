import { useState } from 'react';
import { Link } from 'react-router-dom';
import { articles, getCategoryById, categoryColors, formatTime } from '@/data/mockData';
import { Phone, Mail, Camera, Cloud, TrendingUp } from 'lucide-react';
import AdSlot from './AdSlot';

const tabs = [
  { id: 'main', label: 'Главное' },
  { id: 'incidents', label: 'ЧП' },
  { id: 'politics', label: 'Политика' },
  { id: 'sports', label: 'Спорт' },
  { id: 'business', label: 'Бизнес' },
];

const RightPanel = () => {
  const [activeTab, setActiveTab] = useState('main');

  const getTabArticles = () => {
    if (activeTab === 'main') return articles.slice(0, 12);
    return articles.filter(a => a.categoryId === activeTab).slice(0, 12);
  };

  const tabArticles = getTabArticles();
  const popular = [...articles].sort((a, b) => b.views - a.views).slice(0, 6);

  return (
    <div className="right-rail-sticky space-y-3">
      {/* Погода + курсы */}
      <div className="bg-card rounded-md p-3 border border-border/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold">Тюмень</span>
          </div>
          <span className="text-[10px] text-muted-foreground">сегодня</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold leading-none">−18°</div>
            <div className="text-[11px] text-muted-foreground mt-1">Снег, ветер 4 м/с</div>
          </div>
          <div className="text-right text-[11px] text-muted-foreground">
            <div>USD <span className="font-semibold text-foreground">94,12</span></div>
            <div>EUR <span className="font-semibold text-foreground">102,50</span></div>
          </div>
        </div>
      </div>

      {/* Табовый инфоблок */}
      <div className="bg-card rounded-md border border-border/60">
        <div className="flex border-b border-border overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 text-[11px] font-bold uppercase tracking-wider px-2.5 py-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary -mb-px bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-2.5 flex flex-col">
          {tabArticles.map(article => (
            <Link
              key={article.id}
              to={`/article/${article.slug}`}
              className="news-item flex items-start gap-2 py-1.5 px-1 border-b border-border/50 last:border-0"
            >
              <span className="text-[11px] text-muted-foreground font-mono whitespace-nowrap mt-0.5">
                {formatTime(article.publishedAt)}
              </span>
              <span className="text-[13px] leading-snug line-clamp-2">{article.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <AdSlot format="square" label="Реклама · 280×260" />

      {/* Сообщить новость */}
      <div className="bg-header text-header-foreground rounded-md p-3.5">
        <h3 className="font-bold text-[13px] uppercase tracking-wider mb-1">Сообщить новость</h3>
        <p className="text-[11px] text-header-foreground/70 mb-3 leading-relaxed">
          Стали свидетелем? Поделитесь с редакцией — мы работаем 24/7.
        </p>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button className="flex items-center justify-center gap-1.5 bg-primary text-primary-foreground text-[11px] font-semibold py-2 rounded hover:opacity-90 transition-opacity">
            <Phone className="w-3 h-3" /> Позвонить
          </button>
          <button className="flex items-center justify-center gap-1.5 bg-header-foreground/10 text-header-foreground text-[11px] font-semibold py-2 rounded hover:bg-header-foreground/20 transition-colors">
            <Mail className="w-3 h-3" /> Написать
          </button>
        </div>
        <button className="w-full flex items-center justify-center gap-1.5 border border-header-foreground/30 text-[11px] font-semibold py-2 rounded hover:bg-header-foreground/10 transition-colors">
          <Camera className="w-3 h-3" /> Фото / видео
        </button>
      </div>

      {/* Популярное */}
      <div className="bg-card rounded-md p-3 border border-border/60">
        <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-border">
          <TrendingUp className="w-3.5 h-3.5 text-accent" />
          <h3 className="font-bold text-[12px] uppercase tracking-wider">Самое читаемое</h3>
        </div>
        <div className="flex flex-col">
          {popular.map((article, i) => (
            <Link key={article.id} to={`/article/${article.slug}`} className="news-item flex items-start gap-2.5 py-1.5 px-1 border-b border-border/50 last:border-0">
              <span className="text-lg font-bold text-primary/40 leading-none mt-0 w-5 flex-shrink-0">{i + 1}</span>
              <div className="min-w-0">
                <span className="text-[12px] leading-tight line-clamp-2 font-medium">{article.title}</span>
                <div className="text-[10px] text-muted-foreground mt-0.5">{article.views.toLocaleString('ru-RU')} просмотров</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <AdSlot format="vertical" label="Реклама · 280×420" />
    </div>
  );
};

export default RightPanel;
