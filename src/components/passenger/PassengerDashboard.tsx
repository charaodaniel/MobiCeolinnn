import { RideRequestForm } from '@/components/passenger/RideRequestForm';
import { MapPlaceholder } from '@/components/passenger/MapPlaceholder';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoginCard } from '../auth/LoginCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { User, Car } from 'lucide-react';


const availableDrivers = [
    { id: '1', name: 'Carlos Motorista', vehicle: 'Toyota Corolla', licensePlate: 'BRA2E19', vehiclePhoto: 'https://placehold.co/128x96.png', rating: 4.9, distance: '2 min', avatar: 'man', pixKey: 'carlos.motorista@email.com', urbanFare: 25.50 },
    { id: '2', name: 'Fernanda Lima', vehicle: 'Honda Civic', licensePlate: 'XYZ1234', vehiclePhoto: 'https://placehold.co/128x96.png', rating: 4.8, distance: '5 min', avatar: 'woman', pixKey: '123.456.789-00', urbanFare: 28.00 },
    { id: '3', name: 'Roberto Freire', vehicle: 'Chevrolet Onix', licensePlate: 'ABC9876', vehiclePhoto: 'https://placehold.co/128x96.png', rating: 4.9, distance: '8 min', avatar: 'person', pixKey: '(11) 98765-4321', urbanFare: 22.00 },
];


export function PassengerDashboard() {
  return (
    <AppLayout title="Painel do Passageiro" showAuthButtons>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-6 lg:p-8 h-full">
        <div className="lg:col-span-1">
          <RideRequestForm availableDrivers={availableDrivers} />
        </div>
        <div className="lg:col-span-2 h-[400px] md:h-full flex flex-col gap-4">
            <div className='flex items-center gap-2'>
                <Car className="h-6 w-6 text-primary" />
                <h2 className="font-headline text-xl font-semibold">Motoristas Próximos</h2>
            </div>
          <div className="flex-1">
            <MapPlaceholder drivers={availableDrivers} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
