'use client';

import { Card } from '@/components/ui/card';
import { Car, MessageSquare, Activity, AlertTriangle, List } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
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
    <div className="p-4 md:p-6 lg:p-8 h-[calc(100vh-8rem)] flex flex-col gap-6">
        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Motoristas Online" value="2" icon={Car} />
            <MetricCard title="Corridas em Andamento" value="1" icon={Activity} />
            <MetricCard title="Conversas Ativas" value="5" icon={MessageSquare} />
            <MetricCard title="Alertas" value="0" icon={AlertTriangle} />
        </div>

        {/* Painel Principal */}
        <Card className="flex-1 flex flex-col shadow-lg overflow-hidden">
             <Tabs defaultValue="fleet" className="w-full h-full flex flex-col">
                <TabsList className="grid grid-cols-2 w-full rounded-none h-auto p-0 flex-shrink-0">
                    <TabsTrigger value="fleet" className="py-3 rounded-none">
                        <List className="mr-2 h-4 w-4" />
                        Monitoramento da Frota
                    </TabsTrigger>
                    <Link href="/operator/conversations" passHref className="w-full">
                       <Button variant="ghost" className="inline-flex items-center justify-center whitespace-nowrap rounded-none px-3 py-3 h-full w-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Abrir Conversas
                       </Button>
                    </Link>
                </TabsList>
                 <TabsContent value="fleet" className="mt-0 flex-1 overflow-y-auto">
                    <FleetMonitor />
                 </TabsContent>
            </Tabs>
        </Card>
    </div>
  );
}
