'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
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
        { sender: 'passenger', text: 'A tarifa de R$120 está um pouco alta. Aceita R$100?', timestamp: '10:30' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [finalOffer, setFinalOffer] = useState<number | null>(null);

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
                text: 'Ok, R$110 é minha última oferta.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botResponse]);
            setFinalOffer(110);
        }, 1500);

        setNewMessage('');
    };

    const handleAcceptOffer = () => {
        toast({
            title: 'Oferta Aceita!',
            description: `Você aceitou a oferta de R$ ${finalOffer?.toFixed(2)}. A corrida foi confirmada.`,
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
                        Converse com o passageiro para chegar a um acordo sobre a tarifa.
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
                    
                    {finalOffer && (
                         <div className="p-3 bg-accent/20 rounded-lg text-center">
                            <p className="font-semibold">Nova Oferta do Passageiro: R$ {finalOffer.toFixed(2)}</p>
                            <Button size="sm" className="mt-2" onClick={handleAcceptOffer}>Aceitar Oferta Final</Button>
                        </div>
                    )}
                    
                    <div className="flex gap-2">
                        <Input
                            placeholder="Digite sua mensagem ou oferta..."
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
            </DialogContent>
        </Dialog>
    );
}
