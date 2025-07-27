
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, X, MapPin, DollarSign, MessageSquareQuote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RideChat } from './NegotiationChat';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

const RideRequestCard = ({ id, passenger, from, to, price, negotiated, onAccept, onReject }: { id: string, passenger: string, from: string, to: string, price: string, negotiated?: boolean, onAccept: (id: string, negotiated: boolean) => void, onReject: (id: string) => void }) => {

    return (
        <Card className={negotiated ? 'border-primary' : ''}>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person face" />
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
                     <RideChat passengerName={passenger} isNegotiation={true}>
                        <Button className="w-full col-span-2">
                            <MessageSquareQuote className="mr-2 h-4 w-4" />
                            Negociar Valor
                        </Button>
                    </RideChat>
                ) : (
                    <>
                        <Button variant="outline" className="w-full" onClick={() => onReject(id)}>
                            <X className="mr-2 h-4 w-4" />
                            Rejeitar
                        </Button>
                        <Button className="w-full" onClick={() => onAccept(id, negotiated || false)}>
                            <Check className="mr-2 h-4 w-4" />
                            Aceitar
                        </Button>
                    </>
                )}

            </CardFooter>
        </Card>
    );
}

const initialRequests = [
    { id: 'req1', passenger: "João Passageiro", from: "Shopping Pátio", to: "Centro da Cidade", price: "R$ 25,50", negotiated: false },
    { id: 'req2', passenger: "Maria Silva", from: "Aeroporto", to: "Zona Rural Leste", price: "A Negociar", negotiated: true },
    { id: 'req3', passenger: "Lucas Andrade", from: "Av. Principal, 123", to: "Rua do Comércio, 456", price: "R$ 18,00", negotiated: false },
];

export function RideRequests({ setDriverStatus }: { setDriverStatus: (status: string) => void }) {
    const { toast } = useToast();
    const [requests, setRequests] = useState(initialRequests);
    const [acceptedRideId, setAcceptedRideId] = useState<string | null>(null);

    const handleAccept = (rideId: string, isNegotiated: boolean) => {
        const ride = requests.find(r => r.id === rideId);
        if (!ride) return;

        toast({
            title: "Corrida Aceita!",
            description: `Você aceitou a corrida de ${ride.passenger}.`,
        });
        setAcceptedRideId(rideId);
        
        // Automatically update driver status
        if (isNegotiated) {
            setDriverStatus('rural-trip');
        } else {
            setDriverStatus('urban-trip');
        }
    };
    
    const handleReject = (rideId: string) => {
        const ride = requests.find(r => r.id === rideId);
        if (!ride) return;

        toast({
            variant: "destructive",
            title: "Corrida Rejeitada",
            description: `Você rejeitou a corrida de ${ride.passenger}.`,
        });
        
        setRequests(prev => prev.filter(r => r.id !== rideId));
    };

    const acceptedRide = requests.find(r => r.id === acceptedRideId);

    if (acceptedRide) {
         return (
             <Card className="shadow-lg border-primary">
                 <CardHeader>
                    <CardTitle className="font-headline">Corrida em Andamento</CardTitle>
                    <CardDescription>Comunique-se com seu passageiro.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row items-center gap-4 space-y-0 pb-4">
                        <Avatar>
                            <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person face" />
                            <AvatarFallback>{acceptedRide.passenger.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{acceptedRide.passenger}</p>
                            <p className="text-xs text-green-600 font-bold">EM ANDAMENTO</p>
                        </div>
                    </div>
                    <RideChat passengerName={acceptedRide.passenger} isNegotiation={false}>
                        <Button className="w-full">
                            <MessageSquareQuote className="mr-2 h-4 w-4" />
                            Abrir Chat com {acceptedRide.passenger}
                        </Button>
                    </RideChat>
                </CardContent>
            </Card>
         )
    }
    
    if(requests.length === 0) {
        return (
            <div className="text-center text-muted-foreground p-8 border rounded-lg bg-card">
                <CardTitle>Nenhuma solicitação no momento</CardTitle>
                <CardDescription>Aguardando novas corridas...</CardDescription>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <h3 className="font-headline text-lg">Você tem {requests.length} novas solicitações.</h3>
            <ScrollArea className="h-96">
                <div className="space-y-4 pr-4">
                    {requests.map((req) => (
                        <RideRequestCard 
                            key={req.id}
                            id={req.id}
                            passenger={req.passenger}
                            from={req.from}
                            to={req.to}
                            price={req.price}
                            negotiated={req.negotiated}
                            onAccept={handleAccept}
                            onReject={handleReject}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
