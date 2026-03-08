import { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, X, Building2, ShoppingBag, Calendar, Newspaper, MapPin, Star, Phone, ChevronRight, Flame } from 'lucide-react';
import { mapOrganizations, mapAds, mapEvents, mapNews, orgCategories, districts } from '@/data/mapData';
import type { MapOrganization, MapAd, MapEvent, MapNews as MapNewsType } from '@/data/mapData';

const TYUMEN_CENTER: [number, number] = [57.1522, 65.5272];

const createIcon = (color: string) =>
  L.divIcon({
    className: '',
    html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3);"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

const icons = {
  org: createIcon('#3b82f6'),
  ad: createIcon('#22c55e'),
  event: createIcon('#f97316'),
  news: createIcon('#ef4444'),
};

const MapPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);
  const heatLayer = useRef<L.LayerGroup | null>(null);

  const [search, setSearch] = useState('');
  const [showOrgs, setShowOrgs] = useState(true);
  const [showAds, setShowAds] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [showNews, setShowNews] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(orgCategories);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>(districts);
  const [heatmapMode, setHeatmapMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ type: string; data: any } | null>(null);

  // Init map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current, { zoomControl: true }).setView(TYUMEN_CENTER, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(map);
    markersLayer.current = L.layerGroup().addTo(map);
    heatLayer.current = L.layerGroup().addTo(map);
    mapInstance.current = map;

    return () => { map.remove(); mapInstance.current = null; };
  }, []);

  const q = search.toLowerCase();

  const filteredOrgs = useMemo(() => showOrgs
    ? mapOrganizations.filter(o =>
        selectedCategories.includes(o.category) &&
        selectedDistricts.includes(o.district) &&
        (!q || o.name.toLowerCase().includes(q) || o.category.includes(q) || o.address.toLowerCase().includes(q))
      )
    : [], [showOrgs, selectedCategories, selectedDistricts, q]);

  const filteredAds = useMemo(() => showAds
    ? mapAds.filter(a => selectedDistricts.includes(a.district) && (!q || a.title.toLowerCase().includes(q)))
    : [], [showAds, selectedDistricts, q]);

  const filteredEvents = useMemo(() => showEvents
    ? mapEvents.filter(e => !q || e.title.toLowerCase().includes(q))
    : [], [showEvents, q]);

  const filteredNews = useMemo(() => showNews
    ? mapNews.filter(n => !q || n.title.toLowerCase().includes(q))
    : [], [showNews, q]);

  // Update markers
  useEffect(() => {
    if (!markersLayer.current || !mapInstance.current) return;
    markersLayer.current.clearLayers();
    if (heatLayer.current) heatLayer.current.clearLayers();

    if (heatmapMode) {
      const allPoints = [
        ...filteredOrgs.map(o => ({ lat: o.lat, lng: o.lng })),
        ...filteredAds.map(a => ({ lat: a.lat, lng: a.lng })),
      ];
      allPoints.forEach(p => {
        L.circle([p.lat, p.lng], { radius: 300, color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2, weight: 1 })
          .addTo(heatLayer.current!);
      });
      return;
    }

    filteredOrgs.forEach(org => {
      L.marker([org.lat, org.lng], { icon: icons.org })
        .on('click', () => setSelectedItem({ type: 'org', data: org }))
        .addTo(markersLayer.current!);
    });
    filteredAds.forEach(ad => {
      L.marker([ad.lat, ad.lng], { icon: icons.ad })
        .on('click', () => setSelectedItem({ type: 'ad', data: ad }))
        .addTo(markersLayer.current!);
    });
    filteredEvents.forEach(ev => {
      L.marker([ev.lat, ev.lng], { icon: icons.event })
        .on('click', () => setSelectedItem({ type: 'event', data: ev }))
        .addTo(markersLayer.current!);
    });
    filteredNews.forEach(nw => {
      L.marker([nw.lat, nw.lng], { icon: icons.news })
        .on('click', () => setSelectedItem({ type: 'news', data: nw }))
        .addTo(markersLayer.current!);
    });
  }, [filteredOrgs, filteredAds, filteredEvents, filteredNews, heatmapMode]);

  const toggleCategory = (cat: string) =>
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  const toggleDistrict = (d: string) =>
    setSelectedDistricts(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold mb-4">Карта Тюмени</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск на карте..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Type Filters */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm">Показать на карте</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2">
                {[
                  { label: 'Организации', checked: showOrgs, set: setShowOrgs, color: 'bg-blue-500', icon: Building2 },
                  { label: 'Объявления', checked: showAds, set: setShowAds, color: 'bg-green-500', icon: ShoppingBag },
                  { label: 'События', checked: showEvents, set: setShowEvents, color: 'bg-orange-500', icon: Calendar },
                  { label: 'Новости', checked: showNews, set: setShowNews, color: 'bg-red-500', icon: Newspaper },
                ].map(f => (
                  <label key={f.label} className="flex items-center gap-2 cursor-pointer text-sm">
                    <Checkbox checked={f.checked} onCheckedChange={() => f.set(!f.checked)} />
                    <span className={`w-3 h-3 rounded-full ${f.color}`} />
                    <f.icon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{f.label}</span>
                  </label>
                ))}
              </CardContent>
            </Card>

            {/* Categories */}
            {showOrgs && (
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">Категории организаций</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-2">
                  {orgCategories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm capitalize">
                      <Checkbox checked={selectedCategories.includes(cat)} onCheckedChange={() => toggleCategory(cat)} />
                      {cat}
                    </label>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Districts */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm">Районы Тюмени</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2">
                {districts.map(d => (
                  <label key={d} className="flex items-center gap-2 cursor-pointer text-sm">
                    <Checkbox checked={selectedDistricts.includes(d)} onCheckedChange={() => toggleDistrict(d)} />
                    {d}
                  </label>
                ))}
              </CardContent>
            </Card>

            {/* Heatmap Toggle */}
            <Button
              variant={heatmapMode ? 'default' : 'outline'}
              className="w-full"
              onClick={() => setHeatmapMode(!heatmapMode)}
            >
              <Flame className="w-4 h-4 mr-2" />
              {heatmapMode ? 'Отключить тепловую карту' : 'Тепловая карта'}
            </Button>

            {/* Stats */}
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Организаций: {filteredOrgs.length}</div>
              <div>Объявлений: {filteredAds.length}</div>
              <div>Событий: {filteredEvents.length}</div>
              <div>Новостей: {filteredNews.length}</div>
            </div>
          </div>

          {/* Map + Popup */}
          <div className="relative">
            <div ref={mapRef} className="w-full h-[600px] rounded-lg border border-border overflow-hidden" />

            {/* Selected Item Popup */}
            {selectedItem && (
              <div className="absolute top-4 right-4 z-[1000] w-72">
                <Card className="shadow-lg">
                  <CardContent className="p-4 relative">
                    <button onClick={() => setSelectedItem(null)} className="absolute top-2 right-2">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>

                    {selectedItem.type === 'org' && (() => {
                      const o = selectedItem.data as MapOrganization;
                      return (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium uppercase text-muted-foreground">{o.category}</span>
                          </div>
                          <h3 className="font-semibold text-sm">{o.name}</h3>
                          <div className="flex items-center gap-1 text-xs">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span>{o.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />{o.address}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Phone className="w-3.5 h-3.5" />{o.phone}
                          </div>
                          <Button size="sm" className="w-full mt-1" variant="outline">
                            Открыть карточку <ChevronRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </div>
                      );
                    })()}

                    {selectedItem.type === 'ad' && (() => {
                      const a = selectedItem.data as MapAd;
                      return (
                        <div className="space-y-2">
                          <img src={a.image} alt={a.title} className="w-full h-24 object-cover rounded" />
                          <h3 className="font-semibold text-sm">{a.title}</h3>
                          <p className="text-primary font-bold text-sm">{a.price}</p>
                          <Button size="sm" className="w-full" variant="outline">
                            Открыть объявление <ChevronRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </div>
                      );
                    })()}

                    {selectedItem.type === 'event' && (() => {
                      const e = selectedItem.data as MapEvent;
                      return (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            <span className="text-xs text-muted-foreground">{e.date}</span>
                          </div>
                          <h3 className="font-semibold text-sm">{e.title}</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />{e.address}
                          </div>
                        </div>
                      );
                    })()}

                    {selectedItem.type === 'news' && (() => {
                      const n = selectedItem.data as MapNewsType;
                      return (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Newspaper className="w-4 h-4 text-red-500" />
                            <span className="text-xs text-muted-foreground">{n.date}</span>
                          </div>
                          <h3 className="font-semibold text-sm">{n.title}</h3>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MapPage;
