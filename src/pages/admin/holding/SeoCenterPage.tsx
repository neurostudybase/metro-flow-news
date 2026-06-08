import HoldingLayout from '@/components/holding/HoldingLayout';
import { useCity } from '@/contexts/CityContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle2 } from 'lucide-react';

const SeoCenterPage = () => {
  const { cities } = useCity();
  return (
    <HoldingLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Search className="w-6 h-6 text-primary" /> SEO Центр</h1>
          <p className="text-muted-foreground text-sm">Sitemap, robots, редиректы, мета-шаблоны, schema.org, OpenGraph по каждому городу</p>
        </div>
        <Tabs defaultValue={cities[0].id} className="w-full">
          <TabsList className="flex-wrap h-auto">
            {cities.map(c => <TabsTrigger key={c.id} value={c.id} className="text-xs">{c.name}</TabsTrigger>)}
          </TabsList>
          {cities.map(c => (
            <TabsContent key={c.id} value={c.id} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-card border border-border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">Sitemap.xml</h3>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs"><CheckCircle2 className="w-3 h-3 mr-1" /> 248 URL</Badge>
                  </div>
                  <code className="text-xs text-muted-foreground">https://{c.domain}/sitemap.xml</code>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">Перегенерировать</Button>
                    <Button size="sm" variant="outline">Открыть</Button>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-md p-3">
                  <h3 className="font-semibold text-sm mb-2">robots.txt</h3>
                  <Textarea className="text-xs font-mono h-24" defaultValue={`User-agent: *\nAllow: /\nSitemap: https://${c.domain}/sitemap.xml`} />
                </div>
              </div>
              <div className="bg-card border border-border rounded-md p-3">
                <h3 className="font-semibold text-sm mb-2">Мета-шаблоны</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-muted-foreground">Title (статья)</label>
                    <Input className="h-8 mt-1 text-xs" defaultValue={`{{title}} — Новости ${c.name} | ${c.domain}`} />
                  </div>
                  <div>
                    <label className="text-muted-foreground">Description (статья)</label>
                    <Input className="h-8 mt-1 text-xs" defaultValue={`{{excerpt}} Читайте на ${c.domain} — главные новости ${c.region}.`} />
                  </div>
                  <div>
                    <label className="text-muted-foreground">OG Image (default)</label>
                    <Input className="h-8 mt-1 text-xs" defaultValue={`https://${c.domain}/og-default.jpg`} />
                  </div>
                  <div>
                    <label className="text-muted-foreground">Schema.org type</label>
                    <Input className="h-8 mt-1 text-xs" defaultValue="NewsArticle" />
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-md p-3">
                <h3 className="font-semibold text-sm mb-2">Редиректы (301)</h3>
                <table className="w-full text-xs">
                  <thead className="text-muted-foreground"><tr><th className="text-left py-1">Откуда</th><th className="text-left">Куда</th><th></th></tr></thead>
                  <tbody className="divide-y divide-border">
                    <tr><td className="py-1.5">/old-news/123</td><td>/article/new-bridge-tura</td><td className="text-right"><Button size="sm" variant="ghost" className="h-6 text-xs">×</Button></td></tr>
                    <tr><td className="py-1.5">/category/auto</td><td>/category/transport</td><td className="text-right"><Button size="sm" variant="ghost" className="h-6 text-xs">×</Button></td></tr>
                  </tbody>
                </table>
                <Button size="sm" variant="outline" className="mt-2">Добавить редирект</Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </HoldingLayout>
  );
};

export default SeoCenterPage;
