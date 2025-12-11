import { Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Map, { MapMarker, MapCircle } from '@/components/poems/Map';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Route {
  id: string;
  label: string;
  drops: number;
  miles: number;
  status: 'assigned' | 'open';
  openTime?: string;
}

interface FilterBarProps {
  filters: {
    showType: string;
    showVariant: string;
    deliveriesWithin: string;
    milesOf: string;
    between: string;
    and: string;
    onDate: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-semibold text-gray-700">Filter Routes</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-sm">
        <div>
          <label className="text-xs text-gray-600 block mb-1">Show:</label>
          <Select value={filters.showType} onValueChange={(value) => onFilterChange('showType', value)}>
            <SelectTrigger className="w-full h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">small</SelectItem>
              <SelectItem value="medium">medium</SelectItem>
              <SelectItem value="large">large</SelectItem>
              <SelectItem value="all">all sizes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">&nbsp;</label>
          <Select value={filters.showVariant} onValueChange={(value) => onFilterChange('showVariant', value)}>
            <SelectTrigger className="w-full h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="non-express">non-express</SelectItem>
              <SelectItem value="express">express</SelectItem>
              <SelectItem value="all">all types</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">deliveries within:</label>
          <input
            type="number"
            value={filters.deliveriesWithin}
            onChange={(e) => onFilterChange('deliveriesWithin', e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">miles of:</label>
          <Select value={filters.milesOf} onValueChange={(value) => onFilterChange('milesOf', value)}>
            <SelectTrigger className="w-full h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">home</SelectItem>
              <SelectItem value="office">office</SelectItem>
              <SelectItem value="current">current location</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">between:</label>
          <input
            type="time"
            value={filters.between}
            onChange={(e) => onFilterChange('between', e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">and:</label>
          <input
            type="time"
            value={filters.and}
            onChange={(e) => onFilterChange('and', e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">on (date):</label>
          <Select value={filters.onDate} onValueChange={(value) => onFilterChange('onDate', value)}>
            <SelectTrigger className="w-full h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">today</SelectItem>
              <SelectItem value="tomorrow">tomorrow</SelectItem>
              <SelectItem value="this-week">this week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function RouteMap({ routes }: { routes: Route[] }) {
  const hubCenter: [number, number] = [40.7539, -73.9851];

  // Hub marker
  const hubMarker: MapMarker = {
    id: 'hub',
    position: hubCenter,
    title: 'Underpass Warehouse',
    description: '456 Freeway Street - Distribution Hub',
  };

  // Convert routes to circles distributed around the hub
  const routeCircles: MapCircle[] = routes.map((route, index) => {
    // Distribute routes in a circle around the hub
    const angle = (index / routes.length) * 2 * Math.PI;
    const distance = 0.03; // Distance from hub in degrees (~3km)
    const lat = hubCenter[0] + distance * Math.cos(angle);
    const lng = hubCenter[1] + distance * Math.sin(angle);

    // Circle radius based on number of drops (larger routes = larger circles)
    const radius = route.drops * 15; // meters

    // Color based on status: blue for assigned, green for open
    const color = route.status === 'assigned' ? '#2563eb' : '#059669';

    return {
      id: route.id,
      center: [lat, lng],
      radius: radius,
      color: color,
      fillColor: color,
      label: `${route.label}: ${route.drops} drops, ${route.miles} miles${
        route.status === 'open' && route.openTime ? ` - Open to ${route.openTime}` : ''
      }`,
    };
  });

  return (
    <div className="rounded-lg border-2 border-gray-300 overflow-hidden" style={{ height: '500px' }}>
      <Map
        center={hubCenter}
        zoom={12}
        markers={[hubMarker]}
        circles={routeCircles}
        height="500px"
      />
    </div>
  );
}

export default function ThisMorningsRoutes() {
  const [filters, setFilters] = useState({
    showType: 'small',
    showVariant: 'non-express',
    deliveriesWithin: '5',
    milesOf: 'home',
    between: '07:00',
    and: '10:00',
    onDate: 'today',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const routes: Route[] = [
    {
      id: 'a',
      label: 'ROUTE A',
      drops: 82,
      miles: 12,
      status: 'assigned',
    },
    {
      id: 'b',
      label: 'ROUTE B',
      drops: 75,
      miles: 14,
      status: 'assigned',
    },
    {
      id: 'c',
      label: 'ROUTE C',
      drops: 60,
      miles: 8,
      status: 'open',
      openTime: '6:30 AM',
    },
    {
      id: 'd',
      label: 'ROUTE D',
      drops: 88,
      miles: 5,
      status: 'assigned',
    },
    {
      id: 'e',
      label: 'ROUTE E',
      drops: 77,
      miles: 15,
      status: 'assigned',
    },
  ];

  const totalDeliveries = routes.reduce((sum, route) => sum + route.drops, 0);
  const totalBuildings = 382;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">This Morning's Routes</h1>
        <p className="text-gray-600">
          THIS Search produced <strong>{totalDeliveries} deliveries</strong> to <strong>{totalBuildings} buildings</strong>.
          The long-distance hub will be <strong>Underpass Warehouse, 456 Freeway Street</strong>...
        </p>
      </div>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <RouteMap routes={routes} />

      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {routes.map((route) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-4 text-center"
          >
            <div className="font-bold text-gray-900 mb-1">{route.label}</div>
            <div className="text-sm text-gray-600">{route.drops} drops</div>
            <div className="text-sm text-gray-600">{route.miles} miles</div>
            <div
              className={cn(
                'mt-2 text-xs font-semibold px-2 py-1 rounded',
                route.status === 'assigned' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
              )}
            >
              {route.status === 'assigned' ? 'Assigned' : route.openTime ? `Open to ${route.openTime}` : 'Open'}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
