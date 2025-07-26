'use client';
import { AppLayout } from '@/components/layout/AppLayout';
import { UserManagementTable } from '@/components/admin/UserManagementTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReportVerification } from '@/components/admin/ReportVerification';
import { useState } from 'react';

export default function AdminDashboard() {
  const [generatedReports, setGeneratedReports] = useState<Set<string>>(new Set());

  const addGeneratedReport = (reportId: string) => {
    setGeneratedReports(prev => new Set(prev).add(reportId));
  };
  
  return (
    <AppLayout title="Painel do Administrador">
      <div className="p-4 md:p-6 lg:p-8 space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Verificar Autenticidade de Relatório</CardTitle>
            <CardDescription>Insira o ID de um relatório para verificar se ele foi gerado pelo sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <ReportVerification generatedReports={generatedReports} />
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Gerenciamento de Usuários</CardTitle>
            <CardDescription>Adicione, remova, ative ou desative contas de passageiros e motoristas.</CardDescription>
          </CardHeader>
          <CardContent>
            <UserManagementTable onReportGenerated={addGeneratedReport} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
