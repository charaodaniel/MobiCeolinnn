'use client';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function TermsPage() {
    return (
        <AppLayout title="Termos de Uso">
            <div className="container mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl">Termos e Condições de Uso</CardTitle>
                        <CardDescription>
                            Última atualização: 26 de Julho de 2024
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-lg max-w-none">
                        <h2 className="font-headline">1. Aceitação dos Termos</h2>
                        <p>
                            Ao acessar e usar a plataforma CEOLIN Mobilidade urbana ("Serviço"), você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com estes termos, não deverá usar o Serviço.
                        </p>

                        <h2 className="font-headline">2. Descrição do Serviço</h2>
                        <p>
                            O CEOLIN Mobilidade urbana é uma plataforma de tecnologia que conecta usuários passageiros a motoristas parceiros para a solicitação de serviços de transporte. O serviço inclui a solicitação de corridas com tarifas fixas em áreas urbanas e um sistema de negociação para corridas em áreas rurais.
                        </p>

                        <h2 className="font-headline">3. Responsabilidades do Usuário</h2>
                        <p>
                            Você concorda em fornecer informações precisas e completas ao usar o Serviço. Você é responsável por todas as atividades que ocorrem em sua conta. O uso indevido da plataforma, incluindo solicitações falsas ou comportamento inadequado, poderá resultar na suspensão ou encerramento de sua conta.
                        </p>

                        <h2 className="font-headline">4. Pagamentos e Tarifas</h2>
                        <p>
                           As tarifas para corridas urbanas são fixas e definidas pelo motorista. Para corridas rurais, o valor final é determinado por meio de negociação entre o passageiro e o motorista. O pagamento é realizado diretamente ao motorista através dos meios combinados entre as partes.
                        </p>
                         <h2 className="font-headline">5. Limitação de Responsabilidade</h2>
                        <p>
                           O CEOLIN Mobilidade urbana atua como um intermediário e não se responsabiliza por quaisquer incidentes, acidentes, disputas ou danos que possam ocorrer durante ou como resultado do serviço de transporte. A relação contratual de transporte é estabelecida diretamente entre o passageiro e o motorista.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
