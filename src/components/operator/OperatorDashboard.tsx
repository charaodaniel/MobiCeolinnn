'use client';

import { useState } from 'react';
import { ConversationList } from './ConversationList';
import { ChatWindow } from './ChatWindow';
import { Card } from '@/components/ui/card';
import type { Conversation } from './ConversationList';
import { MessageSquare } from 'lucide-react';

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


export function OperatorDashboard() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    // Mark messages as read
    setConversations(prev => 
      prev.map(c => 
        c.id === conversation.id ? { ...c, unreadCount: 0 } : c
      )
    );
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 h-[calc(100vh-8rem)]">
      <Card className="h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 shadow-lg">
        <div className="md:col-span-1 lg:col-span-1 border-r h-full">
            <ConversationList 
                conversations={conversations} 
                onSelectConversation={handleSelectConversation}
                selectedConversationId={selectedConversation?.id}
            />
        </div>
        <div className="hidden md:flex md:col-span-2 lg:col-span-3 h-full flex-col">
            {selectedConversation ? (
                 <ChatWindow conversation={selectedConversation} />
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <MessageSquare className="h-16 w-16 mb-4" />
                    <p className="text-lg">Selecione uma conversa</p>
                    <p className="text-sm">Escolha um contato na lista ao lado para começar a conversar.</p>
                </div>
            )}
        </div>
      </Card>
    </div>
  );
}
