import HoldingLayout from '@/components/holding/HoldingLayout';
import { MOCK_MEDIA } from '@/data/mediaSystemData';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ImageIcon, Upload, FileText, Video } from 'lucide-react';

const typeIcon = (t: string) => t === 'video' ? <Video className="w-8 h-8 text-muted-foreground" /> : t === 'doc' ? <FileText className="w-8 h-8 text-muted-foreground" /> : <ImageIcon className="w-8 h-8 text-muted-foreground" />;

const MediaLibraryPage = () => (
  <HoldingLayout>
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><ImageIcon className="w-6 h-6 text-primary" /> Медиатека</h1>
          <p className="text-muted-foreground text-sm">{MOCK_MEDIA.length} файлов · {MOCK_MEDIA.filter(m=>m.duplicate).length} дубликатов · AI-описания включены</p>
        </div>
        <Button size="sm"><Upload className="w-4 h-4 mr-1" /> Загрузить</Button>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Поиск по тегам, имени или AI-описанию" className="max-w-sm h-9" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {MOCK_MEDIA.map(m => (
          <div key={m.id} className="bg-card border border-border rounded-md overflow-hidden">
            <div className="aspect-square bg-secondary/40 flex items-center justify-center relative">
              {typeIcon(m.type)}
              {m.duplicate && <span className="absolute top-1 right-1 text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded">DUP</span>}
            </div>
            <div className="p-2">
              <div className="text-[11px] font-mono truncate">{m.name}</div>
              <div className="text-[11px] text-muted-foreground line-clamp-2 mt-1">{m.aiDesc}</div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {m.tags.map(t => <Badge key={t} variant="outline" className="text-[9px] h-4 px-1">{t}</Badge>)}
              </div>
              <div className="flex items-center justify-between mt-1.5 text-[10px] text-muted-foreground">
                <span>{m.cityId}</span><span>{m.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </HoldingLayout>
);

export default MediaLibraryPage;
