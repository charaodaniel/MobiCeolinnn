'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, User, MapPin } from "lucide-react";

const rides = [
  { id: '1', date: '25/07/2024', passenger: 'João Passageiro', origin: 'Shopping Pátio', destination: 'Centro', value: 'R$ 25,50', status: 'Concluída' },
  { id: '2', date: '24/07/2024', passenger: 'Maria Silva', origin: 'Aeroporto', destination: 'Zona Rural Leste', value: 'R$ 150,00', status: 'Concluída' },
  { id: '3', date: '22/07/2024', passenger: 'Passageiro Anônimo', origin: 'Rodoviária', destination: 'Bairro Universitário', value: 'R$ 18,00', status: 'Concluída' },
  { id: '4', date: '20/07/2024', passenger: 'Fernanda Lima', origin: 'Centro', destination: 'Hospital Regional', value: 'R$ 15,00', status: 'Concluída' },
];

export function DriverRideHistory() {
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
    <ScrollArea className="h-72 w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Passageiro/Data</TableHead>
            <TableHead>Trajeto</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rides.map((ride) => (
            <TableRow key={ride.id}>
              <TableCell>
                <div className="font-medium flex items-center gap-2"><User className="h-3 w-3" />{ride.passenger}</div>
                <div className="text-sm text-muted-foreground">{ride.date}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-xs"><MapPin className="h-3 w-3 text-primary" /> {ride.origin}</div>
                <div className="flex items-center gap-2 text-xs"><MapPin className="h-3 w-3 text-accent" /> {ride.destination}</div>
              </TableCell>
              <TableCell className="text-right font-semibold">{ride.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
