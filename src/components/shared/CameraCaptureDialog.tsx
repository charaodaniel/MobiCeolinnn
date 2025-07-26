'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

interface CameraCaptureDialogProps {
  onImageSave: (image: string) => void;
  onDialogClose: () => void;
  isOpen: boolean;
}

export function CameraCaptureDialog({ onImageSave, onDialogClose, isOpen }: CameraCaptureDialogProps) {
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
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setCapturedImage(result);
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
  };

  const cleanup = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setCapturedImage(null);
    setHasCameraPermission(null);
  }

  useEffect(() => {
    if (isOpen) {
      getCameraPermission();
    } else {
      cleanup();
    }
    
    return () => {
        cleanup();
    }
  }, [isOpen]);

  return (
    <DialogContent className="max-w-md" onInteractOutside={onDialogClose} onEscapeKeyDown={onDialogClose}>
      <DialogHeader>
        <DialogTitle>Alterar Foto de Perfil</DialogTitle>
        <DialogDescription>
          Tire uma foto ou carregue uma imagem do seu dispositivo.
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
        
        {hasCameraPermission === false && !capturedImage && (
          <Alert variant="destructive">
            <AlertTitle>Câmera não encontrada</AlertTitle>
            <AlertDescription>
              Não foi possível acessar a câmera. Você pode carregar um arquivo.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <DialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {capturedImage ? (
          <>
            <Button variant="outline" onClick={() => { setCapturedImage(null); getCameraPermission(); }}>Tirar Outra Foto</Button>
            <Button onClick={handleSavePhoto}>Salvar Foto</Button>
          </>
        ) : (
          <>
            <Button asChild variant="secondary">
                <label htmlFor="upload-profile-pic" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    Carregar Arquivo
                </label>
            </Button>
            <input id="upload-profile-pic" type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
            <Button onClick={handleCapture} disabled={!stream}>
              <Camera className="mr-2 h-4 w-4" />
              Capturar Foto
            </Button>
          </>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
