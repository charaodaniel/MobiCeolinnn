
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, Upload, RotateCw, ZoomIn, ZoomOut, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';

interface ImageEditorDialogProps {
  onImageSave: (image: string) => void;
  onDialogClose: () => void;
  isOpen: boolean;
}

type View = 'choice' | 'camera' | 'preview';

export function ImageEditorDialog({ onImageSave, onDialogClose, isOpen }: ImageEditorDialogProps) {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [view, setView] = useState<View>('choice');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const cleanupStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };
  
  const resetState = () => {
    cleanupStream();
    setView('choice');
    setImageSrc(null);
    setHasCameraPermission(null);
    setScale(1);
    setRotation(0);
  };

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  const getCameraPermission = async () => {
    cleanupStream();
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(newStream);
      setHasCameraPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setView('camera');
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      setStream(null);
      toast({
        variant: 'destructive',
        title: 'Acesso à câmera negado',
        description: 'Por favor, habilite a permissão da câmera nas configurações do seu navegador.',
      });
      setView('choice');
    }
  };
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageSrc(result);
        setView('preview');
      };
      reader.readAsDataURL(file);
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
        setImageSrc(dataUrl);
        setView('preview');
        cleanupStream();
      }
    }
  };

  const handleSavePhoto = () => {
    // Note: This prototype saves the un-edited image.
    // A production implementation would draw the transformed image onto a new canvas
    // to apply zoom and rotation before saving.
    if (imageSrc) {
      onImageSave(imageSrc);
      toast({ title: 'Foto Salva!', description: 'Sua foto de perfil foi atualizada.' });
      onDialogClose();
    }
  };

  const renderChoiceView = () => (
    <>
        <DialogHeader>
            <DialogTitle>Alterar Foto</DialogTitle>
            <DialogDescription>Escolha como você quer fornecer uma nova foto.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <Button variant="outline" onClick={getCameraPermission}>
                <Camera className="mr-2" />
                Tirar Foto
            </Button>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2" />
                Escolher Arquivo
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
        </div>
    </>
  );

  const renderCameraView = () => (
     <>
        <DialogHeader>
            <DialogTitle>Tirar Foto</DialogTitle>
            <DialogDescription>Centralize seu rosto no vídeo e capture a imagem.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
            <video ref={videoRef} className={cn("w-full aspect-video rounded-md bg-muted", { 'hidden': !hasCameraPermission })} autoPlay muted />
            <canvas ref={canvasRef} className="hidden" />
            {hasCameraPermission === false && (
            <Alert variant="destructive">
                <AlertTitle>Câmera não encontrada</AlertTitle>
                <AlertDescription>Não foi possível acessar a câmera. Você pode voltar e carregar um arquivo.</AlertDescription>
            </Alert>
            )}
        </div>
        <DialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button variant="secondary" onClick={resetState}>Voltar</Button>
            <Button onClick={handleCapture} disabled={!hasCameraPermission}>
                <Camera className="mr-2" />
                Capturar
            </Button>
        </DialogFooter>
     </>
  );

  const renderPreviewView = () => (
    <>
        <DialogHeader>
            <DialogTitle>Editar e Salvar Foto</DialogTitle>
            <DialogDescription>Ajuste sua foto antes de salvar.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
            <div className="w-full h-64 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                {imageSrc && (
                    <Image 
                        src={imageSrc} 
                        alt="Pré-visualização da imagem" 
                        width={256} 
                        height={256} 
                        className="object-contain h-full w-auto"
                        style={{
                            transform: `scale(${scale}) rotate(${rotation}deg)`,
                            transition: 'transform 0.2s ease-out'
                        }}
                    />
                )}
            </div>
            <div className="grid gap-4">
                <div className="space-y-2">
                    <Label htmlFor="zoom-slider">Zoom</Label>
                    <div className="flex items-center gap-2">
                        <ZoomOut />
                        <Slider
                            id="zoom-slider"
                            min={0.5}
                            max={3}
                            step={0.1}
                            value={[scale]}
                            onValueChange={(value) => setScale(value[0])}
                        />
                        <ZoomIn />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="rotation-slider">Girar</Label>
                    <div className="flex items-center gap-2">
                        <RotateCw className="transform -scale-x-100" />
                        <Slider
                            id="rotation-slider"
                            min={-180}
                            max={180}
                            step={5}
                            value={[rotation]}
                            onValueChange={(value) => setRotation(value[0])}
                        />
                        <RotateCw />
                    </div>
                </div>
            </div>
        </div>
        <DialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button variant="outline" onClick={resetState}>Descartar e Voltar</Button>
            <Button onClick={handleSavePhoto}>
                <Save className="mr-2" />
                Salvar Foto
            </Button>
        </DialogFooter>
    </>
  );

  return (
    <DialogContent className="max-w-md" onInteractOutside={onDialogClose} onEscapeKeyDown={onDialogClose}>
      {view === 'choice' && renderChoiceView()}
      {view === 'camera' && renderCameraView()}
      {view === 'preview' && renderPreviewView()}
    </DialogContent>
  );
}
