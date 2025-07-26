
'use client';
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { MessageSquare } from "lucide-react";

const chats = [
  { id: '1', driverName: 'Carlos Motorista', lastMessage: 'Olá! Faço a corrida por R$ 150,00.', timestamp: '10:35', avatar: 'man' },
  { id: '2', driverName: 'Fernanda Lima', lastMessage: 'Estou a 5 minutos do local.', timestamp: 'Ontem', avatar: 'woman' },
  { id: '3', driverName: 'Roberto Freire', lastMessage: 'Viagem concluída. Obrigado!', timestamp: '22/07/24', avatar: 'person' },
];

export function ChatHistory() {
  if (chats.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 h-full">
                <MessageSquare className="h-10 w-10 mb-4" />
                <p className="font-semibold">Nenhuma conversa encontrada</p>
                <p className="text-sm">Seu histórico de conversas aparecerá aqui.</p>
          </div>
      )
  }
    
  return (
    <ScrollArea className="h-full w-full">
        <h3 className="font-headline text-lg font-semibold text-center p-4">Conversas</h3>
        <ul className="px-4">
            {chats.map((chat, index) => (
                <li key={chat.id}>
                    <button className="w-full text-left py-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={`https://placehold.co/48x48.png`} data-ai-hint={`${chat.avatar} face`} />
                                <AvatarFallback>{chat.driverName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{chat.driverName}</p>
                                    <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                            </div>
                        </div>
                    </button>
                    {index < chats.length - 1 && <Separator />}
                </li>
            ))}
        </ul>
    </ScrollArea>
  );
}

