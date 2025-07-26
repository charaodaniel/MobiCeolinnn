'use client';
import { AppLayout } from '@/components/layout/AppLayout';
import { DriverProfilePage } from '@/components/driver/page';

export default function DriverDashboard() {
  return (
    <AppLayout title="Painel do Motorista" showDriverAvatar={true}>
      <DriverProfilePage />
    </AppLayout>
  );
}
