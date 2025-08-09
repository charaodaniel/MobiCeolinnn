
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AdminLoginForm() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock login
        if (email === 'admin@mobiceolin.com' && password === 'admin123') {
            toast({
                title: 'Login bem-sucedido!',
                description: 'Redirecionando para o painel do administrador.',
            });
            router.push('/admin');
        } else {
            toast({
                variant: 'destructive',
                title: 'Erro de Login',
                description: 'Credenciais inválidas. Tente novamente.',
            });
        }
    };

  return (
    <Card className="w-full shadow-none border-0">
        <form onSubmit={handleLogin}>
            <CardHeader className="text-center">
                <div className="flex justify-center items-center mb-4">
                    <Shield className="h-12 w-12 text-primary" />
                    <CardTitle className="font-headline text-3xl ml-2">Acesso Restrito</CardTitle>
                </div>
                <CardDescription className="font-body">Painel do Administrador</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
                <div className="space-y-1">
                    <Label htmlFor="email-admin">Email</Label>
                    <Input id="email-admin" type="email" placeholder="admin@mobiceolin.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                    <div className="space-y-1">
                    <Label htmlFor="password-admin">Senha</Label>
                    <Input id="password-admin" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full h-12 text-lg">Entrar</Button>
            </CardFooter>
        </form>
    </Card>
  );
}
