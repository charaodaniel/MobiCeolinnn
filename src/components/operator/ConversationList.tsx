'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Car, Search, Shield, User, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Conversation {
  id: string;
  name: string;
  role: 'Passageiro' | 'Motorista' | 'Administrador';
  lastMessage: string;
  timestamp: string;
  avatar: string;
  unreadCount: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: string;
}

const RoleIcon = ({ role }: { role: Conversation['role'] }) => {
    switch (role) {
        case 'Motorista': return <Car className="h-4 w-4 text-primary" />;
        case 'Administrador': return <Shield className="h-4 w-4 text-destructive" />;
        case 'Passageiro': return <User className="h-4 w-4 text-accent" />;
        default: return null;
    }
}

export function ConversationList({ conversations, onSelectConversation, selectedConversationId }: ConversationListProps) {

  if (conversations.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 h-full bg-card rounded-lg">
                <MessageSquare className="h-10 w-10 mb-4" />
                <p className="font-semibold">Nenhuma conversa encontrada</p>
          </div>
      )
  }

  return (
    <div className="flex flex-col h-full bg-muted/50">
        <div className="p-4 border-b">
             <h2 className="font-headline text-2xl">Conversas</h2>
             <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Pesquisar ou começar nova conversa" className="pl-10" />
             </div>
        </div>
        <ScrollArea className="flex-1">
            {conversations.map(convo => (
                 <button 
                    key={convo.id} 
                    className={cn(
                        "flex items-center gap-4 p-3 w-full text-left hover:bg-background transition-colors",
                        selectedConversationId === convo.id && 'bg-background'
                    )}
                    onClick={() => onSelectConversation(convo)}
                >
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={`https://placehold.co/48x48.png`} data-ai-hint={`${convo.avatar} face`} />
                        <AvatarFallback>{convo.name.slice(0,2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <RoleIcon role={convo.role} />
                                <p className="font-semibold truncate">{convo.name}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{convo.timestamp}</p>
                        </div>
                        <div className="flex justify-between items-start mt-1">
                            <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                            {convo.unreadCount > 0 && (
                                <Badge variant="default" className="flex-shrink-0">{convo.unreadCount}</Badge>
                            )}
                        </div>
                    </div>
                </button>
            ))}
        </ScrollArea>
    </div>
  );
}
