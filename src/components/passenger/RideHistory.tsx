
'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { History, Star, Calendar, MapPin, DollarSign, AlertCircle, Clock, ChevronDown } from "lucide-react";
import { RideRatingDialog } from "./RideRatingDialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "../ui/accordion";
import { Separator } from "../ui/separator";

const rides = [
  { id: '1', date: '25/07/2024', driver: 'Carlos Motorista', origin: 'Shopping Pátio', destination: 'Centro', value: 'R$ 25,50', status: 'Concluída', notes: null, requestedAt: '14:30', acceptedAt: '14:31', pickedUpAt: '14:38', completedAt: '14:55' },
  { id: '2', date: '24/07/2024', driver: 'Roberto Freire', origin: 'Aeroporto', destination: 'Zona Rural Leste', value: 'R$ 150,00', status: 'Concluída', notes: 'Corrida transferida de Fernanda Lima devido a um imprevisto.', requestedAt: '10:05', acceptedAt: '10:06', pickedUpAt: '10:20', completedAt: '11:05' },
  { id: '3', date: '22/07/2024', driver: 'Carlos Motorista', origin: 'Rodoviária', destination: 'Bairro Universitário', value: 'R$ 18,00', status: 'Concluída', notes: null, requestedAt: '18:00', acceptedAt: '18:02', pickedUpAt: '18:10', completedAt: '18:25' },
  { id: '4', date: '20/07/2024', driver: 'Roberto Freire', origin: 'Centro', destination: 'Hospital Regional', value: 'R$ 15,00', status: 'Cancelada', notes: null, requestedAt: '09:15', acceptedAt: null, pickedUpAt: null, completedAt: null },
];

const TimelineEvent = ({ time, label, isFirst = false, isLast = false }: { time: string | null, label: string, isFirst?: boolean, isLast?: boolean }) => {
    if (!time) return null;
    return (
        <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
                <div className={`h-2 w-2 rounded-full ${time ? 'bg-primary' : 'bg-muted'}`} />
                {!isLast && <div className="w-px h-6 bg-border" />}
            </div>
            <div className="flex-1">
                <p className="text-xs font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{time}</p>
            </div>
        </div>
    )
};


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
          <Accordion type="single" collapsible key={ride.id}>
             <AccordionItem value={`item-${ride.id}`} className="border-0">
                <div className="rounded-lg border bg-card p-4 space-y-3 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            {ride.destination}
                            {ride.notes && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <AlertCircle className="h-4 w-4 text-amber-500" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{ride.notes}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
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
                        <div className="flex items-center gap-2">
                             {ride.status === 'Concluída' && <RideRatingDialog ride={ride} />}
                             <AccordionTrigger className="p-1 hover:no-underline"><ChevronDown className="h-4 w-4" /></AccordionTrigger>
                        </div>
                    </div>
                     <AccordionContent>
                        <Separator className="my-2" />
                        <h4 className="text-sm font-semibold mb-2">Linha do Tempo</h4>
                        <TimelineEvent time={ride.requestedAt} label="Solicitada" isFirst />
                        <TimelineEvent time={ride.acceptedAt} label="Aceita pelo motorista" />
                        <TimelineEvent time={ride.pickedUpAt} label="Passageiro a bordo" />
                        <TimelineEvent time={ride.completedAt} label="Finalizada" isLast />
                     </AccordionContent>
                </div>
            </AccordionItem>
          </Accordion>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block rounded-md border h-full">
        <Accordion type="single" collapsible>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rides.map((ride) => (
                    <AccordionItem value={`item-${ride.id}`} key={ride.id} asChild>
                        <>
                            <TableRow>
                                <TableCell>
                                    <AccordionTrigger className="p-1 hover:no-underline"><ChevronDown className="h-4 w-4" /></AccordionTrigger>
                                </TableCell>
                                <TableCell className="font-medium">{ride.date}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {ride.destination}
                                        {ride.notes && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <AlertCircle className="h-4 w-4 text-amber-500" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{ride.notes}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </div>
                                </TableCell>
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
                            <TableRow>
                                <TableCell colSpan={6} className="p-0">
                                     <AccordionContent>
                                        <div className="bg-muted/50 p-4">
                                            <h4 className="text-sm font-semibold mb-2">Linha do Tempo da Corrida</h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                <TimelineEvent time={ride.requestedAt} label="Solicitada" isFirst />
                                                <TimelineEvent time={ride.acceptedAt} label="Aceita" />
                                                <TimelineEvent time={ride.pickedUpAt} label="Passageiro a bordo" />
                                                <TimelineEvent time={ride.completedAt} label="Finalizada" isLast />
                                            </div>
                                        </div>
                                     </AccordionContent>
                                </TableCell>
                            </TableRow>
                         </>
                    </AccordionItem>
                ))}
              </TableBody>
            </Table>
        </Accordion>
      </div>
    </ScrollArea>
  );
}
