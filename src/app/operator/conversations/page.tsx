'use client';

import { useState } from 'react';
import { ConversationList, type Conversation } from '@/components/operator/ConversationList';
import { ChatWindow } from '@/components/operator/ChatWindow';
import { Card } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { AppLayout } from '@/components/layout/AppLayout';

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Carlos Motorista',
    role: 'Motorista',
    lastMessage: 'Ok, estou a caminho do passageiro.',
    timestamp: '10:45',
    avatar: 'man',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'João Passageiro',
    role: 'Passageiro',
    lastMessage: 'Onde encontro o carro?',
    timestamp: '10:42',
    avatar: 'person',
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Admin User',
    role: 'Administrador',
    lastMessage: 'Verifique o relatório de corridas do motorista Roberto.',
    timestamp: 'Ontem',
    avatar: 'shield',
    unreadCount: 0,
  },
  {
    id: '4',
    name: 'Maria Silva',
    role: 'Passageiro',
    lastMessage: 'Agradeço a ajuda!',
    timestamp: 'Ontem',
    avatar: 'woman',
    unreadCount: 1,
  },
   {
    id: '5',
    name: 'Roberto Freire',
    role: 'Motorista',
    lastMessage: 'Finalizei a corrida.',
    timestamp: '2d atrás',
    avatar: 'person',
    unreadCount: 0,
  },
];


export default function OperatorConversationsPage() {
    const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        // Mark messages as read
        setConversations(prev => 
        prev.map(c => 
            c.id === conversation.id ? { ...c, unreadCount: 0 } : c
        )
        );
    };

    const showList = !selectedConversation || isDesktop;
    const showChat = selectedConversation;

    return (
        <AppLayout title="Conversas" showAuthButtons>
            <div className="h-[calc(100vh-4rem)]">
                <Card className="h-full grid md:grid-cols-3 lg:grid-cols-4 shadow-none border-0 rounded-none overflow-hidden">
                    <div className={cn(
                        "md:col-span-1 lg:col-span-1 border-r h-full",
                        !showList && "hidden md:flex"
                    )}>
                        <ConversationList 
                            conversations={conversations} 
                            onSelectConversation={handleSelectConversation}
                            selectedConversationId={selectedConversation?.id}
                        />
                    </div>
                        <div className={cn(
                        "h-full",
                        isDesktop ? "md:col-span-2 lg:col-span-3" : "col-span-full",
                        !showChat && "hidden md:flex"
                    )}>
                        {selectedConversation ? (
                            <ChatWindow 
                                conversation={selectedConversation} 
                                onBack={() => setSelectedConversation(null)}
                            />
                        ) : (
                            <div className="hidden md:flex flex-col items-center justify-center h-full text-muted-foreground bg-background">
                                <MessageSquare className="h-16 w-16 mb-4" />
                                <p className="text-lg">Selecione uma conversa</p>
                                <p className="text-sm">Escolha um contato na lista para ver as mensagens.</p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </AppLayout>
    )
}
