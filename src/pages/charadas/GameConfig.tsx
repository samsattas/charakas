import { ChevronLeft, Clock, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GameConfigProps {
  turnTime: number;
  numRounds: number;
  onSetTurnTime: (t: number) => void;
  onSetNumRounds: (n: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function GameConfig({ turnTime, numRounds, onSetTurnTime, onSetNumRounds, onNext, onBack }: GameConfigProps) {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-10">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={onBack}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-3xl font-black text-primary tracking-tighter uppercase">Configuración</h2>
        <div className="w-10" />
      </div>

      <Card className="p-6 bg-card/30 border-2 border-primary/10 shadow-xl space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            <Label className="text-xl font-bold">Tiempo por turno</Label>
          </div>
          <Select value={turnTime.toString()} onValueChange={(v) => onSetTurnTime(parseInt(v))}>
            <SelectTrigger className="bg-card/50 h-14 text-xl font-bold border-2 focus:ring-primary">
              <SelectValue placeholder="Selecciona el tiempo" />
            </SelectTrigger>
            <SelectContent>
              {[30, 45, 60, 90, 120].map((t) => (
                <SelectItem key={t} value={t.toString()} className="text-lg py-3">{t} segundos</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground px-1">Cada jugador tendrá este tiempo para adivinar palabras.</p>
        </div>

        <div className="h-px bg-border/50" />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Layers className="w-6 h-6 text-indigo-500" />
              </div>
              <Label className="text-xl font-bold">Número de rondas</Label>
            </div>
            <Badge variant="secondary" className="text-xl px-8 py-3 font-black shadow-lg shadow-indigo-500/20 rounded-xl">
              {numRounds}
            </Badge>
          </div>
          <Slider
            value={[numRounds]}
            min={1} max={10} step={1}
            onValueChange={(v) => onSetNumRounds(Array.isArray(v) ? v[0] : v)}
            className="py-6"
          />
          <p className="text-sm text-muted-foreground px-1">El juego terminará después de completar todas las rondas.</p>
        </div>
      </Card>

      <Button
        onClick={onNext}
        className="w-full py-10 text-3xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        ¡Empezar!
      </Button>
    </div>
  );
}
