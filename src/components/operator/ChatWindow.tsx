'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MoreVertical, Phone, Send, Car, User, Shield } from "lucide-react";
import { Conversation } from './ConversationList';
import { Separator } from '../ui/separator';

interface Message {
    sender: 'operator' | 'contact';
    text: string;
    timestamp: string;
}

const getMockMessages = (contactName: string): Message[] => {
    return [
        { sender: 'contact', text: `Olá, preciso de ajuda com uma corrida.`, timestamp: '10:40' },
        { sender: 'operator', text: `Claro, ${contactName}. Como posso ajudar?`, timestamp: '10:41' },
    ]
};

const RoleIcon = ({ role }: { role: Conversation['role'] }) => {
    switch (role) {
        case 'Motorista': return <Car className="h-5 w-5 text-muted-foreground" />;
        case 'Administrador': return <Shield className="h-5 w-5 text-muted-foreground" />;
        case 'Passageiro': return <User className="h-5 w-5 text-muted-foreground" />;
        default: return null;
    }
}

export function ChatWindow({ conversation }: { conversation: Conversation }) {
  const [messages, setMessages] = useState<Message[]>(getMockMessages(conversation.name));
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      sender: 'operator',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, msg]);
    setNewMessage('');
    
    // Simulate contact response
    setTimeout(() => {
        setMessages(prev => [...prev, {
            sender: 'contact',
            text: 'Ok, obrigado!',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }])
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <header className="flex items-center p-3 border-b bg-muted/50">
        <div className="flex items-center gap-4 flex-1">
            <Avatar className="h-10 w-10">
                <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint={`${conversation.avatar} face`} />
                <AvatarFallback>{conversation.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold">{conversation.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <RoleIcon role={conversation.role} />
                    <span>{conversation.role}</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
            <span className="sr-only">Ligar</span>
          </Button>
           <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">Mais opções</span>
          </Button>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1 bg-background">
        <div className="p-4 md:p-6 space-y-6">
            {messages.map((msg, index) => (
                <div key={index} className={cn('flex items-end gap-2', { 'justify-end': msg.sender === 'operator' })}>
                    {msg.sender === 'contact' && (
                         <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="person face" />
                            <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    )}
                     <div className={cn('max-w-[75%] rounded-lg p-3 text-sm', {
                        'bg-muted': msg.sender === 'contact',
                        'bg-primary text-primary-foreground': msg.sender === 'operator'
                    })}>
                        <p>{msg.text}</p>
                        <p className={cn('text-xs mt-1 text-right', {
                            'text-muted-foreground': msg.sender === 'contact',
                            'text-primary-foreground/70': msg.sender === 'operator'
                        })}>{msg.timestamp}</p>
                    </div>
                </div>
            ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <footer className="p-3 border-t bg-muted/50">
        <div className="flex items-center gap-2">
            <Input 
                placeholder="Digite uma mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-5 w-5" />
                <span className="sr-only">Enviar</span>
            </Button>
        </div>
      </footer>
    </div>
  );
}
