import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type ListingStatus = 'draft' | 'moderation' | 'published' | 'unpublished';

export interface UserListing {
  id: string;
  category: string;
  subcategory: string;
  district: string;
  title: string;
  price: string;
  condition: 'new' | 'used';
  description: string;
  images: string[]; // base64 data URLs
  sellerType: 'private' | 'company';
  phone: string;
  status: ListingStatus;
  createdAt: string;
}

interface ListingsContextType {
  listings: UserListing[];
  addListing: (listing: Omit<UserListing, 'id' | 'createdAt'>) => void;
  updateListingStatus: (id: string, status: ListingStatus) => void;
  deleteListing: (id: string) => void;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

export const ListingsProvider = ({ children }: { children: ReactNode }) => {
  const [listings, setListings] = useState<UserListing[]>([]);

  const addListing = useCallback((listing: Omit<UserListing, 'id' | 'createdAt'>) => {
    const newListing: UserListing = {
      ...listing,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setListings(prev => [newListing, ...prev]);
  }, []);

  const updateListingStatus = useCallback((id: string, status: ListingStatus) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  }, []);

  const deleteListing = useCallback((id: string) => {
    setListings(prev => prev.filter(l => l.id !== id));
  }, []);

  return (
    <ListingsContext.Provider value={{ listings, addListing, updateListingStatus, deleteListing }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => {
  const ctx = useContext(ListingsContext);
  if (!ctx) throw new Error('useListings must be used within ListingsProvider');
  return ctx;
};
