import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Loader2, History, Copy, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type Action = 'generate_draft' | 'rewrite' | 'improve_headline' | 'generate_lead' | 'seo' | 'suggest_category' | 'suggest_tags' | 'quality_check' | 'custom';

const ACTIONS: { value: Action; label: string; needs: ('topic' | 'title' | 'lead' | 'content' | 'prompt')[] }[] = [
  { value: 'generate_draft',    label: 'Сгенерировать черновик новости', needs: ['topic'] },
  { value: 'rewrite',           label: 'Переписать текст',                 needs: ['content'] },
  { value: 'improve_headline',  label: 'Улучшить заголовок',               needs: ['title', 'content'] },
  { value: 'generate_lead',     label: 'Сгенерировать лид',                needs: ['title', 'content'] },
  { value: 'seo',               label: 'SEO: title + description',         needs: ['title', 'lead', 'content'] },
  { value: 'suggest_category',  label: 'Подобрать категорию',              needs: ['title', 'content'] },
  { value: 'suggest_tags',      label: 'Предложить теги',                  needs: ['title', 'content'] },
  { value: 'quality_check',     label: 'Проверка качества',                needs: ['title', 'content'] },
  { value: 'custom',            label: 'Свободный запрос',                 needs: ['prompt'] },
];

interface AiRun {
  id: string;
  action: string;
  status: string;
  result: string | null;
  error: string | null;
  created_at: string;
}

const AdminAIAssistantPage = () => {
  const [action, setAction] = useState<Action>('generate_draft');
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [lead, setLead] = useState('');
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [runs, setRuns] = useState<AiRun[]>([]);
  const [copied, setCopied] = useState(false);

  const loadRuns = async () => {
    const { data } = await supabase
      .from('ai_runs')
      .select('id, action, status, result, error, created_at')
      .order('created_at', { ascending: false })
      .limit(20);
    setRuns((data ?? []) as AiRun[]);
  };

  useEffect(() => { loadRuns(); }, []);

  const current = ACTIONS.find(a => a.value === action)!;

  const run = async () => {
    setLoading(true);
    setResult('');
    try {
      const { data, error } = await supabase.functions.invoke('deepseek-assistant', {
        body: { action, topic, title, lead, content, prompt },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data?.result ?? '');
      toast.success('Готово');
      loadRuns();
    } catch (e) {
      const msg = (e as Error).message;
      toast.error(msg);
      setResult(`Ошибка: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" /> DeepSeek ассистент
          </h1>
          <p className="text-muted-foreground text-sm">
            AI-помощник редакции. Provider: DeepSeek · Model: deepseek-chat
          </p>
        </div>

        <Tabs defaultValue="run">
          <TabsList>
            <TabsTrigger value="run">Запуск</TabsTrigger>
            <TabsTrigger value="history"><History className="w-3 h-3 mr-1" /> История ({runs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="run">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="p-4 space-y-3">
                <div>
                  <Label className="text-xs">Действие</Label>
                  <select
                    value={action}
                    onChange={e => setAction(e.target.value as Action)}
                    className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {ACTIONS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                  </select>
                </div>

                {current.needs.includes('topic') && (
                  <div><Label className="text-xs">Тема</Label>
                    <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Например: открытие новой школы в Тюмени" />
                  </div>
                )}
                {current.needs.includes('title') && (
                  <div><Label className="text-xs">Заголовок</Label>
                    <Input value={title} onChange={e => setTitle(e.target.value)} />
                  </div>
                )}
                {current.needs.includes('lead') && (
                  <div><Label className="text-xs">Лид</Label>
                    <Textarea value={lead} onChange={e => setLead(e.target.value)} rows={2} />
                  </div>
                )}
                {current.needs.includes('content') && (
                  <div><Label className="text-xs">Текст статьи</Label>
                    <Textarea value={content} onChange={e => setContent(e.target.value)} rows={8} />
                  </div>
                )}
                {current.needs.includes('prompt') && (
                  <div><Label className="text-xs">Запрос</Label>
                    <Textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} />
                  </div>
                )}

                <Button onClick={run} disabled={loading} className="w-full">
                  {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Думаем...</> : <><Sparkles className="w-4 h-4 mr-2" /> Запустить</>}
                </Button>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">Результат</h3>
                  {result && (
                    <Button size="sm" variant="ghost" onClick={copy}>
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
                <pre className="whitespace-pre-wrap text-sm min-h-[400px] bg-muted/30 rounded p-3 font-sans">
                  {result || <span className="text-muted-foreground">Результат появится здесь</span>}
                </pre>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <div className="divide-y divide-border">
                {runs.length === 0 && (
                  <div className="p-6 text-center text-sm text-muted-foreground">История пуста</div>
                )}
                {runs.map(r => (
                  <div key={r.id} className="p-3 text-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={r.status === 'success' ? 'default' : 'destructive'} className="text-[10px]">{r.status}</Badge>
                        <span className="font-mono text-xs">{r.action}</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">{new Date(r.created_at).toLocaleString('ru-RU')}</span>
                    </div>
                    {r.result && <div className="text-xs text-muted-foreground line-clamp-3 whitespace-pre-wrap">{r.result}</div>}
                    {r.error && <div className="text-xs text-red-600">{r.error}</div>}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminAIAssistantPage;
