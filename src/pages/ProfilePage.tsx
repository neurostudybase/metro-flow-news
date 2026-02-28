import CabinetLayout from '@/components/cabinet/CabinetLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <CabinetLayout>
      <div className="bg-card border border-border rounded-lg p-6">
        <h1 className="text-xl font-bold mb-6">Профиль</h1>
        <div className="space-y-4 max-w-md">
          <div>
            <Label>Имя</Label>
            <Input defaultValue={user?.name} />
          </div>
          <div>
            <Label>Email</Label>
            <Input defaultValue={user?.email} />
          </div>
          <div>
            <Label>Телефон</Label>
            <Input defaultValue={user?.phone} />
          </div>
          <div>
            <Label>Город</Label>
            <Input defaultValue={user?.city} />
          </div>
          <Button>Сохранить</Button>
        </div>
      </div>
    </CabinetLayout>
  );
};

export default ProfilePage;
