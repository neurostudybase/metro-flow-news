import { useState } from 'react';
import HoldingLayout from '@/components/holding/HoldingLayout';
import { Lightbulb, Check, X } from 'lucide-react';
import { GROWTH_SUGGESTIONS, GrowthSuggestion } from '@/data/growthCitiesData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const typeLabels: Record<string, string> = { launch_portal: 'Запуск портала', boost_seo: 'SEO', create_articles: 'Статьи', increase_ads: 'Объявления' };
const priorityColors: Record<string, string> = { high: 'bg-red-100 text-red-800', medium: 'bg-amber-100 text-amber-800', low: 'bg-gray-100 text-gray-800' };
const priorityLabels: Record<string, string> = { high: 'Высокий', medium: 'Средний', low: 'Низкий' };

const GrowthSuggestionsPage = () => {
  const [suggestions, setSuggestions] = useState<GrowthSuggestion[]>(GROWTH_SUGGESTIONS);

  const updateStatus = (id: string, status: 'accepted' | 'rejected') => {
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <HoldingLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" /> AI Предложения
        </h1>
        <p className="text-muted-foreground mb-6">Рекомендации AI по расширению и усилению сети порталов</p>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тип</TableHead>
                <TableHead>Город</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead>Приоритет</TableHead>
                <TableHead>Ожидаемый эффект</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suggestions.map(s => (
                <TableRow key={s.id}>
                  <TableCell><Badge variant="outline">{typeLabels[s.type]}</Badge></TableCell>
                  <TableCell className="font-medium">{s.cityName}</TableCell>
                  <TableCell className="text-sm max-w-[280px]">{s.description}</TableCell>
                  <TableCell><Badge className={priorityColors[s.priority]}>{priorityLabels[s.priority]}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.expectedImpact}</TableCell>
                  <TableCell>
                    <Badge variant={s.status === 'accepted' ? 'default' : s.status === 'rejected' ? 'destructive' : 'secondary'}>
                      {s.status === 'pending' ? 'Ожидает' : s.status === 'accepted' ? 'Принято' : 'Отклонено'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {s.status === 'pending' && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => updateStatus(s.id, 'accepted')}><Check className="w-3 h-3" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => updateStatus(s.id, 'rejected')}><X className="w-3 h-3" /></Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </HoldingLayout>
  );
};

export default GrowthSuggestionsPage;
