import { Filter } from 'lucide-react';
import { useState } from 'react';
import MapboxMap, { MapPolygon, MapMarker } from '@/components/poems/MapboxMap';
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
  const center: [number, number] = [33.9533, -117.3962]; // Riverside, California (downtown)

  // Helper function to generate random drop markers within a polygon area
  const generateDropMarkers = (
    routeId: string,
    bounds: { latMin: number; latMax: number; lngMin: number; lngMax: number },
    count: number
  ): MapMarker[] => {
    const markers: MapMarker[] = [];
    for (let i = 0; i < count; i++) {
      const lat = bounds.latMin + Math.random() * (bounds.latMax - bounds.latMin);
      const lng = bounds.lngMin + Math.random() * (bounds.lngMax - bounds.lngMin);
      markers.push({
        id: `${routeId}-drop-${i}`,
        position: [lat, lng],
        title: `Drop ${i + 1}`,
        description: `Route ${routeId.toUpperCase()}`,
      });
    }
    return markers;
  };

  // Define adjacent irregular polygon areas around downtown
  const routePolygons: MapPolygon[] = [];
  const dropMarkers: MapMarker[] = [];

  routes.forEach((route) => {
    let coordinates: number[][][];
    let labelPosition: [number, number];
    let dropBounds: { latMin: number; latMax: number; lngMin: number; lngMax: number };

    // Define specific adjacent areas with varied shapes (non-overlapping)
    switch (route.id) {
      case 'a': // Northeast area - detailed irregular polygon
        coordinates = [
          [
            [-117.396, 33.953],
            [-117.390, 33.952],
            [-117.383, 33.954],
            [-117.378, 33.956],
            [-117.376, 33.960],
            [-117.375, 33.965],
            [-117.377, 33.970],
            [-117.382, 33.974],
            [-117.388, 33.976],
            [-117.394, 33.974],
            [-117.398, 33.970],
            [-117.398, 33.963],
            [-117.396, 33.956],
            [-117.396, 33.953],
          ],
        ];
        labelPosition = [33.963, -117.387];
        dropBounds = { latMin: 33.957, latMax: 33.972, lngMin: -117.395, lngMax: -117.380 };
        break;
      case 'b': // Northwest area - detailed irregular polygon
        coordinates = [
          [
            [-117.418, 33.948],
            [-117.412, 33.946],
            [-117.405, 33.947],
            [-117.400, 33.950],
            [-117.398, 33.953],
            [-117.398, 33.960],
            [-117.398, 33.968],
            [-117.400, 33.974],
            [-117.404, 33.978],
            [-117.410, 33.979],
            [-117.416, 33.977],
            [-117.420, 33.973],
            [-117.422, 33.967],
            [-117.422, 33.958],
            [-117.420, 33.952],
            [-117.418, 33.948],
          ],
        ];
        labelPosition = [33.963, -117.410];
        dropBounds = { latMin: 33.952, latMax: 33.974, lngMin: -117.418, lngMax: -117.402 };
        break;
      case 'c': // Southwest area - detailed irregular polygon
        coordinates = [
          [
            [-117.422, 33.935],
            [-117.418, 33.930],
            [-117.412, 33.928],
            [-117.405, 33.930],
            [-117.400, 33.933],
            [-117.398, 33.938],
            [-117.398, 33.944],
            [-117.398, 33.950],
            [-117.400, 33.953],
            [-117.405, 33.952],
            [-117.412, 33.950],
            [-117.418, 33.948],
            [-117.422, 33.943],
            [-117.422, 33.935],
          ],
        ];
        labelPosition = [33.942, -117.410];
        dropBounds = { latMin: 33.933, latMax: 33.949, lngMin: -117.418, lngMax: -117.402 };
        break;
      case 'd': // Southeast area - detailed compact polygon
        coordinates = [
          [
            [-117.396, 33.938],
            [-117.390, 33.936],
            [-117.383, 33.935],
            [-117.377, 33.936],
            [-117.373, 33.939],
            [-117.372, 33.944],
            [-117.373, 33.949],
            [-117.376, 33.953],
            [-117.382, 33.955],
            [-117.390, 33.954],
            [-117.396, 33.953],
            [-117.398, 33.950],
            [-117.398, 33.944],
            [-117.396, 33.938],
          ],
        ];
        labelPosition = [33.945, -117.385];
        dropBounds = { latMin: 33.939, latMax: 33.951, lngMin: -117.393, lngMax: -117.377 };
        break;
      case 'e': // East area - detailed larger irregular polygon
        coordinates = [
          [
            [-117.378, 33.956],
            [-117.372, 33.957],
            [-117.365, 33.959],
            [-117.360, 33.962],
            [-117.357, 33.966],
            [-117.355, 33.970],
            [-117.356, 33.975],
            [-117.360, 33.979],
            [-117.365, 33.981],
            [-117.372, 33.980],
            [-117.378, 33.978],
            [-117.384, 33.976],
            [-117.388, 33.973],
            [-117.390, 33.968],
            [-117.388, 33.962],
            [-117.383, 33.958],
            [-117.378, 33.956],
          ],
        ];
        labelPosition = [33.968, -117.370];
        dropBounds = { latMin: 33.962, latMax: 33.977, lngMin: -117.385, lngMax: -117.362 };
        break;
      default:
        coordinates = [[[]]];
        labelPosition = [0, 0];
        dropBounds = { latMin: 0, latMax: 0, lngMin: 0, lngMax: 0 };
    }

    // Color based on status: blue for assigned, green for open
    const fillColor = route.status === 'assigned' ? '#2563eb' : '#059669';

    routePolygons.push({
      id: route.id,
      coordinates,
      fillColor,
      fillOpacity: 0.15,
      strokeColor: fillColor,
      strokeWidth: 2,
      label: {
        text: `${route.label}\n${route.drops} drops\n${route.miles} miles\n${
          route.status === 'assigned' ? 'Assigned' : `Open to ${route.openTime}`
        }`,
        position: labelPosition,
      },
    });

    // Generate drop markers for this route (scale down for visualization)
    const markerCount = Math.min(Math.ceil(route.drops / 10), 15); // Show subset of drops
    dropMarkers.push(...generateDropMarkers(route.id, dropBounds, markerCount));
  });

  return (
    <div className="rounded-lg border-2 border-gray-300 overflow-hidden" style={{ height: '500px' }}>
      <MapboxMap center={center} zoom={13.5} polygons={routePolygons} markers={dropMarkers} height="500px" />
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
    </div>
  );
}
