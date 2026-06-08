import HoldingLayout from '@/components/holding/HoldingLayout';
import { PIPELINE_STAGES, PIPELINE_COUNTS, MOCK_PIPELINE_ITEMS } from '@/data/mediaSystemData';
import { Workflow, Pause, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PipelinePage = () => (
  <HoldingLayout>
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Workflow className="w-6 h-6 text-primary" /> Контент-пайплайн</h1>
        <p className="text-muted-foreground text-sm">Сквозной поток: источник → переписка → факт-чек → SEO → модерация → расписание → публикация</p>
      </div>

      <div className="bg-card border border-border rounded-md p-4 overflow-x-auto">
        <div className="flex items-stretch gap-2 min-w-[900px]">
          {PIPELINE_STAGES.map((stage, idx) => (
            <div key={stage} className="flex items-stretch gap-2 flex-1">
              <div className="flex-1 border border-border rounded-md p-3 bg-background">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{stage}</div>
                <div className="text-2xl font-bold tabular-nums mt-1">{PIPELINE_COUNTS[stage]}</div>
                <Button size="sm" variant="ghost" className="h-7 px-2 mt-2 text-xs"><Pause className="w-3 h-3 mr-1" /> Пауза</Button>
              </div>
              {idx < PIPELINE_STAGES.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground self-center shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-md">
        <div className="p-3 border-b border-border text-sm font-semibold">Элементы в потоке</div>
        <ul className="divide-y divide-border">
          {MOCK_PIPELINE_ITEMS.map(p => (
            <li key={p.id} className="px-3 py-2 flex items-center justify-between text-sm">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground w-24 shrink-0">{p.stage}</span>
                <span className="truncate">{p.title}</span>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-3 shrink-0">
                <span>{p.cityId}</span>
                <span>{p.agent}</span>
                <Button size="sm" variant="outline" className="h-7">Стоп</Button>
                <Button size="sm" variant="outline" className="h-7">Открыть</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </HoldingLayout>
);

export default PipelinePage;
