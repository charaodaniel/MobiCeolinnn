
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, ThumbsUp, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle } from '../ui/alert';

interface Message {
    sender: 'driver' | 'passenger' | 'system';
    text: string;
    timestamp: string;
    type?: 'text' | 'offer';
}

const initialMessages = (isNegotiation: boolean): Message[] => {
    if (isNegotiation) {
        return [{ sender: 'system', text: 'Negociação iniciada. Aguardando proposta do motorista.', timestamp: '10:30', type: 'text' }];
    }
    // Simulating a driver having an issue
    return [
        { sender: 'driver', text: 'Olá, tive um imprevisto com o pneu. Vou demorar um pouco mais, mas já estou resolvendo.', timestamp: '10:35', type: 'text' },
    ];
};

export function RideChat({ passengerName, children, isNegotiation, isReadOnly = false, onAcceptRide, autoShowMessage }: { passengerName: string; children: React.ReactNode, isNegotiation: boolean, isReadOnly?: boolean, onAcceptRide?: () => void; autoShowMessage?: string }) {
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>(initialMessages(isNegotiation));
    const [newMessage, setNewMessage] = useState('');
    const [offer, setOffer] = useState('');

    useEffect(() => {
        // Simulate driver sending an initial offer in negotiation mode
        if (isNegotiation && !isReadOnly && passengerName === "Passageiro") {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    sender: 'driver',
                    text: 'Olá! Faço a corrida para esta região por R$ 150,00.',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    type: 'offer'
                }]);
            }, 2000);
        }

        // Auto-show a message if provided (e.g., when ride is accepted)
        if (autoShowMessage) {
             setTimeout(() => {
                setMessages(prev => [...prev, {
                    sender: 'system',
                    text: autoShowMessage,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    type: 'text'
                }]);
            }, 1000);
        }
    }, [isNegotiation, isReadOnly, passengerName, autoShowMessage]);

    const handleSendMessage = (type: 'text' | 'offer', content: string) => {
        if (content.trim() === '' || isReadOnly) return;
        
        const text = type === 'offer' ? `Minha proposta de valor é R$${content}.` : content;
        const senderRole = passengerName === "Passageiro" ? 'passenger' : 'driver';

        const newMessages: Message[] = [...messages, {
            sender: senderRole,
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: type,
        }];
        setMessages(newMessages);

        if (type === 'text') {
            setNewMessage('');
        } else {
            setOffer('');
        }

        // Simple bot response for demo purposes
        setTimeout(() => {
            const botResponse: Message = {
                sender: senderRole === 'driver' ? 'passenger' : 'driver',
                text: type === 'offer' ? 'Ok, valor recebido. Vou analisar.' : 'Entendido.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'text'
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1500);
    };

    
    const isPassengerView = passengerName === "Passageiro";

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{isNegotiation ? `Negociar com ${isPassengerView ? 'Motorista' : passengerName}` : `Conversar com ${isPassengerView ? 'Motorista' : passengerName}`}</DialogTitle>
                    <DialogDescription>
                        {isNegotiation ? 'Converse para combinar os detalhes e o valor da corrida.' : 'Comunique-se sobre a corrida.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <ScrollArea className="h-72 w-full pr-4">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={cn('flex items-end gap-2', { 'justify-end': msg.sender === (isPassengerView ? 'passenger' : 'driver') })}>
                                    {msg.sender !== (isPassengerView ? 'passenger' : 'driver') && msg.sender !== 'system' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="person face" />
                                            <AvatarFallback>{isPassengerView ? 'M' : passengerName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn('max-w-[75%] rounded-lg p-3 text-sm', {
                                        'bg-muted': msg.sender !== (isPassengerView ? 'passenger' : 'driver'),
                                        'bg-primary text-primary-foreground': msg.sender === (isPassengerView ? 'passenger' : 'driver'),
                                        'bg-blue-100 text-blue-900 text-center w-full': msg.sender === 'system'
                                    })}>
                                        <p>{msg.text}</p>
                                        {msg.sender !== 'system' && (
                                            <p className={cn('text-xs mt-1', {
                                                'text-muted-foreground': msg.sender !== (isPassengerView ? 'passenger' : 'driver'),
                                                'text-primary-foreground/70': msg.sender === (isPassengerView ? 'passenger' : 'driver')
                                            })}>{msg.timestamp}</p>
                                        )}
                                    </div>
                                     {msg.sender === (isPassengerView ? 'passenger' : 'driver') && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="person portrait" />
                                            <AvatarFallback>{isPassengerView ? 'P' : 'M'}</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    {isReadOnly ? (
                        <Alert>
                            <AlertTitle className="text-center">Esta conversa foi arquivada.</AlertTitle>
                        </Alert>
                    ) : (
                        <>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Digite sua mensagem..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage('text', newMessage)}
                                />
                                <Button onClick={() => handleSendMessage('text', newMessage)} disabled={!newMessage.trim()}>
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Enviar</span>
                                </Button>
                            </div>
                            {isNegotiation && (
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            type="number"
                                            placeholder="Sua contraproposta"
                                            className="pl-10"
                                            value={offer}
                                            onChange={(e) => setOffer(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage('offer', offer)}
                                        />
                                    </div>
                                    <Button onClick={() => handleSendMessage('offer', offer)} disabled={!offer.trim()} variant="secondary">
                                        Enviar Proposta
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
                 {isNegotiation && !isReadOnly && (
                    <DialogFooter>
                        <Button onClick={onAcceptRide} className="w-full">
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            {isPassengerView ? 'Aceitar Proposta e Chamar' : 'Aceitar Corrida e Iniciar Viagem'}
                        </Button>
                    </DialogFooter>
                 )}
            </DialogContent>
        </Dialog>
    );
}
