import { Filter } from "lucide-react";
import { useState } from "react";
import MapboxMap, { MapPolygon, MapMarker } from "@/components/poems/MapboxMap";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Route {
  id: string;
  label: string;
  drops: number;
  miles: number;
  status: "assigned" | "open";
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
    <div className="bg-white border-[3px] border-gray-400 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-semibold text-gray-700">
          Filter Routes
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-sm">
        <div>
          <label className="text-xs text-gray-600 block mb-1">Show:</label>
          <Select
            value={filters.showType}
            onValueChange={(value) => onFilterChange("showType", value)}
          >
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
          <Select
            value={filters.showVariant}
            onValueChange={(value) => onFilterChange("showVariant", value)}
          >
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
          <label className="text-xs text-gray-600 block mb-1">
            deliveries within:
          </label>
          <input
            type="number"
            value={filters.deliveriesWithin}
            onChange={(e) => onFilterChange("deliveriesWithin", e.target.value)}
            className="w-full px-2 py-1.5 border-[3px] border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">miles of:</label>
          <Select
            value={filters.milesOf}
            onValueChange={(value) => onFilterChange("milesOf", value)}
          >
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
            onChange={(e) => onFilterChange("between", e.target.value)}
            className="w-full px-2 py-1.5 border-[3px] border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">and:</label>
          <input
            type="time"
            value={filters.and}
            onChange={(e) => onFilterChange("and", e.target.value)}
            className="w-full px-2 py-1.5 border-[3px] border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">on (date):</label>
          <Select
            value={filters.onDate}
            onValueChange={(value) => onFilterChange("onDate", value)}
          >
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
      const lat =
        bounds.latMin + Math.random() * (bounds.latMax - bounds.latMin);
      const lng =
        bounds.lngMin + Math.random() * (bounds.lngMax - bounds.lngMin);
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
    let dropBounds: {
      latMin: number;
      latMax: number;
      lngMin: number;
      lngMax: number;
    };

    // Define specific adjacent areas with varied shapes (non-overlapping)
    switch (route.id) {
      case "a": // Northeast area - irregular polygon
        coordinates = [
          [
            [-117.396, 33.953],
            [-117.385, 33.954],
            [-117.377, 33.957],
            [-117.375, 33.964],
            [-117.38, 33.972],
            [-117.388, 33.975],
            [-117.396, 33.973],
            [-117.398, 33.965],
            [-117.398, 33.958],
            [-117.396, 33.953],
          ],
        ];
        labelPosition = [33.963, -117.387];
        dropBounds = {
          latMin: 33.958,
          latMax: 33.972,
          lngMin: -117.395,
          lngMax: -117.38,
        };
        break;
      case "b": // Northwest area - irregular polygon
        coordinates = [
          [
            [-117.42, 33.948],
            [-117.408, 33.946],
            [-117.4, 33.949],
            [-117.398, 33.955],
            [-117.398, 33.965],
            [-117.402, 33.975],
            [-117.412, 33.978],
            [-117.42, 33.974],
            [-117.422, 33.965],
            [-117.422, 33.955],
            [-117.42, 33.948],
          ],
        ];
        labelPosition = [33.963, -117.41];
        dropBounds = {
          latMin: 33.952,
          latMax: 33.974,
          lngMin: -117.418,
          lngMax: -117.402,
        };
        break;
      case "c": // East area - irregular polygon
        coordinates = [
          [
            [-117.377, 33.938],
            [-117.365, 33.937],
            [-117.355, 33.94],
            [-117.35, 33.946],
            [-117.352, 33.953],
            [-117.36, 33.958],
            [-117.37, 33.957],
            [-117.377, 33.953],
            [-117.378, 33.946],
            [-117.377, 33.938],
          ],
        ];
        labelPosition = [33.947, -117.363];
        dropBounds = {
          latMin: 33.941,
          latMax: 33.955,
          lngMin: -117.374,
          lngMax: -117.355,
        };
        break;
      case "d": // Victoria Hill area - compact polygon
        coordinates = [
          [
            [-117.375, 33.965],
            [-117.365, 33.964],
            [-117.357, 33.967],
            [-117.352, 33.972],
            [-117.353, 33.979],
            [-117.36, 33.984],
            [-117.37, 33.983],
            [-117.377, 33.978],
            [-117.377, 33.97],
            [-117.375, 33.965],
          ],
        ];
        labelPosition = [33.973, -117.365];
        dropBounds = {
          latMin: 33.968,
          latMax: 33.981,
          lngMin: -117.373,
          lngMax: -117.357,
        };
        break;
      case "e": // North area - irregular polygon (moved to avoid overlap)
        coordinates = [
          [
            [-117.398, 33.975],
            [-117.388, 33.976],
            [-117.38, 33.978],
            [-117.375, 33.983],
            [-117.376, 33.99],
            [-117.383, 33.995],
            [-117.392, 33.996],
            [-117.4, 33.993],
            [-117.405, 33.987],
            [-117.404, 33.98],
            [-117.398, 33.975],
          ],
        ];
        labelPosition = [33.985, -117.39];
        dropBounds = {
          latMin: 33.98,
          latMax: 33.993,
          lngMin: -117.402,
          lngMax: -117.38,
        };
        break;
      default:
        coordinates = [[[]]];
        labelPosition = [0, 0];
        dropBounds = { latMin: 0, latMax: 0, lngMin: 0, lngMax: 0 };
    }

    // Color based on status: blue for assigned, green for open
    const fillColor = route.status === "assigned" ? "#2563eb" : "#059669";

    routePolygons.push({
      id: route.id,
      coordinates,
      fillColor,
      fillOpacity: 0.15,
      strokeColor: fillColor,
      strokeWidth: 2,
      label: {
        title: route.label,
        details: `${route.drops} drops • ${route.miles} miles`,
        status:
          route.status === "assigned"
            ? "Assigned"
            : `Open to ${route.openTime}`,
        statusClickable: route.status === "open",
        position: labelPosition,
      },
    });

    // Generate drop markers for this route (scale down for visualization)
    const markerCount = Math.min(Math.ceil(route.drops / 10), 15); // Show subset of drops
    dropMarkers.push(...generateDropMarkers(route.id, dropBounds, markerCount));
  });

  return (
    <div
      className="rounded-lg border-2 border-gray-300 overflow-hidden"
      style={{ height: "500px" }}
    >
      <MapboxMap
        center={center}
        zoom={13.5}
        polygons={routePolygons}
        markers={dropMarkers}
        height="500px"
      />
    </div>
  );
}

export default function ThisMorningsRoutes() {
  const [filters, setFilters] = useState({
    showType: "small",
    showVariant: "non-express",
    deliveriesWithin: "5",
    milesOf: "home",
    between: "07:00",
    and: "10:00",
    onDate: "today",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const routes: Route[] = [
    {
      id: "a",
      label: "ROUTE A",
      drops: 82,
      miles: 12,
      status: "assigned",
    },
    {
      id: "b",
      label: "ROUTE B",
      drops: 75,
      miles: 14,
      status: "assigned",
    },
    {
      id: "c",
      label: "ROUTE C",
      drops: 60,
      miles: 8,
      status: "open",
      openTime: "6:30 AM",
    },
    {
      id: "d",
      label: "ROUTE D",
      drops: 88,
      miles: 5,
      status: "assigned",
    },
    {
      id: "e",
      label: "ROUTE E",
      drops: 77,
      miles: 15,
      status: "assigned",
    },
  ];

  const totalDeliveries = 473;
  const totalBuildings = 382;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          This Morning's Routes
        </h1>
      </div>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Results:</span>{" "}
          <strong>{totalDeliveries} deliveries</strong> to{" "}
          <strong>{totalBuildings} buildings</strong>. The long-distance hub
          will be <strong>Underpass Warehouse, 456 Freeway Street</strong>...
        </p>
      </div>

      <RouteMap routes={routes} />
    </div>
  );
}
