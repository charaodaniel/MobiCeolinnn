

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { MapPin, ArrowRight, DollarSign, Clock, Route, Star, User, Copy, MessageSquareQuote, LocateFixed } from 'lucide-react';
import { FareNegotiation } from './FareNegotiation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NegotiationChat } from '@/components/driver/NegotiationChat';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


const availableDrivers = [
    { id: '1', name: 'Carlos Motorista', vehicle: 'Toyota Corolla', licensePlate: 'BRA2E19', vehiclePhoto: 'https://placehold.co/128x96.png', rating: 4.9, distance: '2 min', avatar: 'man', pixKey: 'carlos.motorista@email.com', urbanFare: 25.50 },
    { id: '2', name: 'Fernanda Lima', vehicle: 'Honda Civic', licensePlate: 'XYZ1234', vehiclePhoto: 'https://placehold.co/128x96.png', rating: 4.8, distance: '5 min', avatar: 'woman', pixKey: '123.456.789-00', urbanFare: 28.00 },
    { id: '3', name: 'Roberto Freire', vehicle: 'Chevrolet Onix', licensePlate: 'ABC9876', vehiclePhoto: 'https://placehold.co/128x96.png', rating: 4.9, distance: '8 min', avatar: 'person', pixKey: '(11) 98765-4321', urbanFare: 22.00 },
];

export function RideRequestForm() {
  const [isRural, setIsRural] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);
  const [showDrivers, setShowDrivers] = useState(false);
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');
  const { toast } = useToast();
  const [selectedDriver, setSelectedDriver] = useState<(typeof availableDrivers)[0] | null>(null);

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

  const handleShowEstimate = () => {
    if (selectedDriver) {
      setShowEstimate(true);
      setShowDrivers(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Selecione um Motorista',
        description: 'Por favor, selecione um motorista na lista para ver a tarifa.',
      });
    }
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
                placeholder="Digite o endereço ou local" 
                className="pl-10" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label htmlFor="rural-mode" className="text-base font-medium">Destino no interior?</Label>
              <p className="text-sm text-muted-foreground">
                Ative para negociar o valor com o motorista.
              </p>
            </div>
            <Switch id="rural-mode" checked={isRural} onCheckedChange={(checked) => {
                setIsRural(checked);
                setShowEstimate(false);
            }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {!isRural && (
                <Button className="w-full" onClick={handleShowEstimate}>
                  Ver Tarifa do Motorista
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}
            <Button variant="outline" className={`w-full ${isRural ? 'col-span-2' : ''}`} onClick={() => { setShowDrivers(!showDrivers); setShowEstimate(false); }}>
                {showDrivers ? 'Ocultar Motoristas' : 'Ver Motoristas Próximos'}
            </Button>
          </div>

          {showEstimate && !isRural && selectedDriver && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-headline text-lg font-semibold">Tarifa Fixa (Urbana)</h3>
              <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground">Motorista: {selectedDriver.name}</p>
                    <DollarSign className="mx-auto h-8 w-8 my-2 text-primary" />
                    <p className="font-bold text-3xl">R$ {selectedDriver.urbanFare.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Este é o valor fixo para a corrida.</p>
                  </CardContent>
              </Card>
            </div>
          )}

          {showDrivers && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-headline text-lg font-semibold">Motoristas Disponíveis</h3>
              <Accordion type="single" collapsible className="w-full" onValueChange={(value) => {
                const driver = availableDrivers.find(d => d.id === value);
                setSelectedDriver(driver || null);
                if (driver && !isRural) {
                  setShowEstimate(true);
                }
              }}>
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
                                <NegotiationChat passengerName="Passageiro">
                                    <Button className="w-full">
                                        <MessageSquareQuote className="mr-2 h-4 w-4" />
                                        Chamar e Negociar (Interior)
                                    </Button>
                                </NegotiationChat>
                            </div>
                        </AccordionContent>
                     </Card>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>

        {isRural && (
          <>
            <Separator className="my-6" />
            <FareNegotiation destination={destination} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
