import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar } from 'lucide-react';
import { EDITORIAL_ARTICLES, EDITORIAL_STATUS_LABELS, EDITORIAL_STATUS_COLORS } from '@/data/editorialData';

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const today = new Date();

const getWeekDates = () => {
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};

const EditorialCalendarPage = () => {
  const weekDates = getWeekDates();

  const getArticlesForDate = (date: Date) => {
    const dateStr = date.toISOString().slice(0, 10);
    return EDITORIAL_ARTICLES.filter(a => {
      if (a.publishAt && a.publishAt.slice(0, 10) === dateStr) return true;
      if (a.publishedAt && a.publishedAt.slice(0, 10) === dateStr) return true;
      if (a.status === 'draft' && a.createdAt.slice(0, 10) === dateStr) return true;
      return false;
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/admin/control/editorial"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Редакция</Button></Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Calendar className="w-6 h-6 text-primary" /> Календарь публикаций</h1>
            <p className="text-muted-foreground text-sm">Неделя {weekDates[0].toLocaleDateString('ru')} — {weekDates[6].toLocaleDateString('ru')}</p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, i) => {
            const articles = getArticlesForDate(date);
            const isToday = date.toDateString() === today.toDateString();
            return (
              <div key={i} className={`min-h-[200px] rounded-lg border p-2 ${isToday ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                <div className="text-center mb-2">
                  <div className="text-xs text-muted-foreground">{days[i]}</div>
                  <div className={`text-sm font-bold ${isToday ? 'text-primary' : ''}`}>{date.getDate()}</div>
                </div>
                <div className="space-y-1">
                  {articles.map(a => (
                    <Link key={a.id} to={`/admin/control/editorial/article/${a.id}`}>
                      <div className="text-[10px] p-1.5 rounded bg-secondary/50 hover:bg-secondary transition-colors">
                        <div className="font-medium truncate">{a.title}</div>
                        <span className={`inline-block mt-0.5 text-[9px] px-1 py-0 rounded ${EDITORIAL_STATUS_COLORS[a.status]}`}>
                          {EDITORIAL_STATUS_LABELS[a.status]}
                        </span>
                      </div>
                    </Link>
                  ))}
                  {articles.length === 0 && <div className="text-[10px] text-muted-foreground text-center py-4">—</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scheduled */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Запланированные публикации</CardTitle></CardHeader>
          <CardContent>
            {EDITORIAL_ARTICLES.filter(a => a.publishAt).length === 0 ? (
              <p className="text-sm text-muted-foreground">Нет запланированных публикаций</p>
            ) : (
              <div className="space-y-2">
                {EDITORIAL_ARTICLES.filter(a => a.publishAt).map(a => (
                  <Link key={a.id} to={`/admin/control/editorial/article/${a.id}`}>
                    <div className="flex items-center justify-between p-2 rounded bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div>
                        <div className="text-sm font-medium">{a.title}</div>
                        <div className="text-xs text-muted-foreground">{new Date(a.publishAt!).toLocaleString('ru')}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">{a.category}</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EditorialCalendarPage;
