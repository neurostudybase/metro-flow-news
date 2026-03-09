import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Map, Newspaper, Bot, BarChart3, Globe, Building2, ShoppingBag, Users, Settings, PenTool, Search, Brain, TrendingUp, FileText, Flame, Calendar, BookOpen, Megaphone } from 'lucide-react';

interface SystemRoute {
  system: string;
  url: string;
  icon: React.ElementType;
  group: string;
}

const allSystems: SystemRoute[] = [
  // Штаб управления
  { system: 'Штаб управления', url: '/admin/control', icon: Globe, group: 'Штаб' },
  { system: 'AI Командный центр', url: '/admin/control/ai', icon: Brain, group: 'Штаб' },
  { system: 'Задачи', url: '/admin/control/tasks', icon: FileText, group: 'Штаб' },
  { system: 'Журнал действий', url: '/admin/control/log', icon: FileText, group: 'Штаб' },
  { system: 'API управление', url: '/admin/control/api', icon: Settings, group: 'Штаб' },
  { system: 'Промпты', url: '/admin/control/prompts', icon: PenTool, group: 'Штаб' },

  // Редакция новостей
  { system: 'Редакция новостей', url: '/admin/control/news', icon: Newspaper, group: 'Новости' },
  { system: 'Черновики', url: '/admin/control/news/drafts', icon: FileText, group: 'Новости' },
  { system: 'Опубликованные', url: '/admin/control/news/published', icon: FileText, group: 'Новости' },
  { system: 'Очередь публикации', url: '/admin/control/news/queue', icon: FileText, group: 'Новости' },
  { system: 'Редактор новостей', url: '/admin/control/news/editor/new', icon: PenTool, group: 'Новости' },
  { system: 'Источники', url: '/admin/control/news/sources', icon: Search, group: 'Новости' },
  { system: 'Лог редакции', url: '/admin/control/news/log', icon: FileText, group: 'Новости' },

  // Редакционная система
  { system: 'Редакция', url: '/admin/control/editorial', icon: BookOpen, group: 'Редакция' },
  { system: 'Очередь статей', url: '/admin/control/editorial/queue', icon: FileText, group: 'Редакция' },
  { system: 'Календарь публикаций', url: '/admin/control/editorial/calendar', icon: Calendar, group: 'Редакция' },
  { system: 'Темы', url: '/admin/control/editorial/topics', icon: FileText, group: 'Редакция' },
  { system: 'Задачи редакции', url: '/admin/control/editorial/tasks', icon: FileText, group: 'Редакция' },
  { system: 'Лог редакции', url: '/admin/control/editorial/log', icon: FileText, group: 'Редакция' },

  // AI системы
  { system: 'AI Редактор', url: '/admin/control/ai/editor', icon: Bot, group: 'AI системы' },
  { system: 'AI Редактор — лог', url: '/admin/control/ai/editor-log', icon: FileText, group: 'AI системы' },
  { system: 'AI Редактор — настройки', url: '/admin/control/ai/editor-settings', icon: Settings, group: 'AI системы' },
  { system: 'AI Журналист', url: '/admin/control/ai/journalist', icon: Bot, group: 'AI системы' },
  { system: 'AI Журналист — темы', url: '/admin/control/ai/journalist/topics', icon: FileText, group: 'AI системы' },
  { system: 'AI Журналист — лог', url: '/admin/control/ai/journalist/log', icon: FileText, group: 'AI системы' },
  { system: 'AI Редактор главной', url: '/admin/control/ai/front-editor', icon: Bot, group: 'AI системы' },
  { system: 'AI Редактор главной — предложения', url: '/admin/control/ai/front-editor/suggestions', icon: FileText, group: 'AI системы' },
  { system: 'AI Редактор главной — лог', url: '/admin/control/ai/front-editor/log', icon: FileText, group: 'AI системы' },
  { system: 'AI Редактор главной — настройки', url: '/admin/control/ai/front-editor/settings', icon: Settings, group: 'AI системы' },

  // News Hunter
  { system: 'News Hunter', url: '/admin/control/news-hunter', icon: Search, group: 'AI системы' },
  { system: 'News Hunter — очередь', url: '/admin/control/news-hunter/queue', icon: FileText, group: 'AI системы' },
  { system: 'News Hunter — лог', url: '/admin/control/news-hunter/log', icon: FileText, group: 'AI системы' },
  { system: 'News Hunter — настройки', url: '/admin/control/news-hunter/settings', icon: Settings, group: 'AI системы' },

  // Аналитика
  { system: 'Аналитика контента', url: '/admin/control/analytics', icon: BarChart3, group: 'Аналитика' },
  { system: 'ТОП новостей', url: '/admin/control/analytics/top-news', icon: Flame, group: 'Аналитика' },
  { system: 'Аналитика категорий', url: '/admin/control/analytics/categories', icon: BarChart3, group: 'Аналитика' },
  { system: 'Аналитика городов', url: '/admin/control/analytics/cities', icon: Globe, group: 'Аналитика' },
  { system: 'Рекомендации', url: '/admin/control/analytics/recommendations', icon: TrendingUp, group: 'Аналитика' },
  { system: 'AI контент статистика', url: '/admin/control/analytics/ai-content', icon: Bot, group: 'Аналитика' },

  // Рост
  { system: 'Движок роста', url: '/admin/control/growth', icon: TrendingUp, group: 'Рост' },
  { system: 'Темы роста', url: '/admin/control/growth/topics', icon: FileText, group: 'Рост' },
  { system: 'Статьи роста', url: '/admin/control/growth/articles', icon: FileText, group: 'Рост' },
  { system: 'Тренды', url: '/admin/control/growth/trends', icon: TrendingUp, group: 'Рост' },
  { system: 'Календарь роста', url: '/admin/control/growth/calendar', icon: Calendar, group: 'Рост' },
  { system: 'SEO страницы', url: '/admin/control/growth/seo-pages', icon: Search, group: 'Рост' },
  { system: 'Перелинковка', url: '/admin/control/growth/linking', icon: Globe, group: 'Рост' },
  { system: 'Прогнозы', url: '/admin/control/growth/predictions', icon: BarChart3, group: 'Рост' },

  // Города
  { system: 'Управление городами', url: '/admin/control/cities', icon: Building2, group: 'Инфраструктура' },
  { system: 'AI Карта и Геоаналитика', url: '/admin/control/map', icon: Map, group: 'Инфраструктура' },
  { system: 'Городской интеллект', url: '/admin/control/city', icon: Globe, group: 'Инфраструктура' },
  { system: 'AI Сети', url: '/admin/control/ai-networks', icon: Globe, group: 'Инфраструктура' },

  // Модерация
  { system: 'Модерация объявлений', url: '/admin/control/ads', icon: ShoppingBag, group: 'Модерация' },
  { system: 'Управление контентом', url: '/admin/control/content', icon: Newspaper, group: 'Модерация' },
  { system: 'SEO', url: '/admin/control/seo', icon: Search, group: 'Модерация' },
  { system: 'Безопасность', url: '/admin/control/security', icon: Settings, group: 'Модерация' },

  // Холдинг
  { system: 'Холдинг — дашборд', url: '/admin/holding', icon: Building2, group: 'Холдинг' },
  { system: 'Холдинг — города', url: '/admin/holding/cities', icon: Globe, group: 'Холдинг' },
  { system: 'Холдинг — новости', url: '/admin/holding/news', icon: Newspaper, group: 'Холдинг' },
  { system: 'Холдинг — AI новости', url: '/admin/holding/ai-news', icon: Bot, group: 'Холдинг' },
  { system: 'Холдинг — модерация', url: '/admin/holding/moderation', icon: ShoppingBag, group: 'Холдинг' },
  { system: 'Холдинг — календарь', url: '/admin/holding/calendar', icon: Calendar, group: 'Холдинг' },
  { system: 'Холдинг — аналитика', url: '/admin/holding/analytics', icon: BarChart3, group: 'Холдинг' },
  { system: 'Холдинг — создать город', url: '/admin/holding/create-city', icon: Building2, group: 'Холдинг' },
  { system: 'Холдинг — рост', url: '/admin/holding/growth', icon: TrendingUp, group: 'Холдинг' },
  { system: 'Холдинг — рост городов', url: '/admin/holding/growth/cities', icon: Globe, group: 'Холдинг' },
  { system: 'Холдинг — предложения роста', url: '/admin/holding/growth/suggestions', icon: Megaphone, group: 'Холдинг' },
  { system: 'Холдинг — аналитика роста', url: '/admin/holding/growth/analytics', icon: BarChart3, group: 'Холдинг' },

  // Базовая админка
  { system: 'Админ-панель', url: '/admin', icon: Settings, group: 'Администрирование' },
  { system: 'Пользователи', url: '/admin/users', icon: Users, group: 'Администрирование' },
  { system: 'Объявления', url: '/admin/ads', icon: ShoppingBag, group: 'Администрирование' },
  { system: 'Контент', url: '/admin/content', icon: Newspaper, group: 'Администрирование' },
];

const groupColors: Record<string, string> = {
  'Штаб': 'bg-primary/10 text-primary',
  'Новости': 'bg-blue-500/10 text-blue-600',
  'Редакция': 'bg-indigo-500/10 text-indigo-600',
  'AI системы': 'bg-purple-500/10 text-purple-600',
  'Аналитика': 'bg-emerald-500/10 text-emerald-600',
  'Рост': 'bg-orange-500/10 text-orange-600',
  'Инфраструктура': 'bg-cyan-500/10 text-cyan-600',
  'Модерация': 'bg-yellow-500/10 text-yellow-600',
  'Холдинг': 'bg-rose-500/10 text-rose-600',
  'Администрирование': 'bg-secondary text-secondary-foreground',
};

const AdminMapPage = () => {
  const groups = [...new Set(allSystems.map(s => s.group))];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Map className="w-6 h-6 text-primary" />
            Карта управления порталом
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Все системы управления — {allSystems.length} маршрутов
          </p>
        </div>

        {groups.map(group => {
          const items = allSystems.filter(s => s.group === group);
          return (
            <div key={group} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-secondary/30">
                <h2 className="font-semibold text-sm flex items-center gap-2">
                  <Badge className={groupColors[group] || 'bg-secondary'}>{group}</Badge>
                  <span className="text-muted-foreground text-xs">{items.length} систем</span>
                </h2>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/20">
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Система</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Адрес</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.url} className="border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{item.system}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <Link to={item.url} className="text-primary hover:underline font-mono text-xs">
                          {item.url}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default AdminMapPage;
