
'use client';

import { Car, Map, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { MapPlaceholder } from "../passenger/MapPlaceholder";

const allDrivers = [
    { id: '1', name: 'Carlos Motorista', vehicle: 'Toyota Corolla', licensePlate: 'BRA2E19', rating: 4.9, distance: '2 min', avatar: 'man', status: 'online' },
    { id: '2', name: 'Fernanda Lima', vehicle: 'Honda Civic', licensePlate: 'XYZ1234', rating: 4.8, distance: '5 min', avatar: 'woman', status: 'offline' },
    { id: '3', name: 'Roberto Freire', vehicle: 'Chevrolet Onix', licensePlate: 'ABC9876', rating: 4.9, distance: '8 min', avatar: 'person', status: 'em-viagem' },
];

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case 'online':
            return <Badge variant="secondary">Online</Badge>;
        case 'offline':
            return <Badge variant="outline">Offline</Badge>;
        case 'em-viagem':
            return <Badge variant="default">Em Viagem</Badge>;
        default:
            return <Badge variant="destructive">Desconhecido</Badge>;
    }
}

export function FleetMonitor() {

    const onlineDrivers = allDrivers.filter(d => d.status === 'online' || d.status === 'em-viagem');

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 h-full p-4 bg-muted/40">
            {/* Driver List */}
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Car />
                        Status dos Motoristas
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                         <ul className="pr-4">
                            {allDrivers.map((driver, index) => (
                                <li key={driver.id}>
                                     <div className="flex items-center gap-4 py-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint={`${driver.avatar} face`} />
                                            <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="font-semibold">{driver.name}</p>
                                            <p className="text-xs text-muted-foreground">{driver.vehicle} - {driver.licensePlate}</p>
                                        </div>
                                        <StatusBadge status={driver.status} />
                                    </div>
                                    {index < allDrivers.length - 1 && <Separator />}
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Map View */}
             <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Map />
                        Mapa da Frota
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="h-full w-full rounded-lg overflow-hidden">
                         <MapPlaceholder drivers={onlineDrivers} origin="" isRural={false} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
