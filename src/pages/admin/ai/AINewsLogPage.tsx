import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { ArrowLeft, ScrollText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { MOCK_PUB_LOG } from '@/data/newsPipelineData';

const AINewsLogPage = () => {
  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Link to="/admin/ai/news-pipeline"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Pipeline</Button></Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><ScrollText className="w-6 h-6 text-primary" /> Журнал публикаций</h1>
            <p className="text-muted-foreground text-sm">Лог всех действий с новостями</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Новость</TableHead>
                <TableHead>Действие</TableHead>
                <TableHead>AI-модуль</TableHead>
                <TableHead>Кто</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Редактировано</TableHead>
                <TableHead>Детали</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PUB_LOG.map(log => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium text-sm max-w-[200px] truncate">{log.newsTitle}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      log.action === 'Опубликовано' ? 'bg-green-100 text-green-700' :
                      log.action === 'Отклонено' ? 'bg-red-100 text-red-700' :
                      'bg-muted text-muted-foreground'
                    }`}>{log.action}</span>
                  </TableCell>
                  <TableCell className="text-xs">{log.aiModule}</TableCell>
                  <TableCell className="text-xs">{log.performedBy}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString('ru')}</TableCell>
                  <TableCell className="text-xs">{log.wasEdited ? <CheckCircle className="w-3 h-3 text-green-600" /> : <span className="text-muted-foreground">—</span>}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{log.details || '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AINewsLogPage;
