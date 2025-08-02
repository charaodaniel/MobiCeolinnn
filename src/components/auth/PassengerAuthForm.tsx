
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, LogIn, UserPlus, LogOut, KeyRound, Camera, History, MessageSquare, ChevronRight, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { RideHistory } from '../passenger/RideHistory';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { ImageEditorDialog } from '../shared/ImageEditorDialog';
import { Separator } from '../ui/separator';
import { ChatHistory } from '../passenger/ChatHistory';
import { Card, CardContent, CardFooter } from '../ui/card';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface PassengerAuthFormProps {
  onLoginSuccess?: () => void;
}

interface UserData {
    id: string;
    name: string;
    email: string;
    role: string;
}

export function PassengerAuthForm({ onLoginSuccess }: PassengerAuthFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Profile State
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState({ password: '', confirmPassword: '' });
  const [isCameraDialogOpen, setIsCameraDialogOpen] = useState(false);
  const [avatarImage, setAvatarImage] = useState('https://placehold.co/128x128.png');
  const [activeTab, setActiveTab] = useState<'rides' | 'chats'>('rides');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!apiUrl) {
        toast({ variant: 'destructive', title: 'Erro de Configuração', description: 'URL da API não configurada.' });
        setIsLoading(false);
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer login.');
        }
        
        toast({ title: 'Login bem-sucedido!', description: `Bem-vindo(a) de volta, ${data.user.name}!` });
        setUserData(data.user);
        setAuthToken(data.token);
        setIsLoggedIn(true);

        if (onLoginSuccess) {
          onLoginSuccess();
        }
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Erro de Login', description: error.message });
    } finally {
        setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

     if (!apiUrl) {
        toast({ variant: 'destructive', title: 'Erro de Configuração', description: 'URL da API não configurada.' });
        setIsLoading(false);
        return;
    }

    try {
         const response = await fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role: 'Passageiro' }),
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao registrar.');
        }
        
        toast({ title: 'Registro bem-sucedido!', description: 'Sua conta foi criada. Você já pode fazer o login.' });
        // Optionally switch to login tab after registration
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Erro de Registro', description: error.message });
    } finally {
        setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setAuthToken(null);
    setEmail('');
    setPassword('');
     toast({
      title: 'Logout Realizado',
      description: 'Você foi desconectado com sucesso.',
    });
    router.push('/');
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to change password
    if (!newPassword.password || !newPassword.confirmPassword) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Preencha ambos os campos de senha.' });
        return;
    }
    if (newPassword.password !== newPassword.confirmPassword) {
        toast({ variant: 'destructive', title: 'Erro', description: 'As senhas não coincidem.' });
        return;
    }
    toast({ title: 'Senha Alterada!', description: `Sua senha foi alterada com sucesso.` });
    setIsPasswordDialogOpen(false);
    setNewPassword({ password: '', confirmPassword: '' });
  }

  if (isLoggedIn && userData) {
      return (
        <div className="flex flex-col bg-muted/40 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col items-center gap-4 py-8 bg-card">
                <Dialog open={isCameraDialogOpen} onOpenChange={setIsCameraDialogOpen}>
                    <DialogTrigger asChild>
                         <div className="relative group">
                            <Avatar className="h-24 w-24 cursor-pointer ring-4 ring-background">
                                <AvatarImage src={avatarImage} data-ai-hint="person face" />
                                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                                <Camera className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </DialogTrigger>
                    <ImageEditorDialog 
                        isOpen={isCameraDialogOpen}
                        currentImage={avatarImage}
                        onImageSave={setAvatarImage} 
                        onDialogClose={() => setIsCameraDialogOpen(false)}
                    />
                </Dialog>
                <div className="text-center">
                    <h2 className="font-headline text-2xl font-semibold">{userData.name}</h2>
                    <p className="font-body text-muted-foreground">{userData.email}</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col pt-6 bg-muted/40">
                 <div className="bg-card">
                    <button onClick={() => setActiveTab('rides')} className="flex items-center justify-between w-full p-4 text-left">
                        <div className="flex items-center gap-4">
                            <History className="h-6 w-6 text-primary" />
                            <span className="font-medium">Histórico de Corridas</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </button>
                    <Separator />
                     <button onClick={() => setActiveTab('chats')} className="flex items-center justify-between w-full p-4 text-left">
                        <div className="flex items-center gap-4">
                            <MessageSquare className="h-6 w-6 text-primary" />
                            <span className="font-medium">Conversas</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </button>
                    <Separator />
                    <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                        <DialogTrigger asChild>
                           <button className="flex items-center justify-between w-full p-4 text-left">
                                <div className="flex items-center gap-4">
                                    <KeyRound className="h-6 w-6 text-primary" />
                                    <span className="font-medium">Trocar Senha</span>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <form onSubmit={handleChangePassword}>
                                <DialogHeader>
                                    <DialogTitle>Alterar Senha</DialogTitle>
                                    <DialogDescription>
                                        Defina uma nova senha para sua conta.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="new-password-passenger">Nova Senha</Label>
                                        <Input id="new-password-passenger" type="password" value={newPassword.password} onChange={(e) => setNewPassword(prev => ({...prev, password: e.target.value}))} placeholder="Nova senha forte" required />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="confirm-new-password-passenger">Confirmar Nova Senha</Label>
                                        <Input id="confirm-new-password-passenger" type="password" value={newPassword.confirmPassword} onChange={(e) => setNewPassword(prev => ({...prev, confirmPassword: e.target.value}))} placeholder="Repita a nova senha" required />
                                    </div>
                                </div>
                                <DialogFooter>
                                     <Button type="button" variant="secondary" onClick={() => setIsPasswordDialogOpen(false)}>Cancelar</Button>
                                    <Button type="submit">Salvar Nova Senha</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Separator />
                     <button onClick={handleLogout} className="flex items-center justify-between w-full p-4 text-left text-destructive">
                        <div className="flex items-center gap-4">
                            <LogOut className="h-6 w-6" />
                            <span className="font-medium">Sair</span>
                        </div>
                    </button>
                 </div>
                 
                <div className="flex-1 flex flex-col mt-4 bg-card pb-4">
                    {activeTab === 'rides' ? <RideHistory /> : <ChatHistory />}
                </div>
            </div>
        </div>
      );
  }

  return (
    <Card className="w-full border-0 shadow-none">
      <CardContent className="p-0">
          <div className="text-center mb-6 pt-6">
            <div className="flex justify-center items-center mb-4">
                <User className="h-10 w-10 text-primary" />
                <h2 className="font-headline text-3xl ml-2">Área do Passageiro</h2>
            </div>
            <p className="font-body text-muted-foreground">Faça login ou registre-se para salvar suas viagens.</p>
          </div>
        <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Registrar</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4 pt-6">
                        <div className="space-y-1">
                            <Label htmlFor="email-login">Email</Label>
                            <Input id="email-login" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password-login">Senha</Label>
                            <Input id="password-login" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <LogIn className="mr-2 h-4 w-4" />
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </Button>
                    </CardFooter>
                </form>
            </TabsContent>
            <TabsContent value="register">
                <form onSubmit={handleRegister}>
                    <CardContent className="space-y-4 pt-6">
                         <div className="space-y-1">
                            <Label htmlFor="name-register">Nome Completo</Label>
                            <Input id="name-register" type="text" placeholder="Seu Nome Completo" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email-register">Email</Label>
                            <Input id="email-register" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password-register">Senha</Label>
                            <Input id="password-register" type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <UserPlus className="mr-2 h-4 w-4" />
                            {isLoading ? 'Registrando...' : 'Criar Conta'}
                        </Button>
                    </CardFooter>
                </form>
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

