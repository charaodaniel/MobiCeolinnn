'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
    sender: 'driver' | 'passenger';
    text: string;
    timestamp: string;
}

export function NegotiationChat({ passengerName, children }: { passengerName: string; children: React.ReactNode }) {
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'passenger', text: 'Olá! A tarifa para minha viagem ficou em R$115,00. Podemos fechar nesse valor?', timestamp: '10:30' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        const newMessages: Message[] = [...messages, {
            sender: 'driver',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }];
        setMessages(newMessages);

        // Simple bot response for demo purposes
        setTimeout(() => {
            const botResponse: Message = {
                sender: 'passenger',
                text: 'Entendido. Fico no aguardo!',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1500);

        setNewMessage('');
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
                        Converse com o passageiro para confirmar os detalhes da corrida.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <ScrollArea className="h-72 w-full pr-4">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={cn('flex items-end gap-2', { 'justify-end': msg.sender === 'driver' })}>
                                    {msg.sender === 'passenger' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={`https://placehold.co/40x40`} data-ai-hint="person face" />
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
                                            <AvatarImage src={`https://placehold.co/40x40`} data-ai-hint="person portrait" />
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
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Enviar</span>
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
