import CabinetLayout from '@/components/cabinet/CabinetLayout';
import { FileText, PlusCircle, Pencil, EyeOff, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useListings, ListingStatus } from '@/contexts/ListingsContext';
import { Badge } from '@/components/ui/badge';

const statusLabels: Record<ListingStatus, string> = {
  draft: 'Черновик',
  moderation: 'На модерации',
  published: 'Опубликовано',
  unpublished: 'Снято',
  rejected: 'Отклонено',
};

const statusVariant: Record<ListingStatus, 'secondary' | 'default' | 'outline' | 'destructive'> = {
  draft: 'secondary',
  moderation: 'default',
  published: 'outline',
  unpublished: 'destructive',
  rejected: 'destructive',
};

const MyAdsPage = () => {
  const { listings, updateListingStatus } = useListings();

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

        {listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground">У вас пока нет объявлений</p>
            <Button asChild variant="outline" className="mt-4">
              <Link to="/cabinet/new-listing">Создать первое объявление</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {listings.map(listing => (
              <div key={listing.id} className="flex gap-4 border border-border rounded-lg p-3">
                {/* Preview image */}
                <div className="w-24 h-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                  {listing.images[0] ? (
                    <img src={listing.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <FileText className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-sm text-foreground truncate">{listing.title || 'Без названия'}</h3>
                      <p className="text-primary font-bold text-sm">{listing.price || '—'}</p>
                    </div>
                    <Badge variant={statusVariant[listing.status]}>{statusLabels[listing.status]}</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">{listing.category}{listing.subcategory ? ` · ${listing.subcategory}` : ''} · {listing.createdAt}</p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-2">
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                      <Pencil className="w-3 h-3" /> Редактировать
                    </Button>
                    {(listing.status === 'published' || listing.status === 'moderation') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs gap-1"
                        onClick={() => updateListingStatus(listing.id, 'unpublished')}
                      >
                        <EyeOff className="w-3 h-3" /> Снять
                      </Button>
                    )}
                    {(listing.status === 'unpublished' || listing.status === 'draft') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs gap-1"
                        onClick={() => updateListingStatus(listing.id, 'moderation')}
                      >
                        <ArrowUp className="w-3 h-3" /> Поднять
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CabinetLayout>
  );
};

export default MyAdsPage;
