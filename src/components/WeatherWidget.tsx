
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, AlertCircle, Sun, Cloud, CloudSun, CloudRain, Snowflake } from 'lucide-react';

interface WeatherData {
  current_condition: {
    temp_C: string;
    weatherDesc: { value: string }[];
  }[];
  nearest_area: {
    areaName: { value: string }[];
    country: { value:string }[];
  }[];
}

const fetchWeather = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const response = await fetch(`https://wttr.in/${latitude},${longitude}?format=j1`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data.');
  }
  const data = await response.json();
  if (!data.current_condition || !data.nearest_area) {
    throw new Error('Invalid weather data format received.');
  }
  return data;
};

const WeatherIcon = ({ description }: { description: string }) => {
  const desc = description.toLowerCase();
  if (desc.includes('sunny') || desc.includes('clear')) return <Sun className="h-10 w-10 text-yellow-500" />;
  if (desc.includes('rain') || desc.includes('shower')) return <CloudRain className="h-10 w-10 text-blue-500" />;
  if (desc.includes('snow')) return <Snowflake className="h-10 w-10 text-blue-300" />;
  if (desc.includes('cloudy') || desc.includes('overcast')) return <Cloud className="h-10 w-10 text-gray-500" />;
  if (desc.includes('partly cloudy')) return <CloudSun className="h-10 w-10 text-yellow-400" />;
  return <CloudSun className="h-10 w-10 text-yellow-400" />;
};

const WeatherWidget: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setLocationError('Location access denied. Showing weather for London.');
        setLocation({ latitude: 51.5072, longitude: -0.1276 }); // Default to London
      }
    );
  }, []);

  const { data: weather, isLoading, isError, error: queryError } = useQuery<WeatherData, Error>({
    queryKey: ['weather', location],
    queryFn: () => fetchWeather(location!.latitude, location!.longitude),
    enabled: !!location,
    retry: 1,
  });

  const area = weather?.nearest_area[0];
  const locationName = area ? `${area.areaName[0].value}, ${area.country[0].value}` : (locationError || '... a default location');
  
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Current Weather</CardTitle>
        <CardDescription>{locationName}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        {isLoading || (!location && !locationError) ? (
          <div className="flex flex-col items-center text-muted-foreground">
            <Loader2 className="animate-spin h-8 w-8" />
            <p className="mt-2 text-sm">{!location ? 'Getting location...' : 'Fetching weather...'}</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center text-destructive text-center">
            <AlertCircle className="h-8 w-8" />
            <p className="mt-2 text-sm">Could not fetch weather data.</p>
            <p className="text-xs">{queryError?.message}</p>
          </div>
        ) : weather ? (
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="text-4xl font-bold">{weather.current_condition[0].temp_C}°C</p>
              <p className="text-muted-foreground">{weather.current_condition[0].weatherDesc[0].value}</p>
            </div>
            <WeatherIcon description={weather.current_condition[0].weatherDesc[0].value} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
