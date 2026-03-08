import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Key, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface APIConfig {
  key: string;
  status: 'connected' | 'not_connected' | 'error';
}

const ControlAPIPage = () => {
  const [apis, setApis] = useState<Record<string, APIConfig>>({
    openai: { key: 'sk-***demo***', status: 'connected' },
    claude: { key: 'sk-ant-***demo***', status: 'connected' },
    perplexity: { key: '', status: 'not_connected' },
  });

  const updateKey = (provider: string, key: string) => {
    setApis(prev => ({ ...prev, [provider]: { ...prev[provider], key } }));
  };

  const checkConnection = (provider: string) => {
    setApis(prev => ({ ...prev, [provider]: { ...prev[provider], status: prev[provider].key ? 'connected' : 'not_connected' } }));
  };

  const providers = [
    { id: 'openai', name: 'OpenAI', desc: 'Генерация новостей, заголовки, SEO, короткие тексты, модерация' },
    { id: 'claude', name: 'Claude (Anthropic)', desc: 'Редактура, длинные статьи, аналитика, глубокие тексты, фактчекинг' },
    { id: 'perplexity', name: 'Perplexity', desc: 'Поиск новостей, анализ источников, проверка повестки, поиск информации' },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><Key className="w-6 h-6 text-primary" /> API ключи</h1>
        <p className="text-muted-foreground mb-6 text-sm">Подключение нейросетей к порталу</p>

        <div className="space-y-4">
          {providers.map(p => (
            <Card key={p.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <div className="flex items-center gap-1.5">
                    {apis[p.id].status === 'connected' ? (
                      <><CheckCircle className="w-4 h-4 text-green-600" /><span className="text-xs text-green-600">Подключено</span></>
                    ) : (
                      <><XCircle className="w-4 h-4 text-muted-foreground" /><span className="text-xs text-muted-foreground">Не подключено</span></>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">{p.desc}</p>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label className="text-xs">API Key</Label>
                    <Input
                      type="password"
                      value={apis[p.id].key}
                      onChange={e => updateKey(p.id, e.target.value)}
                      placeholder={`Введите ${p.name} API Key`}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => checkConnection(p.id)}>Проверить</Button>
                    <Button size="sm">Сохранить</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ControlAPIPage;
