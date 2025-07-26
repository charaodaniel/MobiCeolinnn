import { AppLayout } from '@/components/layout/AppLayout';
import { ProfileForm } from '@/components/driver/ProfileForm';
import { RideRequests } from '@/components/driver/RideRequests';
import { DriverRideHistory } from '@/components/driver/DriverRideHistory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DriverDashboard() {
  return (
    <AppLayout title="Painel do Motorista" showDriverAvatar={true}>
      <div className="grid lg:grid-cols-2 gap-8 p-4 md:p-6 lg:p-8">
        <div className="space-y-8">
          <ProfileForm />
          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">Histórico de Viagens</CardTitle>
                <CardDescription>Visualize suas corridas concluídas.</CardDescription>
            </CardHeader>
            <CardContent>
                <DriverRideHistory />
            </CardContent>
          </Card>
        </div>
        <div>
          <RideRequests />
        </div>
      </div>
    </AppLayout>
  );
}
