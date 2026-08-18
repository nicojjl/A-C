import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

export const LiveTelemetryWidget: React.FC = () => {
  const [santiagoTime, setSantiagoTime] = useState<string>('');
  const [valparaisoWeather, setValparaisoWeather] = useState<{
    temp: string;
    condition: string;
    error: boolean;
  }>({
    temp: '--°C',
    condition: 'Cargando...',
    error: false,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Time Engine
  useEffect(() => {
    const updateClock = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('es-CL', {
          timeZone: 'America/Santiago',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setSantiagoTime(timeStr);
      } catch (e) {
        setSantiagoTime('00:00:00');
      }
    };

    updateClock();
    timerRef.current = setInterval(updateClock, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Weather Engine (Valparaíso)
  useEffect(() => {
    let mounted = true;
    const fetchWeather = async () => {
      try {
        // Valparaiso coords
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-33.0456&longitude=-71.6243&current_weather=true&timezone=America%2FSantiago',
          { cache: 'no-store' }
        );
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        
        if (mounted && data?.current_weather) {
          setValparaisoWeather({
            temp: `${Math.round(data.current_weather.temperature)}°C`,
            condition: getWmoWeatherText(data.current_weather.weathercode),
            error: false,
          });
        }
      } catch (e) {
        if (mounted) {
          setValparaisoWeather({
            temp: '--°C',
            condition: 'Sin datos disponibles',
            error: true,
          });
        }
      }
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 600000); // 10 min

    return () => {
      mounted = false;
      clearInterval(weatherInterval);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 text-xs font-mono font-bold text-red-600 bg-transparent flex items-center gap-2 pointer-events-none">
      <Clock className="w-3.5 h-3.5" />
      <span>{santiagoTime}</span>
      <span>•</span>
      <span>Valpo: {valparaisoWeather.temp} ({valparaisoWeather.condition})</span>
    </div>
  );
};

// Helper to convert WMO Weather code into Spanish condition text
function getWmoWeatherText(code: number): string {
  switch (code) {
    case 0: return 'Soleado';
    case 1: return 'Despejado';
    case 2: return 'Parcialmente Nublado';
    case 3: return 'Nublado';
    case 45:
    case 48: return 'Niebla';
    case 51:
    case 53:
    case 55:
    case 56:
    case 57: return 'Llovizna';
    case 61:
    case 63:
    case 65:
    case 66:
    case 67: return 'Lluvia';
    case 71:
    case 73:
    case 75:
    case 77: return 'Nieve';
    case 80:
    case 81:
    case 82: return 'Chubascos';
    case 85:
    case 86: return 'Nieve';
    case 95:
    case 96:
    case 99: return 'Tormenta';
    default: return 'Nublado';
  }
}
