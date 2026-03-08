import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, ScrollText } from 'lucide-react';
import { EDITORIAL_LOG, EDITORIAL_ROLE_LABELS } from '@/data/editorialData';

const EditorialLogPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Link to="/admin/control/editorial"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Редакция</Button></Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><ScrollText className="w-6 h-6 text-primary" /> Журнал редакции</h1>
            <p className="text-muted-foreground text-sm">История всех действий</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Время</TableHead>
                <TableHead>Действие</TableHead>
                <TableHead>Материал</TableHead>
                <TableHead>Кто</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Детали</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {EDITORIAL_LOG.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{new Date(entry.timestamp).toLocaleString('ru')}</TableCell>
                  <TableCell className="text-sm font-medium">{entry.action}</TableCell>
                  <TableCell>
                    {entry.articleId ? (
                      <Link to={`/admin/control/editorial/article/${entry.articleId}`} className="text-sm text-primary hover:underline">{entry.articleTitle}</Link>
                    ) : '—'}
                  </TableCell>
                  <TableCell className="text-sm">{entry.performedBy}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{EDITORIAL_ROLE_LABELS[entry.role]}</Badge></TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{entry.details || '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditorialLogPage;
