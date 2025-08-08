import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Car, Rocket, Shield, User, MessageSquare } from 'lucide-react';
import { LoginCard } from '../auth/LoginCard';
import { PassengerAuthForm } from '../auth/PassengerAuthForm';
import { Footer } from './Footer';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from '../ui/scroll-area';


export function AppLayout({ children, title, showAuthButtons = false, showDriverAvatar = false }: { children: ReactNode; title: string, showAuthButtons?: boolean, showDriverAvatar?: boolean }) {
  const renderLogoLink = () => {
    if (showDriverAvatar) {
      return (
        <Link href="/" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
              <AvatarImage src={'https://placehold.co/48x48.png'} data-ai-hint="person portrait" />
              <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <span className="font-headline text-lg font-semibold sm:inline">CEOLIN</span>
        </Link>
      );
    }
    if (title === 'Conversas') {
      return (
        <Link href="/operator" className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-semibold sm:inline">CEOLIN</span>
        </Link>
      )
    }
    return (
      <Link href="/" className="flex items-center gap-2">
        <Rocket className="h-6 w-6 text-primary" />
        <span className="font-headline text-lg font-semibold sm:inline">CEOLIN</span>
      </Link>
    )
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            {renderLogoLink()}

            <h1 className="hidden sm:block flex-1 text-center font-headline text-xl font-bold text-foreground/80">{title}</h1>

            <div className="flex items-center gap-2">
              {showAuthButtons && (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                       <Button variant="ghost">
                        <Car />
                        <span className="ml-2 hidden md:inline">Motorista</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Portal de Acesso</DialogTitle>
                        <DialogDescription>Acesse sua conta de motorista ou operador.</DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-full">
                        <LoginCard />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </>
              )}
              <Link href="/admin/login">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Shield className="h-5 w-5" />
                    <span className="sr-only">Admin</span>
                  </Button>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Painel do Passageiro</DialogTitle>
                        <DialogDescription>Faça login, registre-se ou gerencie seu perfil de passageiro.</DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-hidden">
                      <ScrollArea className="h-full">
                        <PassengerAuthForm />
                      </ScrollArea>
                    </div>
                </DialogContent>
              </Dialog>
            </div>
        </div>
        <div className="container sm:hidden pb-2 px-4">
            <h1 className="text-center font-headline text-lg font-bold text-foreground/80">{title}</h1>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
