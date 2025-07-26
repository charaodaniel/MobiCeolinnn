'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { History, Star, Calendar, MapPin, DollarSign } from "lucide-react";
import { RideRatingDialog } from "./RideRatingDialog";

const rides = [
  { id: '1', date: '25/07/2024', driver: 'Carlos Motorista', origin: 'Shopping Pátio', destination: 'Centro', value: 'R$ 25,50', status: 'Concluída' },
  { id: '2', date: '24/07/2024', driver: 'Fernanda Lima', origin: 'Aeroporto', destination: 'Zona Rural Leste', value: 'R$ 150,00', status: 'Concluída' },
  { id: '3', date: '22/07/2024', driver: 'Carlos Motorista', origin: 'Rodoviária', destination: 'Bairro Universitário', value: 'R$ 18,00', status: 'Concluída' },
    { id: '4', date: '20/07/2024', driver: 'Roberto Freire', origin: 'Centro', destination: 'Hospital Regional', value: 'R$ 15,00', status: 'Cancelada' },
];

export function RideHistory() {
  if (rides.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border rounded-lg mx-6 h-full">
                <History className="h-10 w-10 mb-4" />
                <p className="font-semibold">Nenhuma corrida encontrada</p>
                <p className="text-sm">Seu histórico de corridas aparecerá aqui.</p>
          </div>
      )
  }
    
  return (
    <ScrollArea className="h-full w-full">
        <h3 className="font-headline text-lg font-semibold text-center p-4">Histórico de Corridas</h3>
      {/* Mobile View - Cards */}
      <div className="grid gap-4 md:hidden px-4 pb-4">
        {rides.map((ride) => (
          <div key={ride.id} className="rounded-lg border bg-card p-4 space-y-3 shadow-sm">
             <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {ride.destination}
                </p>
                 <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                  <Calendar className="h-3 w-3" />
                  {ride.date}
                </p>
              </div>
               <Badge variant={ride.status === 'Concluída' ? 'secondary' : 'destructive'}>
                {ride.status}
              </Badge>
            </div>

            <div className="flex justify-between items-center pt-2 border-t">
              <p className="flex items-center gap-2 font-semibold">
                <DollarSign className="h-4 w-4 text-accent" />
                {ride.value}
              </p>
              {ride.status === 'Concluída' && <RideRatingDialog ride={ride} />}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block rounded-md border h-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rides.map((ride) => (
              <TableRow key={ride.id}>
                <TableCell className="font-medium">{ride.date}</TableCell>
                <TableCell>{ride.destination}</TableCell>
                <TableCell className="text-right">{ride.value}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={ride.status === 'Concluída' ? 'secondary' : 'destructive'}>
                    {ride.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {ride.status === 'Concluída' && (
                    <RideRatingDialog ride={ride} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
}
