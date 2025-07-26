'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';

interface RideRatingDialogProps {
    ride: {
        id: string;
        driver: string;
    };
}

export function RideRatingDialog({ ride }: RideRatingDialogProps) {
    const { toast } = useToast();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleRating = (rate: number) => {
        setRating(rate);
    };

    const handleSubmit = () => {
        if (rating === 0) {
            toast({
                variant: 'destructive',
                title: 'Avaliação Incompleta',
                description: 'Por favor, selecione pelo menos uma estrela.',
            });
            return;
        }

        console.log({
            rideId: ride.id,
            rating,
            comment,
        });

        toast({
            title: 'Avaliação Enviada!',
            description: `Obrigado por avaliar a sua corrida com ${ride.driver}.`,
        });
        
        setIsOpen(false);
        // Reset state for next time
        setTimeout(() => {
            setRating(0);
            setComment('');
        }, 500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Star className="mr-1 h-3 w-3" /> Avaliar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Avalie sua corrida</DialogTitle>
                    <DialogDescription>
                        Sua opinião é importante para nós. Deixe uma avaliação para o motorista {ride.driver}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex justify-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={cn(
                                    'h-8 w-8 cursor-pointer transition-colors',
                                    star <= rating
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-muted-foreground hover:text-yellow-300'
                                )}
                                onClick={() => handleRating(star)}
                            />
                        ))}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="comment">Comentário (opcional)</Label>
                        <Textarea
                            id="comment"
                            placeholder="Descreva sua experiência..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSubmit}>Enviar Avaliação</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
