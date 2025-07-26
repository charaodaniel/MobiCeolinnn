'use client';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Car, User, Trash2, PlusCircle, FileText, ListCollapse, Clock, KeyRound } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ScrollArea } from '../ui/scroll-area';

const initialUsers = [
  { id: '0', name: 'Admin User', email: 'admin@mobiceolin.com', role: 'Administrador', status: true, avatar: 'shield' },
  { id: '1', name: 'João Passageiro', email: 'joao@email.com', role: 'Passageiro', status: true, avatar: 'person' },
  { id: '2', name: 'Carlos Motorista', email: 'carlos@email.com', role: 'Motorista', status: true, avatar: 'man' },
  { id: '3', name: 'Ana Beatriz', email: 'ana.b@email.com', role: 'Passageiro', status: false, avatar: 'woman' },
  { id: '4', name: 'Roberto Freire', email: 'roberto.f@email.com', role: 'Motorista', status: true, avatar: 'person' },
  { id: '5', name: 'Fernanda Lima', email: 'fernanda@email.com', role: 'Motorista', status: false, avatar: 'woman' },
];

// Mock de dados de corrida para os relatórios
const mockRides = [
    { id: '1', date: '25/07/2024', passenger: 'João Passageiro', origin: 'Shopping Pátio', destination: 'Centro', value: '25.50', status: 'Concluída', driverId: '2' },
    { id: '2', date: '24/07/2024', passenger: 'Maria Silva', origin: 'Aeroporto', destination: 'Zona Rural Leste', value: '150.00', status: 'Concluída', driverId: '2' },
    { id: '3', date: '22/07/2024', passenger: 'Passageiro Anônimo', origin: 'Rodoviária', destination: 'Bairro Universitário', value: '18.00', status: 'Concluída', driverId: '4' },
    { id: '4', date: '20/07/2024', passenger: 'Fernanda Lima', origin: 'Centro', destination: 'Hospital Regional', value: '15.00', status: 'Concluída', driverId: '5' },
];

// Mock de dados de log de status
const mockStatusLogs: Record<string, { status: string, timestamp: string }[]> = {
  '2': [ // Corresponds to Carlos Motorista's ID
    { status: 'Online', timestamp: '2024-07-29 08:00:15' },
    { status: 'Em Viagem (Urbano)', timestamp: '2024-07-29 09:30:00' },
    { status: 'Online', timestamp: '2024-07-29 10:15:00' },
    { status: 'Offline', timestamp: '2024-07-29 12:30:05' },
    { status: 'Online', timestamp: '2024-07-29 14:00:22' },
    { status: 'Em Viagem (Interior)', timestamp: '2024-07-29 16:10:00' },
    { status: 'Online', timestamp: '2024-07-29 18:45:30' },
    { status: 'Offline', timestamp: '2024-07-29 22:05:11' },
  ],
  '4': [ // Roberto Freire
    { status: 'Online', timestamp: '2024-07-29 09:15:00' },
    { status: 'Em Viagem (Urbano)', timestamp: '2024-07-29 11:00:00'},
    { status: 'Offline', timestamp: '2024-07-29 19:00:00' },
  ],
  '5': [], // Fernanda Lima - no logs
};


export function UserManagementTable() {
    const { toast } = useToast();
    const [users, setUsers] = useState(initialUsers);
    const [userStatuses, setUserStatuses] = useState<Record<string, boolean>>(
        users.reduce((acc, user) => ({ ...acc, [user.id]: user.status }), {})
    );
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
    const [isLogDialogOpen, setIsLogDialogOpen] = useState(false);
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<(typeof initialUsers[0]) | null>(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Passageiro', password: '', confirmPassword: '' });
    const [newPassword, setNewPassword] = useState({ password: '', confirmPassword: '' });

    const handleStatusChange = (userId: string, newStatus: boolean) => {
        setUserStatuses(prev => ({ ...prev, [userId]: newStatus }));
        toast({ title: 'Status atualizado!', description: `O status do usuário foi alterado.` });
    };

    const handleRemoveUser = (userId: string) => {
        setUsers(prev => prev.filter(user => user.id !== userId));
        toast({ variant: 'destructive', title: 'Usuário Removido!', description: 'O usuário foi removido com sucesso.' });
    };

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email || !newUser.role || !newUser.password) {
            toast({ variant: 'destructive', title: 'Erro', description: 'Por favor, preencha todos os campos obrigatórios.' });
            return;
        }
        if (newUser.password !== newUser.confirmPassword) {
            toast({ variant: 'destructive', title: 'Erro', description: 'As senhas não coincidem.' });
            return;
        }

        const newId = (Math.max(...users.map(u => parseInt(u.id))) + 1).toString();
        const userToAdd = {
            id: newId,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            status: true,
            avatar: 'person'
        };
        setUsers(prev => [...prev, userToAdd]);
        setUserStatuses(prev => ({ ...prev, [newId]: true }));
        toast({ title: 'Usuário Adicionado!', description: `${newUser.name} foi adicionado como ${newUser.role}.` });
        setIsAddUserDialogOpen(false);
        setNewUser({ name: '', email: '', role: 'Passageiro', password: '', confirmPassword: '' });
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPassword.password || !newPassword.confirmPassword) {
            toast({ variant: 'destructive', title: 'Erro', description: 'Preencha ambos os campos de senha.' });
            return;
        }
        if (newPassword.password !== newPassword.confirmPassword) {
            toast({ variant: 'destructive', title: 'Erro', description: 'As senhas não coincidem.' });
            return;
        }
        toast({ title: 'Senha Alterada!', description: `A senha de ${selectedUser?.name} foi alterada com sucesso.` });
        setIsPasswordDialogOpen(false);
        setNewPassword({ password: '', confirmPassword: '' });
        setSelectedUser(null);
    }

    const handleGenerateReport = (driver: typeof initialUsers[0]) => {
        const driverRides = mockRides.filter(ride => ride.driverId === driver.id);

        if (driverRides.length === 0) {
            toast({
                title: 'Nenhuma corrida encontrada',
                description: `O motorista ${driver.name} não possui corridas no histórico para gerar um relatório.`,
            });
            return;
        }

        const doc = new jsPDF();
        const tableColumn = ["Data", "Passageiro", "Trajeto", "Valor (R$)", "Status"];
        const tableRows: (string | null)[][] = [];

        driverRides.forEach(ride => {
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
        doc.text(`Motorista: ${driver.name}`, 14, 40);
        doc.text(`Data de Geração: ${new Date().toLocaleDateString('pt-BR')}`, 14, 46);

        // Table
        (doc as any).autoTable({
            startY: 55,
            head: [tableColumn],
            body: tableRows,
            theme: 'striped',
            headStyles: { fillColor: [22, 163, 74] },
        });

        const finalY = (doc as any).lastAutoTable.finalY;
        const summary = driverRides.reduce((acc, ride) => {
            if (ride.status === 'Concluída') {
                acc.totalRides += 1;
                acc.totalValue += parseFloat(ride.value);
            }
            return acc;
        }, { totalRides: 0, totalValue: 0});

        doc.setFontSize(14);
        doc.setFont("Poppins", "bold");
        doc.text("Resumo de Ganhos", 14, finalY + 15);
        doc.setFontSize(12);
        doc.setFont("Poppins", "normal");
        doc.text(`Total de Corridas Concluídas: ${summary.totalRides}`, 14, finalY + 22);
        doc.text(`Valor Total Arrecadado: R$ ${summary.totalValue.toFixed(2).replace('.', ',')}`, 14, finalY + 29);

        doc.save(`relatorio_${driver.name.replace(/\s/g, '_')}.pdf`);
        toast({ title: 'Relatório Gerado!', description: `O relatório para ${driver.name} foi gerado com sucesso.` });
    };

    const openLogDialog = (user: typeof initialUsers[0]) => {
        setSelectedUser(user);
        setIsLogDialogOpen(true);
    };
    
    const openPasswordDialog = (user: typeof initialUsers[0]) => {
        setSelectedUser(user);
        setIsPasswordDialogOpen(true);
    };

    const selectedUserLogs = selectedUser ? mockStatusLogs[selectedUser.id] || [] : [];

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Adicionar Usuário
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleAddUser}>
                            <DialogHeader>
                                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                                <DialogDescription>
                                    Preencha as informações para criar uma nova conta de usuário.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input id="name" value={newUser.name} onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))} placeholder="Nome Completo" required />
                                </div>
                                 <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={newUser.email} onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))} placeholder="email@exemplo.com" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="role">Perfil</Label>
                                    <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({...prev, role: value}))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione um perfil" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Passageiro">Passageiro</SelectItem>
                                            <SelectItem value="Motorista">Motorista</SelectItem>
                                            <SelectItem value="Administrador">Administrador</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input id="password" type="password" value={newUser.password} onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))} placeholder="********" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="confirm-password">Confirmar Senha</Label>
                                    <Input id="confirm-password" type="password" value={newUser.confirmPassword} onChange={(e) => setNewUser(prev => ({ ...prev, confirmPassword: e.target.value }))} placeholder="********" required />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Salvar Usuário</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Usuário</TableHead>
                            <TableHead>Perfil</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint={`${user.avatar} face`} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-muted-foreground">{user.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={user.role === 'Motorista' ? 'default' : user.role === 'Administrador' ? 'destructive' : 'secondary'} className="gap-1">
                                        {user.role === 'Motorista' ? <Car className="h-3 w-3" /> : user.role === 'Administrador' ? <User className="h-3 w-3" /> : <User className="h-3 w-3" />}
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={userStatuses[user.id] ? 'secondary' : 'destructive'}>
                                        {userStatuses[user.id] ? 'Ativo' : 'Inativo'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-1 whitespace-nowrap">
                                    {user.role === 'Motorista' && (
                                        <>
                                            <Button variant="outline" size="icon" onClick={() => openLogDialog(user)}>
                                                <ListCollapse className="h-4 w-4" />
                                                <span className="sr-only">Ver Log de Status</span>
                                            </Button>
                                            <Button variant="outline" size="icon" onClick={() => handleGenerateReport(user)}>
                                                <FileText className="h-4 w-4" />
                                                <span className="sr-only">Gerar Relatório</span>
                                            </Button>
                                        </>
                                    )}
                                     <Button variant="outline" size="icon" onClick={() => openPasswordDialog(user)}>
                                        <KeyRound className="h-4 w-4" />
                                        <span className="sr-only">Alterar Senha</span>
                                    </Button>
                                    <Switch
                                        checked={userStatuses[user.id]}
                                        onCheckedChange={(checked) => handleStatusChange(user.id, checked)}
                                        aria-label={`Toggle status for ${user.name}`}
                                    />
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Essa ação não pode ser desfeita. Isso excluirá permanentemente a conta de <span className="font-bold">{user.name}</span>.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleRemoveUser(user.id)}>Excluir</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            <Dialog open={isLogDialogOpen} onOpenChange={setIsLogDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Log de Status - {selectedUser?.name}</DialogTitle>
                        <DialogDescription>
                            Histórico de quando o motorista ficou online, offline ou em viagem.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-72 w-full rounded-md border">
                        <div className="p-4">
                            {selectedUserLogs.length > 0 ? (
                                <ul className="space-y-4">
                                    {selectedUserLogs.map((log, index) => (
                                        <li key={index} className="flex items-center gap-4">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">{log.status}</p>
                                                <p className="text-sm text-muted-foreground">{new Date(log.timestamp).toLocaleString('pt-BR')}</p>
                                            </div>
                                            <Badge variant={
                                                log.status === 'Online' ? 'secondary' : 
                                                log.status === 'Offline' ? 'destructive' :
                                                log.status === 'Em Viagem (Interior)' ? 'default' :
                                                'outline'
                                            }>{log.status}</Badge>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center text-muted-foreground py-10">
                                    <p>Nenhum registro de log encontrado para este motorista.</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsLogDialogOpen(false)}>Fechar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleChangePassword}>
                        <DialogHeader>
                            <DialogTitle>Alterar Senha</DialogTitle>
                            <DialogDescription>
                                Defina uma nova senha para <span className="font-bold">{selectedUser?.name}</span>.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-1">
                                <Label htmlFor="new-password">Nova Senha</Label>
                                <Input id="new-password" type="password" value={newPassword.password} onChange={(e) => setNewPassword(prev => ({...prev, password: e.target.value}))} placeholder="Nova senha forte" required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="confirm-new-password">Confirmar Nova Senha</Label>
                                <Input id="confirm-new-password" type="password" value={newPassword.confirmPassword} onChange={(e) => setNewPassword(prev => ({...prev, confirmPassword: e.target.value}))} placeholder="Repita a nova senha" required />
                            </div>
                        </div>
                        <DialogFooter>
                             <Button type="button" variant="secondary" onClick={() => setIsPasswordDialogOpen(false)}>Cancelar</Button>
                            <Button type="submit">Salvar Nova Senha</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    );
}

    