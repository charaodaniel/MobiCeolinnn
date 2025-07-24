'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Rocket, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
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
    <main className="flex min-h-screen w-full items-center justify-center p-4 bg-gradient-to-br from-background to-secondary">
        <div className="relative">
            <Card className="w-full max-w-md shadow-2xl animate-fade-in-up">
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
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="admin@mobiceolin.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                         <div className="space-y-1">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full h-12 text-lg">Entrar</Button>
                        <Link href="/" passHref>
                            <Button variant="link" size="sm" className="text-muted-foreground">Voltar para o início</Button>
                        </Link>
                    </CardFooter>
                </form>
            </Card>
        </div>
    </main>
  );
}
