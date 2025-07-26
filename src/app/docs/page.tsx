'use client';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DocsPage() {
    return (
        <AppLayout title="Documentação">
            <div className="container mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl">Documentação do CEOLIN Mobilidade urbana</CardTitle>
                        <CardDescription>
                            Tudo o que você precisa saber para usar e integrar nossa plataforma.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-lg max-w-none">
                        <h2 className="font-headline">Visão Geral</h2>
                        <p>
                            Bem-vindo à documentação oficial do CEOLIN Mobilidade urbana. Este documento fornece um guia completo sobre as funcionalidades da plataforma, tanto para passageiros quanto para motoristas e administradores.
                        </p>

                        <h2 className="font-headline">Funcionalidades para Passageiros</h2>
                        <p>
                            Os passageiros podem solicitar corridas, visualizar motoristas disponíveis, negociar tarifas e gerenciar seu histórico de viagens. A autenticação é opcional, oferecendo flexibilidade.
                        </p>
                        <ul>
                            <li><strong>Solicitação de Corrida Flexível:</strong> Interface intuitiva para definir partida (manualmente ou via geolocalização) e destino (campo opcional).</li>
                            <li><strong>Tarifa Fixa (Urbano):</strong> Valor predefinido pelo motorista para corridas dentro da cidade.</li>
                            <li><strong>Negociação (Rural/Intermunicipal):</strong> Sistema de chat e propostas para combinar valores em corridas para o interior ou outras cidades.</li>
                        </ul>

                         <h2 className="font-headline">Funcionalidades para Motoristas</h2>
                        <p>
                           Após o login, motoristas têm acesso a um painel completo para gerenciar seu perfil, status, veículos, documentos e visualizar o histórico de ganhos.
                        </p>
                        <ul>
                            <li><strong>Painel de Controle Completo:</strong> Acesse todas as ferramentas em um único lugar.</li>
                            <li><strong>Status de Disponibilidade:</strong> Alterne entre "Online", "Offline", "Em Viagem (Urbano)" e "Em Viagem (Interior)".</li>
                            <li><strong>Iniciar Corrida Manualmente:</strong> Registre corridas para passageiros que não fizeram o pedido pelo app.</li>
                            <li><strong>Exportação de Relatórios:</strong> Gere relatórios detalhados em PDF e CSV do seu histórico de corridas.</li>
                            <li><strong>Gerenciamento de Perfil:</strong> Mantenha suas informações, fotos do veículo e documentos sempre atualizados.</li>
                        </ul>

                        <h2 className="font-headline">Funcionalidades para Administradores</h2>
                        <p>
                           Uma área restrita com ferramentas poderosas para gerenciar toda a operação da plataforma.
                        </p>
                        <ul>
                            <li><strong>Gerenciamento de Usuários:</strong> Adicione, remova, ative ou desative contas de passageiros, motoristas e outros administradores.</li>
                            <li><strong>Controle de Senhas:</strong> Defina e altere senhas para qualquer usuário do sistema.</li>
                            <li><strong>Relatórios Individuais:</strong> Exporte relatórios de corrida em PDF para cada motorista.</li>
                            <li><strong>Log de Status:</strong> Visualize o histórico detalhado de quando um motorista ficou online, offline ou em viagem.</li>
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
