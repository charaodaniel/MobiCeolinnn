'use client';

import { useState } from 'react';
import { Bot, ThumbsUp, Loader2, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Message {
    sender: 'passenger' | 'driver' | 'system';
    text: string;
}

export function FareNegotiation({ destination }: { destination: string }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [negotiationStarted, setNegotiationStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
   const [finalFare, setFinalFare] = useState<number | null>(null);

  const handleRequestRide = () => {
    setLoading(true);
    // Simulate notifying drivers and waiting for a response
    setTimeout(() => {
        setLoading(false);
        setNegotiationStarted(true);
        setMessages([
            { sender: 'system', text: 'Sua solicitação foi enviada. Aguardando propostas dos motoristas...' }
        ]);
        
        // Simulate a driver making an offer
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'driver', text: 'Olá! Faço a corrida por R$ 150,00.' }]);
            setFinalFare(150);
        }, 3000);

    }, 2000);
  };

  const handleAcceptAndCall = () => {
     toast({
        title: 'Corrida Confirmada!',
        description: `Buscando motorista para a sua corrida com a tarifa de R$ ${finalFare?.toFixed(2)}.`,
    });
  }

  return (
    <div className="space-y-4">
      <h3 className="font-headline text-lg font-semibold">Tarifa para Interior/Intermunicipal</h3>
      
      {!negotiationStarted ? (
        <>
            <p className="text-sm text-muted-foreground">
                Corridas para o interior têm o valor combinado diretamente com o motorista. Clique abaixo para solicitar uma corrida e receber propostas.
            </p>
            <Button onClick={handleRequestRide} className="w-full" disabled={loading}>
                {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Notificando Motoristas...
                </>
                ) : (
                'Solicitar Corrida e Negociar'
                )}
            </Button>
        </>
      ) : (
        <Alert className="mt-6 bg-secondary">
          <Bot className="h-4 w-4" />
          <AlertTitle className="font-headline">Negociação em Andamento</AlertTitle>
          <AlertDescription>
            <div className="space-y-2 mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`text-sm p-2 rounded-md ${msg.sender === 'driver' ? 'bg-background' : 'bg-blue-100'}`}>
                        <span className="font-bold capitalize">{msg.sender === 'system' ? 'Sistema' : msg.sender}:</span> {msg.text}
                    </div>
                ))}
            </div>
            {finalFare !== null && (
                 <div className="space-y-3">
                    <p className="text-lg font-bold text-foreground">
                        Proposta Recebida: <span className="text-accent-foreground bg-accent px-2 py-1 rounded-md">R$ {finalFare.toFixed(2)}</span>
                    </p>
                    <Button className="w-full mt-4" onClick={handleAcceptAndCall}>
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Aceitar e Chamar Motorista
                    </Button>
                     <Button className="w-full" variant="outline">
                        Recusar Proposta
                    </Button>
                </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

    