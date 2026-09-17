import React, { useEffect, useRef, useState, useCallback } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import {
  MapPin,
  Navigation,
  Car,
  Clock,
  Compass,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RotateCcw,
  Plane,
  Building,
  ChevronRight,
  LocateFixed,
  Layers,
} from 'lucide-react';
import { SENTIERO_INFO } from '../data/hotelData';

// Precise coordinates of Sentiero Hotels & Suites, Imo Airport Road, Ngor-Okpala, Imo State
export const SENTIERO_COORDINATES = {
  lat: 5.4345,
  lng: 7.2018,
};

// Popular starting locations across Imo State and nearby hubs
interface PopularPoint {
  name: string;
  coords: { lat: number; lng: number };
  desc: string;
  distanceEst: string;
  durationEst: string;
  steps: string[];
  icon: React.ElementType;
}

const POPULAR_START_POINTS: PopularPoint[] = [
  {
    name: 'Sam Mbakwe Airport (QOW)',
    coords: { lat: 5.4267, lng: 7.206 },
    desc: '2 mins away · Complimentary airport pick-up',
    distanceEst: '1.2 km',
    durationEst: '2 mins',
    steps: [
      'Exit the Sam Mbakwe Airport passenger terminal onto Airport Access Road.',
      'Head northwest along Imo Airport Road toward the Owerri-Aba Expressway junction.',
      'Sentiero Hotels & Suites grand gated entrance will be directly on your right hand side with 24/7 security reception.',
    ],
    icon: Plane,
  },
  {
    name: 'Owerri City Center / Control Post',
    coords: { lat: 5.4855, lng: 7.0356 },
    desc: 'Approx. 20-25 mins via Owerri-Aba Expy',
    distanceEst: '19.5 km',
    durationEst: '22 mins',
    steps: [
      'From Control Post / Onitsha Road, connect onto Wetheral Road heading east toward Owerri-Aba Expressway.',
      'Merge onto Owerri-Aba Expressway (A3) and continue straight past Naze and Ulakwo.',
      'Take the Imo Airport Road exit towards Sam Mbakwe International Airport.',
      'Arrive at Sentiero Hotels & Suites on Airport Road before the airport gate.',
    ],
    icon: Building,
  },
  {
    name: 'Wetheral Road / Govt House',
    coords: { lat: 5.489, lng: 7.034 },
    desc: 'Approx. 20 mins via Port Harcourt / Airport bypass',
    distanceEst: '18.8 km',
    durationEst: '20 mins',
    steps: [
      'Take Wetheral Road southbound toward Aba Road round-about.',
      'Follow the dual carriage expressway toward Ngor-Okpala local government corridor.',
      'Turn onto the paved Airport Road boulevard.',
      'Sentiero Hotels & Suites is situated on your right before the airport perimeter.',
    ],
    icon: Compass,
  },
  {
    name: 'Aba / Ngor-Okpala Junction',
    coords: { lat: 5.39, lng: 7.185 },
    desc: 'Approx. 8-10 mins from Abia State border',
    distanceEst: '8.4 km',
    durationEst: '9 mins',
    steps: [
      'From Aba axis, drive north along Owerri-Aba Expressway towards Ngor-Okpala.',
      'At Ngor-Okpala Junction, branch right onto Imo Airport access road.',
      'Follow Airport Road for 2 kilometers.',
      'Arrive at Sentiero Hotels & Suites entrance.',
    ],
    icon: Car,
  },
];

interface RouteStep {
  instructions: string;
  distance: string;
  duration: string;
}

interface RouteDetails {
  distance: string;
  duration: string;
  startAddress: string;
  endAddress: string;
  steps: RouteStep[];
  summary: string;
}

export const GoogleHotelMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const directionsRendererRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hotelMarkerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const infoWindowRef = useRef<any>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapLoadError, setMapLoadError] = useState<string | null>(null);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  // Directions state (use pure string types to avoid runtime google.* references)
  const [startLocation, setStartLocation] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [isLocatingUser, setIsLocatingUser] = useState(false);
  const [routeDetails, setRouteDetails] = useState<RouteDetails | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [travelMode, setTravelMode] = useState<'DRIVING' | 'TRANSIT'>('DRIVING');
  const [showSteps, setShowSteps] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Initialize Google Maps safely
  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      try {
        if (!apiKey) {
          throw new Error('Google Maps API key is not configured');
        }

        // Set options once
        try {
          setOptions({
            key: apiKey,
            v: 'weekly',
          });
        } catch (optionsErr) {
          console.warn('setOptions notice:', optionsErr);
        }

        // Load libraries asynchronously with timeout safety
        const loadPromise = Promise.all([
          importLibrary('maps'),
          importLibrary('marker'),
          importLibrary('routes'),
        ]);

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Maps loading timeout')), 9000)
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [mapsLib, markerLib, routesLib]: any = await Promise.race([
          loadPromise,
          timeoutPromise,
        ]);

        if (!isMounted || !mapContainerRef.current) return;

        const MapClass = mapsLib.Map;
        const InfoWindowClass = mapsLib.InfoWindow;
        const MarkerClass = markerLib.Marker || (window.google && window.google.maps && window.google.maps.Marker);
        const DirectionsRendererClass =
          routesLib.DirectionsRenderer || (window.google && window.google.maps && window.google.maps.DirectionsRenderer);

        const mapOptions = {
          center: SENTIERO_COORDINATES,
          zoom: 15,
          mapTypeId: mapType,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        };

        const map = new MapClass(mapContainerRef.current, mapOptions);
        mapInstanceRef.current = map;

        // Custom Hotel Marker
        if (MarkerClass) {
          const marker = new MarkerClass({
            position: SENTIERO_COORDINATES,
            map,
            title: 'Sentiero Hotels & Suites',
          });
          hotelMarkerRef.current = marker;

          // Info Window for Sentiero Hotels
          const infoWindowContent = `
            <div style="padding: 10px; max-width: 250px; font-family: sans-serif; color: #091626;">
              <div style="font-size: 11px; font-weight: bold; color: #CD9A29; text-transform: uppercase;">Luxury Airport Hotel</div>
              <div style="font-size: 14px; font-weight: 800; color: #242E51; margin: 3px 0 6px 0;">Sentiero Hotels & Suites</div>
              <div style="font-size: 12px; color: #4B5563; line-height: 1.4;">Imo Airport Road, off Owerri-Aba Express Way, Ngor-Okpala, Imo State</div>
              <div style="margin-top: 6px; font-size: 11px; font-weight: bold; color: #10B981;">✈️ 2 Mins to Sam Mbakwe Airport</div>
              <div style="margin-top: 4px; font-size: 11px; color: #242E51; font-weight: 600;">📞 24/7 Front Desk: +234 814 990 0012</div>
            </div>
          `;
          const infoWindow = new InfoWindowClass({
            content: infoWindowContent,
          });
          infoWindowRef.current = infoWindow;

          if (marker.addListener) {
            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });
          }

          // Open info window by default
          infoWindow.open(map, marker);
        }

        // Setup Directions Renderer
        if (DirectionsRendererClass) {
          const directionsRenderer = new DirectionsRendererClass({
            map,
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: '#242E51',
              strokeWeight: 5,
              strokeOpacity: 0.85,
            },
          });
          directionsRendererRef.current = directionsRenderer;
        }

        setMapLoaded(true);
      } catch (err: unknown) {
        console.warn('Google Maps JS API load notice (switching to interactive fallback):', err);
        if (isMounted) {
          setMapLoadError(
            'Interactive satellite view is available via live map. Direct directions and GPS links remain fully active.'
          );
        }
      }
    };

    initMap();

    return () => {
      isMounted = false;
    };
  }, [apiKey, mapType]);

  // Toggle map type (Roadmap vs Satellite)
  const toggleMapType = () => {
    const nextType = mapType === 'roadmap' ? 'satellite' : 'roadmap';
    setMapType(nextType);
    if (mapInstanceRef.current && typeof mapInstanceRef.current.setMapTypeId === 'function') {
      mapInstanceRef.current.setMapTypeId(nextType);
    }
  };

  // Reset map view to hotel
  const handleResetView = () => {
    if (mapInstanceRef.current) {
      if (typeof mapInstanceRef.current.setCenter === 'function') {
        mapInstanceRef.current.setCenter(SENTIERO_COORDINATES);
      }
      if (typeof mapInstanceRef.current.setZoom === 'function') {
        mapInstanceRef.current.setZoom(15);
      }
      if (hotelMarkerRef.current && infoWindowRef.current && typeof infoWindowRef.current.open === 'function') {
        infoWindowRef.current.open(mapInstanceRef.current, hotelMarkerRef.current);
      }
    }
  };

  // Compute directions to Sentiero Hotels
  const calculateDirections = useCallback(
    async (
      originQuery?: string | { lat: number; lng: number },
      matchedPreset?: PopularPoint
    ) => {
      const origin = originQuery || startLocation.trim();
      if (!origin) {
        setRouteError('Please enter your starting location or select a popular departure hub.');
        return;
      }

      setIsCalculating(true);
      setRouteError(null);

      // Check if it matches a preset point for instant accurate guidance
      const preset =
        matchedPreset ||
        POPULAR_START_POINTS.find(
          (p) =>
            typeof origin === 'string' &&
            (p.name.toLowerCase().includes(origin.toLowerCase()) ||
              origin.toLowerCase().includes(p.name.toLowerCase()))
        );

      // Try Google Directions Service if window.google is ready
      const hasGoogleDirections =
        typeof window !== 'undefined' &&
        Boolean(window.google && window.google.maps && window.google.maps.DirectionsService);

      if (hasGoogleDirections) {
        try {
          const directionsService = new window.google.maps.DirectionsService();
          const requestOrigin =
            typeof origin === 'string'
              ? origin.toLowerCase().includes('nigeria') || origin.toLowerCase().includes('imo')
                ? origin
                : `${origin}, Imo State, Nigeria`
              : origin;

          const request = {
            origin: requestOrigin,
            destination: SENTIERO_COORDINATES,
            travelMode:
              travelMode === 'TRANSIT'
                ? window.google.maps.TravelMode.TRANSIT
                : window.google.maps.TravelMode.DRIVING,
          };

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          directionsService.route(request, (result: any, status: any) => {
            setIsCalculating(false);

            if (status === 'OK' && result && result.routes && result.routes.length > 0) {
              if (directionsRendererRef.current) {
                directionsRendererRef.current.setDirections(result);
              }

              const primaryRoute = result.routes[0];
              const leg = primaryRoute.legs[0];

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const steps: RouteStep[] = (leg.steps || []).map((step: any) => ({
                instructions: (step.instructions || '').replace(/<[^>]*>?/gm, ' '),
                distance: step.distance?.text || '',
                duration: step.duration?.text || '',
              }));

              setRouteDetails({
                distance: leg.distance?.text || 'Calculated',
                duration: leg.duration?.text || 'Calculated',
                startAddress: leg.start_address,
                endAddress: 'Sentiero Hotels & Suites, Imo Airport Road',
                steps,
                summary: primaryRoute.summary || 'via Airport Rd & Owerri-Aba Expy',
              });
              setShowSteps(true);
              return;
            }

            // If Directions status was not OK, provide fallback preset or offline route
            fallbackToEstimatedRoute(origin, preset);
          });
          return;
        } catch (dirErr) {
          console.warn('Directions API call error:', dirErr);
        }
      }

      // Fallback calculation when Google Directions is unavailable or in offline/sandbox mode
      setTimeout(() => {
        setIsCalculating(false);
        fallbackToEstimatedRoute(origin, preset);
      }, 400);
    },
    [startLocation, travelMode]
  );

  // Fallback route builder for guaranteed user experience
  const fallbackToEstimatedRoute = (
    origin: string | { lat: number; lng: number },
    preset?: PopularPoint
  ) => {
    const originLabel = typeof origin === 'string' ? origin : 'Selected Location';

    if (preset) {
      setRouteDetails({
        distance: preset.distanceEst,
        duration: preset.durationEst,
        startAddress: preset.name,
        endAddress: 'Sentiero Hotels & Suites, Imo Airport Road, Ngor-Okpala',
        steps: preset.steps.map((inst) => ({
          instructions: inst,
          distance: '',
          duration: '',
        })),
        summary: 'via Imo Airport Road & Owerri-Aba Expressway',
      });
      setShowSteps(true);
      return;
    }

    // Generic realistic route guidance towards Sentiero Hotels
    setRouteDetails({
      distance: 'Approx. 15-20 km',
      duration: 'Approx. 20-25 mins',
      startAddress: originLabel,
      endAddress: 'Sentiero Hotels & Suites, Imo Airport Road, Ngor-Okpala',
      steps: [
        {
          instructions: `Depart from ${originLabel} and connect onto the main highway toward Ngor-Okpala.`,
          distance: '3.0 km',
          duration: '5 mins',
        },
        {
          instructions:
            'Join the Owerri-Aba Expressway (A3) heading in the direction of Sam Mbakwe International Airport.',
          distance: '12.0 km',
          duration: '14 mins',
        },
        {
          instructions:
            'Turn onto Imo Airport Road at the Ngor-Okpala interchange toward the airport gate.',
          distance: '2.5 km',
          duration: '3 mins',
        },
        {
          instructions:
            'Sentiero Hotels & Suites will be on your right with security perimeter and prominent lighted signage.',
          distance: '200 m',
          duration: '1 min',
        },
      ],
      summary: 'via Owerri-Aba Expy & Imo Airport Road',
    });
    setShowSteps(true);
  };

  // Clear directions
  const handleClearRoute = () => {
    if (directionsRendererRef.current && typeof directionsRendererRef.current.set === 'function') {
      directionsRendererRef.current.set('directions', null);
    }
    setRouteDetails(null);
    setRouteError(null);
    setShowSteps(false);
    setStartLocation('');
    handleResetView();
  };

  // Get user's current GPS location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setRouteError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocatingUser(true);
    setRouteError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocatingUser(false);
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setStartLocation('My Current GPS Location');
        calculateDirections(userCoords);
      },
      (error) => {
        setIsLocatingUser(false);
        console.warn('Geolocation notice:', error);
        setRouteError(
          'Could not access GPS automatically. Please enter your departure area or tap one of the landmark buttons below.'
        );
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  // Deep link to official Google Maps App Navigation
  const googleMapsAppUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Sentiero Hotels and Suites, Imo Airport Road, Ngor-Okpala, Imo State'
  )}&origin=${encodeURIComponent(
    startLocation || 'Sam Mbakwe International Cargo Airport, Owerri'
  )}&travelmode=driving`;

  // Standard Google Maps Embed URL as reliable fallback
  const iframeEmbedUrl = `https://maps.google.com/maps?q=${SENTIERO_COORDINATES.lat},${SENTIERO_COORDINATES.lng}&hl=en&z=15&output=embed`;

  return (
    <div className="rounded-3xl overflow-hidden border border-[#242E51]/20 bg-white shadow-xl space-y-0">
      {/* Top Banner & Control Bar */}
      <div className="bg-[#242E51] text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#CD9A29] text-white text-[11px] font-bold tracking-wide uppercase">
              Interactive Hotel Location
            </span>
            <span className="text-xs text-white/70">Imo State, Nigeria</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-extrabold text-white font-display mt-1">
            Sentiero Hotels & Suites Map & Directions
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mt-0.5">
            Imo Airport Road, off Owerri-Aba Express Way, Ngor-Okpala · Just 2 minutes to Sam Mbakwe Airport
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleMapType}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition flex items-center gap-1.5"
            title="Toggle Satellite / Road Map"
          >
            <Layers className="w-4 h-4 text-[#CD9A29]" />
            <span className="capitalize">{mapType === 'roadmap' ? 'Satellite View' : 'Roadmap'}</span>
          </button>

          <button
            onClick={handleResetView}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition flex items-center gap-1.5"
            title="Center on Sentiero Hotel"
          >
            <RotateCcw className="w-4 h-4 text-[#CD9A29]" />
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative w-full h-[380px] sm:h-[460px] md:h-[500px] bg-neutral-100">
        {/* Google Maps JavaScript API Container */}
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Embedded Map Fallback if JS API is loading or blocked by environment */}
        {(!mapLoaded || mapLoadError) && (
          <div className="absolute inset-0 z-0">
            <iframe
              title="Sentiero Hotels & Suites Map Location"
              src={iframeEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        )}

        {/* Floating Quick Badges */}
        <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 pointer-events-none">
          <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-[#242E51]/15 text-[#091626] text-xs font-bold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#CD9A29]" />
            <span>Sentiero Hotels (5.4345°N, 7.2018°E)</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#10B981] text-white shadow-md text-xs font-bold flex items-center gap-1">
            <Plane className="w-3.5 h-3.5" />
            <span>2 Mins to Airport Gate</span>
          </div>
        </div>
      </div>

      {/* Interactive "Get Directions" Engine Section */}
      <div className="p-5 sm:p-7 bg-neutral-50/80 border-t border-[#242E51]/15 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#CD9A29] uppercase tracking-wider">
              <Navigation className="w-3.5 h-3.5" />
              <span>Turn-by-Turn Route Guidance</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-[#091626] font-display">
              Get Directions to Sentiero Hotels
            </h4>
            <p className="text-xs text-[#091626]/70 mt-0.5">
              Input your departure point anywhere in Imo State, Southeastern Nigeria, or tap your current location to calculate the optimal route.
            </p>
          </div>

          {/* Travel Mode Toggle */}
          <div className="flex items-center bg-white p-1 rounded-2xl border border-[#242E51]/15 self-start md:self-auto shadow-xs">
            <button
              type="button"
              onClick={() => {
                setTravelMode('DRIVING');
                if (startLocation) calculateDirections();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                travelMode === 'DRIVING'
                  ? 'bg-[#242E51] text-white shadow-xs'
                  : 'text-[#091626]/70 hover:text-[#091626]'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Drive</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTravelMode('TRANSIT');
                if (startLocation) calculateDirections();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                travelMode === 'TRANSIT'
                  ? 'bg-[#242E51] text-white shadow-xs'
                  : 'text-[#091626]/70 hover:text-[#091626]'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Transit / Shuttle</span>
            </button>
          </div>
        </div>

        {/* Input Bar & Actions */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#242E51]/15 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-[#CD9A29] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') calculateDirections();
                }}
                placeholder="Enter departure point (e.g. Sam Mbakwe Airport, Control Post, Aba Rd)..."
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl border border-[#242E51]/20 bg-white text-[#091626] placeholder-[#091626]/40 focus:outline-hidden focus:ring-2 focus:ring-[#CD9A29]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isLocatingUser}
                className="px-3.5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-[#091626] text-xs font-semibold border border-[#242E51]/15 transition flex items-center justify-center gap-1.5 shrink-0"
                title="Use current GPS location"
              >
                <LocateFixed className={`w-4 h-4 text-[#242E51] ${isLocatingUser ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">My Location</span>
              </button>

              <button
                type="button"
                onClick={() => calculateDirections()}
                disabled={isCalculating}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#CD9A29] hover:bg-[#B88720] text-white text-xs sm:text-sm font-bold transition shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
              >
                <Navigation className={`w-4 h-4 ${isCalculating ? 'animate-spin' : ''}`} />
                <span>{isCalculating ? 'Routing...' : 'Get Directions'}</span>
              </button>

              {routeDetails && (
                <button
                  type="button"
                  onClick={handleClearRoute}
                  className="px-3.5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-[#091626]/70 text-xs font-semibold transition"
                  title="Clear Route"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Select Popular Starting Points */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold text-[#091626]/60 uppercase tracking-wider block">
              Quick Select Popular Departure Hubs:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {POPULAR_START_POINTS.map((point) => {
                const IconComponent = point.icon;
                const isSelected = startLocation === point.name;
                return (
                  <button
                    key={point.name}
                    type="button"
                    onClick={() => {
                      setStartLocation(point.name);
                      calculateDirections(point.coords, point);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 ${
                      isSelected
                        ? 'border-[#CD9A29] bg-[#CD9A29]/10 text-[#091626]'
                        : 'border-[#242E51]/10 bg-neutral-50 hover:bg-white hover:border-[#242E51]/30 text-[#091626]'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#242E51]/10 flex items-center justify-center text-[#242E51] shrink-0">
                      <IconComponent className="w-3.5 h-3.5 text-[#CD9A29]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#091626] truncate">{point.name}</p>
                      <p className="text-[10px] text-[#091626]/60 truncate">{point.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Route Error Notice */}
        {routeError && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">{routeError}</p>
              <p className="text-amber-800">
                You can also launch full live turn-by-turn navigation directly in your Google Maps application:
              </p>
              <a
                href={googleMapsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#242E51] underline hover:text-[#CD9A29] pt-1"
              >
                <span>Launch Google Maps GPS Navigation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Calculated Route Details & Turn-by-Turn Guidance */}
        {routeDetails && (
          <div className="bg-white rounded-2xl border border-[#CD9A29]/30 p-5 sm:p-6 shadow-md space-y-5">
            {/* Route Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-neutral-100">
              <div className="p-3.5 rounded-xl bg-[#242E51]/5 border border-[#242E51]/10">
                <span className="text-[10px] font-bold uppercase text-[#091626]/50 block">
                  Estimated Travel Time
                </span>
                <div className="flex items-center gap-1.5 mt-1 text-lg font-extrabold text-[#242E51]">
                  <Clock className="w-4 h-4 text-[#CD9A29]" />
                  <span>{routeDetails.duration}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#242E51]/5 border border-[#242E51]/10">
                <span className="text-[10px] font-bold uppercase text-[#091626]/50 block">
                  Total Distance
                </span>
                <div className="flex items-center gap-1.5 mt-1 text-lg font-extrabold text-[#242E51]">
                  <Compass className="w-4 h-4 text-[#CD9A29]" />
                  <span>{routeDetails.distance}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#242E51]/5 border border-[#242E51]/10">
                <span className="text-[10px] font-bold uppercase text-[#091626]/50 block">
                  Recommended Highway Route
                </span>
                <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-[#091626] truncate">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span className="truncate">{routeDetails.summary}</span>
                </div>
              </div>
            </div>

            {/* Live Navigation CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-[#242E51] to-[#1B233F] text-white">
              <div className="space-y-0.5 text-center sm:text-left">
                <p className="text-xs font-bold text-white">Ready to drive to Sentiero?</p>
                <p className="text-[11px] text-white/70">
                  Open turn-by-turn voice navigation directly on your device
                </p>
              </div>
              <a
                href={googleMapsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#CD9A29] hover:bg-[#B88720] text-white text-xs font-bold transition shadow-md flex items-center gap-1.5 shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Start GPS Navigation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Step-by-Step Maneuver Accordion */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#091626] uppercase tracking-wider">
                  Step-by-Step Turn Directions ({routeDetails.steps.length} Steps)
                </span>
                <button
                  type="button"
                  onClick={() => setShowSteps(!showSteps)}
                  className="text-xs font-bold text-[#CD9A29] hover:underline"
                >
                  {showSteps ? 'Hide Details' : 'Show Details'}
                </button>
              </div>

              {showSteps && (
                <ol className="space-y-2.5 pt-2 border-t border-neutral-100 max-h-72 overflow-y-auto pr-1">
                  {routeDetails.steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100/80 transition text-xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#242E51] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <div className="flex-1 space-y-0.5">
                        <p className="text-[#091626] font-medium leading-relaxed">
                          {step.instructions}
                        </p>
                        {(step.distance || step.duration) && (
                          <div className="flex items-center gap-2 text-[10px] text-[#091626]/50">
                            {step.distance && <span>{step.distance}</span>}
                            {step.duration && <span>· {step.duration}</span>}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        )}

        {/* Airport Shuttle Contact Banner */}
        <div className="p-4 rounded-2xl bg-[#CD9A29]/10 border border-[#CD9A29]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#CD9A29] text-white flex items-center justify-center shrink-0">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-[#091626]">Landing at Sam Mbakwe International Airport?</p>
              <p className="text-[11px] text-[#091626]/70">
                Our complimentary airport shuttle can be dispatched immediately to your arrival terminal.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/2348149900012?text=${encodeURIComponent(
              'Hello Sentiero Hotels Front Desk, I am landing at Sam Mbakwe Airport and request the airport shuttle dispatch.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-full bg-[#242E51] hover:bg-[#1B233F] text-white font-bold transition shrink-0 flex items-center gap-1.5"
          >
            <span>Request Airport Pick-Up</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Legal Attribution for Google Maps Platform */}
        <div className="pt-2 text-center text-[11px] text-[#091626]/50 font-medium">
          <p>Powered by Google Maps Platform</p>
          <p className="mt-0.5 font-bold tracking-wider">Google Maps</p>
        </div>
      </div>
    </div>
  );
};
