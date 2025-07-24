import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, X, MapPin, DollarSign } from 'lucide-react';

const RideRequestCard = ({ passenger, from, to, price }: { passenger: string, from: string, to: string, price: string }) => (
    <Card>
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
                <MapPin className="h-4 w-4 text-primary-foreground" />
                <span className="font-semibold">De:</span> {from}
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-foreground" />
                <span className="font-semibold">Para:</span> {to}
            </div>
            <div className="flex items-center gap-2 pt-2">
                <DollarSign className="h-4 w-4 text-accent-foreground" />
                <span className="font-bold text-lg">{price}</span>
            </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full">
                <X className="mr-2 h-4 w-4" />
                Rejeitar
            </Button>
            <Button className="w-full">
                <Check className="mr-2 h-4 w-4" />
                Aceitar
            </Button>
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
            <RideRequestCard passenger="Maria Silva" from="Aeroporto" to="Zona Rural Leste (Negociado)" price="R$ 110,00" />
        </CardContent>
    </Card>
  );
}
