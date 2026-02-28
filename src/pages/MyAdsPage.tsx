import CabinetLayout from '@/components/cabinet/CabinetLayout';
import { FileText, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MyAdsPage = () => {
  return (
    <CabinetLayout>
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Мои объявления</h1>
          <Button asChild size="sm">
            <Link to="/cabinet/new-listing">
              <PlusCircle className="w-4 h-4 mr-2" />
              Разместить
            </Link>
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FileText className="w-12 h-12 text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground">У вас пока нет объявлений</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/cabinet/new-listing">Создать первое объявление</Link>
          </Button>
        </div>
      </div>
    </CabinetLayout>
  );
};

export default MyAdsPage;
