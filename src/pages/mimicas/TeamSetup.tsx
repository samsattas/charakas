import { useState } from 'react';
import { ChevronLeft, Users, UserPlus, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Team } from '../../types';

interface TeamSetupProps {
  numRounds: number;
  onSetNumRounds: (n: number) => void;
  onNext: (teams: Team[]) => void;
  onBack: () => void;
}

export function TeamSetup({ numRounds, onSetNumRounds, onNext, onBack }: TeamSetupProps) {
  const [numTeams, setNumTeams] = useState(2);
  const [teamNames, setTeamNames] = useState(['Equipo 1', 'Equipo 2', 'Equipo 3', 'Equipo 4']);

  const handleNext = () => {
    const teams: Team[] = Array.from({ length: numTeams }, (_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: teamNames[i] || `Equipo ${i + 1}`,
      score: 0,
    }));
    onNext(teams);
  };

  const updateName = (i: number, value: string) => {
    const updated = [...teamNames];
    updated[i] = value;
    setTeamNames(updated);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-10">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={onBack}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-3xl font-black text-primary tracking-tighter uppercase">Equipos</h2>
        <div className="w-10" />
      </div>

      <Card className="p-6 bg-card/30 border-2 border-primary/10 shadow-xl space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 rounded-lg">
              <Users className="w-6 h-6 text-sky-500" />
            </div>
            <Label className="text-xl font-bold">¿Cuántos equipos juegan?</Label>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[2, 3, 4].map((n) => (
              <Button
                key={n}
                variant={numTeams === n ? 'default' : 'outline'}
                onClick={() => setNumTeams(n)}
                className={`h-20 text-2xl font-black transition-all ${numTeams === n ? 'scale-105 shadow-lg shadow-primary/20' : ''}`}
              >
                {n}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-px bg-border/50" />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <UserPlus className="w-6 h-6 text-amber-500" />
            </div>
            <Label className="text-xl font-bold">Nombres de los equipos</Label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: numTeams }).map((_, i) => (
              <Input
                key={i}
                placeholder={`Nombre Equipo ${i + 1}`}
                value={teamNames[i]}
                onChange={(e) => updateName(i, e.target.value)}
                className="bg-card/50 h-14 text-lg font-bold border-2 focus:border-primary"
              />
            ))}
          </div>
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
        </div>
      </Card>

      <Button
        onClick={handleNext}
        className="w-full py-10 text-3xl font-black uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Siguiente
      </Button>
    </div>
  );
}
