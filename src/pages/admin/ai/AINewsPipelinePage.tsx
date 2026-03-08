import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Workflow, Search, FileText, CheckSquare, Send, Settings, ScrollText, Sparkles, ArrowRight } from 'lucide-react';
import { useAI } from '@/contexts/AIContext';
import { useToast } from '@/hooks/use-toast';
import { MOCK_QUEUE } from '@/data/newsPipelineData';

const PIPELINE_STEPS = [
  { icon: Search, label: 'Сбор', desc: 'AI ищет новости из источников', color: 'text-blue-500' },
  { icon: Sparkles, label: 'Анализ', desc: 'Классификация по городу и рубрике', color: 'text-amber-500' },
  { icon: FileText, label: 'Генерация', desc: 'AI пишет текст, заголовок, SEO', color: 'text-green-500' },
  { icon: CheckSquare, label: 'Проверка', desc: 'Материал в очереди на подтверждение', color: 'text-orange-500' },
  { icon: Send, label: 'Публикация', desc: 'Администратор подтверждает', color: 'text-primary' },
];

const AI_ROLES = [
  { name: 'AI Source Scanner', desc: 'Поиск новостей и сбор материалов' },
  { name: 'AI City Classifier', desc: 'Определение города, района, релевантности' },
  { name: 'AI News Writer', desc: 'Написание новости в стиле портала' },
  { name: 'AI Headline Generator', desc: 'Несколько вариантов заголовков' },
  { name: 'AI SEO Editor', desc: 'SEO title, description, tags' },
  { name: 'AI Fact Check Assistant', desc: 'Пометка рисков и неполных данных' },
];

const NAV_CARDS = [
  { to: '/admin/ai/news-queue', icon: Workflow, label: 'Очередь новостей', desc: 'Все материалы в pipeline', count: MOCK_QUEUE.length },
  { to: '/admin/ai/news/drafts', icon: FileText, label: 'Черновики', desc: 'Подготовленные AI новости', count: MOCK_QUEUE.filter(n => n.status === 'draft').length },
  { to: '/admin/ai/news/pending', icon: CheckSquare, label: 'На подтверждении', desc: 'Ожидают решения администратора', count: MOCK_QUEUE.filter(n => n.status === 'needs_approval').length },
  { to: '/admin/ai/news/published', icon: Send, label: 'Опубликованные', desc: 'Опубликованные новости' },
  { to: '/admin/ai/news/sources', icon: Search, label: 'Источники', desc: 'RSS, API и сайты' },
  { to: '/admin/ai/news-prompts', icon: ScrollText, label: 'Промпты', desc: 'Шаблоны AI-промптов' },
  { to: '/admin/ai/news/settings', icon: Settings, label: 'Настройки', desc: 'Параметры pipeline' },
  { to: '/admin/ai/news/log', icon: ScrollText, label: 'Журнал', desc: 'Лог публикаций' },
];

const AINewsPipelinePage = () => {
  const { createTask, modules } = useAI();
  const { toast } = useToast();
  const mod = modules.find(m => m.id === 'news');

  const handleQuickAction = (desc: string) => {
    if (!mod?.enabled) { toast({ title: 'Модуль отключён', variant: 'destructive' }); return; }
    createTask({ moduleId: 'news', type: 'Pipeline', description: desc, status: 'new', priority: 'medium', needsApproval: true });
    toast({ title: 'Задача создана', description: desc });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Workflow className="w-6 h-6 text-primary" /> AI News Pipeline</h1>
            <p className="text-muted-foreground text-sm">Автоматический поток городских новостей</p>
          </div>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${mod?.enabled ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
            {mod?.enabled ? '● Активен' : '○ Отключён'}
          </div>
        </div>

        {/* Pipeline steps */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-sm mb-3">Этапы pipeline</h2>
          <div className="flex flex-wrap items-center gap-2">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                  <step.icon className={`w-4 h-4 ${step.color}`} />
                  <div>
                    <div className="text-xs font-semibold">{step.label}</div>
                    <div className="text-[10px] text-muted-foreground">{step.desc}</div>
                  </div>
                </div>
                {i < PIPELINE_STEPS.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-sm mb-3">Быстрые действия</h2>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => handleQuickAction('Найти новые новости из всех источников')}>Найти новые новости</Button>
            <Button size="sm" variant="outline" onClick={() => handleQuickAction('Сгенерировать 10 новостей по последним событиям')}>Сгенерировать 10 новостей</Button>
            <Button size="sm" variant="outline" onClick={() => handleQuickAction('Проверить очередь и обработать найденные')}>Проверить очередь</Button>
            <Button size="sm" variant="outline" onClick={() => handleQuickAction('Проверить SEO-рекомендации для черновиков')}>Проверить SEO</Button>
            <Button size="sm" variant="outline" onClick={() => handleQuickAction('Найти проблемные материалы с пометками')}>Проблемные материалы</Button>
          </div>
        </div>

        {/* Navigation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {NAV_CARDS.map(card => (
            <Link key={card.to} to={card.to} className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <card.icon className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">{card.label}</span>
                {card.count !== undefined && <span className="ml-auto text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">{card.count}</span>}
              </div>
              <p className="text-xs text-muted-foreground">{card.desc}</p>
            </Link>
          ))}
        </div>

        {/* AI Roles */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="font-semibold text-sm mb-3">AI-роли для новостей</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {AI_ROLES.map(role => (
              <div key={role.name} className="bg-muted rounded-lg px-3 py-2">
                <div className="text-xs font-semibold">{role.name}</div>
                <div className="text-[10px] text-muted-foreground">{role.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AINewsPipelinePage;
