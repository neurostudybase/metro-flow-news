import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockRecommendations, getSignalsForAI } from '@/data/contentAnalyticsData';

const typeLabels: Record<string, string> = {
  write_more: '📝 Писать больше',
  boost_category: '📈 Усилить рубрику',
  create_collection: '📋 Создать подборку',
  reduce: '📉 Пересмотреть',
};

const priorityColors: Record<string, string> = {
  high: 'destructive' as const,
  medium: 'default' as const,
  low: 'secondary' as const,
};

const RecommendationsPage = () => {
  const signals = getSignalsForAI();

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Lightbulb className="w-6 h-6 text-primary" /> AI-рекомендации</h1>
            <p className="text-muted-foreground text-sm">Советы для редакции на основе аналитики</p>
          </div>
          <Link to="/admin/control/analytics"><Button variant="outline" size="sm">← Аналитика</Button></Link>
        </div>

        {/* Signals for AI systems */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">🔥 Популярные темы → AI Journalist</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {signals.popularTopics.map(t => (
                  <Badge key={t} variant="default">{t}</Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Эти темы передаются AI Журналисту для генерации статей</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">⚠️ Слабые рубрики → AI Front Editor</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {signals.weakCategories.map(c => (
                  <Badge key={c} variant="outline">{c}</Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">AI редактор главной снизит приоритет этих рубрик</p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          {mockRecommendations.map(r => (
            <Card key={r.id}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{typeLabels[r.type]}</span>
                    <Badge variant={priorityColors[r.priority] as any}>{r.priority}</Badge>
                  </div>
                  <h3 className="font-semibold text-sm">{r.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{r.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Тема: {r.relatedTopic} · {r.createdAt}</p>
                </div>
                <Button size="sm" variant="outline"><ArrowRight className="w-4 h-4" /></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default RecommendationsPage;
