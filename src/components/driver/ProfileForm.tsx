
'use client';
import { Button } from '@/components/ui/button';
import { KeyRound, Car, Settings, UserCircle, ChevronRight, Upload, Camera, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { CameraCaptureDialog } from '../shared/CameraCaptureDialog';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Switch } from '../ui/switch';
import Image from 'next/image';

const DocumentUploader = ({ label, docId, value, onFileChange }: { label: string, docId: string, value: string | null, onFileChange: (file: string | null) => void }) => {
    const { toast } = useToast();
    const [isCameraDialogOpen, setIsCameraDialogOpen] = useState(false);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onFileChange(e.target?.result as string);
                toast({ title: "Arquivo Carregado", description: `O arquivo para ${label} foi carregado.` });
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <div className="space-y-2">
            <Label htmlFor={docId}>{label}</Label>
            <div className="flex flex-col items-center gap-4 p-4 border rounded-lg">
                {value ? (
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="relative cursor-pointer group">
                                <Image src={value} alt={`Pré-visualização de ${label}`} width={128} height={96} className="rounded-lg object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                    <Eye className="h-8 w-8 text-white" />
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                             <DialogHeader>
                                <DialogTitle>{label}</DialogTitle>
                            </DialogHeader>
                            <div className="flex justify-center">
                                <Image src={value} alt={`Visualização de ${label}`} width={800} height={600} className="rounded-lg object-contain max-h-[80vh]" />
                            </div>
                        </DialogContent>
                    </Dialog>
                ) : (
                    <div className="h-24 w-32 bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-xs text-muted-foreground">Sem imagem</p>
                    </div>
                )}
                <div className="flex flex-col sm:flex-row w-full gap-2">
                    <Button variant="secondary" className="w-full" asChild>
                        <label htmlFor={`upload-${docId}`} className="cursor-pointer">
                            <Upload className="mr-2" />
                            Carregar
                        </label>
                    </Button>
                    <input id={`upload-${docId}`} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                    <Dialog open={isCameraDialogOpen} onOpenChange={setIsCameraDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Camera className="mr-2" />
                          Câmera
                        </Button>
                      </DialogTrigger>
                      <CameraCaptureDialog 
                        isOpen={isCameraDialogOpen}
                        onImageSave={(image) => onFileChange(image)}
                        onDialogClose={() => setIsCameraDialogOpen(false)}
                      />
                    </Dialog>
                </div>
            </div>
        </div>
    );
};


export function ProfileForm() {
  const { toast } = useToast();
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // States for Personal Info
  const [name, setName] = useState('Carlos Motorista');
  const [pixKey, setPixKey] = useState('');
  const [newPassword, setNewPassword] = useState({ password: '', confirmPassword: '' });

  // States for Vehicle & Docs
  const [vehicleModel, setVehicleModel] = useState('Toyota Corolla');
  const [licensePlate, setLicensePlate] = useState('BRA2E19');
  const [cnhDocument, setCnhDocument] = useState<string | null>(null);
  const [crlvDocument, setCrlvDocument] = useState<string | null>(null);
  const [vehiclePhoto, setVehiclePhoto] = useState<string | null>(null);
  
  // States for Settings
  const [fareType, setFareType] = useState('fixed');
  const [fixedRate, setFixedRate] = useState('');
  const [kmRate, setKmRate] = useState('');
  const [acceptsRural, setAcceptsRural] = useState(true);

  const handleSaveChanges = (section: string) => {
    toast({
      title: 'Sucesso!',
      description: `Suas alterações na seção de ${section} foram salvas.`,
    });
    setIsPersonalInfoOpen(false);
    setIsVehicleOpen(false);
    setIsSettingsOpen(false);
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.password || !newPassword.confirmPassword) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Preencha ambos os campos de senha.' });
        return;
    }
    if (newPassword.password !== newPassword.confirmPassword) {
        toast({ variant: 'destructive', title: 'Erro', description: 'As senhas não coincidem.' });
        return;
    }
    toast({ title: 'Senha Alterada!', description: 'Sua senha foi alterada com sucesso.' });
    setNewPassword({ password: '', confirmPassword: '' });
    // In a real app, you would close the password part of the dialog
  };

  return (
    <div className="bg-card rounded-lg">
      <ul>
        {/* Personal Info */}
        <Dialog open={isPersonalInfoOpen} onOpenChange={setIsPersonalInfoOpen}>
            <DialogTrigger asChild>
                 <li className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                        <UserCircle className="h-6 w-6 text-primary" />
                        <span className="font-medium">Informações Pessoais</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </li>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Informações Pessoais</DialogTitle>
                    <DialogDescription>
                        Gerencie seus dados pessoais e de pagamento.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-1">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input id="name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value="carlos@email.com" readOnly />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="pix-key">Chave PIX</Label>
                        <Input id="pix-key" value={pixKey} onChange={e => setPixKey(e.target.value)} placeholder="Insira sua chave PIX" />
                    </div>
                    <Separator />
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <h3 className="font-medium">Alterar Senha</h3>
                        <div className="space-y-1">
                            <Label htmlFor="new-password">Nova Senha</Label>
                            <Input id="new-password" type="password" value={newPassword.password} onChange={(e) => setNewPassword(prev => ({...prev, password: e.target.value}))} required />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="confirm-new-password">Confirmar Nova Senha</Label>
                            <Input id="confirm-new-password" type="password" value={newPassword.confirmPassword} onChange={(e) => setNewPassword(prev => ({...prev, confirmPassword: e.target.value}))} required />
                        </div>
                        <Button type="submit" variant="secondary" className="w-full">Confirmar Nova Senha</Button>
                    </form>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsPersonalInfoOpen(false)}>Cancelar</Button>
                    <Button onClick={() => handleSaveChanges('Informações Pessoais')}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Separator />
        
        {/* Vehicle and Documents */}
        <Dialog open={isVehicleOpen} onOpenChange={setIsVehicleOpen}>
            <DialogTrigger asChild>
                 <li className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                        <Car className="h-6 w-6 text-primary" />
                        <span className="font-medium">Veículo e Documentos</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </li>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                 <DialogHeader>
                    <DialogTitle>Veículo e Documentos</DialogTitle>
                    <DialogDescription>
                        Mantenha as informações e fotos do seu veículo e documentos atualizadas.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-1">
                        <Label htmlFor="vehicle-model">Modelo do Veículo</Label>
                        <Input id="vehicle-model" value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="license-plate">Placa</Label>
                        <Input id="license-plate" value={licensePlate} onChange={e => setLicensePlate(e.target.value)} />
                    </div>
                    <DocumentUploader
                        label="Foto do Veículo"
                        docId="vehicle-photo"
                        value={vehiclePhoto}
                        onFileChange={setVehiclePhoto}
                    />
                    <Separator />
                    <DocumentUploader
                        label="Carteira de Habilitação (CNH)"
                        docId="cnh-doc"
                        value={cnhDocument}
                        onFileChange={setCnhDocument}
                    />
                    <DocumentUploader
                        label="Documento do Veículo (CRLV)"
                        docId="crlv-doc"
                        value={crlvDocument}
                        onFileChange={setCrlvDocument}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsVehicleOpen(false)}>Cancelar</Button>
                    <Button onClick={() => handleSaveChanges('Veículo e Documentos')}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Separator />

        {/* Ride Settings */}
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
                <li className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                        <Settings className="h-6 w-6 text-primary" />
                        <span className="font-medium">Configurações de Corrida</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </li>
            </DialogTrigger>
            <DialogContent>
                 <DialogHeader>
                    <DialogTitle>Configurações de Corrida</DialogTitle>
                    <DialogDescription>
                        Defina suas preferências de tarifa para corridas urbanas.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Tipo de Tarifa (Urbano)</Label>
                        <RadioGroup value={fareType} onValueChange={setFareType} className="flex items-center gap-4 pt-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="fixed" id="r-fixed" />
                                <Label htmlFor="r-fixed">Valor Fixo</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="km" id="r-km" />
                                <Label htmlFor="r-km">Tarifa por KM</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {fareType === 'fixed' ? (
                        <div className="space-y-1">
                            <Label htmlFor="fixed-rate">Tarifa Fixa (R$)</Label>
                            <Input id="fixed-rate" type="number" value={fixedRate} onChange={e => setFixedRate(e.target.value)} placeholder="25,50" />
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <Label htmlFor="km-rate">Tarifa por KM (R$)</Label>
                            <Input id="km-rate" type="number" value={kmRate} onChange={e => setKmRate(e.target.value)} placeholder="3,50" />
                        </div>
                    )}
                    <Separator />
                     <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                            <Label htmlFor="negotiate-rural">Aceitar negociação para interior</Label>
                            <p className="text-xs text-muted-foreground">
                                Permite que passageiros negociem valores para fora da cidade.
                            </p>
                        </div>
                        <Switch id="negotiate-rural" checked={acceptsRural} onCheckedChange={setAcceptsRural} />
                    </div>
                </div>
                 <DialogFooter>
                    <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>Cancelar</Button>
                    <Button onClick={() => handleSaveChanges('Configurações')}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </ul>
    </div>
  );
}
