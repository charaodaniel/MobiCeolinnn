'use client';

import { OperatorDashboard } from '@/components/operator/OperatorDashboard';
import { AppLayout } from '@/components/layout/AppLayout';

export default function OperatorPage() {
  return (
    <AppLayout title="Painel de Operações">
      <OperatorDashboard />
    </AppLayout>
  );
}
