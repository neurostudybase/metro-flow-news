import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { Calendar, X, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface ScheduledItem {
  id: number;
  title: string;
  type: 'статья' | 'новость' | 'SEO-страница';
  date: string;
  status: 'запланировано' | 'готово к публикации' | 'опубликовано' | 'отменено';
}

const initialItems: ScheduledItem[] = [
  { id: 1, title: 'ТОП кафе Тюмени с верандой', type: 'статья', date: '2025-06-12', status: 'запланировано' },
  { id: 2, title: 'Новостройки Тюмени — обзор', type: 'SEO-страница', date: '2025-06-13', status: 'запланировано' },
  { id: 3, title: 'Открытие нового парка в Тюмени', type: 'новость', date: '2025-06-11', status: 'готово к публикации' },
  { id: 4, title: 'Лучшие стоматологии Тюмени', type: 'статья', date: '2025-06-14', status: 'запланировано' },
  { id: 5, title: 'Фитнес-клубы Тюмени — рейтинг', type: 'SEO-страница', date: '2025-06-15', status: 'запланировано' },
  { id: 6, title: 'Развитие транспорта в Тюмени', type: 'новость', date: '2025-06-10', status: 'опубликовано' },
];

const typeColor: Record<string, string> = {
  'статья': 'bg-blue-100 text-blue-700',
  'новость': 'bg-primary/10 text-primary',
  'SEO-страница': 'bg-purple-100 text-purple-700',
};

const statusColor: Record<string, string> = {
  'запланировано': 'bg-muted text-muted-foreground',
  'готово к публикации': 'bg-yellow-100 text-yellow-700',
  'опубликовано': 'bg-green-100 text-green-700',
  'отменено': 'bg-destructive/10 text-destructive',
};

const GrowthCalendarPage = () => {
  const [items, setItems] = useState(initialItems);

  const handleCancel = (id: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'отменено' as const } : i));
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" /> AI Content Calendar
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Календарь публикаций портала</p>
          </div>
          <Link to="/admin/control/growth"><Button variant="outline" size="sm">← Growth Engine</Button></Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{items.length}</div>
            <div className="text-xs text-muted-foreground">Всего</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{items.filter(i => i.status === 'запланировано').length}</div>
            <div className="text-xs text-muted-foreground">Запланировано</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{items.filter(i => i.status === 'готово к публикации').length}</div>
            <div className="text-xs text-muted-foreground">Готово</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{items.filter(i => i.status === 'опубликовано').length}</div>
            <div className="text-xs text-muted-foreground">Опубликовано</div>
          </CardContent></Card>
        </div>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Расписание публикаций</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">Дата</th>
                    <th className="pb-2 font-medium">Заголовок</th>
                    <th className="pb-2 font-medium">Тип</th>
                    <th className="pb-2 font-medium">Статус</th>
                    <th className="pb-2 font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {items.sort((a, b) => a.date.localeCompare(b.date)).map(item => (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="py-2 font-medium">{item.date}</td>
                      <td className="py-2">{item.title}</td>
                      <td className="py-2"><span className={`text-xs px-2 py-0.5 rounded-full ${typeColor[item.type]}`}>{item.type}</span></td>
                      <td className="py-2"><span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[item.status]}`}>{item.status}</span></td>
                      <td className="py-2">
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="text-xs h-6 px-2"><Edit className="w-3 h-3" /></Button>
                          {item.status !== 'отменено' && item.status !== 'опубликовано' && (
                            <Button size="sm" variant="outline" className="text-xs h-6 px-2 text-destructive" onClick={() => handleCancel(item.id)}><X className="w-3 h-3" /></Button>
                          )}
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

export default GrowthCalendarPage;
