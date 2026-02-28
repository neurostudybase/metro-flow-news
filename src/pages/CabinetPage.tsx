import CabinetLayout from '@/components/cabinet/CabinetLayout';
import { useAuth } from '@/contexts/AuthContext';
import { User, FileText, Bell, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  { label: 'Профиль', desc: 'Имя, телефон, город', icon: User, to: '/cabinet/profile' },
  { label: 'Мои объявления', desc: '0 объявлений', icon: FileText, to: '/cabinet/ads' },
  { label: 'Уведомления', desc: 'Нет новых', icon: Bell, to: '/cabinet' },
  { label: 'Сохранённое', desc: 'Нет сохранённых', icon: Bookmark, to: '/cabinet' },
];

const CabinetPage = () => {
  const { user } = useAuth();

  return (
    <CabinetLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1">Добро пожаловать, {user?.name}!</h1>
        <p className="text-muted-foreground mb-6">Управляйте своим профилем и объявлениями</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map(card => (
            <Link
              key={card.label}
              to={card.to}
              className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="bg-primary/10 rounded-md p-2.5">
                <card.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{card.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </CabinetLayout>
  );
};

export default CabinetPage;
