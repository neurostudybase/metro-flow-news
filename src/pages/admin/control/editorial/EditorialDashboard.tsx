import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Newspaper, FileText, Calendar, Tag, ListTodo, ScrollText, Users, ArrowRight, Zap, Bot } from 'lucide-react';
import { EDITORIAL_ARTICLES, EDITORIAL_TEAM, EDITORIAL_TASKS, EDITORIAL_STATUS_LABELS, EDITORIAL_ROLE_LABELS } from '@/data/editorialData';
import { useToast } from '@/hooks/use-toast';

const sections = [
  { label: 'Редакционная очередь', desc: 'Все материалы на рассмотрении', icon: Newspaper, to: '/admin/control/editorial/queue', count: EDITORIAL_ARTICLES.filter(a => ['ai_generated', 'editor_review', 'ready_to_publish'].includes(a.status)).length },
  { label: 'Календарь публикаций', desc: 'План и расписание выхода новостей', icon: Calendar, to: '/admin/control/editorial/calendar' },
  { label: 'Темы редакции', desc: 'Тематические направления контента', icon: Tag, to: '/admin/control/editorial/topics' },
  { label: 'Задачи редакции', desc: 'AI и ручные задачи', icon: ListTodo, to: '/admin/control/editorial/tasks' },
  { label: 'Журнал редакции', desc: 'История всех действий', icon: ScrollText, to: '/admin/control/editorial/log' },
];

const EditorialDashboard = () => {
  const { toast } = useToast();
  const statusCounts = {
    draft: EDITORIAL_ARTICLES.filter(a => a.status === 'draft').length,
    ai_generated: 0,
    editor_review: EDITORIAL_ARTICLES.filter(a => a.status === 'review').length,
    ready: EDITORIAL_ARTICLES.filter(a => a.status === 'ready').length,
    published: EDITORIAL_ARTICLES.filter(a => a.status === 'published').length,
    rejected: EDITORIAL_ARTICLES.filter(a => a.status === 'rejected').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Newspaper className="w-6 h-6 text-primary" /> Редакция портала</h1>
            <p className="text-muted-foreground text-sm">Полный цикл подготовки и публикации новостей</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => toast({ title: 'AI ищет инфоповоды...' })}><Zap className="w-4 h-4 mr-1" /> Найти инфоповоды</Button>
            <Button size="sm" onClick={() => toast({ title: 'AI генерирует новости...' })}><Bot className="w-4 h-4 mr-1" /> AI: 5 новостей</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: 'Черновики', value: statusCounts.draft, color: 'text-muted-foreground' },
            { label: 'AI генерация', value: statusCounts.ai_generated, color: 'text-purple-500' },
            { label: 'На проверке', value: statusCounts.editor_review, color: 'text-amber-500' },
            { label: 'Готово', value: statusCounts.ready, color: 'text-blue-500' },
            { label: 'Опубликовано', value: statusCounts.published, color: 'text-green-500' },
            { label: 'Отклонено', value: statusCounts.rejected, color: 'text-destructive' },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="p-3 text-center">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Users className="w-4 h-4" /> Редакционная команда</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {EDITORIAL_TEAM.map(m => (
                <div key={m.id} className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${m.isAI ? 'bg-purple-100 text-purple-700' : 'bg-primary/10 text-primary'}`}>
                    {m.isAI ? <Bot className="w-4 h-4" /> : m.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{m.name}</div>
                    <div className="text-[10px] text-muted-foreground">{EDITORIAL_ROLE_LABELS[m.role]}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map(s => (
            <Link key={s.to} to={s.to}>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="bg-primary/10 rounded-md p-2.5"><s.icon className="w-5 h-5 text-primary" /></div>
                  <div>
                    <h3 className="font-semibold text-sm">{s.label}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                    {s.count !== undefined && <p className="text-xs text-primary mt-1">{s.count} материалов</p>}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Active Tasks */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><ListTodo className="w-4 h-4" /> Активные задачи</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {EDITORIAL_TASKS.filter(t => t.status !== 'done').slice(0, 4).map(t => (
                <div key={t.id} className="flex items-center justify-between p-2 rounded bg-secondary/30">
                  <div>
                    <div className="text-sm font-medium">{t.title}</div>
                    <div className="text-xs text-muted-foreground">{t.assignee}</div>
                  </div>
                  <Badge variant={t.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                    {t.priority === 'high' ? 'Высокий' : t.priority === 'medium' ? 'Средний' : 'Низкий'}
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

export default EditorialDashboard;
