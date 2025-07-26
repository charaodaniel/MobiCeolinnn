
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, LogIn, UserPlus, LogOut, KeyRound, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { RideHistory } from '../passenger/RideHistory';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { CameraCaptureDialog } from '../shared/CameraCaptureDialog';

export function PassengerAuthForm() {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState({ password: '', confirmPassword: '' });
  const [isCameraDialogOpen, setIsCameraDialogOpen] = useState(false);
  const [avatarImage, setAvatarImage] = useState('https://placehold.co/128x128.png');


  const handleLogin = () => {
    // Mock login with test credentials
    if (email === 'joao@email.com' && password === '123456') {
        toast({
            title: 'Login bem-sucedido!',
            description: 'Bem-vindo de volta, João!',
        });
        setIsLoggedIn(true);
    } else {
        toast({
            variant: 'destructive',
            title: 'Credenciais Inválidas',
            description: 'Por favor, verifique seu e-mail e senha.',
        });
    }
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
    setEmail('');
    setPassword('');
     toast({
      title: 'Logout Realizado',
      description: 'Você foi desconectado com sucesso.',
    });
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleSaveChanges = () => {
    toast({
        title: 'Perfil Atualizado!',
        description: 'Suas informações foram salvas com sucesso.',
    });
  }

  if (isLoggedIn) {
      return (
        <Card className="w-full border-0 shadow-none">
            <CardHeader className="text-center p-6 pt-0">
                <div className="flex flex-col items-center gap-4">
                    <Dialog open={isCameraDialogOpen} onOpenChange={setIsCameraDialogOpen}>
                        <DialogTrigger asChild>
                             <div className="relative group">
                                <Avatar className="h-20 w-20 cursor-pointer">
                                    <AvatarImage src={avatarImage} data-ai-hint="person face" />
                                    <AvatarFallback>JP</AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                                    <Camera className="h-8 w-8 text-white" />
                                </div>
                            </div>
                        </DialogTrigger>
                        <CameraCaptureDialog 
                            isOpen={isCameraDialogOpen}
                            onImageSave={setAvatarImage} 
                            onDialogClose={() => setIsCameraDialogOpen(false)}
                        />
                    </Dialog>
                    <div className="text-center">
                        <CardTitle className="font-headline text-2xl">João Passageiro</CardTitle>
                        <CardDescription className="font-body">joao@email.com</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6 pt-0">
                 <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <KeyRound className="mr-2 h-4 w-4" />
                            Trocar Senha
                        </Button>
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
                <Button onClick={handleSaveChanges} className="w-full">Salvar Alterações</Button>
            </CardContent>
            <CardContent className="space-y-2 pt-4 p-0">
                <h3 className="font-headline text-lg font-semibold text-center px-6">Histórico de Corridas</h3>
                <RideHistory />
            </CardContent>
            <CardFooter className="p-6">
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
            <Label htmlFor="email-passenger">Email</Label>
            <Input id="email-passenger" type="email" placeholder="joao@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-1">
            <Label htmlFor="password-passenger">Senha</Label>
            <Input id="password-passenger" type="password" placeholder="123456" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
