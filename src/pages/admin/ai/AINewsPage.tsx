import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Button } from '@/components/ui/button';
import { Newspaper, FileText, PenLine, RefreshCw, Rss, Send, Archive, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const NEWS_CATEGORIES = ['Город', 'Происшествия', 'Бизнес', 'Спорт', 'Культура', 'Общество'];

const AINewsPage = () => {
  const { tasks, createTask, modules } = useAI();
  const { toast } = useToast();
  const mod = modules.find(m => m.id === 'news')!;
  const modTasks = tasks.filter(t => t.moduleId === 'news').slice(0, 10);

  const handleAction = (type: string, desc: string) => {
    if (!mod.enabled) { toast({ title: 'Модуль отключён', variant: 'destructive' }); return; }
    createTask({ moduleId: 'news', type, description: desc, status: 'new', priority: 'medium', needsApproval: true });
    toast({ title: 'Задача создана', description: desc });
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><Newspaper className="w-6 h-6 text-primary" /> AI News Editor</h1>
        <p className="text-muted-foreground mb-4">Подготовка черновиков новостей, заголовков, анонсов. Ничего не публикуется автоматически.</p>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4 ${mod.enabled ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
          {mod.enabled ? '● Активен' : '○ Отключён'}
        </div>

        {/* Navigation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <Link to="/admin/ai/news/drafts" className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors">
            <div className="flex items-center gap-2 mb-2"><Archive className="w-4 h-4 text-primary" /><span className="font-semibold text-sm">Черновики</span></div>
            <p className="text-xs text-muted-foreground">Новости, подготовленные AI, ожидающие публикации</p>
          </Link>
          <Link to="/admin/ai/news/published" className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors">
            <div className="flex items-center gap-2 mb-2"><Send className="w-4 h-4 text-primary" /><span className="font-semibold text-sm">Опубликованные</span></div>
            <p className="text-xs text-muted-foreground">Управление опубликованными новостями</p>
          </Link>
          <Link to="/admin/ai/news/sources" className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors">
            <div className="flex items-center gap-2 mb-2"><Rss className="w-4 h-4 text-primary" /><span className="font-semibold text-sm">Источники</span></div>
            <p className="text-xs text-muted-foreground">RSS, API и сайты для сбора новостей</p>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <h2 className="font-semibold text-sm mb-3">Быстрые действия</h2>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => handleAction('Генерация новости', 'Сгенерировать 5 новостей по городским событиям')}><FileText className="w-4 h-4 mr-1" /> Сгенерировать 5 новостей</Button>
            <Button size="sm" variant="outline" onClick={() => handleAction('Генерация заголовков', 'Подготовить 10 заголовков для новостей')}><PenLine className="w-4 h-4 mr-1" /> Создать заголовки</Button>
            <Button size="sm" variant="outline" onClick={() => handleAction('Переписывание', 'Переписать материалы в редакционном стиле')}><RefreshCw className="w-4 h-4 mr-1" /> Переписать в стиле редакции</Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <h2 className="font-semibold text-sm mb-3">Категории новостей</h2>
          <div className="flex flex-wrap gap-2">
            {NEWS_CATEGORIES.map(cat => (
              <Button key={cat} size="sm" variant="secondary" onClick={() => handleAction('Генерация новости', `Подготовить новости для раздела "${cat}"`)}>{cat}</Button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-semibold text-sm mb-3">Последние задачи модуля</h2>
          {modTasks.length === 0 ? <p className="text-xs text-muted-foreground">Нет задач</p> : (
            <div className="space-y-2">
              {modTasks.map(t => (
                <div key={t.id} className="flex items-center justify-between text-xs border-b border-border pb-2">
                  <div><span className="font-medium">{t.type}</span> — {t.description}</div>
                  <span className="text-muted-foreground whitespace-nowrap ml-2">{t.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AINewsPage;
