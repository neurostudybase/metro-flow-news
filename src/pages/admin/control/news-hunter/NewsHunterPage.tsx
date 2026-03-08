import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { Search, Globe, FileText, PenTool, Image, Tag, BarChart3, Settings, Clock, Zap, ArrowRight, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MOCK_HUNTER_QUEUE, MOCK_HUNTER_LOG } from '@/data/newsHunterData';

const pipelineSteps = [
  { icon: Search, label: 'AI News Scanner', desc: 'Поиск новостей по ключевым словам', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: Globe, label: 'AI Page Analyzer', desc: 'Извлечение текста и изображений', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { icon: Tag, label: 'AI News Validator', desc: 'Проверка: Тюмень, новость, не реклама', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { icon: PenTool, label: 'AI Rewriter', desc: 'Переписывание и уникализация текста', color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { icon: Image, label: 'AI Image Extractor', desc: 'Извлечение или подбор изображений', color: 'text-green-500', bg: 'bg-green-500/10' },
  { icon: FileText, label: 'AI Draft Creator', desc: 'Создание черновика с SEO-блоком', color: 'text-primary', bg: 'bg-primary/10' },
];

const sections = [
  { label: 'Очередь найденных', desc: 'Все найденные и анализируемые новости', icon: Search, to: '/admin/control/news-hunter/queue', count: `${MOCK_HUNTER_QUEUE.filter(n => n.status === 'found' || n.status === 'analyzing').length} в очереди` },
  { label: 'Журнал поиска', desc: 'История поиска и обработки', icon: BarChart3, to: '/admin/control/news-hunter/log', count: `${MOCK_HUNTER_LOG.length} записей` },
  { label: 'Настройки поиска', desc: 'Ключевые слова, частота, источники', icon: Settings, to: '/admin/control/news-hunter/settings' },
];

const stats = {
  found: MOCK_HUNTER_QUEUE.filter(n => n.status === 'found').length,
  analyzing: MOCK_HUNTER_QUEUE.filter(n => n.status === 'analyzing').length,
  ready: MOCK_HUNTER_QUEUE.filter(n => n.status === 'ready').length,
  rejected: MOCK_HUNTER_QUEUE.filter(n => n.status === 'rejected').length,
  rewriting: MOCK_HUNTER_QUEUE.filter(n => n.status === 'rewriting').length,
  drafts: MOCK_HUNTER_QUEUE.filter(n => n.status === 'draft_created').length,
};

const autoTasks = [
  { label: 'Поиск новостей', interval: 'каждые 30 мин', icon: Search, active: true },
  { label: 'Анализ найденных статей', interval: 'непрерывно', icon: Globe, active: true },
  { label: 'Добавление в очередь', interval: 'автоматически', icon: FileText, active: true },
  { label: 'Переписывание новостей', interval: 'по мере поступления', icon: PenTool, active: true },
  { label: 'Создание черновиков', interval: 'после переписывания', icon: CheckCircle, active: true },
];

const NewsHunterPage = () => {
  const { toast } = useToast();

  const handleRunSearch = () => {
    toast({ title: '🔍 AI News Hunter запущен', description: 'Поиск новостей по ключевым словам Тюмени начат...' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI News Hunter</h1>
            <p className="text-muted-foreground">Автоматический поиск новостей в интернете по Тюмени</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/control/news">
              <Button variant="outline" size="sm">← AI Редакция</Button>
            </Link>
            <Button onClick={handleRunSearch} className="gap-2">
              <Zap className="h-4 w-4" /> Запустить поиск
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Найдено', value: stats.found, icon: Search, color: 'text-blue-500' },
            { label: 'Анализ', value: stats.analyzing, icon: Loader2, color: 'text-yellow-500' },
            { label: 'Готово', value: stats.ready, icon: CheckCircle, color: 'text-green-500' },
            { label: 'Переписывается', value: stats.rewriting, icon: PenTool, color: 'text-orange-500' },
            { label: 'Черновики', value: stats.drafts, icon: FileText, color: 'text-primary' },
            { label: 'Отклонено', value: stats.rejected, icon: XCircle, color: 'text-destructive' },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="p-4 text-center">
                <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pipeline */}
        <Card>
          <CardHeader><CardTitle className="text-lg">AI News Hunter Pipeline</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              {pipelineSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${step.bg}`}>
                    <step.icon className={`h-4 w-4 ${step.color}`} />
                    <div>
                      <div className="text-xs font-semibold">{step.label}</div>
                      <div className="text-[10px] text-muted-foreground">{step.desc}</div>
                    </div>
                  </div>
                  {i < pipelineSteps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="grid md:grid-cols-3 gap-4">
          {sections.map(s => (
            <Link key={s.to} to={s.to}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-2"><s.icon className="h-5 w-5 text-primary" /></div>
                  <div className="flex-1">
                    <div className="font-semibold">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                    {s.count && <Badge variant="secondary" className="mt-2 text-xs">{s.count}</Badge>}
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground mt-1" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Auto Tasks */}
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Clock className="h-5 w-5" /> Автоматические задачи</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {autoTasks.map(t => (
                <div key={t.label} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <t.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{t.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{t.interval}</span>
                    <Badge variant={t.active ? 'default' : 'secondary'} className="text-[10px]">
                      {t.active ? 'Активна' : 'Отключена'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent log */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Последние действия</CardTitle>
            <Link to="/admin/control/news-hunter/log"><Button variant="ghost" size="sm">Все записи →</Button></Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {MOCK_HUNTER_LOG.slice(0, 5).map(log => (
                <div key={log.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <span className="text-sm font-medium">{log.action}</span>
                    {log.query && <span className="text-xs text-muted-foreground ml-2">«{log.query}»</span>}
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{log.result}</div>
                    <div className="text-[10px] text-muted-foreground">{new Date(log.timestamp).toLocaleString('ru')}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default NewsHunterPage;
