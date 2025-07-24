'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { MapPin, ArrowRight, DollarSign, Clock, Route, Star, User, Copy } from 'lucide-react';
import { FareNegotiation } from './FareNegotiation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const availableDrivers = [
    { id: '1', name: 'Carlos Motorista', vehicle: 'Toyota Corolla', rating: 4.9, distance: '2 min', avatar: 'man', pixKey: 'carlos.motorista@email.com' },
    { id: '2', name: 'Fernanda Lima', vehicle: 'Honda Civic', rating: 4.8, distance: '5 min', avatar: 'woman', pixKey: '123.456.789-00' },
    { id: '3', name: 'Roberto Freire', vehicle: 'Chevrolet Onix', rating: 4.9, distance: '8 min', avatar: 'person', pixKey: '(11) 98765-4321' },
];

export function RideRequestForm() {
  const [isRural, setIsRural] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);
  const [showDrivers, setShowDrivers] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
        title: "Copiado!",
        description: "A chave PIX do motorista foi copiada para a área de transferência.",
    });
  }

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
              <Input id="origin" placeholder="Digite seu local de partida" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination">Destino</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="destination" placeholder="Digite o endereço ou local" className="pl-10" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label htmlFor="rural-mode" className="text-base font-medium">Destino no interior?</Label>
              <p className="text-sm text-muted-foreground">
                Ative para negociar o valor da corrida.
              </p>
            </div>
            <Switch id="rural-mode" checked={isRural} onCheckedChange={setIsRural} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button className="w-full" onClick={() => { setShowEstimate(true); setShowDrivers(false); }}>
              Ver Estimativa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full" onClick={() => { setShowDrivers(!showDrivers); setShowEstimate(false); }}>
                {showDrivers ? 'Ocultar Motoristas' : 'Ver Motoristas Próximos'}
            </Button>
          </div>

          {showEstimate && !isRural && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-headline text-lg font-semibold">Estimativa da Corrida</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <Card>
                  <CardContent className="p-4">
                    <DollarSign className="mx-auto h-6 w-6 mb-2 text-primary" />
                    <p className="font-bold text-lg">R$ 25,50</p>
                    <p className="text-xs text-muted-foreground">Valor</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <Clock className="mx-auto h-6 w-6 mb-2 text-primary" />
                    <p className="font-bold text-lg">15 min</p>
                    <p className="text-xs text-muted-foreground">Tempo</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <Route className="mx-auto h-6 w-6 mb-2 text-primary" />
                    <p className="font-bold text-lg">8.2 km</p>
                    <p className="text-xs text-muted-foreground">Distância</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {showDrivers && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-headline text-lg font-semibold">Motoristas Disponíveis</h3>
              <ul className="space-y-3">
                {availableDrivers.map((driver) => (
                  <li key={driver.id} className="flex flex-col p-3 rounded-lg border hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={'https://placehold.co/40x40'} data-ai-hint={`${driver.avatar} face`} />
                            <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{driver.name}</p>
                            <p className="text-sm text-muted-foreground">{driver.vehicle}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span>{driver.rating}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{driver.distance}</p>
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
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {isRural && (
          <>
            <Separator className="my-6" />
            <FareNegotiation />
          </>
        )}
      </CardContent>
    </Card>
  );
}
