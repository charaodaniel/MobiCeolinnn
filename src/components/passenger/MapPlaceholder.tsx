'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Car, MapPin } from 'lucide-react';

interface DriverPosition {
  id: number;
  top: string;
  left: string;
  title: string;
}

const generateRandomPosition = (): { top: string; left: string } => {
  // Avoid placing icons too close to the edges
  const top = Math.floor(Math.random() * 80) + 10;
  const left = Math.floor(Math.random() * 80) + 10;
  return { top: `${top}%`, left: `${left}%` };
};

export function MapPlaceholder() {
  const [driverPositions, setDriverPositions] = useState<DriverPosition[]>([]);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    // This prevents hydration mismatch errors.
    const initialPositions: DriverPosition[] = [
      { id: 1, ...generateRandomPosition(), title: 'Carlos M. - Online' },
      { id: 2, ...generateRandomPosition(), title: 'Roberto F. - Online' },
      { id: 3, ...generateRandomPosition(), title: 'Motorista Anônimo - Online' },
      { id: 4, ...generateRandomPosition(), title: 'Motorista Anônimo - Online' },
    ];
    setDriverPositions(initialPositions);
  }, []);


  return (
    <Card className="h-full w-full shadow-lg overflow-hidden">
      <CardContent className="p-0 h-full w-full relative">
        <Image
          src="https://placehold.co/800x600.png"
          alt="Map view showing user location and nearby drivers"
          fill
          className="object-cover"
          data-ai-hint="city map"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* User's Location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" title="Sua Localização">
          <MapPin className="h-12 w-12 text-primary drop-shadow-lg" fill="hsl(var(--primary))" />
           <div className="relative flex h-3 w-3 mt-2">
            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></div>
            <div className="relative inline-flex rounded-full h-3 w-3 bg-primary/90"></div>
          </div>
        </div>

        {/* Simulated Online Drivers */}
        {driverPositions.map((driver) => (
            <div
                key={driver.id}
                className="absolute transition-all duration-1000 ease-in-out"
                style={{ top: driver.top, left: driver.left }}
                title={driver.title}
            >
                <Car className="h-8 w-8 text-foreground bg-background/80 p-1 rounded-full shadow-md animate-pulse" />
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
