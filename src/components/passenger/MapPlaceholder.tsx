import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Car, MapPin } from 'lucide-react';

export function MapPlaceholder() {
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
        <div className="absolute top-[20%] left-[30%]" title="Carlos M. - Online">
          <Car className="h-8 w-8 text-foreground bg-background/80 p-1 rounded-full shadow-md animate-pulse" />
        </div>
        <div className="absolute top-[60%] left-[15%]" title="Roberto F. - Online">
          <Car className="h-8 w-8 text-foreground bg-background/80 p-1 rounded-full shadow-md animate-pulse" />
        </div>
        <div className="absolute top-[40%] left-[70%]" title="Motorista Anônimo - Online">
          <Car className="h-8 w-8 text-foreground bg-background/80 p-1 rounded-full shadow-md animate-pulse" />
        </div>
         <div className="absolute top-[75%] left-[80%]" title="Motorista Anônimo - Online">
          <Car className="h-8 w-8 text-foreground bg-background/80 p-1 rounded-full shadow-md animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
