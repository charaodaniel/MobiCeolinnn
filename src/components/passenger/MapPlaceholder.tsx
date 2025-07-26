
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, MapPin, Star, Phone } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { RideRequestFormProps } from './RideRequestForm';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


interface DriverPosition {
  id: string;
  top: string;
  left: string;
  driver: RideRequestFormProps['availableDrivers'][0];
}

const generateRandomPosition = (): { top: string; left: string } => {
  const top = Math.floor(Math.random() * 80) + 10;
  const left = Math.floor(Math.random() * 80) + 10;
  return { top: `${top}%`, left: `${left}%` };
};

export function MapPlaceholder({ drivers }: { drivers: RideRequestFormProps['availableDrivers'] }) {
  const [driverPositions, setDriverPositions] = useState<DriverPosition[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    // This prevents hydration mismatch errors.
    const initialPositions: DriverPosition[] = drivers.map(driver => ({
        id: driver.id,
        ...generateRandomPosition(),
        driver,
    }));
    setDriverPositions(initialPositions);
  }, [drivers]);

  const handleCallDriver = (driverName: string) => {
    toast({
      title: 'Chamada Iniciada',
      description: `Estamos conectando você com ${driverName}.`,
    });
  };


  return (
    <Card className="h-full w-full shadow-lg overflow-hidden">
        <CardContent className="p-0 h-full w-full relative bg-muted flex items-center justify-center">
        
        {/* Radar Animation */}
        <div className="relative flex h-[300px] w-[300px] items-center justify-center rounded-full">
            {/* Radar Sweep */}
            <div className="absolute h-full w-full animate-spin [animation-duration:3s]">
                <div className="absolute h-full w-full rounded-full bg-gradient-to-t from-transparent to-primary/50"></div>
            </div>

            {/* Radar Pulses */}
            <div className="absolute h-full w-full animate-ping rounded-full border-2 border-primary/50 [animation-delay:-0.2s]"></div>
            <div className="absolute h-3/4 w-3/4 animate-ping rounded-full border-2 border-primary/50 [animation-delay:-0.4s]"></div>
            <div className="absolute h-1/2 w-1/2 animate-ping rounded-full border-2 border-primary/50 [animation-delay:-0.6s]"></div>
            
            {/* Static Radar Grid */}
            <div className="absolute h-1/4 w-1/4 rounded-full border-2 border-dashed border-primary/30"></div>
            <div className="absolute h-1/2 w-1/2 rounded-full border-2 border-dashed border-primary/30"></div>
            <div className="absolute h-3/4 w-3/4 rounded-full border-2 border-dashed border-primary/30"></div>
            <div className="absolute h-full w-full rounded-full border-2 border-dashed border-primary/30"></div>
        </div>


        {/* User's Location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" title="Sua Localização">
          <MapPin className="h-10 w-10 text-accent drop-shadow-lg" fill="hsl(var(--accent))" />
           <div className="relative flex h-3 w-3 mt-2">
            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></div>
            <div className="relative inline-flex rounded-full h-3 w-3 bg-accent/90"></div>
          </div>
        </div>

        {/* Simulated Online Drivers */}
        {driverPositions.map(({id, top, left, driver}) => (
            <Popover key={id}>
                <PopoverTrigger asChild>
                    <div
                        className="absolute transition-all duration-1000 ease-in-out cursor-pointer"
                        style={{ top: top, left: left }}
                    >
                        <Car className="h-8 w-8 text-foreground bg-background/80 p-1 rounded-full shadow-md animate-pulse" />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={`https://placehold.co/48x48.png`} data-ai-hint={`${driver.avatar} face`} />
                                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h4 className="font-semibold">{driver.name}</h4>
                                <p className="text-sm text-muted-foreground">{driver.vehicle} - <span className="font-mono">{driver.licensePlate}</span></p>
                                <div className="flex items-center pt-1">
                                    <Star className="w-4 h-4 mr-1 fill-primary text-primary" />
                                    <span className="text-xs text-muted-foreground">{driver.rating} · {driver.distance}</span>
                                </div>
                            </div>
                        </div>
                        <Button className="w-full" onClick={() => handleCallDriver(driver.name)}>
                            <Phone className="mr-2 h-4 w-4" />
                            Chamar Motorista
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        ))}
      </CardContent>
    </Card>
  );
}

