import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Link } from 'react-router-dom';
import { Lightbulb, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

type TopicStatus = 'новая' | 'в разработке' | 'создана' | 'опубликована';

interface Topic {
  id: number;
  title: string;
  source: string;
  potential: 'высокий' | 'средний' | 'низкий';
  status: TopicStatus;
}

const initialTopics: Topic[] = [
  { id: 1, title: 'Лучшие рестораны Тюмени', source: 'Поисковые тренды', potential: 'высокий', status: 'опубликована' },
  { id: 2, title: 'ТОП автосервисов Тюмени', source: 'Объявления', potential: 'высокий', status: 'создана' },
  { id: 3, title: 'Детские сады Тюмени', source: 'Поисковые тренды', potential: 'средний', status: 'в разработке' },
  { id: 4, title: 'Лучшие ЖК Тюмени 2025', source: 'Новости города', potential: 'высокий', status: 'в разработке' },
  { id: 5, title: 'Стоматологии Тюмени', source: 'Популярные запросы', potential: 'средний', status: 'новая' },
  { id: 6, title: 'Фитнес-клубы Тюмени', source: 'Поисковые тренды', potential: 'средний', status: 'новая' },
  { id: 7, title: 'Барбершопы Тюмени', source: 'Популярные запросы', potential: 'низкий', status: 'новая' },
  { id: 8, title: 'Доставка еды Тюмени', source: 'Объявления', potential: 'высокий', status: 'новая' },
];

const statusColor: Record<TopicStatus, string> = {
  'новая': 'bg-muted text-muted-foreground',
  'в разработке': 'bg-blue-100 text-blue-700',
  'создана': 'bg-yellow-100 text-yellow-700',
  'опубликована': 'bg-green-100 text-green-700',
};

const potentialColor: Record<string, string> = {
  'высокий': 'text-green-600 font-medium',
  'средний': 'text-yellow-600',
  'низкий': 'text-muted-foreground',
};

const GrowthTopicsPage = () => {
  const { createTask } = useAI();
  const [topics] = useState(initialTopics);
  const [filter, setFilter] = useState<string>('все');

  const filtered = filter === 'все' ? topics : topics.filter(t => t.status === filter);

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" /> AI Content Discovery
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Поиск и анализ тем для роста портала</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/control/growth"><Button variant="outline" size="sm">← Growth Engine</Button></Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {['все', 'новая', 'в разработке', 'создана', 'опубликована'].map(s => (
            <Button key={s} variant={filter === s ? 'default' : 'outline'} size="sm" onClick={() => setFilter(s)}>{s}</Button>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <Button size="sm" className="gap-1.5" onClick={() => createTask({ moduleId: 'content', type: 'scan', description: 'Поиск новых тем для Growth Engine', status: 'new', priority: 'high', needsApproval: false })}>
            <RefreshCw className="w-3.5 h-3.5" /> Найти новые темы
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5"><Plus className="w-3.5 h-3.5" /> Добавить тему вручную</Button>
        </div>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Темы ({filtered.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">ID</th>
                    <th className="pb-2 font-medium">Тема</th>
                    <th className="pb-2 font-medium">Источник</th>
                    <th className="pb-2 font-medium">Потенциал</th>
                    <th className="pb-2 font-medium">Статус</th>
                    <th className="pb-2 font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(t => (
                    <tr key={t.id} className="border-b last:border-0">
                      <td className="py-2 text-muted-foreground">{t.id}</td>
                      <td className="py-2 font-medium">{t.title}</td>
                      <td className="py-2 text-muted-foreground">{t.source}</td>
                      <td className={`py-2 ${potentialColor[t.potential]}`}>{t.potential}</td>
                      <td className="py-2"><span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[t.status]}`}>{t.status}</span></td>
                      <td className="py-2">
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="text-xs h-6 px-2" onClick={() => createTask({ moduleId: 'content', type: 'generate', description: `Генерация статьи: ${t.title}`, status: 'new', priority: 'medium', needsApproval: true })}>Генерировать</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default GrowthTopicsPage;
