'use client';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Car, User } from 'lucide-react';

const users = [
  { id: '1', name: 'João Passageiro', email: 'joao@email.com', role: 'Passageiro', status: true, avatar: 'person' },
  { id: '2', name: 'Carlos Motorista', email: 'carlos@email.com', role: 'Motorista', status: true, avatar: 'man' },
  { id: '3', name: 'Ana Beatriz', email: 'ana.b@email.com', role: 'Passageiro', status: false, avatar: 'woman' },
  { id: '4', name: 'Roberto Freire', email: 'roberto.f@email.com', role: 'Motorista', status: true, avatar: 'person' },
  { id: '5', name: 'Fernanda Lima', email: 'fernanda@email.com', role: 'Motorista', status: false, avatar: 'woman' },
];

export function UserManagementTable() {
    const [userStatuses, setUserStatuses] = useState<Record<string, boolean>>(
        users.reduce((acc, user) => ({ ...acc, [user.id]: user.status }), {})
    );

    const handleStatusChange = (userId: string, newStatus: boolean) => {
        setUserStatuses(prev => ({ ...prev, [userId]: newStatus }));
    };
    
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuário</TableHead>
            <TableHead>Perfil</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Ação</TableHead>
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
              <TableCell className="text-right">
                <Switch
                  checked={userStatuses[user.id]}
                  onCheckedChange={(checked) => handleStatusChange(user.id, checked)}
                  aria-label={`Toggle status for ${user.name}`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
