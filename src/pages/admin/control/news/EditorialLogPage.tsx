import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ScrollText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EDITORIAL_LOG, EDITORIAL_ROLE_LABELS } from '@/data/editorialData';

const EditorialLogFullPage = () => (
  <AdminLayout>
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link to="/admin/control/news"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Назад</Button></Link>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><ScrollText className="w-6 h-6 text-primary" /> Журнал действий</h1>
          <p className="text-muted-foreground text-sm">Все редакционные действия</p>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Действие</TableHead>
              <TableHead>Материал</TableHead>
              <TableHead>Кто</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Детали</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {EDITORIAL_LOG.map(e => (
              <TableRow key={e.id}>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{new Date(e.timestamp).toLocaleString('ru')}</TableCell>
                <TableCell className="text-sm font-medium">{e.action}</TableCell>
                <TableCell className="text-sm">
                  {e.articleId ? (
                    <Link to={`/admin/control/news/editor/${e.articleId}`} className="text-primary hover:underline">{e.articleTitle}</Link>
                  ) : '—'}
                </TableCell>
                <TableCell className="text-xs">{e.performedBy}</TableCell>
                <TableCell><Badge variant="outline" className="text-[10px]">{EDITORIAL_ROLE_LABELS[e.role]}</Badge></TableCell>
                <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{e.details || '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </AdminLayout>
);

export default EditorialLogFullPage;
