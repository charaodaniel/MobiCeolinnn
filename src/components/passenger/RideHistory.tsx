'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { History, Star } from "lucide-react";
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
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border rounded-lg">
                <History className="h-10 w-10 mb-4" />
                <p className="font-semibold">Nenhuma corrida encontrada</p>
                <p className="text-sm">Seu histórico de corridas aparecerá aqui.</p>
          </div>
      )
  }
    
  return (
    <ScrollArea className="h-64 w-full rounded-md border">
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
    </ScrollArea>
  );
}
