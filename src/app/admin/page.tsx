import { AppLayout } from '@/components/layout/AppLayout';
import { UserManagementTable } from '@/components/admin/UserManagementTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  return (
    <AppLayout title="Painel do Administrador">
      <div className="p-4 md:p-6 lg:p-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Gerenciamento de Usuários</CardTitle>
            <CardDescription>Ative ou desative contas de passageiros e motoristas.</CardDescription>
          </CardHeader>
          <CardContent>
            <UserManagementTable />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
