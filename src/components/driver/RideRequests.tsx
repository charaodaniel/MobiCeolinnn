import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, X, MapPin, DollarSign, MessageSquareQuote } from 'lucide-react';

const RideRequestCard = ({ passenger, from, to, price, negotiated }: { passenger: string, from: string, to: string, price: string, negotiated?: boolean }) => (
    <Card className={negotiated ? 'border-primary' : ''}>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
            <Avatar>
                <AvatarImage src="https://placehold.co/100x100" data-ai-hint="person face" />
                <AvatarFallback>{passenger.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold">{passenger}</p>
                <p className="text-xs text-muted-foreground">★ 4.8</p>
            </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-semibold">De:</span> {from}
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="font-semibold">Para:</span> {to}
            </div>
            <div className="flex items-center gap-2 pt-2">
                <DollarSign className="h-4 w-4 text-accent" />
                <span className="font-bold text-lg">{price}</span>
            </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2">
            {negotiated ? (
                 <Button className="w-full col-span-2">
                    <MessageSquareQuote className="mr-2 h-4 w-4" />
                    Negociar Valor
                </Button>
            ) : (
                <>
                    <Button variant="outline" className="w-full">
                        <X className="mr-2 h-4 w-4" />
                        Rejeitar
                    </Button>
                    <Button className="w-full">
                        <Check className="mr-2 h-4 w-4" />
                        Aceitar
                    </Button>
                </>
            )}

        </CardFooter>
    </Card>
);

export function RideRequests() {
  return (
    <Card className="shadow-lg h-full">
        <CardHeader>
            <CardTitle className="font-headline">Solicitações de Corrida</CardTitle>
            <CardDescription>Você tem 2 novas solicitações.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <RideRequestCard passenger="João Passageiro" from="Shopping Pátio" to="Centro da Cidade" price="R$ 25,50" />
            <RideRequestCard passenger="Maria Silva" from="Aeroporto" to="Zona Rural Leste" price="A Negociar" negotiated />
        </CardContent>
    </Card>
  );
}
