'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Car, Shield, Rocket } from 'lucide-react';

export function LoginCard() {
  return (
    <Card className="w-full max-w-md shadow-2xl animate-fade-in-up">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center mb-4">
            <Rocket className="h-12 w-12 text-primary" />
            <CardTitle className="font-headline text-3xl ml-2">MobiCeolin</CardTitle>
        </div>
        <CardDescription className="font-body">Selecione seu perfil para continuar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <Link href="/passenger" passHref>
          <Button variant="outline" className="w-full h-14 text-lg justify-start gap-4">
            <User className="text-primary" />
            <span className="font-headline">Passageiro</span>
          </Button>
        </Link>
        <Link href="/driver" passHref>
          <Button variant="outline" className="w-full h-14 text-lg justify-start gap-4">
            <Car className="text-primary" />
            <span className="font-headline">Motorista</span>
          </Button>
        </Link>
        <Link href="/admin" passHref>
          <Button variant="outline" className="w-full h-14 text-lg justify-start gap-4">
            <Shield className="text-primary" />
            <span className="font-headline">Administrador</span>
          </Button>
        </Link>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-muted"></div>
          <span className="flex-shrink mx-4 text-muted-foreground text-sm">Ou</span>
          <div className="flex-grow border-t border-muted"></div>
        </div>

        <Button className="w-full h-14 text-lg bg-accent hover:bg-accent/90 text-accent-foreground">
          Login Rápido (Demo)
        </Button>
      </CardContent>
    </Card>
  );
}
