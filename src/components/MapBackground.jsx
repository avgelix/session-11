import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@googlemaps/js-api-loader';

/**
 * MapBackground Component
 * 
 * Displays a dynamic Google Maps background that changes with each question.
 * Features:
 * - 15 diverse cities with geographic coordinates
 * - Rotates cities based on questionNumber prop
 * - Subtle styling (20% opacity, slight blur) to not distract from content
 * - Lazy loads map to optimize performance
 * - Caches map instance to avoid unnecessary reloads
 * - Mobile-responsive and stays within Google Maps free tier
 */

// Array of 15 diverse cities from around the world
const CITIES = [
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Barcelona', lat: 41.3851, lng: 2.1734 },
  { name: 'Vancouver', lat: 49.2827, lng: -123.1207 },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
  { name: 'Amsterdam', lat: 52.3676, lng: 4.9041 },
  { name: 'Seoul', lat: 37.5665, lng: 126.9780 },
  { name: 'Melbourne', lat: -37.8136, lng: 144.9631 },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  { name: 'Istanbul', lat: 41.0082, lng: 28.9784 }
];

function MapBackground({ questionNumber }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Get city based on question number (cycles through cities)
  const currentCity = CITIES[questionNumber % CITIES.length];

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // If no API key is provided, don't try to load the map
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn('Google Maps API key not configured. Map background will not display.');
      return;
    }

    // Initialize the Google Maps loader
    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: []
    });

    // Load and initialize the map
    loader
      .load()
      .then(() => {
        if (mapRef.current && !mapInstanceRef.current) {
          // Create new map instance (only once)
          // eslint-disable-next-line no-undef
          mapInstanceRef.current = new google.maps.Map(mapRef.current, {
            center: { lat: currentCity.lat, lng: currentCity.lng },
            zoom: 12,
            disableDefaultUI: true,
            gestureHandling: 'none',
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            draggable: false,
            styles: [
              {
                featureType: 'all',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load map');
      });
  }, []); // Only run once on mount

  // Update map center when question changes (debounced via city rotation)
  useEffect(() => {
    if (mapInstanceRef.current && isLoaded) {
      const newCenter = { lat: currentCity.lat, lng: currentCity.lng };
      mapInstanceRef.current.panTo(newCenter);
    }
  }, [currentCity, isLoaded]);

  // Don't render anything if there's an error or no API key
  if (error) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 -z-10"
      style={{
        opacity: 0.2,
        filter: 'blur(2px)',
        pointerEvents: 'none'
      }}
    >
      <div 
        ref={mapRef} 
        className="w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
}

MapBackground.propTypes = {
  questionNumber: PropTypes.number.isRequired,
};

export default MapBackground;
