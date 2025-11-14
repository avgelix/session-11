import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

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
  { name: 'Istanbul', lat: 41.0082, lng: 28.9784 },
  { name: 'Berlin', lat: 52.5200, lng: 13.4050 },
  { name: 'Miami', lat: 25.7617, lng: -80.1918 },
  { name: 'Boston', lat: 42.3601, lng: -71.0589 },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298 },
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 }
];

// Find city coordinates by name (case-insensitive partial match)
function findCityCoordinates(cityName) {
  if (!cityName) return null;
  const searchTerm = cityName.toLowerCase().trim();
  const found = CITIES.find(city => 
    city.name.toLowerCase().includes(searchTerm) || 
    searchTerm.includes(city.name.toLowerCase())
  );
  console.log('🔍 Finding coordinates for:', cityName, '→', found || 'not found, using default');
  return found || { name: cityName, lat: 40.7128, lng: -74.0060 }; // Default to NYC
}

function MapBackground({ questionNumber, city }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Get city coordinates - either from prop or cycling through list
  const getCityLocation = () => {
    if (city) {
      return findCityCoordinates(city);
    }
    if (questionNumber !== undefined) {
      return CITIES[questionNumber % CITIES.length];
    }
    return CITIES[0];
  };

  const currentCity = getCityLocation();

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    console.log('🗺️ MapBackground mounted');
    console.log('   - API key exists:', !!apiKey);
    console.log('   - city prop:', city);
    console.log('   - questionNumber:', questionNumber);

    // If no API key is provided, don't try to load the map
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn('⚠️ Google Maps API key not configured. Map background will not display.');
      return;
    }

    const initMap = () => {
      if (mapRef.current && !mapInstanceRef.current && window.google?.maps) {
        const centerLocation = { lat: currentCity.lat, lng: currentCity.lng };
        
        console.log('✅ Initializing Google Map');
        console.log('   - Location:', currentCity.name);
        console.log('   - Coordinates:', centerLocation);
        
        // Create new map instance (only once)
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: centerLocation,
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
        console.log('✅ Google Map initialized successfully!');
      }
    };

    // Load Google Maps dynamically using script tag
    const loadGoogleMaps = () => {
      try {
        // Check if Google Maps is already loaded
        if (window.google?.maps) {
          console.log('Google Maps already loaded, initializing map');
          initMap();
          return;
        }

        // Check if script is already being loaded
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
          console.log('Google Maps script already exists, waiting for load');
          existingScript.addEventListener('load', initMap);
          return;
        }

        // Create script element
        console.log('Loading Google Maps script');
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          console.log('Google Maps script loaded');
          initMap();
        };
        
        script.onerror = () => {
          console.error('Error loading Google Maps script');
          setError('Failed to load map');
        };

        document.head.appendChild(script);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load map');
      }
    };

    loadGoogleMaps();
  }, []); // Only run once on mount

  // Update map center when city changes
  useEffect(() => {
    if (mapInstanceRef.current && isLoaded && currentCity) {
      const newCenter = { lat: currentCity.lat, lng: currentCity.lng };
      console.log('📍 Moving map to:', currentCity.name, newCenter);
      mapInstanceRef.current.panTo(newCenter);
    }
  }, [currentCity, isLoaded]);

  // Don't render anything if there's an error or no API key
  if (error) {
    console.error('MapBackground error, not rendering:', error);
    return null;
  }

  console.log('🗺️ MapBackground rendering');
  console.log('   - isLoaded:', isLoaded);
  console.log('   - error:', error);
  console.log('   - city:', city);

  return (
    <div 
      className="absolute inset-0"
      style={{
        opacity: 0.6,
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: '#93c5fd' // Light blue background for debugging
      }}
    >
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ backgroundColor: isLoaded ? 'transparent' : '#e5e7eb' }}
        aria-hidden="true"
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          Loading map...
        </div>
      )}
    </div>
  );
}

MapBackground.propTypes = {
  questionNumber: PropTypes.number,
  city: PropTypes.string,
};

export default MapBackground;
