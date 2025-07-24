'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { MapPin, ArrowRight, DollarSign, Clock, Route } from 'lucide-react';
import { FareNegotiation } from './FareNegotiation';

export function RideRequestForm() {
  const [isRural, setIsRural] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);

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

          <Button className="w-full" onClick={() => setShowEstimate(true)}>
            Ver Estimativa
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

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
