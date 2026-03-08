import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Brain, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const mockContent = [
  { id: 'c-1', title: 'Куда сходить в Тюмени в марте 2026', type: 'Подборка', status: 'draft', date: '2026-03-08' },
  { id: 'c-2', title: 'Лучшие рестораны Тюмени — ТОП 15', type: 'Рейтинг', status: 'needs_approval', date: '2026-03-07' },
  { id: 'c-3', title: 'ТОП автосервисов Тюмени', type: 'Рейтинг', status: 'published', date: '2026-03-05' },
  { id: 'c-4', title: 'Где купить квартиру в Тюмени в 2026', type: 'Гид', status: 'draft', date: '2026-03-08' },
  { id: 'c-5', title: 'Лучшие детские сады Тюмени', type: 'Подборка', status: 'published', date: '2026-03-01' },
];

const statusMap: Record<string, { label: string; color: string }> = {
  draft: { label: 'Черновик', color: 'bg-muted text-muted-foreground' },
  needs_approval: { label: 'На проверке', color: 'bg-yellow-100 text-yellow-700' },
  published: { label: 'Опубликовано', color: 'bg-green-100 text-green-700' },
};

const ControlContentPage = () => {
  const { createTask } = useAI();

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Brain className="w-6 h-6 text-primary" /> AI Content Studio</h1>
            <p className="text-muted-foreground text-sm">Городские подборки, статьи, гиды</p>
          </div>
          <Button size="sm" onClick={() => createTask({ moduleId: 'content', type: 'generate', description: 'Генерация новой городской подборки', status: 'new', priority: 'medium', needsApproval: true })}>
            <Plus className="w-3.5 h-3.5 mr-1" /> Сгенерировать
          </Button>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Материал</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContent.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="text-sm font-medium">{c.title}</TableCell>
                  <TableCell className="text-xs">{c.type}</TableCell>
                  <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${statusMap[c.status]?.color}`}>{statusMap[c.status]?.label}</span></TableCell>
                  <TableCell className="text-xs">{c.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="text-xs h-7">Открыть</Button>
                      {c.status === 'needs_approval' && <Button size="sm" variant="default" className="text-xs h-7">Опубликовать</Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ControlContentPage;
