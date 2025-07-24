'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { RideHistory } from '../passenger/RideHistory';

export function PassengerAuthForm() {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login
    toast({
      title: 'Login bem-sucedido!',
      description: 'Bem-vindo de volta!',
    });
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    // Mock register
    toast({
      title: 'Registro bem-sucedido!',
      description: 'Sua conta foi criada. Você já pode fazer o login.',
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
     toast({
      title: 'Logout Realizado',
      description: 'Você foi desconectado com sucesso.',
    });
  }

  if (isLoggedIn) {
      return (
        <Card className="w-full border-0 shadow-none">
            <CardHeader className="text-center">
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={`https://placehold.co/128x128.png`} data-ai-hint="person face" />
                        <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <CardTitle className="font-headline text-2xl">Passageiro Exemplo</CardTitle>
                        <CardDescription className="font-body">passageiro@email.com</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
                <h3 className="font-headline text-lg font-semibold">Histórico de Corridas</h3>
                <RideHistory />
            </CardContent>
            <CardFooter>
                <Button onClick={handleLogout} variant="outline" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                </Button>
            </CardFooter>
        </Card>
      );
  }

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center mb-4">
            <User className="h-10 w-10 text-primary" />
            <CardTitle className="font-headline text-3xl ml-2">Área do Passageiro</CardTitle>
        </div>
        <CardDescription className="font-body">Faça login ou registre-se para salvar suas viagens.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-1">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleLogin} className="w-full">
            <LogIn className="mr-2 h-4 w-4" />
            Entrar
        </Button>
        <Button onClick={handleRegister} variant="secondary" className="w-full">
            <UserPlus className="mr-2 h-4 w-4" />
            Registrar
        </Button>
      </CardFooter>
    </Card>
  );
}
