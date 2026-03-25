import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JuryScreenProps {
  teamName: string;
  onStart: () => void;
  onBack: () => void;
}

export function JuryScreen({ teamName, onStart, onBack }: JuryScreenProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-6">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={onBack}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8">
        <div className="space-y-4">
          <Badge className="bg-primary text-primary-foreground text-2xl px-10 py-4 uppercase tracking-widest shadow-xl shadow-primary/30 font-black">
            Turno de {teamName}
          </Badge>
          <h2 className="text-4xl font-extrabold text-foreground">El jurado controla esta pantalla</h2>
          <p className="text-xl text-muted-foreground font-medium">Los actores no deben ver el contenido</p>
        </div>
        <Button
          onClick={onStart}
          className="py-10 px-16 text-3xl font-black bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl shadow-2xl shadow-primary/20"
        >
          ¡EMPEZAR!
        </Button>
      </div>
    </div>
  );
}
