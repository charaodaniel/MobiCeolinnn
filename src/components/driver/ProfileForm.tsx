'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, KeyRound, DollarSign, Camera, Upload, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { cn } from '@/lib/utils';

function CameraCaptureDialog({ onImageSave, onDialogClose }: { onImageSave: (image: string) => void, onDialogClose: () => void }) {
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const getCameraPermission = async () => {
      if (stream) {
          stream.getTracks().forEach(track => track.stop());
      }
      setCapturedImage(null);

      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(newStream);
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        setStream(null);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    };

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUrl = canvas.toDataURL('image/png');
                setCapturedImage(dataUrl);
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                    setStream(null);
                }
            }
        }
    };

    const handleSavePhoto = () => {
        if (capturedImage) {
            onImageSave(capturedImage);
            toast({ title: 'Foto Salva!', description: 'A imagem foi salva com sucesso!' });
            onDialogClose();
        }
    }

    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    return (
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>Capturar Imagem</DialogTitle>
                <DialogDescription>
                    Tire uma foto para o documento.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                {capturedImage ? (
                    <div className="flex flex-col items-center gap-4">
                        <p className="font-semibold">Pré-visualização</p>
                        <Image src={capturedImage} alt="Foto Capturada" width={256} height={256} className="rounded-lg object-cover" />
                    </div>
                ) : (
                    <>
                        <video ref={videoRef} className={cn("w-full aspect-video rounded-md bg-muted", { 'hidden': !hasCameraPermission })} autoPlay muted />
                        <canvas ref={canvasRef} className="hidden" />
                    </>
                )}

                {hasCameraPermission === false && (
                    <Alert variant="destructive">
                        <AlertTitle>Câmera não encontrada</AlertTitle>
                        <AlertDescription>
                            Não foi possível acessar a câmera. Verifique as permissões do seu navegador e tente novamente.
                        </AlertDescription>
                    </Alert>
                )}

            </div>
            <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-2">
                {capturedImage ? (
                     <>
                        <Button variant="outline" onClick={() => setCapturedImage(null)}>Tirar Outra Foto</Button>
                        <Button onClick={handleSavePhoto}>Salvar Foto</Button>
                    </>
                ) : (
                     <>
                        {stream ? (
                            <Button onClick={handleCapture} className="w-full">
                                <Camera className="mr-2 h-4 w-4" />
                                Capturar Foto
                            </Button>
                        ) : (
                            <Button onClick={getCameraPermission} className="w-full">
                                <Camera className="mr-2 h-4 w-4" />
                                Abrir Câmera
                            </Button>
                        )}
                    </>
                )}
            </DialogFooter>
        </DialogContent>
    );
}

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
                <div className="flex w-full gap-2">
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
  const [status, setStatus] = useState('online');
  const [fareType, setFareType] = useState('fixed');
  const [avatarImage, setAvatarImage] = useState('https://placehold.co/128x128.png');
  const [isAvatarCameraOpen, setIsAvatarCameraOpen] = useState(false);
  const [cnhDocument, setCnhDocument] = useState<string | null>(null);
  const [crlvDocument, setCrlvDocument] = useState<string | null>(null);
  const [vehiclePhoto, setVehiclePhoto] = useState<string | null>(null);

  const handleSave = () => {
    toast({
      title: 'Sucesso!',
      description: 'Suas alterações foram salvas.',
    });
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    toast({
      title: 'Status Atualizado',
      description: `Seu status foi alterado para ${newStatus === 'online' ? 'Online' : newStatus === 'offline' ? 'Offline' : newStatus === 'urban-trip' ? 'Em Viagem (Urbano)' : 'Em Viagem (Interior)'}.`,
    });
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
                <Dialog open={isAvatarCameraOpen} onOpenChange={setIsAvatarCameraOpen}>
                  <DialogTrigger asChild>
                    <Avatar className="h-16 w-16 cursor-pointer">
                        <AvatarImage src={avatarImage} data-ai-hint="person portrait" />
                        <AvatarFallback>CM</AvatarFallback>
                    </Avatar>
                  </DialogTrigger>
                  <CameraCaptureDialog 
                    onImageSave={setAvatarImage} 
                    onDialogClose={() => setIsAvatarCameraOpen(false)}
                  />
                </Dialog>
                <div>
                    <CardTitle className="font-headline text-2xl">Carlos Motorista</CardTitle>
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span>4.9 (238 corridas)</span>
                    </div>
                </div>
            </div>
            <div className="space-y-1 w-40">
                <Label htmlFor="driver-status">Status</Label>
                <Select value={status} onValueChange={handleStatusChange}>
                    <SelectTrigger id="driver-status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                      <SelectItem value="urban-trip">Em Viagem (Urbano)</SelectItem>
                      <SelectItem value="rural-trip">Em Viagem (Interior)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
            <h3 className="font-headline text-lg">Informações Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" defaultValue="Carlos Motorista" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="carlos@email.com" readOnly />
                </div>
                 <div className="space-y-1 md:col-span-2">
                    <Label htmlFor="pix-key">Chave PIX</Label>
                    <div className="relative">
                         <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="pix-key" placeholder="Insira sua chave PIX (CPF, e-mail, etc.)" className="pl-10" />
                    </div>
                </div>
            </div>
        </div>
        <div className="space-y-4">
            <h3 className="font-headline text-lg">Documentos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        <div className="space-y-4">
            <h3 className="font-headline text-lg">Veículo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className='space-y-4'>
                    <div className="space-y-1">
                        <Label htmlFor="vehicle-model">Modelo do Veículo</Label>
                        <Input id="vehicle-model" defaultValue="Toyota Corolla" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="license-plate">Placa</Label>
                        <Input id="license-plate" defaultValue="BRA2E19" />
                    </div>
                </div>
                 <DocumentUploader
                  label="Foto do Veículo"
                  docId="vehicle-photo"
                  value={vehiclePhoto}
                  onFileChange={setVehiclePhoto}
                />
            </div>
        </div>
        <div className="space-y-4">
            <h3 className="font-headline text-lg">Configurações de Corrida</h3>
            <div className="space-y-1">
                 <Label>Tipo de Tarifa (Urbano)</Label>
                 <RadioGroup defaultValue="fixed" value={fareType} onValueChange={setFareType} className="flex items-center gap-4 pt-2">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                {fareType === 'fixed' ? (
                    <div className="space-y-1">
                        <Label htmlFor="fixed-rate">Tarifa Fixa (R$)</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input id="fixed-rate" type="number" placeholder="25.50" className="pl-10" />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <Label htmlFor="km-rate">Tarifa por KM (R$)</Label>
                        <div className="relative">
                             <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input id="km-rate" type="number" placeholder="3.50" className="pl-10" />
                        </div>
                    </div>
                )}
                 <div className="flex items-center space-x-2 pt-5">
                    <Switch id="negotiate-rural" />
                    <Label htmlFor="negotiate-rural">Aceitar negociação para interior</Label>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full md:w-auto ml-auto" onClick={handleSave}>Salvar Alterações</Button>
      </CardFooter>
    </Card>
  );
}
