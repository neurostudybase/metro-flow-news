import HoldingLayout from '@/components/holding/HoldingLayout';
import { MOCK_NEWSROOM, NEWSROOM_LABELS, NewsroomColumn } from '@/data/mediaSystemData';
import { LayoutGrid } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const columns: NewsroomColumn[] = ['draft', 'ai', 'review', 'scheduled', 'published', 'rejected'];

const NewsroomPage = () => (
  <HoldingLayout>
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><LayoutGrid className="w-6 h-6 text-primary" /> Newsroom</h1>
        <p className="text-muted-foreground text-sm">Канбан редакционного процесса по всем городам</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
        {columns.map(col => {
          const items = MOCK_NEWSROOM.filter(n => n.column === col);
          return (
            <div key={col} className="bg-secondary/40 rounded-md border border-border min-h-[480px] flex flex-col">
              <div className="px-2 py-2 border-b border-border flex items-center justify-between sticky top-0 bg-secondary/60">
                <span className="text-[11px] font-semibold uppercase tracking-wider">{NEWSROOM_LABELS[col]}</span>
                <Badge variant="secondary" className="h-5 text-[10px]">{items.length}</Badge>
              </div>
              <div className="p-2 space-y-2 flex-1">
                {items.map(card => (
                  <div key={card.id} className="bg-card border border-border rounded p-2">
                    <div className="text-[13px] font-medium leading-snug line-clamp-3">{card.title}</div>
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{card.cityId}</span>
                      <span>{card.author}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{card.updated}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </HoldingLayout>
);

export default NewsroomPage;
