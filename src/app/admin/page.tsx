'use client';
import { AppLayout } from '@/components/layout/AppLayout';
import { UserManagementTable } from '@/components/admin/UserManagementTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReportVerification } from '@/components/admin/ReportVerification';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ShieldCheck } from 'lucide-react';

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
            <CardTitle className="font-headline">Gerenciamento de Usuários</CardTitle>
            <CardDescription>Adicione, remova, ative ou desative contas de passageiros e motoristas.</CardDescription>
          </CardHeader>
          <CardContent>
            <UserManagementTable onReportGenerated={addGeneratedReport} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Ferramentas</CardTitle>
            <CardDescription>Ferramentas adicionais para administração do sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="report-verification">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    Verificar Autenticidade de Relatório
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Insira o ID de um relatório para verificar se ele foi gerado pelo sistema.
                  </p>
                  <ReportVerification generatedReports={generatedReports} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
