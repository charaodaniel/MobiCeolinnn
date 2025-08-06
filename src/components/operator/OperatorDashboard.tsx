'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, MessageSquare, Activity, AlertTriangle, List } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { FleetMonitor } from './FleetMonitor';
import Link from 'next/link';
import { Button } from '../ui/button';

const MetricCard = ({ title, value, icon: Icon }: { title: string, value: string | number, icon: React.ElementType }) => (
    <Card className="p-4">
        <div className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    </Card>
);

export function OperatorDashboard() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Motoristas Online" value="2" icon={Car} />
            <MetricCard title="Corridas em Andamento" value="1" icon={Activity} />
            <MetricCard title="Conversas Ativas" value="5" icon={MessageSquare} />
            <MetricCard title="Alertas" value="0" icon={AlertTriangle} />
        </div>

        {/* Painel Principal de Ações */}
        <Card className="shadow-lg">
           <CardHeader>
                <CardTitle className="font-headline">Ações Rápidas</CardTitle>
                <CardDescription>Acesse as principais ferramentas de operação.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="outline" className="w-full h-20 text-lg">
                                <List className="mr-2 h-5 w-5" />
                                Monitoramento da Frota
                           </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl h-[90vh]">
                            <DialogHeader>
                                <DialogTitle>Monitoramento da Frota</DialogTitle>
                                <DialogDescription>
                                    Visualize o status e a localização dos motoristas em tempo real.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex-1 overflow-hidden -mx-6 -mb-6">
                                <FleetMonitor />
                            </div>
                        </DialogContent>
                    </Dialog>
                    
                    <Link href="/operator/conversations" passHref className="w-full">
                       <Button variant="outline" className="w-full h-20 text-lg">
                            <MessageSquare className="mr-2 h-5 w-5" />
                            Abrir Conversas
                       </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
