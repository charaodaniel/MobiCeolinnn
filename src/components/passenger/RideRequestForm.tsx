'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { MapPin, ArrowRight, DollarSign, Clock, Route, Star, User, Copy, MessageSquareQuote, LocateFixed, Loader2 } from 'lucide-react';
import { FareNegotiation } from './FareNegotiation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RideChat } from '@/components/driver/NegotiationChat';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface RideRequestFormProps {
  availableDrivers: {
    id: string;
    name: string;
    vehicle: string;
    licensePlate: string;
    vehiclePhoto: string;
    rating: number;
    distance: string;
    avatar: string;
    pixKey: string;
    urbanFare: number;
  }[];
}


export function RideRequestForm({ availableDrivers }: RideRequestFormProps) {
  const [isRural, setIsRural] = useState(false);
  const [showDrivers, setShowDrivers] = useState(false);
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');
  const { toast } = useToast();
  const [selectedDriver, setSelectedDriver] = useState<(typeof availableDrivers)[0] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rideRequested, setRideRequested] = useState(false);


  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use a geocoding service to convert lat/lng to an address.
          // For this demo, we'll use a mock address.
          setOrigin('Localização Atual (Exemplo)');
          toast({
            title: 'Localização Capturada!',
            description: 'Seu local de partida foi preenchido.',
          });
        },
        () => {
          toast({
            variant: 'destructive',
            title: 'Erro de Localização',
            description: 'Não foi possível obter sua localização. Verifique as permissões do seu navegador.',
          });
        }
      );
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Geolocalização não é suportada neste navegador.',
      });
    }
  };


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
        title: "Copiado!",
        description: "A chave PIX do motorista foi copiada para a área de transferência.",
    });
  }

  const handleRequestRide = () => {
    if (!origin) {
        toast({
            variant: 'destructive',
            title: 'Campo obrigatório',
            description: 'Por favor, preencha o local de partida.',
        });
        return;
    }
    setIsLoading(true);
    setRideRequested(false);
    setShowDrivers(false);
    // Simulate API call to request a ride
    setTimeout(() => {
        setIsLoading(false);
        setRideRequested(true);
        toast({
            title: 'Solicitação Enviada!',
            description: 'Sua solicitação foi enviada para os motoristas próximos. Aguarde a confirmação.',
        });
    }, 2000);
  };

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle className="font-headline">Solicitar uma Corrida</CardTitle>
        <CardDescription className="font-body">Para onde você quer ir?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="origin">Partida</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                id="origin" 
                placeholder="Seu local atual" 
                className="pl-10 pr-10" 
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
              <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleGetCurrentLocation}>
                            <LocateFixed className="h-5 w-5 text-muted-foreground" />
                            <span className="sr-only">Usar localização atual</span>
                         </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Usar localização atual</p>
                    </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination">Destino</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                id="destination" 
                placeholder="Digite o endereço ou local (opcional)" 
                className="pl-10" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label htmlFor="rural-mode" className="text-base font-medium">Adicionar destino interior ou intermunicipal</Label>
              <p className="text-sm text-muted-foreground">
                Ative para negociar o valor para viagens mais longas.
              </p>
            </div>
            <Switch id="rural-mode" checked={isRural} onCheckedChange={(checked) => {
                setIsRural(checked);
                setRideRequested(false);
            }} />
          </div>

          <div className="space-y-2">
            {!isRural && (
                <Button className="w-full" onClick={handleRequestRide} disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                  {isLoading ? 'Enviando Solicitação...' : 'Pedir Corrida'}
                </Button>
            )}
          </div>

           {rideRequested && !isRural && (
            <div className="space-y-4 pt-4 border-t text-center">
              <h3 className="font-headline text-lg font-semibold">Procurando Motorista...</h3>
              <p className="text-sm text-muted-foreground">Sua solicitação foi enviada. Assim que um motorista aceitar, você receberá uma notificação.</p>
              <Loader2 className="mx-auto h-8 w-8 my-2 text-primary animate-spin" />
            </div>
          )}


          {isRural ? (
            <>
                <Separator className="my-6" />
                <FareNegotiation destination={destination} />
            </>
          ) : (
             <>
                <Separator className="my-6" />
                <Button variant="outline" className="w-full" onClick={() => { setShowDrivers(!showDrivers); setRideRequested(false); }}>
                    {showDrivers ? 'Ocultar Motoristas' : 'Ver Motoristas Próximos'}
                </Button>
             </>
          )}

          {showDrivers && !isRural && (
              <Accordion type="single" collapsible className="w-full pt-4">
                {availableDrivers.map((driver) => (
                  <AccordionItem value={driver.id} key={driver.id} className="border-b-0">
                     <Card className="mb-2">
                        <AccordionTrigger className="p-3 hover:no-underline">
                            <div className="flex items-start justify-between gap-4 w-full">
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={'https://placehold.co/48x48.png'} data-ai-hint={`${driver.avatar} face`} />
                                        <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-left">{driver.name}</p>
                                        <p className="text-sm text-muted-foreground text-left">{driver.vehicle} - <span className="font-mono">{driver.licensePlate}</span></p>
                                        <div className="flex items-center justify-start gap-1 text-sm text-muted-foreground">
                                            <Star className="w-4 h-4 fill-primary text-primary" />
                                            <span>{driver.rating}</span>
                                            <span className="mx-1">·</span>
                                            <span>{driver.distance}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                   <Image src={driver.vehiclePhoto} alt={`Foto do ${driver.vehicle}`} width={80} height={60} className="rounded-md object-cover" data-ai-hint="white car" />
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-3 pt-0">
                            <div className="grid grid-cols-2 gap-4 justify-items-center py-2">
                                <div className="flex flex-col items-center gap-2">
                                    <p className="font-semibold text-sm">Perfil</p>
                                    <Image src={`https://placehold.co/128x128.png`} alt={`Foto de perfil de ${driver.name}`} width={128} height={128} className="rounded-full" data-ai-hint={`${driver.avatar} portrait`} />
                                </div>
                                 <div className="flex flex-col items-center gap-2">
                                    <p className="font-semibold text-sm">Veículo</p>
                                    <Image src={driver.vehiclePhoto} alt={`Foto do ${driver.vehicle}`} width={128} height={96} className="rounded-lg object-cover" data-ai-hint="white car side" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t">
                                <p className="text-sm text-muted-foreground">Chave PIX: <span className="font-mono">{driver.pixKey}</span></p>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(driver.pixKey)}>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Copiar Chave PIX</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                             <div className="mt-3 pt-3 border-t">
                                <RideChat passengerName="Passageiro" isNegotiation={true}>
                                    <Button className="w-full">
                                        <MessageSquareQuote className="mr-2 h-4 w-4" />
                                        Chamar e Negociar (Interior)
                                    </Button>
                                </RideChat>
                            </div>
                        </AccordionContent>
                     </Card>
                  </AccordionItem>
                ))}
              </Accordion>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
