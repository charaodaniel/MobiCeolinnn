'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, ThumbsUp, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
    sender: 'driver' | 'passenger';
    text: string;
    timestamp: string;
    type?: 'text' | 'offer';
}

export function NegotiationChat({ passengerName, children }: { passengerName: string; children: React.ReactNode }) {
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'passenger', text: 'Olá! Solicitei uma corrida para a Zona Rural Leste. Qual seria o valor?', timestamp: '10:30', type: 'text' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [offer, setOffer] = useState('');

    const handleSendMessage = (type: 'text' | 'offer', content: string) => {
        if (content.trim() === '') return;
        
        const text = type === 'offer' ? `Minha proposta de valor é R$${content}.` : content;

        const newMessages: Message[] = [...messages, {
            sender: 'driver',
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
                sender: 'passenger',
                text: type === 'offer' ? 'Ok, valor recebido. Vou analisar.' : 'Entendido.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'text'
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1500);
    };

    const handleAcceptRide = () => {
        toast({
            title: 'Corrida Aceita!',
            description: `Você aceitou a corrida com ${passengerName}. Bom trabalho!`,
        });
        // Here you would typically close the dialog and update the ride status
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Negociar com {passengerName}</DialogTitle>
                    <DialogDescription>
                        Converse com o passageiro para combinar os detalhes e o valor da corrida.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <ScrollArea className="h-72 w-full pr-4">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={cn('flex items-end gap-2', { 'justify-end': msg.sender === 'driver' })}>
                                    {msg.sender === 'passenger' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="person face" />
                                            <AvatarFallback>{passengerName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn('max-w-[75%] rounded-lg p-3 text-sm', {
                                        'bg-muted': msg.sender === 'passenger',
                                        'bg-primary text-primary-foreground': msg.sender === 'driver',
                                    })}>
                                        <p>{msg.text}</p>
                                        <p className={cn('text-xs mt-1', {
                                            'text-muted-foreground': msg.sender === 'passenger',
                                            'text-primary-foreground/70': msg.sender === 'driver'
                                        })}>{msg.timestamp}</p>
                                    </div>
                                     {msg.sender === 'driver' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="person portrait" />
                                            <AvatarFallback>M</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                                        
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
                     <div className="flex gap-2">
                        <div className="relative flex-1">
                             <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="number"
                                placeholder="Propor valor (ex: 150.00)"
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
                </div>
                 <DialogFooter>
                    <Button onClick={handleAcceptRide} className="w-full">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Aceitar Corrida e Iniciar Viagem
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
