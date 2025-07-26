import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Car, Rocket, Shield, User } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '../ui/dialog';
import { LoginCard } from '../auth/LoginCard';
import { PassengerAuthForm } from '../auth/PassengerAuthForm';
import { Footer } from './Footer';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function AppLayout({ children, title, showAuthButtons = false, showDriverAvatar = false }: { children: ReactNode; title: string, showAuthButtons?: boolean, showDriverAvatar?: boolean }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          {showDriverAvatar ? (
             <Avatar className="h-8 w-8">
                <AvatarImage src={'https://placehold.co/48x48.png'} data-ai-hint="person portrait" />
                <AvatarFallback>C</AvatarFallback>
            </Avatar>
          ) : (
            <Rocket className="h-6 w-6 text-primary" />
          )}
          <span className="font-headline text-lg font-semibold">CEOLIN</span>
        </Link>
        <h1 className="flex-1 text-center font-headline text-xl font-bold text-foreground/80">{title}</h1>
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
                <DialogContent className="max-w-md">
                    <DialogTitle className="sr-only">Login</DialogTitle>
                   <LoginCard />
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
            <DialogContent className="max-w-md">
                <DialogTitle className="sr-only">Autenticação do Passageiro</DialogTitle>
              <PassengerAuthForm />
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
