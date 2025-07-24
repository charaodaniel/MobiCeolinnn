import { RideRequestForm } from '@/components/passenger/RideRequestForm';
import { MapPlaceholder } from '@/components/passenger/MapPlaceholder';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoginCard } from '../auth/LoginCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { User } from 'lucide-react';

export function PassengerDashboard() {
  return (
    <AppLayout title="Painel do Passageiro" showAuthButtons>
      <div className="grid lg:grid-cols-5 gap-8 p-4 md:p-6 lg:p-8 h-full">
        <div className="lg:col-span-2">
          <RideRequestForm />
        </div>
        <div className="lg:col-span-3 h-[400px] lg:h-full">
          <MapPlaceholder />
        </div>
      </div>
    </AppLayout>
  );
}
