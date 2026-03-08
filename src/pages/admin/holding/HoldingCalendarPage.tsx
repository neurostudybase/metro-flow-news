import HoldingLayout from '@/components/holding/HoldingLayout';
import { useCity } from '@/contexts/CityContext';
import { Calendar } from 'lucide-react';
import { MOCK_HOLDING_NEWS, STATUS_LABELS, STATUS_COLORS } from '@/data/holdingData';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const HoldingCalendarPage = () => {
  const { cities } = useCity();

  // Group news by date
  const byDate: Record<string, typeof MOCK_HOLDING_NEWS> = {};
  MOCK_HOLDING_NEWS.forEach(n => {
    const d = n.publishedAt || n.publishAt || n.createdAt;
    if (!byDate[d]) byDate[d] = [];
    byDate[d].push(n);
  });

  const dates = Object.keys(byDate).sort();

  return (
    <HoldingLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" /> Редакционный календарь
        </h1>
        <p className="text-muted-foreground mb-6">Планирование публикаций по всем городам</p>

        <div className="space-y-4">
          {dates.map(date => (
            <div key={date} className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">{date}</h3>
              <div className="space-y-2">
                {byDate[date].map(n => (
                  <div key={n.id} className="flex items-center justify-between text-sm border-b border-border pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[n.status]}`}>{STATUS_LABELS[n.status]}</span>
                      <span className="font-medium">{n.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {n.cityIds.map(cid => cities.find(c => c.id === cid)?.name).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </HoldingLayout>
  );
};

export default HoldingCalendarPage;
