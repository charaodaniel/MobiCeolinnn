'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, User, MapPin, Download, FileText, BarChart2, FileType } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";


const rides = [
  { id: '1', date: '25/07/2024', passenger: 'João Passageiro', origin: 'Shopping Pátio', destination: 'Centro', value: '25.50', status: 'Concluída' },
  { id: '2', date: '24/07/2024', passenger: 'Maria Silva', origin: 'Aeroporto', destination: 'Zona Rural Leste', value: '150.00', status: 'Concluída' },
  { id: '3', date: '22/07/2024', passenger: 'Passageiro Anônimo', origin: 'Rodoviária', destination: 'Bairro Universitário', value: '18.00', status: 'Concluída' },
  { id: '4', date: '20/07/2024', passenger: 'Fernanda Lima', origin: 'Centro', destination: 'Hospital Regional', value: '15.00', status: 'Cancelada' },
];

export function DriverRideHistory() {
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

    const handleExportCSV = () => {
        const headers = ["ID", "Data", "Passageiro", "Origem", "Destino", "Valor (R$)", "Status"];
        const rows = rides.map(ride => 
            [ride.id, ride.date, ride.passenger, `"${ride.origin}"`, `"${ride.destination}"`, ride.value.replace('.', ','), ride.status].join(',')
        );

        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(',') + "\n" 
            + rows.join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "historico_corridas_ceolin.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const calculateSummary = () => {
        const completedRides = rides.filter(r => r.status === 'Concluída');
        const totalValue = completedRides.reduce((acc, ride) => acc + parseFloat(ride.value), 0);
        return {
            totalRides: completedRides.length,
            totalValue: totalValue.toFixed(2).replace('.', ','),
            totalValueRaw: totalValue,
        }
    };

    const summary = calculateSummary();

    const handleExportPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Data", "Passageiro", "Trajeto", "Valor (R$)", "Status"];
        const tableRows: (string | null)[][] = [];

        rides.forEach(ride => {
            const rideData = [
                ride.date,
                ride.passenger,
                `${ride.origin} -> ${ride.destination}`,
                `R$ ${ride.value.replace('.', ',')}`,
                ride.status,
            ];
            tableRows.push(rideData);
        });

        // Header
        doc.setFont("Poppins", "bold");
        doc.setFontSize(22);
        doc.text("CEOLIN Mobilidade urbana", 14, 22);
        doc.setFontSize(16);
        doc.text("Relatório de Corridas", 14, 30);
        
        doc.setFont("Poppins", "normal");
        doc.setFontSize(12);
        doc.text(`Motorista: Carlos Motorista`, 14, 40);
        doc.text(`Data de Geração: ${new Date().toLocaleDateString('pt-BR')}`, 14, 46);

        // Table
        (doc as any).autoTable({
            startY: 55,
            head: [tableColumn],
            body: tableRows,
            theme: 'striped',
            headStyles: { fillColor: [22, 163, 74] }, // Cor primária
        });

        // Footer / Summary
        const finalY = (doc as any).lastAutoTable.finalY;
        doc.setFontSize(14);
        doc.setFont("Poppins", "bold");
        doc.text("Resumo de Ganhos", 14, finalY + 15);
        doc.setFontSize(12);
        doc.setFont("Poppins", "normal");
        doc.text(`Total de Corridas Concluídas: ${summary.totalRides}`, 14, finalY + 22);
        doc.text(`Valor Total Arrecadado: R$ ${summary.totalValue}`, 14, finalY + 29);
        

        doc.save("relatorio_corridas_ceolin.pdf");
    }

  if (rides.length === 0) {
      return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">Histórico de Viagens</CardTitle>
                <CardDescription>Visualize suas corridas concluídas.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border rounded-lg">
                        <History className="h-10 w-10 mb-4" />
                        <p className="font-semibold">Nenhuma corrida encontrada</p>
                        <p className="text-sm">Seu histórico de corridas aparecerá aqui.</p>
                </div>
            </CardContent>
        </Card>
      )
  }
    
  return (
    <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline">Histórico de Viagens</CardTitle>
                <CardDescription>Visualize suas corridas concluídas.</CardDescription>
            </div>
            <AlertDialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Exportar Relatórios
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleExportPDF}>
                            <FileType className="mr-2 h-4 w-4" />
                            Exportar Relatório (PDF)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportCSV}>
                            <FileText className="mr-2 h-4 w-4" />
                            Exportar Histórico (CSV)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsSummaryOpen(true)}>
                            <BarChart2 className="mr-2 h-4 w-4" />
                           Ver Resumo de Ganhos
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle className="font-headline">Resumo de Ganhos</AlertDialogTitle>
                    <AlertDialogDescription>
                       Este é um resumo dos seus ganhos com base nas corridas concluídas no seu histórico.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="bg-muted p-4 rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Total de Corridas Concluídas:</span>
                            <span className="font-bold text-lg">{summary.totalRides}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Valor Total Arrecadado:</span>
                            <span className="font-bold text-lg text-primary">R$ {summary.totalValue}</span>
                        </div>
                    </div>
                    <AlertDialogFooter>
                    <AlertDialogAction>Fechar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </CardHeader>
        <CardContent>
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
                    <TableCell className="text-right font-semibold">R$ {ride.value.replace('.', ',')}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </ScrollArea>
        </CardContent>
    </Card>
  );
}
