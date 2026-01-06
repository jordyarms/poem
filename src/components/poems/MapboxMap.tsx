import { useState, useCallback } from 'react';
import Map, { Marker, NavigationControl, Source, Layer } from 'react-map-gl/mapbox';
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

export interface MapPolygon {
  id: string;
  coordinates: number[][][];
  fillColor: string;
  fillOpacity?: number;
  strokeColor?: string;
  strokeWidth?: number;
  label?: {
    title: string;
    details?: string;
    status?: string;
    statusClickable?: boolean;
    position: [number, number];
  };
}

interface MapboxMapProps {
  center: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  polygons?: MapPolygon[];
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
  polygons = [],
  height = '400px',
  className = '',
  overlayText,
}: MapboxMapProps) {
  const [viewState, setViewState] = useState({
    longitude: center[1],
    latitude: center[0],
    zoom: zoom,
  });

  const onMapLoad = useCallback((event: any) => {
    const map = event.target;

    // Get all layers from the map style
    const layers = map.getStyle().layers;

    // Hide all text/symbol layers to completely remove text
    layers.forEach((layer: any) => {
      if (layer.type === 'symbol') {
        map.setLayoutProperty(layer.id, 'visibility', 'none');
      }
    });
  }, []);

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
        onLoad={onMapLoad}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      >
        <NavigationControl position="top-right" />

        {polygons.map((polygon) => (
          <Source
            key={polygon.id}
            id={polygon.id}
            type="geojson"
            data={{
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: polygon.coordinates,
              },
              properties: {},
            }}
          >
            <Layer
              id={`${polygon.id}-fill`}
              type="fill"
              paint={{
                'fill-color': polygon.fillColor,
                'fill-opacity': polygon.fillOpacity ?? 0.4,
              }}
            />
            <Layer
              id={`${polygon.id}-outline`}
              type="line"
              paint={{
                'line-color': polygon.strokeColor ?? polygon.fillColor,
                'line-width': polygon.strokeWidth ?? 2,
              }}
            />
          </Source>
        ))}

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

      {polygons.map(
        (polygon) =>
          polygon.label && (
            <div
              key={`label-${polygon.id}`}
              className="absolute bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg px-3 py-2 shadow-lg"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${
                  ((polygon.label.position[1] - viewState.longitude) * 10000) / Math.pow(2, 13 - viewState.zoom)
                }px, ${
                  ((viewState.latitude - polygon.label.position[0]) * 10000) / Math.pow(2, 13 - viewState.zoom)
                }px) translate(-50%, -50%)`,
                pointerEvents: polygon.label.statusClickable ? 'auto' : 'none',
              }}
            >
              <div className="text-sm font-bold text-gray-900 mb-1">
                {polygon.label.title}
              </div>
              {polygon.label.details && (
                <div className="text-xs text-gray-600 mb-1">
                  {polygon.label.details}
                </div>
              )}
              {polygon.label.status && (
                <div className={`text-xs font-medium ${polygon.label.statusClickable ? 'text-purple-600 hover:text-purple-700 underline cursor-pointer' : 'text-gray-700'}`}>
                  {polygon.label.status}
                </div>
              )}
            </div>
          )
      )}

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
