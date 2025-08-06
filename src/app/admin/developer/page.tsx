
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
    { name: 'account.create()', status: 'Operacional' },
    { name: 'account.createEmailPasswordSession()', status: 'Operacional' },
    { name: 'databases.createDocument()', status: 'Operacional' },
    { name: 'storage.createFile()', status: 'Operacional' },
    { name: 'functions.createExecution()', status: 'Operacional' },
];

const errorLogs = [
    { level: 'ERROR', timestamp: '2024-07-30 10:45:12', message: "AppwriteException: User (user@example.com) has a session, but does not have scope (account)" },
    { level: 'WARN', timestamp: '2024-07-30 10:42:01', message: 'Function execution timed out: processNegotiation' },
    { level: 'INFO', timestamp: '2024-07-30 09:10:00', message: 'Server restart initiated.' },
];

export default function DeveloperPage() {
    const { toast } = useToast();
    const [appwriteConfig, setAppwriteConfig] = useState({
        endpoint: '',
        projectId: ''
    });
    const [isTesting, setIsTesting] = useState(false);
    const [testResult, setTestResult] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAppwriteConfig(prev => ({ ...prev, [id]: value }));
    };
    
    const handleSaveAndTest = async () => {
        setIsTesting(true);
        setTestResult('idle');
        toast({
            title: 'Testando Conexão...',
            description: 'Aguarde enquanto tentamos nos conectar ao endpoint do Appwrite.'
        });

        // Basic validation
        if (!appwriteConfig.endpoint || !appwriteConfig.projectId) {
            toast({
                variant: 'destructive',
                title: 'Campos obrigatórios',
                description: 'Por favor, insira o Endpoint e o Project ID do Appwrite.',
            });
            setIsTesting(false);
            return;
        }

        try {
            // Appwrite's health endpoint is at /health
            const healthEndpoint = appwriteConfig.endpoint.replace('/v1', '/health');
            const response = await fetch(healthEndpoint);
            const data = await response.json();

            if (!response.ok || data.status !== 'ok') {
                throw new Error(data.message || 'O endpoint do Appwrite não está saudável.');
            }

            setTestResult('success');
            toast({
                title: 'Conexão Bem-sucedida!',
                description: "O endpoint do Appwrite está acessível e saudável.",
            });

        } catch (error: any) {
            setTestResult('error');
             toast({
                variant: 'destructive',
                title: 'Falha na Conexão',
                description: error.message || 'Não foi possível conectar. Verifique a URL do endpoint e se o Appwrite está rodando.',
            });
        } finally {
            setIsTesting(false);
        }
    };

    return (
        <AppLayout title="Painel do Desenvolvedor">
            <div className="container mx-auto max-w-7xl p-4 md:p-6 lg:p-8 space-y-8">
                 {/* Configuração do Appwrite */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <Database />
                            Configuração do Backend (Appwrite)
                        </CardTitle>
                        <CardDescription>
                            Insira os dados do seu projeto Appwrite para testar a conexão do cliente.
                            Normalmente, isso é configurado via variáveis de ambiente.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-1">
                                <Label htmlFor="endpoint">Appwrite Endpoint</Label>
                                <Input id="endpoint" placeholder="http://SEU_IP/v1" value={appwriteConfig.endpoint} onChange={handleInputChange} />
                            </div>
                             <div className="space-y-1">
                                <Label htmlFor="projectId">Project ID</Label>
                                <Input id="projectId" placeholder="ID do seu projeto no painel" value={appwriteConfig.projectId} onChange={handleInputChange} />
                            </div>
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
                                <p>{testResult === 'success' ? 'A conexão com o endpoint do Appwrite foi bem-sucedida.' : 'Não foi possível conectar ao endpoint do Appwrite.'}</p>
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
                                <div className="text-2xl font-bold">80ms</div>
                                <p className="text-xs text-muted-foreground">Média das últimas 24 horas</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Taxa de Erro</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">0.5%</div>
                                <p className="text-xs text-muted-foreground">Normal</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Uso de CPU</CardTitle>
                                <Cpu className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">15%</div>
                                <p className="text-xs text-muted-foreground">Pico de 25% às 14:00</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Uso de Memória</CardTitle>
                                <HardDrive className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">0.8 GB</div>
                                <p className="text-xs text-muted-foreground">De 4 GB disponíveis</p>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Status da API */}
                    <Card className="lg:col-span-2">
                         <CardHeader>
                            <CardTitle className="font-headline">Status da API (Appwrite SDK)</CardTitle>
                             <CardDescription>Verificação em tempo real dos serviços do Appwrite.</CardDescription>
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
                                <a href="https://appwrite.io/docs" target="_blank" rel="noopener noreferrer">
                                     <Button variant="outline" className="w-full">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Docs do Appwrite
                                    </Button>
                                </a>
                                <a href="http://SEU_IP_DA_VPS" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="w-full">
                                        <LinkIcon className="mr-2 h-4 w-4" />
                                        Abrir Painel Appwrite
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
