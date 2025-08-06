
'use client';

import { useState } from 'react';
import { RideRequestForm } from '@/components/passenger/RideRequestForm';
import { MapPlaceholder } from '@/components/passenger/MapPlaceholder';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, User, UserCheck } from 'lucide-react';
import { PassengerAuthForm } from '../auth/PassengerAuthForm';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';


const allDrivers = [
    { id: '1', name: 'Carlos Motorista', vehicle: 'Toyota Corolla', licensePlate: 'BRA2E19', vehiclePhoto: 'https://placehold.co/128x96.png', rating: 4.9, distance: '2 min', avatar: 'man', pixKey: 'carlos.motorista@email.com', urbanFare: 25.50, status: 'online' },
    { id: '2', name: 'Fernanda Lima', vehicle: 'Honda Civic', licensePlate: 'XYZ1234', vehiclePhoto: 'https://placehold.co/128x96.png', rating: 4.8, distance: '5 min', avatar: 'woman', pixKey: '123.456.789-00', urbanFare: 28.00, status: 'offline' },
    { id: '3', name: 'Roberto Freire', vehicle: 'Chevrolet Onix', licensePlate: 'ABC9876', vehiclePhoto: 'https://placehold.co/128x96.png', rating: 4.9, distance: '8 min', avatar: 'person', pixKey: '(11) 98765-4321', urbanFare: 22.00, status: 'online' },
];

// Simula a configuração do admin. Troque para `false` para testar o fluxo de login obrigatório.
const ANONYMOUS_RIDES_ALLOWED = true;

export function PassengerDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthSheetOpen, setIsAuthSheetOpen] = useState(false);
  const [origin, setOrigin] = useState('');
  const [isRural, setIsRural] = useState(false);

  const showRequestForm = ANONYMOUS_RIDES_ALLOWED || isLoggedIn;

  // Filtra motoristas para mostrar apenas os online no mapa
  const availableDrivers = allDrivers.filter(driver => driver.status === 'online');

  return (
    <AppLayout title="Painel do Passageiro" showAuthButtons>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-6 lg:p-8">
        <div className="lg:col-span-1">
          {showRequestForm ? (
            <RideRequestForm 
                availableDrivers={allDrivers} // O formulário pode mostrar todos, o mapa não
                origin={origin}
                setOrigin={setOrigin}
                isRural={isRural}
                setIsRural={setIsRural}
            />
          ) : (
            <Card className="shadow-lg h-full flex flex-col justify-center">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <UserCheck className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="font-headline">Login Necessário</CardTitle>
                <CardDescription>
                  Para solicitar uma corrida, você precisa fazer login ou criar uma conta.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Sheet open={isAuthSheetOpen} onOpenChange={setIsAuthSheetOpen}>
                    <SheetTrigger asChild>
                         <Button className="w-full">Fazer Login ou Registrar</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <PassengerAuthForm onLoginSuccess={() => { setIsLoggedIn(true); setIsAuthSheetOpen(false); }} />
                    </SheetContent>
                </Sheet>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="lg:col-span-2 h-[500px] lg:h-[calc(100vh-12rem)] flex flex-col gap-4">
            <div className='flex items-center gap-2'>
                <Car className="h-6 w-6 text-primary" />
                <h2 className="font-headline text-xl font-semibold">Motoristas Disponíveis</h2>
            </div>
          <div className="flex-1">
            <MapPlaceholder drivers={availableDrivers} origin={origin} isRural={isRural} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
