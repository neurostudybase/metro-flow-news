import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { Newspaper, FileText, CheckCircle, Globe, Settings, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MOCK_QUEUE } from '@/data/newsPipelineData';

const sections = [
  { label: 'Очередь новостей', desc: 'Все найденные и обработанные материалы', icon: Newspaper, to: '/admin/control/news/queue', count: MOCK_QUEUE.filter(n => n.status === 'needs_approval').length + ' на проверке' },
  { label: 'Черновики', desc: 'Подготовленные AI-материалы', icon: FileText, to: '/admin/control/news/drafts', count: MOCK_QUEUE.filter(n => n.status === 'draft').length + ' черновиков' },
  { label: 'Опубликованные', desc: 'Одобренные и опубликованные новости', icon: CheckCircle, to: '/admin/control/news/published', count: MOCK_QUEUE.filter(n => n.status === 'published').length + ' опубл.' },
  { label: 'Источники', desc: 'RSS, API, сайты', icon: Globe, to: '/admin/control/news/sources' },
  { label: 'Промпты', desc: 'Шаблоны инструкций для AI', icon: MessageSquare, to: '/admin/control/news/prompts' },
  { label: 'Настройки', desc: 'Параметры AI News System', icon: Settings, to: '/admin/control/news/settings' },
];

const ControlNewsPage = () => (
  <AdminLayout>
    <div>
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><Newspaper className="w-6 h-6 text-primary" /> AI News System</h1>
      <p className="text-muted-foreground mb-6">Полный цикл: сбор → генерация → проверка → публикация</p>
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
    </div>
  </AdminLayout>
);

export default ControlNewsPage;
