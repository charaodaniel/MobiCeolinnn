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
          <Button variant="default" className="w-full h-14 text-lg justify-start gap-4">
            <User className="text-primary-foreground" />
            <span className="font-headline">Pedir uma Viagem</span>
          </Button>
        </Link>
        <Link href="/driver/login" passHref>
          <Button variant="outline" className="w-full h-14 text-lg justify-start gap-4">
            <Car className="text-primary" />
            <span className="font-headline">Sou Motorista</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
