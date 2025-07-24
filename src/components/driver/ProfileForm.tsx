'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Upload } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ProfileForm() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://placehold.co/100x100" data-ai-hint="person portrait" />
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="font-headline text-2xl">Carlos Motorista</CardTitle>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span>4.9 (238 corridas)</span>
            </div>
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
                 <div className="space-y-1">
                    <Label htmlFor="driver-status">Status</Label>
                    <Select defaultValue="online">
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
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full md:w-auto ml-auto">Salvar Alterações</Button>
      </CardFooter>
    </Card>
  );
}
