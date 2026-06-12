import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error ?? 'Ошибка входа');
      return;
    }
    toast.success('Вход выполнен');
    navigate('/cabinet');
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-card rounded-lg border border-border p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Вход</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-6">
            Нет аккаунта? <Link to="/register" className="text-primary hover:underline">Регистрация</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
