'use client';

import { useState } from 'react';
import { ConversationList } from './ConversationList';
import { ChatWindow } from './ChatWindow';
import { Card } from '@/components/ui/card';
import type { Conversation } from './ConversationList';
import { Car, MessageSquare, Map, List, Activity, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FleetMonitor } from './FleetMonitor';

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

const MetricCard = ({ title, value, icon: Icon }: { title: string, value: string | number, icon: React.ElementType }) => (
    <Card className="p-4">
        <div className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    </Card>
);

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
    <div className="p-4 md:p-6 lg:p-8 h-[calc(100vh-8rem)] flex flex-col gap-6">
        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Motoristas Online" value="2" icon={Car} />
            <MetricCard title="Corridas em Andamento" value="1" icon={Activity} />
            <MetricCard title="Conversas Ativas" value="5" icon={MessageSquare} />
            <MetricCard title="Alertas" value="0" icon={AlertTriangle} />
        </div>

        {/* Painel Principal */}
        <Card className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 shadow-lg overflow-hidden">
            <Tabs defaultValue="conversations" className="md:col-span-3 lg:col-span-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full">
                 <div className="md:col-span-1 lg:col-span-1 border-r h-full flex flex-col">
                    <TabsList className="grid grid-cols-2 w-full rounded-none h-auto p-0">
                        <TabsTrigger value="conversations" className="py-3 rounded-none">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Conversas
                        </TabsTrigger>
                        <TabsTrigger value="fleet" className="py-3 rounded-none">
                            <List className="mr-2 h-4 w-4" />
                            Frota
                        </TabsTrigger>
                    </TabsList>
                     <TabsContent value="conversations" className="mt-0 flex-1">
                        <ConversationList 
                            conversations={conversations} 
                            onSelectConversation={handleSelectConversation}
                            selectedConversationId={selectedConversation?.id}
                        />
                     </TabsContent>
                     <TabsContent value="fleet" className="mt-0 flex-1">
                        {/* Placeholder for Fleet List */}
                        <div className="p-4 text-center">
                            <h3 className="font-semibold">Status da Frota</h3>
                            <p className="text-sm text-muted-foreground">Em desenvolvimento...</p>
                        </div>
                     </TabsContent>
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
            </Tabs>
        </Card>
    </div>
  );
}
