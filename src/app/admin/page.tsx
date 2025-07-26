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
import { ShieldCheck, Settings, UserCheck } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';


export default function AdminDashboard() {
  const [generatedReports, setGeneratedReports] = useState<Set<string>>(new Set());
  const [allowAnonymousRides, setAllowAnonymousRides] = useState(true);
  const { toast } = useToast();

  const addGeneratedReport = (reportId: string) => {
    setGeneratedReports(prev => new Set(prev).add(reportId));
  };
  
  const handleAnonymousRidesToggle = (enabled: boolean) => {
    setAllowAnonymousRides(enabled);
    toast({
        title: "Configuração atualizada",
        description: `Corridas sem login foram ${enabled ? 'habilitadas' : 'desabilitadas'}.`,
    });
  }

  return (
    <AppLayout title="Painel do Administrador">
      <div className="p-4 md:p-6 lg:p-8 space-y-8">
        <UserManagementTable onReportGenerated={addGeneratedReport} />

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Ferramentas e Configurações</CardTitle>
            <CardDescription>Ferramentas e configurações gerais da plataforma.</CardDescription>
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
              <AccordionItem value="platform-settings">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Configurações da Plataforma
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="anonymous-rides" className="text-base font-medium">
                                Permitir corridas sem login de passageiro
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Se desativado, o passageiro deverá ter uma conta e estar logado para solicitar uma viagem.
                            </p>
                        </div>
                        <Switch
                            id="anonymous-rides"
                            checked={allowAnonymousRides}
                            onCheckedChange={handleAnonymousRidesToggle}
                            aria-label="Permitir corridas sem login"
                        />
                    </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
