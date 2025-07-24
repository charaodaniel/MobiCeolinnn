'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Upload, KeyRound } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function ProfileForm() {
  const { toast } = useToast();
  const [status, setStatus] = useState('online');

  const handleSave = () => {
    toast({
      title: 'Sucesso!',
      description: 'Suas alterações foram salvas.',
    });
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    toast({
      title: 'Status Atualizado',
      description: `Seu status foi alterado para ${newStatus === 'online' ? 'Online' : newStatus === 'offline' ? 'Offline' : 'Em Viagem (Interior)'}.`,
    });
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Avatar className="h-16 w-16 cursor-pointer">
                        <AvatarImage src="https://placehold.co/100x100" data-ai-hint="person portrait" />
                        <AvatarFallback>CM</AvatarFallback>
                    </Avatar>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Foto de Perfil</DialogTitle>
                      <DialogDescription>
                        Visualize sua foto de perfil ou envie uma nova.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-4">
                        <Image src="https://placehold.co/256x256" alt="Foto de Perfil" width={256} height={256} className="rounded-full" data-ai-hint="person portrait" />
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Input id="profile-picture-upload" type="file" className="flex-1" />
                        <Button type="submit" onClick={() => toast({ title: 'Foto Salva', description: 'Sua nova foto de perfil foi salva com sucesso!' })}>Salvar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <div>
                    <CardTitle className="font-headline text-2xl">Carlos Motorista</CardTitle>
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span>4.9 (238 corridas)</span>
                    </div>
                </div>
            </div>
            <div className="space-y-1 w-40">
                <Label htmlFor="driver-status">Status</Label>
                <Select value={status} onValueChange={handleStatusChange}>
                    <SelectTrigger id="driver-status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                      <SelectItem value="rural-trip">Em Viagem (Interior)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
            <h3 className="font-headline text-lg">Informações Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" defaultValue="Carlos Motorista" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="carlos@email.com" readOnly />
                </div>
                 <div className="space-y-1 md:col-span-2">
                    <Label htmlFor="pix-key">Chave PIX</Label>
                    <div className="relative">
                         <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="pix-key" placeholder="Insira sua chave PIX (CPF, e-mail, etc.)" className="pl-10" />
                    </div>
                </div>
            </div>
        </div>
        <div className="space-y-4">
            <h3 className="font-headline text-lg">Documentos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <Label htmlFor="profile-picture">Foto de Perfil</Label>
                    <Input id="profile-picture" type="file" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="cnh-document">Carteira de Habilitação (CNH)</Label>
                    <Input id="cnh-document" type="file" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="crlv-document">Documento do Veículo (CRLV)</Label>
                    <Input id="crlv-document" type="file" />
                </div>
            </div>
        </div>
        <div className="space-y-4">
            <h3 className="font-headline text-lg">Veículo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="vehicle-model">Modelo do Veículo</Label>
                    <Input id="vehicle-model" defaultValue="Toyota Corolla" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="license-plate">Placa</Label>
                    <Input id="license-plate" defaultValue="BRA2E19" />
                </div>
            </div>
        </div>
        <div className="space-y-4">
            <h3 className="font-headline text-lg">Configurações de Corrida</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div className="space-y-1">
                    <Label htmlFor="fixed-rate">Valor Fixo por Km (Urbano)</Label>
                    <Input id="fixed-rate" type="number" placeholder="R$ 2,50" />
                </div>
                 <div className="flex items-center space-x-2 pt-5">
                    <Switch id="negotiate-rural" />
                    <Label htmlFor="negotiate-rural">Aceitar negociação para interior</Label>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full md:w-auto ml-auto" onClick={handleSave}>Salvar Alterações</Button>
      </CardFooter>
    </Card>
  );
}
