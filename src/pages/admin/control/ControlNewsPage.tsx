import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { Newspaper, FileText, CheckCircle, Globe, Settings, MessageSquare, ArrowRight, Zap, Search, PenTool, Image, Tag, Send, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_QUEUE } from '@/data/newsPipelineData';
import { useToast } from '@/hooks/use-toast';

const sections = [
  { label: 'Очередь новостей', desc: 'Все найденные и обработанные материалы', icon: Newspaper, to: '/admin/control/news/queue', count: MOCK_QUEUE.filter(n => n.status === 'needs_approval').length + ' на проверке' },
  { label: 'Черновики', desc: 'Подготовленные AI-материалы', icon: FileText, to: '/admin/control/news/drafts', count: MOCK_QUEUE.filter(n => n.status === 'draft').length + ' черновиков' },
  { label: 'Опубликованные', desc: 'Одобренные и опубликованные новости', icon: CheckCircle, to: '/admin/control/news/published', count: MOCK_QUEUE.filter(n => n.status === 'published').length + ' опубл.' },
  { label: 'Источники', desc: 'RSS, API, сайты', icon: Globe, to: '/admin/control/news/sources' },
  { label: 'Промпты', desc: 'Шаблоны инструкций для AI', icon: MessageSquare, to: '/admin/control/news/prompts' },
  { label: 'Настройки', desc: 'Параметры AI News System', icon: Settings, to: '/admin/control/news/settings' },
];

const pipelineSteps = [
  { icon: Search, label: 'AI Source Scanner', desc: 'Поиск новостей из RSS, API, сайтов', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: Tag, label: 'AI Classifier', desc: 'Определение категории и приоритета', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { icon: PenTool, label: 'AI Rewriter', desc: 'Переписывание и генерация уникального текста', color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { icon: Image, label: 'AI Image Loader', desc: 'Загрузка или подбор изображения', color: 'text-green-500', bg: 'bg-green-500/10' },
  { icon: FileText, label: 'AI Draft Creator', desc: 'Создание черновика с SEO-блоком', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { icon: Send, label: 'Публикация', desc: 'Ручное подтверждение администратором', color: 'text-primary', bg: 'bg-primary/10' },
];

const stats = {
  found: MOCK_QUEUE.filter(n => n.status === 'found').length,
  processing: MOCK_QUEUE.filter(n => n.status === 'processing').length,
  drafts: MOCK_QUEUE.filter(n => n.status === 'draft').length,
  pending: MOCK_QUEUE.filter(n => n.status === 'needs_approval').length,
  published: MOCK_QUEUE.filter(n => n.status === 'published').length,
  rejected: MOCK_QUEUE.filter(n => n.status === 'rejected').length,
};

const ControlNewsPage = () => {
  const { toast } = useToast();

  const handleQuickAction = (action: string) => {
    toast({ title: 'AI задача запущена', description: action });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Newspaper className="w-6 h-6 text-primary" /> AI News System</h1>
            <p className="text-muted-foreground text-sm">Полный цикл: сбор → классификация → генерация → проверка → публикация</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleQuickAction('Сканирование источников')}>
              <Search className="w-4 h-4 mr-1" /> Найти новости
            </Button>
            <Button size="sm" onClick={() => handleQuickAction('Генерация 10 новостей')}>
              <Zap className="w-4 h-4 mr-1" /> Сгенерировать 10 новостей
            </Button>
          </div>
        </div>

        {/* Pipeline Visualization */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">AI News Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              {pipelineSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${step.bg}`}>
                    <step.icon className={`w-4 h-4 ${step.color}`} />
                    <div>
                      <div className="text-xs font-semibold">{step.label}</div>
                      <div className="text-[10px] text-muted-foreground">{step.desc}</div>
                    </div>
                  </div>
                  {i < pipelineSteps.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: 'Найдено', value: stats.found, color: 'text-blue-500' },
            { label: 'Обработка', value: stats.processing, color: 'text-amber-500' },
            { label: 'Черновики', value: stats.drafts, color: 'text-cyan-500' },
            { label: 'На проверке', value: stats.pending, color: 'text-orange-500' },
            { label: 'Опубликовано', value: stats.published, color: 'text-green-500' },
            { label: 'Отклонено', value: stats.rejected, color: 'text-destructive' },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="p-3 text-center">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map(s => (
            <Link key={s.to} to={s.to}>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="bg-primary/10 rounded-md p-2.5"><s.icon className="w-5 h-5 text-primary" /></div>
                  <div>
                    <h3 className="font-semibold text-sm">{s.label}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                    {s.count && <p className="text-xs text-primary mt-1">{s.count}</p>}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Последние действия
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {MOCK_QUEUE.slice(0, 5).map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 rounded bg-secondary/30">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{item.title || item.originalTitle}</div>
                    <div className="text-xs text-muted-foreground">{item.sourceName} • {item.category}</div>
                  </div>
                  <Badge variant={
                    item.status === 'published' ? 'default' :
                    item.status === 'needs_approval' ? 'secondary' :
                    'outline'
                  } className="text-xs ml-2 shrink-0">
                    {item.status === 'found' && 'Найдено'}
                    {item.status === 'processing' && 'Обработка'}
                    {item.status === 'draft' && 'Черновик'}
                    {item.status === 'needs_approval' && 'На проверке'}
                    {item.status === 'published' && 'Опубликовано'}
                    {item.status === 'rejected' && 'Отклонено'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ControlNewsPage;
