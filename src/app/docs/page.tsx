'use client';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DocsPage() {
    return (
        <AppLayout title="Documentação">
            <div className="container mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl">Documentação do MobiCeolin</CardTitle>
                        <CardDescription>
                            Tudo o que você precisa saber para usar e integrar nossa plataforma.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-lg max-w-none">
                        <h2 className="font-headline">Visão Geral</h2>
                        <p>
                            Bem-vindo à documentação oficial do MobiCeolin. Este documento fornece um guia completo sobre as funcionalidades da plataforma, tanto para passageiros quanto para motoristas e administradores.
                        </p>

                        <h2 className="font-headline">Funcionalidades para Passageiros</h2>
                        <p>
                            Os passageiros podem solicitar corridas, visualizar motoristas disponíveis, negociar tarifas para áreas rurais e gerenciar seu histórico de viagens. A autenticação é opcional, oferecendo flexibilidade para quem deseja apenas uma corrida rápida.
                        </p>
                        <ul>
                            <li><strong>Solicitação de Corrida:</strong> Interface intuitiva para definir partida e destino.</li>
                            <li><strong>Tarifa Fixa (Urbano):</strong> Valor predefinido pelo motorista para corridas dentro da cidade.</li>
                            <li><strong>Negociação (Rural):</strong> Sistema de chat e propostas para combinar valores em corridas para o interior.</li>
                        </ul>

                         <h2 className="font-headline">Funcionalidades para Motoristas</h2>
                        <p>
                           Após o login, motoristas têm acesso a um painel completo para gerenciar seu perfil, status, veículos, documentos e visualizar o histórico de ganhos.
                        </p>
                        <ul>
                            <li><strong>Painel de Controle:</strong> Acesse todas as ferramentas em um único lugar.</li>
                            <li><strong>Status de Disponibilidade:</strong> Alterne entre "Online", "Offline" e "Em Viagem (Interior)".</li>
                            <li><strong>Gerenciamento de Perfil:</strong> Mantenha suas informações sempre atualizadas.</li>
                        </ul>
                         <h2 className="font-headline">Guia de Início Rápido</h2>
                        <p>
                            Para começar a usar a aplicação, clone o repositório, instale as dependências com <code>npm install</code> e inicie o servidor com <code>npm run dev</code>. A aplicação estará disponível em <code>http://localhost:9002</code>.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
