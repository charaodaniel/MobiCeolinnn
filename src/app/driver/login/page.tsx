
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';

export default function DriverLoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
                role: 'DRIVER' // Specify the role for driver login
            });

            if (result?.error) {
                throw new Error(result.error);
            }
            
            if (result?.ok) {
                 toast({
                    title: 'Login bem-sucedido!',
                    description: `Bem-vindo! Redirecionando para o painel.`,
                });
                router.push('/driver');
                router.refresh(); // Refresh to update session state
            }

        } catch (error: any) {
            let description = 'Ocorreu um erro inesperado. Tente novamente.';
            if (error.message.includes('CredentialsSignin')) {
                description = 'Credenciais inválidas. Verifique seu e-mail e senha.';
            } else {
                description = error.message;
            }
            toast({
                variant: 'destructive',
                title: 'Erro de Login',
                description: description,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex w-full items-center justify-center p-4 bg-gradient-to-br from-background to-secondary min-h-screen">
            <Card className="w-full max-w-md shadow-2xl animate-fade-in-up">
                <form onSubmit={handleLogin}>
                    <CardHeader className="text-center">
                        <div className="flex justify-center items-center mb-4">
                            <Car className="h-12 w-12 text-primary" />
                            <CardTitle className="font-headline text-3xl ml-2">Portal do Motorista</CardTitle>
                        </div>
                        <CardDescription className="font-body">Acesse sua conta para começar a dirigir.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                         <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
                        </div>
                         <div className="space-y-1">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </Button>
                         <Link href="/" passHref>
                             <Button variant="link" size="sm" className="text-muted-foreground">Voltar para o início</Button>
                        </Link>
                    </CardFooter>
                </form>
            </Card>
        </main>
    );
}
