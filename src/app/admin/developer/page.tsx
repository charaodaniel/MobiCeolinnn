
'use client';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Bell, BookOpen, Cpu, HardDrive, Server, ShieldCheck, Database, Save, TestTube2, Loader2, Link as LinkIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';

const apiEndpoints = [
    { name: '/api/auth/login', status: 'Operacional' },
    { name: '/api/users', status: 'Operacional' },
    { name: '/api/rides', status: 'Operacional' },
    { name: '/api/drivers', status: 'Operacional' },
    { name: '/api/negotiations', status: 'Operacional' },
];

const errorLogs = [
    { level: 'ERROR', timestamp: '2024-07-30 10:45:12', message: "db anônimo: autenticação de senha falhou para o usuário" },
    { level: 'WARN', timestamp: '2024-07-30 10:42:01', message: 'JWT secret is missing. Using default.' },
    { level: 'INFO', timestamp: '2024-07-30 09:10:00', message: 'API server started on port 3001.' },
];

export default function DeveloperPage() {
    const { toast } = useToast();
    const [apiUrl, setApiUrl] = useState('');
    const [isTesting, setIsTesting] = useState(false);
    const [testResult, setTestResult] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSaveAndTest = async () => {
        setIsTesting(true);
        setTestResult('idle');
        toast({
            title: 'Testando Conexão...',
            description: 'Aguarde enquanto tentamos nos conectar ao endpoint da API.'
        });

        if (!apiUrl) {
            toast({
                variant: 'destructive',
                title: 'Campo obrigatório',
                description: 'Por favor, insira a URL da API.',
            });
            setIsTesting(false);
            return;
        }

        try {
            // Assumimos que a URL base da API é o que o usuário insere
            const response = await fetch(apiUrl.replace('/api', '/'));
            
            if (!response.ok) {
                throw new Error(`O servidor respondeu com status ${response.status}`);
            }
            
            const text = await response.text();
            if (!text.includes('API está funcionando!')) {
                 throw new Error('A resposta da API não foi a esperada.');
            }

            setTestResult('success');
            toast({
                title: 'Conexão Bem-sucedida!',
                description: "O endpoint da API está acessível e respondendo corretamente.",
            });

        } catch (error: any) {
            setTestResult('error');
             toast({
                variant: 'destructive',
                title: 'Falha na Conexão',
                description: error.message || 'Não foi possível conectar. Verifique a URL e se a API está rodando.',
            });
        } finally {
            setIsTesting(false);
        }
    };

    return (
        <AppLayout title="Painel do Desenvolvedor">
            <div className="container mx-auto max-w-7xl p-4 md:p-6 lg:p-8 space-y-8">
                 {/* Configuração da API */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <Database />
                            Configuração da API (Backend)
                        </CardTitle>
                        <CardDescription>
                            Insira a URL base da sua API para testar a conexão do cliente.
                            Normalmente, isso é configurado via variáveis de ambiente (`.env.local`).
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="apiUrl">API URL</Label>
                            <Input id="apiUrl" placeholder="http://SEU_IP:3001/api" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
                        </div>
                        <div className="flex justify-end pt-2">
                            <Button onClick={handleSaveAndTest} disabled={isTesting}>
                                {isTesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <TestTube2 className="mr-2 h-4 w-4" />}
                                Testar Conexão
                            </Button>
                        </div>
                        {testResult !== 'idle' && (
                            <Alert variant={testResult === 'success' ? 'default' : 'destructive'} className={testResult === 'success' ? 'bg-green-50 border-green-200 text-green-800' : ''}>
                                <AlertTitle>{testResult === 'success' ? 'Sucesso!' : 'Falha'}</AlertTitle>
                                <p>{testResult === 'success' ? 'A conexão com o endpoint da API foi bem-sucedida.' : 'Não foi possível conectar ao endpoint da API.'}</p>
                            </Alert>
                        )}
                    </CardContent>
                </Card>

                {/* Métricas de Desempenho */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Métricas de Desempenho</CardTitle>
                        <CardDescription>Visão geral da saúde do servidor e da API.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Tempo de Resposta</CardTitle>
                                <Server className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">120ms</div>
                                <p className="text-xs text-muted-foreground">Média das últimas 24 horas</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Taxa de Erro</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1.2%</div>
                                <p className="text-xs text-muted-foreground">Investigar</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Uso de CPU</CardTitle>
                                <Cpu className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">25%</div>
                                <p className="text-xs text-muted-foreground">Pico de 40% às 18:00</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Uso de Memória</CardTitle>
                                <HardDrive className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1.2 GB</div>
                                <p className="text-xs text-muted-foreground">De 4 GB disponíveis</p>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Status da API */}
                    <Card className="lg:col-span-2">
                         <CardHeader>
                            <CardTitle className="font-headline">Status da API</CardTitle>
                             <CardDescription>Verificação em tempo real dos serviços.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Serviço/Endpoint</TableHead>
                                        <TableHead className="text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {apiEndpoints.map((endpoint) => (
                                        <TableRow key={endpoint.name}>
                                            <TableCell className="font-mono text-sm">{endpoint.name}</TableCell>
                                            <TableCell className="text-right">
                                                <Badge variant={endpoint.status === 'Operacional' ? 'secondary' : 'destructive'}>
                                                    <ShieldCheck className="mr-1 h-3 w-3" />
                                                    {endpoint.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    
                    {/* Alertas e Documentação */}
                    <div className="space-y-8">
                        <Card>
                             <CardHeader>
                                <CardTitle className="font-headline">Ações Rápidas</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer">
                                     <Button variant="outline" className="w-full">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Docs do Supabase
                                    </Button>
                                </a>
                                <a href="http://SEU_IP_DA_VPS:8000" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="w-full">
                                        <LinkIcon className="mr-2 h-4 w-4" />
                                        Abrir Painel Supabase
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Logs de Erros */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Logs de Erros Recentes</CardTitle>
                        <CardDescription>Visualize os erros mais recentes para facilitar a depuração.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-72 w-full rounded-md border">
                            <div className="p-4 font-mono text-xs">
                                {errorLogs.map((log, index) => (
                                    <div key={index} className="flex gap-4 items-start">
                                        <span className="text-muted-foreground">{log.timestamp}</span>
                                        <Badge variant={log.level === 'ERROR' ? 'destructive' : 'default'} className="h-5">{log.level}</Badge>
                                        <span>{log.message}</span>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
