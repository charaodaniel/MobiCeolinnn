import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Car, Rocket, Shield, User, MessageSquare } from 'lucide-react';
import { LoginCard } from '../auth/LoginCard';
import { PassengerAuthForm } from '../auth/PassengerAuthForm';
import { Footer } from './Footer';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export function AppLayout({ children, title, showAuthButtons = false, showDriverAvatar = false }: { children: ReactNode; title: string, showAuthButtons?: boolean, showDriverAvatar?: boolean }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <Link href="/" className="flex items-center gap-2">
              {showDriverAvatar ? (
                <Avatar className="h-8 w-8">
                    <AvatarImage src={'https://placehold.co/48x48.png'} data-ai-hint="person portrait" />
                    <AvatarFallback>C</AvatarFallback>
                </Avatar>
              ) : (
                 title === 'Conversas' ? (
                   <Link href="/operator">
                      <MessageSquare className="h-6 w-6 text-primary" />
                   </Link>
                 ) : (
                    <Rocket className="h-6 w-6 text-primary" />
                 )
              )}
              <span className="font-headline text-lg font-semibold sm:inline">CEOLIN</span>
            </Link>

            <h1 className="hidden sm:block flex-1 text-center font-headline text-xl font-bold text-foreground/80">{title}</h1>

            <div className="flex items-center gap-2">
              {showAuthButtons && (
                <>
                  <Sheet>
                    <SheetTrigger asChild>
                       <Button variant="ghost">
                        <Car />
                        <span className="ml-2 hidden md:inline">Motorista</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle className="sr-only">Seleção de Perfil</SheetTitle>
                        <SheetDescription className="sr-only">Escolha entre pedir uma viagem, entrar como motorista ou operador.</SheetDescription>
                      </SheetHeader>
                      <LoginCard />
                    </SheetContent>
                  </Sheet>
                </>
              )}
              <Link href="/admin/login">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Shield className="h-5 w-5" />
                    <span className="sr-only">Admin</span>
                  </Button>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="sr-only">Painel do Passageiro</SheetTitle>
                        <SheetDescription className="sr-only">Faça login, registre-se ou gerencie seu perfil de passageiro.</SheetDescription>
                    </SheetHeader>
                    <PassengerAuthForm />
                </SheetContent>
              </Sheet>
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
