import { useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

type ViewStateChangeEvent = {
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
};

const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam9yZHlhcm1zIiwiYSI6ImNtazFiMmxzZjAyMWEzZ3ExYWJrZmtyYmcifQ.lEvrwJ7aFUtPq9KRfxfZkQ';

export interface MapMarker {
  id: string;
  position: [number, number];
  title: string;
  description?: string;
}

interface MapboxMapProps {
  center: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  height?: string;
  className?: string;
  overlayText?: {
    title: string;
    subtitle: string;
    link?: { text: string; href: string };
  };
}

export default function MapboxMap({
  center,
  zoom = 13,
  markers = [],
  height = '400px',
  className = '',
  overlayText,
}: MapboxMapProps) {
  const [viewState, setViewState] = useState({
    longitude: center[1],
    latitude: center[0],
    zoom: zoom,
  });

  return (
    <div className={`relative ${className}`} style={{ height, width: '100%' }}>
      <style>{`
        .mapboxgl-ctrl-attrib,
        .mapboxgl-ctrl-logo {
          display: none !important;
        }
      `}</style>
      <Map
        {...viewState}
        onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      >
        <NavigationControl position="top-right" />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.position[1]}
            latitude={marker.position[0]}
            anchor="bottom"
          >
            <div className="bg-purple-600 w-3 h-3 rounded-full border-2 border-white shadow-lg" />
          </Marker>
        ))}
      </Map>

      {overlayText && (
        <div className="absolute top-4 left-4 bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            {overlayText.title}
          </h3>
          <p className="text-xs text-gray-600 mb-2">{overlayText.subtitle}</p>
          {overlayText.link && (
            <a
              href={overlayText.link.href}
              className="text-xs text-purple-600 hover:text-purple-700 underline"
            >
              {overlayText.link.text}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
