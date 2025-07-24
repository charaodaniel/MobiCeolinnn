'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, LogIn, UserPlus } from 'lucide-react';

export function PassengerAuthForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login
    toast({
      title: 'Login bem-sucedido!',
      description: 'Bem-vindo de volta!',
    });
  };

  const handleRegister = () => {
    // Mock register
    toast({
      title: 'Registro bem-sucedido!',
      description: 'Sua conta foi criada. Você já pode fazer o login.',
    });
  };

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
