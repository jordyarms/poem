import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export interface MapMarker {
  id: string;
  position: [number, number];
  title: string;
  description?: string;
}

export interface MapCircle {
  id: string;
  center: [number, number];
  radius: number;
  color?: string;
  fillColor?: string;
  label?: string;
}

interface MapProps {
  center: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  circles?: MapCircle[];
  height?: string;
  className?: string;
}

// Component to fit bounds when circles are present
function FitBounds({ circles }: { circles?: MapCircle[] }) {
  const map = useMap();

  useEffect(() => {
    if (circles && circles.length > 0) {
      const bounds = L.latLngBounds(circles.map(c => c.center));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [circles, map]);

  return null;
}

export default function Map({
  center,
  zoom = 13,
  markers = [],
  circles = [],
  height = '400px',
  className = '',
}: MapProps) {
  return (
    <div className={className} style={{ height, width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>
              <div>
                <strong>{marker.title}</strong>
                {marker.description && <p className="text-sm mt-1">{marker.description}</p>}
              </div>
            </Popup>
          </Marker>
        ))}

        {circles.map((circle) => (
          <Circle
            key={circle.id}
            center={circle.center}
            radius={circle.radius}
            pathOptions={{
              color: circle.color || '#3b82f6',
              fillColor: circle.fillColor || '#3b82f6',
              fillOpacity: 0.2,
            }}
          >
            {circle.label && (
              <Popup>
                <div>
                  <strong>{circle.label}</strong>
                </div>
              </Popup>
            )}
          </Circle>
        ))}

        {circles.length > 0 && <FitBounds circles={circles} />}
      </MapContainer>
    </div>
  );
}
