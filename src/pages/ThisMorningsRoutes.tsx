import { MapPin, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Route {
  id: string;
  label: string;
  drops: number;
  miles: number;
  status: 'assigned' | 'open';
  openTime?: string;
  position: { top: string; left: string };
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
          <select
            value={filters.showType}
            onChange={(e) => onFilterChange('showType', e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
            <option value="all">all sizes</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">&nbsp;</label>
          <select
            value={filters.showVariant}
            onChange={(e) => onFilterChange('showVariant', e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="non-express">non-express</option>
            <option value="express">express</option>
            <option value="all">all types</option>
          </select>
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
          <select
            value={filters.milesOf}
            onChange={(e) => onFilterChange('milesOf', e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="home">home</option>
            <option value="office">office</option>
            <option value="current">current location</option>
          </select>
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
          <select
            value={filters.onDate}
            onChange={(e) => onFilterChange('onDate', e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="today">today</option>
            <option value="tomorrow">tomorrow</option>
            <option value="this-week">this week</option>
          </select>
        </div>
      </div>
    </div>
  );
}

interface RouteCardProps {
  route: Route;
}

function RouteCard({ route }: RouteCardProps) {
  const getStatusColor = () => {
    if (route.status === 'assigned') return 'bg-blue-600 text-white';
    return 'bg-emerald-600 text-white';
  };

  const getStatusLabel = () => {
    if (route.status === 'assigned') return 'ASSIGNED';
    return route.openTime ? `OPEN TO ${route.openTime}` : 'OPEN';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute bg-white border-2 border-gray-300 rounded-lg p-3 shadow-lg min-w-[140px]"
      style={{ top: route.position.top, left: route.position.left }}
    >
      <div className="font-bold text-gray-900 mb-2">{route.label}:</div>
      <div className="text-sm text-gray-700 mb-1">{route.drops} drops</div>
      <div className="text-sm text-gray-700 mb-2">{route.miles} miles</div>
      <div className={cn('text-xs font-bold px-2 py-1 rounded text-center', getStatusColor())}>
        {getStatusLabel()}
      </div>
    </motion.div>
  );
}

function RouteMap({ routes }: { routes: Route[] }) {
  return (
    <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-gray-300 overflow-hidden" style={{ height: '500px' }}>
      {/* Map placeholder background with road-like pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="roads" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 0,50 L 100,50" stroke="#8B7355" strokeWidth="2" fill="none" />
              <path d="M 50,0 L 50,100" stroke="#8B7355" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#roads)" />
        </svg>
      </div>

      {/* River/waterway visual element */}
      <div className="absolute bottom-0 right-0 w-1/3 h-2/3">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 0,100 Q 50,80 100,100 L 100,0 Q 70,40 0,0 Z"
            fill="#93C5FD"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Green space indicators */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-emerald-200 rounded-full opacity-30" />
      <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-emerald-200 rounded-full opacity-30" />

      {/* Route cards */}
      {routes.map((route) => (
        <RouteCard key={route.id} route={route} />
      ))}

      {/* Hub indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-red-500 rounded-full p-2 shadow-lg">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div className="text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded mt-1 whitespace-nowrap text-center shadow">
          Underpass Warehouse
        </div>
      </div>
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
      position: { top: '15%', left: '20%' },
    },
    {
      id: 'b',
      label: 'ROUTE B',
      drops: 75,
      miles: 14,
      status: 'assigned',
      position: { top: '10%', left: '65%' },
    },
    {
      id: 'c',
      label: 'ROUTE C',
      drops: 60,
      miles: 8,
      status: 'open',
      openTime: '6:30 AM',
      position: { top: '55%', left: '10%' },
    },
    {
      id: 'd',
      label: 'ROUTE D',
      drops: 88,
      miles: 5,
      status: 'assigned',
      position: { top: '70%', left: '45%' },
    },
    {
      id: 'e',
      label: 'ROUTE E',
      drops: 77,
      miles: 15,
      status: 'assigned',
      position: { top: '50%', left: '70%' },
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
