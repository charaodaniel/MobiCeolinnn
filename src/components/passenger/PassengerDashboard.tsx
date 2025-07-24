import { RideRequestForm } from '@/components/passenger/RideRequestForm';
import { MapPlaceholder } from '@/components/passenger/MapPlaceholder';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoginCard } from '../auth/LoginCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { User, Car } from 'lucide-react';

export function PassengerDashboard() {
  return (
    <AppLayout title="Painel do Passageiro" showAuthButtons>
      <div className="grid lg:grid-cols-5 gap-8 p-4 md:p-6 lg:p-8 h-full">
        <div className="lg:col-span-2">
          <RideRequestForm />
        </div>
        <div className="lg:col-span-3 h-[400px] lg:h-full flex flex-col gap-4">
            <div className='flex items-center gap-2'>
                <Car className="h-6 w-6 text-primary" />
                <h2 className="font-headline text-xl font-semibold">Motoristas Próximos</h2>
            </div>
          <div className="flex-1">
            <MapPlaceholder />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
