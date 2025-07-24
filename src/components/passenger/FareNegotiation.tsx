'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bot, ThumbsUp, Loader2 } from 'lucide-react';

import { negotiateFare, type NegotiateFareOutput } from '@/ai/flows/negotiate-fare';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  offer: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Por favor, insira um valor válido.',
  }),
});

export function FareNegotiation() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NegotiateFareOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      offer: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await negotiateFare({
        distance: 50, // Mock data
        initialFare: 120, // Mock data
        passengerOffer: parseFloat(values.offer),
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
        description: 'Não foi possível negociar a tarifa. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="font-headline text-lg font-semibold">Negociar Tarifa</h3>
      <p className="text-sm text-muted-foreground">
        A tarifa inicial para este destino é de <span className="font-bold">R$ 120,00</span>. Faça sua oferta.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="offer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sua Oferta (R$)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ex: 100.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Negociando...
              </>
            ) : (
              'Enviar Oferta'
            )}
          </Button>
        </form>
      </Form>

      {result && (
        <Alert className="mt-6 bg-secondary">
          <Bot className="h-4 w-4" />
          <AlertTitle className="font-headline">Resultado da Negociação</AlertTitle>
          <AlertDescription>
            <p className="mb-2">{result.reasoning}</p>
            <p className="text-lg font-bold text-foreground">
              Tarifa Final: <span className="text-accent-foreground bg-accent px-2 py-1 rounded-md">R$ {result.negotiatedFare.toFixed(2)}</span>
            </p>
            <Button className="w-full mt-4">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Aceitar e Chamar Motorista
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
