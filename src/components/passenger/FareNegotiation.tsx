'use client';

import { useState, useEffect } from 'react';
import { Bot, ThumbsUp, Loader2, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RideChat } from '@/components/driver/NegotiationChat';

interface Message {
    sender: 'passenger' | 'driver' | 'system';
    text: string;
}

export function FareNegotiation({ destination }: { destination: string }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [negotiationStarted, setNegotiationStarted] = useState(false);

  useEffect(() => {
    // Simulate finding drivers when component mounts
    const timer = setTimeout(() => {
      setLoading(false);
      setNegotiationStarted(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAcceptRide = () => {
    toast({
      title: 'Corrida Confirmada!',
      description: 'O motorista Carlos Motorista está a caminho.',
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-4 space-y-2">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="font-semibold">Buscando motoristas...</p>
        <p className="text-sm text-muted-foreground">
          Aguarde enquanto encontramos motoristas disponíveis para negociar a viagem para {destination || 'o interior'}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-headline text-lg font-semibold">Negociar com Motorista</h3>
      <p className="text-sm text-muted-foreground">
        Converse abaixo com o motorista para combinar o valor da corrida.
      </p>
      <div className="w-full">
         <RideChat 
            passengerName="Passageiro" 
            isNegotiation={true}
            onAcceptRide={handleAcceptRide}
          >
            {/* The RideChat component now handles its own Dialog, so no trigger is needed here. 
                Instead, we are just using its logic directly. This is a placeholder since the
                component expects a trigger. The functionality is inside RideChat. */}
         </RideChat>
      </div>
    </div>
  );
}