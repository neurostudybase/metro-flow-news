import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate('/cabinet');
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-card rounded-lg border border-border p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Вход</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email или телефон</Label>
              <Input
                id="email"
                type="text"
                placeholder="ivan@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Войти</Button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-6">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-primary hover:underline">Регистрация</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
