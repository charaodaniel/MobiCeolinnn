import { AppLayout } from '@/components/layout/AppLayout';
import { ProfileForm } from '@/components/driver/ProfileForm';
import { RideRequests } from '@/components/driver/RideRequests';

export default function DriverDashboard() {
  return (
    <AppLayout title="Painel do Motorista">
      <div className="grid lg:grid-cols-2 gap-8 p-4 md:p-6 lg:p-8">
        <div>
          <ProfileForm />
        </div>
        <div>
          <RideRequests />
        </div>
      </div>
    </AppLayout>
  );
}
