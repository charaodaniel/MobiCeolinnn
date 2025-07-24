'use client';

import { useState, useEffect } from 'react';
import { Bot, ThumbsUp, Loader2 } from 'lucide-react';

import { negotiateFare, type NegotiateFareOutput } from '@/ai/flows/negotiate-fare';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function FareNegotiation({ destination }: { destination: string }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NegotiateFareOutput | null>(null);

  async function handleRequestFare() {
    setLoading(true);
    setResult(null);
    try {
      const response = await negotiateFare({
        distance: 50, // Mock data
        initialFare: 120, // Mock data
        destinationType: 'rural',
        passengerRating: 4.8, // Mock data
        driverRating: 4.9, // Mock data
      });
      setResult(response);
    } catch (error) {
      console.error('Negotiation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Erro na Negociação',
        description: 'Não foi possível obter uma tarifa. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleAcceptAndCall = () => {
     toast({
        title: 'Corrida Confirmada!',
        description: `Buscando motorista para a sua corrida com a tarifa de R$ ${result?.negotiatedFare.toFixed(2)}.`,
    });
  }

  return (
    <div className="space-y-4">
      <h3 className="font-headline text-lg font-semibold">Tarifa para o Interior</h3>
      <p className="text-sm text-muted-foreground">
        Corridas para o interior podem ter o valor negociado. Clique abaixo para que nossa IA calcule uma tarifa justa para você.
      </p>

      <Button onClick={handleRequestFare} className="w-full" disabled={loading || !destination}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Calculando...
          </>
        ) : (
          'Calcular Tarifa Justa'
        )}
      </Button>
       {!destination && (
          <p className="text-xs text-center text-destructive">Por favor, preencha o destino para calcular a tarifa.</p>
      )}


      {result && (
        <Alert className="mt-6 bg-secondary">
          <Bot className="h-4 w-4" />
          <AlertTitle className="font-headline">Resultado da Negociação</AlertTitle>
          <AlertDescription>
            <p className="mb-2">{result.reasoning}</p>
            <p className="text-lg font-bold text-foreground">
              Tarifa Final: <span className="text-accent-foreground bg-accent px-2 py-1 rounded-md">R$ {result.negotiatedFare.toFixed(2)}</span>
            </p>
            <Button className="w-full mt-4" onClick={handleAcceptAndCall}>
              <ThumbsUp className="mr-2 h-4 w-4" />
              Aceitar e Chamar Motorista
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
