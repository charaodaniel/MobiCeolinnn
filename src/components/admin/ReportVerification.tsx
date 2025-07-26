
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportVerificationProps {
  generatedReports: Set<string>;
}

export function ReportVerification({ generatedReports }: ReportVerificationProps) {
  const [reportId, setReportId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const { toast } = useToast();

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportId) {
      toast({
        variant: 'destructive',
        title: 'Campo obrigatório',
        description: 'Por favor, insira um ID de relatório para verificar.',
      });
      return;
    }

    if (generatedReports.has(reportId.trim())) {
      setVerificationStatus('valid');
    } else {
      setVerificationStatus('invalid');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleVerification} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          placeholder="Insira o ID do relatório (ex: REL-NOME-123456789)"
          value={reportId}
          onChange={(e) => {
            setReportId(e.target.value);
            setVerificationStatus('idle');
          }}
          className="flex-grow"
        />
        <Button type="submit">
            <Search className="mr-2 h-4 w-4" />
            Verificar
        </Button>
      </form>

      {verificationStatus === 'valid' && (
        <Alert variant="default" className="bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200">
          <CheckCircle2 className="h-4 w-4 !text-green-600 dark:!text-green-400" />
          <AlertTitle className="text-green-900 dark:text-green-200">Relatório Válido</AlertTitle>
          <AlertDescription>
            O ID <strong>{reportId}</strong> é autêntico e foi gerado pelo sistema.
          </AlertDescription>
        </Alert>
      )}

      {verificationStatus === 'invalid' && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Relatório Inválido</AlertTitle>
          <AlertDescription>
            O ID <strong>{reportId}</strong> não foi encontrado em nossos registros. O relatório pode ser falso ou o ID pode estar incorreto.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
