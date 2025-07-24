'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

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
      <CardContent className="space-y-4">
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
      </CardContent>
      <CardFooter>
        <Button className="w-full md:w-auto ml-auto">Salvar Alterações</Button>
      </CardFooter>
    </Card>
  );
}
