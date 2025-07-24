'use client';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Car, User, Trash2, PlusCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

const initialUsers = [
  { id: '1', name: 'João Passageiro', email: 'joao@email.com', role: 'Passageiro', status: true, avatar: 'person' },
  { id: '2', name: 'Carlos Motorista', email: 'carlos@email.com', role: 'Motorista', status: true, avatar: 'man' },
  { id: '3', name: 'Ana Beatriz', email: 'ana.b@email.com', role: 'Passageiro', status: false, avatar: 'woman' },
  { id: '4', name: 'Roberto Freire', email: 'roberto.f@email.com', role: 'Motorista', status: true, avatar: 'person' },
  { id: '5', name: 'Fernanda Lima', email: 'fernanda@email.com', role: 'Motorista', status: false, avatar: 'woman' },
];

export function UserManagementTable() {
    const { toast } = useToast();
    const [users, setUsers] = useState(initialUsers);
    const [userStatuses, setUserStatuses] = useState<Record<string, boolean>>(
        users.reduce((acc, user) => ({ ...acc, [user.id]: user.status }), {})
    );
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Passageiro' });

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
        if (!newUser.name || !newUser.email || !newUser.role) {
            toast({ variant: 'destructive', title: 'Erro', description: 'Por favor, preencha todos os campos.' });
            return;
        }
        const newId = (Math.max(...users.map(u => parseInt(u.id))) + 1).toString();
        const userToAdd = {
            id: newId,
            ...newUser,
            status: true,
            avatar: 'person'
        };
        setUsers(prev => [...prev, userToAdd]);
        setUserStatuses(prev => ({ ...prev, [newId]: true }));
        toast({ title: 'Usuário Adicionado!', description: `${newUser.name} foi adicionado como ${newUser.role}.` });
        setIsAddUserDialogOpen(false);
        setNewUser({ name: '', email: '', role: 'Passageiro' });
    };

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
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">Nome</Label>
                                    <Input id="name" value={newUser.name} onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))} className="col-span-3" placeholder="Nome Completo" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">Email</Label>
                                    <Input id="email" type="email" value={newUser.email} onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))} className="col-span-3" placeholder="email@exemplo.com" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="role" className="text-right">Perfil</Label>
                                    <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({...prev, role: value}))}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Selecione um perfil" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Passageiro">Passageiro</SelectItem>
                                            <SelectItem value="Motorista">Motorista</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                            <AvatarImage src={`https://placehold.co/40x40`} data-ai-hint={`${user.avatar} face`} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-muted-foreground">{user.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={user.role === 'Motorista' ? 'default' : 'secondary'} className="gap-1">
                                        {user.role === 'Motorista' ? <Car className="h-3 w-3" /> : <User className="h-3 w-3" />}
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={userStatuses[user.id] ? 'secondary' : 'destructive'}>
                                        {userStatuses[user.id] ? 'Ativo' : 'Inativo'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
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
        </div>
    );
}
