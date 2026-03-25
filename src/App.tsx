/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Users, 
  Play, 
  Settings, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  ChevronLeft,
  ChevronRight, 
  Timer as TimerIcon,
  RotateCcw,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Theater,
  Type,
  Quote,
  Clock,
  Layers,
  UserPlus
} from 'lucide-react';
import Papa from 'papaparse';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { CHARADAS_WORDS, MIMICAS_PALABRAS, MIMICAS_FRASES, Word } from './data/words';

// --- Types ---

type GameMode = 'HOME' | 'CHARADAS' | 'MIMICAS';

type CharadasScreen = 
  | 'PLAYER_SETUP' 
  | 'GAME_CONFIG' 
  | 'READY' 
  | 'ACTIVE_TURN' 
  | 'TURN_SUMMARY' 
  | 'FINAL_PODIUM';

type MimicasScreen = 
  | 'TEAM_SETUP' 
  | 'CONTENT_TYPE' 
  | 'JURY' 
  | 'ACTIVE_TURN' 
  | 'TURN_SUMMARY' 
  | 'FINAL_PODIUM';

interface Player {
  id: string;
  name: string;
  score: number;
}

interface Team {
  id: string;
  name: string;
  score: number;
}

// --- Main App Component ---

export default function App() {
  const [gameMode, setGameMode] = useState<GameMode>('HOME');
  
  // Charadas State
  const [charadasScreen, setCharadasScreen] = useState<CharadasScreen>('PLAYER_SETUP');
  const [players, setPlayers] = useState<Player[]>([]);
  const [charadasWords, setCharadasWords] = useState<Word[]>(CHARADAS_WORDS);
  const [turnTime, setTurnTime] = useState(60);
  const [numRounds, setNumRounds] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [turnPoints, setTurnPoints] = useState(0);
  const [turnGuessedWords, setTurnGuessedWords] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);

  // Mimicas State
  const [mimicasScreen, setMimicasScreen] = useState<MimicasScreen>('TEAM_SETUP');
  const [teams, setTeams] = useState<Team[]>([]);
  const [mimicasNumRounds, setMimicasNumRounds] = useState(3);
  const [mimicasCurrentRound, setMimicasCurrentRound] = useState(1);
  const [mimicasCurrentTeamIdx, setMimicasCurrentTeamIdx] = useState(0);
  const [mimicasContentType, setMimicasContentType] = useState<'PALABRAS' | 'FRASES'>('PALABRAS');
  const [mimicasWords, setMimicasWords] = useState<string[]>([]);
  const [mimicasCurrentWordIdx, setMimicasCurrentWordIdx] = useState(0);
  const [mimicasTurnPoints, setMimicasTurnPoints] = useState(0);

  // --- Shared Logic ---

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const resetGame = () => {
    setGameMode('HOME');
    // Reset Charadas
    setCharadasScreen('PLAYER_SETUP');
    setPlayers([]);
    setCurrentRound(1);
    setCurrentPlayerIdx(0);
    // Reset Mimicas
    setMimicasScreen('TEAM_SETUP');
    setTeams([]);
    setMimicasCurrentRound(1);
    setMimicasCurrentTeamIdx(0);
  };

  // --- Renderers ---

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-12">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-2"
      >
        <h1 className="text-6xl font-extrabold text-primary tracking-tighter">Charakas</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGameMode('MIMICAS')}
        >
          <Card className="cursor-pointer h-full border-4 border-amber-500 hover:bg-amber-500/10 transition-colors bg-card/50 backdrop-blur shadow-lg shadow-amber-500/20">
            <CardHeader className="text-center">
              <div className="mx-auto bg-amber-500/30 p-4 rounded-full w-fit mb-4">
                <Theater className="w-16 h-16 text-amber-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-amber-600">Mímicas</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Actúa sin hablar. ¡Haz que tu equipo adivine la palabra o frase!
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGameMode('CHARADAS')}
        >
          <Card className="cursor-pointer h-full border-4 border-indigo-500 hover:bg-indigo-500/10 transition-colors bg-card/50 backdrop-blur shadow-lg shadow-indigo-500/20">
            <CardHeader className="text-center">
              <div className="mx-auto bg-indigo-500/30 p-4 rounded-full w-fit mb-4">
                <MessageSquare className="w-16 h-16 text-indigo-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-indigo-600">Charadas</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Adivina la palabra que tienes en la frente con las pistas de tus amigos.
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <AnimatePresence mode="wait">
        {gameMode === 'HOME' && <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderHome()}</motion.div>}
        {gameMode === 'CHARADAS' && (
          <motion.div key="charadas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CharadasGame 
              screen={charadasScreen} 
              setScreen={setCharadasScreen} 
              players={players} 
              setPlayers={setPlayers}
              words={charadasWords}
              setWords={setCharadasWords}
              turnTime={turnTime}
              setTurnTime={setTurnTime}
              numRounds={numRounds}
              setNumRounds={setNumRounds}
              currentRound={currentRound}
              setCurrentRound={setCurrentRound}
              currentPlayerIdx={currentPlayerIdx}
              setCurrentPlayerIdx={setCurrentPlayerIdx}
              turnPoints={turnPoints}
              setTurnPoints={setTurnPoints}
              turnGuessedWords={turnGuessedWords}
              setTurnGuessedWords={setTurnGuessedWords}
              shuffledWords={shuffledWords}
              setShuffledWords={setShuffledWords}
              currentWordIdx={currentWordIdx}
              setCurrentWordIdx={setCurrentWordIdx}
              onExit={resetGame}
              shuffleArray={shuffleArray}
            />
          </motion.div>
        )}
        {gameMode === 'MIMICAS' && (
          <motion.div key="mimicas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MimicasGame 
              screen={mimicasScreen}
              setScreen={setMimicasScreen}
              teams={teams}
              setTeams={setTeams}
              numRounds={mimicasNumRounds}
              setNumRounds={setMimicasNumRounds}
              currentRound={mimicasCurrentRound}
              setCurrentRound={setMimicasCurrentRound}
              currentTeamIdx={mimicasCurrentTeamIdx}
              setCurrentTeamIdx={setMimicasCurrentTeamIdx}
              contentType={mimicasContentType}
              setContentType={setMimicasContentType}
              words={mimicasWords}
              setWords={setMimicasWords}
              currentWordIdx={mimicasCurrentWordIdx}
              setCurrentWordIdx={setMimicasCurrentWordIdx}
              turnPoints={mimicasTurnPoints}
              setTurnPoints={setMimicasTurnPoints}
              onExit={resetGame}
              shuffleArray={shuffleArray}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster position="top-center" />
    </div>
  );
}

// --- Charadas Game Components ---

function CharadasGame({ 
  screen, setScreen, players, setPlayers, words, setWords, 
  turnTime, setTurnTime, numRounds, setNumRounds, 
  currentRound, setCurrentRound, currentPlayerIdx, setCurrentPlayerIdx,
  turnPoints, setTurnPoints, turnGuessedWords, setTurnGuessedWords,
  shuffledWords, setShuffledWords, currentWordIdx, setCurrentWordIdx,
  onExit, shuffleArray
}: any) {
  
  const [newPlayerName, setNewPlayerName] = useState('');

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      setPlayers([...players, { id: Math.random().toString(36).substr(2, 9), name: newPlayerName.trim(), score: 0 }]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter((p: any) => p.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const newWords = results.data.map((row: any) => ({
            palabra: row.palabra,
            categoria: row.categoria,
            dificultad: row.dificultad || 'medio'
          })).filter((w: any) => w.palabra);
          
          if (newWords.length > 0) {
            setWords(newWords);
            toast.success(`${newWords.length} palabras cargadas con éxito`);
          } else {
            toast.error('El archivo CSV no tiene el formato correcto');
          }
        }
      });
    }
  };

  const downloadBaseCSV = () => {
    const csv = Papa.unparse(words);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'palabras_charadas.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startTurn = () => {
    setShuffledWords(shuffleArray(words));
    setCurrentWordIdx(0);
    setTurnPoints(0);
    setTurnGuessedWords([]);
    setScreen('ACTIVE_TURN');
  };

  const nextTurn = () => {
    if (currentPlayerIdx < players.length - 1) {
      setCurrentPlayerIdx(currentPlayerIdx + 1);
      setScreen('READY');
    } else if (currentRound < numRounds) {
      setCurrentRound(currentRound + 1);
      setCurrentPlayerIdx(0);
      setScreen('READY');
    } else {
      setScreen('FINAL_PODIUM');
    }
  };

  switch (screen) {
    case 'PLAYER_SETUP':
      return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={onExit}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-2xl font-bold text-primary">Jugadores</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => document.getElementById('csv-upload')?.click()}>
                  <Upload className="w-4 h-4 mr-2" /> Subir CSV
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={downloadBaseCSV}>
                  <Download className="w-4 h-4 mr-2" /> Descargar Base
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="csv-upload" />
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Nombre del jugador"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                className="bg-card/50 h-10"
              />
              <Button size="sm" onClick={addPlayer} className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 shrink-0">
                <Plus className="w-4 h-4 mr-1.5" /> Agregar
              </Button>
            </div>

            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {players.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between px-3 py-2 bg-card rounded-lg border border-muted">
                  <span className="text-sm font-medium">{p.name}</span>
                  <Button variant="ghost" size="icon" onClick={() => removePlayer(p.id)} className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button
            disabled={players.length < 2}
            onClick={() => setScreen('GAME_CONFIG')}
            className="w-full py-3 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            Siguiente <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      );

    case 'GAME_CONFIG':
      return (
        <div className="max-w-xl mx-auto p-6 space-y-10">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary" onClick={() => setScreen('PLAYER_SETUP')}>
              <ChevronLeft className="w-5 h-5 mr-1" /> Volver
            </Button>
            <h2 className="text-3xl font-black text-primary tracking-tighter uppercase">Configuración</h2>
            <div className="w-20" />
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 bg-card/30 border-2 border-primary/10 shadow-xl">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <Clock className="w-6 h-6 text-amber-500" />
                    </div>
                    <Label className="text-xl font-bold">Tiempo por turno</Label>
                  </div>
                  <Select value={turnTime.toString()} onValueChange={(v) => setTurnTime(parseInt(v))}>
                    <SelectTrigger className="bg-card/50 h-14 text-xl font-bold border-2 focus:ring-primary">
                      <SelectValue placeholder="Selecciona el tiempo" />
                    </SelectTrigger>
                    <SelectContent>
                      {[30, 45, 60, 90, 120].map(t => (
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
                    min={1} 
                    max={10} 
                    step={1} 
                    onValueChange={(v: any) => setNumRounds(Array.isArray(v) ? v[0] : v)}
                    className="py-6"
                  />
                  <p className="text-sm text-muted-foreground px-1">El juego terminará después de completar todas las rondas.</p>
                </div>
              </div>
            </Card>
          </div>

          <Button onClick={() => setScreen('READY')} className="w-full py-10 text-3xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
            ¡Empezar!
          </Button>
        </div>
      );

    case 'READY':
      return (
        <div className="flex flex-col min-h-screen">
          <div className="p-6">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary" onClick={() => setScreen('GAME_CONFIG')}>
              <ChevronLeft className="w-5 h-5 mr-1" /> Volver
            </Button>
          </div>
          <div 
            className="flex-1 flex flex-col items-center justify-center p-6 text-center cursor-pointer space-y-8"
            onClick={startTurn}
          >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="text-5xl font-extrabold text-primary">¿Listo, {players[currentPlayerIdx].name}?</h2>
            <p className="text-2xl text-muted-foreground">Toca la pantalla para comenzar</p>
          </motion.div>
          <div className="bg-primary/10 p-8 rounded-full animate-pulse">
            <Play className="w-24 h-24 text-primary fill-primary" />
          </div>
          </div>
        </div>
      );

    case 'ACTIVE_TURN':
      return (
        <ActiveTurnScreen 
          playerName={players[currentPlayerIdx].name}
          round={currentRound}
          totalRounds={numRounds}
          time={turnTime}
          words={shuffledWords}
          onBack={() => setScreen('READY')}
          onEnd={(points: number, guessed: string[]) => {
            setTurnPoints(points);
            setTurnGuessedWords(guessed);
            const newPlayers = [...players];
            newPlayers[currentPlayerIdx].score += points;
            setPlayers(newPlayers);
            setScreen('TURN_SUMMARY');
          }}
        />
      );

    case 'TURN_SUMMARY':
      return (
        <div className="max-w-2xl mx-auto p-6 space-y-8 text-center">
          <div className="flex justify-start">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary" onClick={() => setScreen('READY')}>
              <ChevronLeft className="w-5 h-5 mr-1" /> Volver
            </Button>
          </div>
          <h2 className="text-4xl font-bold text-primary">Resumen del Turno</h2>
          <div className="bg-card p-8 rounded-2xl border-2 border-primary/20 space-y-4">
            <p className="text-2xl font-bold">{players[currentPlayerIdx].name}</p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <p className="text-muted-foreground text-sm uppercase tracking-widest">Adivinadas</p>
                <p className="text-4xl font-black text-accent">{turnGuessedWords.length}</p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground text-sm uppercase tracking-widest">Puntos</p>
                <p className="text-4xl font-black text-primary">{turnPoints}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xl text-muted-foreground italic">
              Pasar el celular a <span className="text-foreground font-bold">{players[(currentPlayerIdx + 1) % players.length].name}</span>
            </p>
            <Button onClick={nextTurn} className="w-full py-8 text-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20">
              Continuar
            </Button>
          </div>
        </div>
      );

    case 'FINAL_PODIUM':
      return <Podium players={players} onRestart={onExit} />;

    default:
      return null;
  }
}

// --- Active Turn Component (Charadas) ---

function ActiveTurnScreen({ playerName, round, totalRounds, time, words, onBack, onEnd }: any) {
  const [timeLeft, setTimeLeft] = useState(time);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const timerRef = useRef<any>(null);
  const lastTapRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onEnd(points, guessed);
    }
  }, [timeLeft, points, guessed, onEnd]);

  const handleGuess = () => {
    setPoints(prev => prev + timeLeft);
    setGuessed(prev => [...prev, words[currentIdx].palabra]);
    setCurrentIdx(prev => prev + 1);
  };

  const handleSkip = () => {
    setCurrentIdx(prev => prev + 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Swipe horizontal (skip)
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      handleSkip();
      return;
    }

    // Tap: double-tap = guess
    if (Math.abs(dx) < 15 && Math.abs(dy) < 15) {
      const now = Date.now();
      if (now - lastTapRef.current < 350) {
        handleGuess();
        lastTapRef.current = 0;
      } else {
        lastTapRef.current = now;
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col p-6 overflow-hidden select-none">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={onBack}>
            <XCircle className="w-6 h-6" />
          </Button>
          <div className="space-y-1">
            <p className="text-xl font-bold text-primary">{playerName}</p>
            <Badge variant="outline" className="text-xs uppercase tracking-widest px-4 py-1.5 border-2">Ronda {round} de {totalRounds}</Badge>
          </div>
        </div>
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
            <circle 
              cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="4" 
              className="text-primary transition-all duration-1000"
              strokeDasharray={226}
              strokeDashoffset={226 - (226 * timeLeft) / time}
            />
          </svg>
          <span className="absolute text-2xl font-black">{timeLeft}</span>
        </div>
      </div>

      <div
        className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="space-y-4"
          >
            <Badge className="bg-indigo-500 text-white px-8 py-3 text-xl shadow-lg shadow-indigo-500/20 font-black uppercase tracking-widest">{words[currentIdx].categoria}</Badge>
            <h3
              className="font-black tracking-tighter uppercase px-4 leading-tight"
              style={{ fontSize: `clamp(1.5rem, ${120 / Math.max(words[currentIdx].palabra.length, 1)}vw, 4.5rem)` }}
            >
              {words[currentIdx].palabra}
            </h3>
            <Badge variant="outline" className="text-muted-foreground px-4 py-1.5 border-2 font-medium">{words[currentIdx].dificultad}</Badge>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={(e) => { e.stopPropagation(); handleSkip(); }} className="h-16 px-8 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-bold shadow-lg shadow-secondary/20">
            Pasar
          </Button>
          <Button size="lg" onClick={(e) => { e.stopPropagation(); handleGuess(); }} className="h-16 px-8 text-lg bg-primary text-primary-foreground font-bold">
            ¡Adivinó!
          </Button>
        </div>
        <p className="text-center text-muted-foreground text-sm animate-pulse">
          Toca 2 veces si adivinaron • Desliza para pasar
        </p>
      </div>
    </div>
  );
}

// --- Mimicas Game Components ---

function MimicasGame({ 
  screen, setScreen, teams, setTeams, numRounds, setNumRounds, 
  currentRound, setCurrentRound, currentTeamIdx, setCurrentTeamIdx,
  contentType, setContentType, words, setWords,
  currentWordIdx, setCurrentWordIdx, turnPoints, setTurnPoints,
  onExit, shuffleArray
}: any) {

  const [numTeams, setNumTeams] = useState(2);
  const [teamNames, setTeamNames] = useState<string[]>(['Equipo 1', 'Equipo 2', 'Equipo 3', 'Equipo 4']);

  const setupTeams = () => {
    const newTeams = Array.from({ length: numTeams }, (_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: teamNames[i] || `Equipo ${i + 1}`,
      score: 0
    }));
    setTeams(newTeams);
    setScreen('CONTENT_TYPE');
  };

  const startMimicasTurn = () => {
    const library = contentType === 'PALABRAS' ? MIMICAS_PALABRAS : MIMICAS_FRASES;
    setWords(shuffleArray(library));
    setCurrentWordIdx(0);
    setTurnPoints(0);
    setScreen('ACTIVE_TURN');
  };

  const nextMimicasTurn = () => {
    if (currentTeamIdx < teams.length - 1) {
      setCurrentTeamIdx(currentTeamIdx + 1);
      setScreen('JURY');
    } else if (currentRound < numRounds) {
      setCurrentRound(currentRound + 1);
      setCurrentTeamIdx(0);
      setScreen('JURY');
    } else {
      setScreen('FINAL_PODIUM');
    }
  };

  switch (screen) {
    case 'TEAM_SETUP':
      return (
        <div className="max-w-2xl mx-auto p-6 space-y-10">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary" onClick={onExit}>
              <ChevronLeft className="w-5 h-5 mr-1" /> Volver
            </Button>
            <h2 className="text-3xl font-black text-primary tracking-tighter uppercase">Equipos</h2>
            <div className="w-20" />
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-card/30 border-2 border-primary/10 shadow-xl space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-500/10 rounded-lg">
                    <Users className="w-6 h-6 text-sky-500" />
                  </div>
                  <Label className="text-xl font-bold">¿Cuántos equipos juegan?</Label>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[2, 3, 4].map(n => (
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
                      onChange={(e) => {
                        const newNames = [...teamNames];
                        newNames[i] = e.target.value;
                        setTeamNames(newNames);
                      }}
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
                  min={1} 
                  max={10} 
                  step={1} 
                  onValueChange={(v: any) => setNumRounds(Array.isArray(v) ? v[0] : v)}
                  className="py-6"
                />
              </div>
            </Card>
          </div>

          <Button onClick={setupTeams} className="w-full py-10 text-3xl font-black uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
            Siguiente <ChevronRight className="ml-2" />
          </Button>
        </div>
      );

    case 'CONTENT_TYPE':
      return (
        <div className="max-w-4xl mx-auto p-6 space-y-12">
          <div className="flex justify-start">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary" onClick={() => setScreen('TEAM_SETUP')}>
              <ChevronLeft className="w-5 h-5 mr-1" /> Volver
            </Button>
          </div>
          <h2 className="text-4xl font-bold text-primary text-center">¿Qué quieren actuar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setContentType('PALABRAS'); setScreen('JURY'); }}>
              <Card className="cursor-pointer h-full border-4 border-amber-500 hover:bg-amber-500/10 transition-colors bg-card/50 shadow-lg shadow-amber-500/20">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-amber-500/30 p-4 rounded-full w-fit mb-4"><Type className="w-16 h-16 text-amber-600" /></div>
                  <CardTitle className="text-3xl font-bold text-amber-600">Palabras</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground font-medium">Palabras sueltas para mímica rápida.</CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setContentType('FRASES'); setScreen('JURY'); }}>
              <Card className="cursor-pointer h-full border-4 border-amber-600 hover:bg-amber-600/10 transition-colors bg-card/50 shadow-lg shadow-amber-600/20">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-amber-600/30 p-4 rounded-full w-fit mb-4"><Quote className="w-16 h-16 text-amber-700" /></div>
                  <CardTitle className="text-3xl font-bold text-amber-700">Frases</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground font-medium">Frases cortas y situaciones divertidas.</CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      );

    case 'JURY':
      return (
        <div className="flex flex-col min-h-screen">
          <div className="p-6">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary" onClick={() => setScreen('CONTENT_TYPE')}>
              <ChevronLeft className="w-5 h-5 mr-1" /> Volver
            </Button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary text-primary-foreground text-2xl px-10 py-4 uppercase tracking-widest shadow-xl shadow-primary/30 font-black">Turno de {teams[currentTeamIdx].name}</Badge>
              <h2 className="text-4xl font-extrabold text-foreground">El jurado controla esta pantalla</h2>
              <p className="text-xl text-muted-foreground font-medium">Los actores no deben ver el contenido</p>
            </div>
            <Button onClick={startMimicasTurn} className="py-10 px-16 text-3xl font-black bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl shadow-2xl shadow-primary/20">
              ¡EMPEZAR!
            </Button>
          </div>
        </div>
      );

    case 'ACTIVE_TURN':
      return (
        <ActiveMimicaTurn 
          teamName={teams[currentTeamIdx].name}
          round={currentRound}
          words={words}
          onBack={() => setScreen('JURY')}
          onEnd={(points: number) => {
            setTurnPoints(points);
            const newTeams = [...teams];
            newTeams[currentTeamIdx].score += points;
            setTeams(newTeams);
            setScreen('TURN_SUMMARY');
          }}
        />
      );

    case 'TURN_SUMMARY':
      return (
        <div className="max-w-2xl mx-auto p-6 space-y-8 text-center">
          <div className="flex justify-start">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary" onClick={() => setScreen('JURY')}>
              <ChevronLeft className="w-5 h-5 mr-1" /> Volver
            </Button>
          </div>
          <h2 className="text-4xl font-bold text-primary">Resumen del Turno</h2>
          <div className="bg-card p-8 rounded-2xl border-2 border-primary/20 space-y-4 shadow-xl">
            <p className="text-2xl font-bold text-foreground">{teams[currentTeamIdx].name}</p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Puntos Turno</p>
                <p className="text-4xl font-black text-amber-500">+{turnPoints}</p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Total</p>
                <p className="text-4xl font-black text-primary">{teams[currentTeamIdx].score}</p>
              </div>
            </div>
          </div>
          <Button onClick={nextMimicasTurn} className="w-full py-8 text-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20">
            Siguiente Equipo
          </Button>
        </div>
      );

    case 'FINAL_PODIUM':
      return <Podium players={teams} onRestart={onExit} isTeams />;

    default:
      return null;
  }
}

// --- Active Mimica Turn Component ---

function ActiveMimicaTurn({ teamName, round, words, onBack, onEnd }: any) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [points, setPoints] = useState(0);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onEnd(points);
    }
  }, [timeLeft, points, onEnd]);

  const handleGuess = () => {
    setPoints(prev => prev + 1);
    setCurrentIdx(prev => prev + 1);
  };

  const handleSkip = () => {
    setPoints(prev => Math.max(0, prev - 1));
    setCurrentIdx(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col p-6 overflow-hidden">
      <div className="flex justify-between items-start bg-card/30 p-4 rounded-xl backdrop-blur">
        <div className="flex items-start gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={onBack}>
            <XCircle className="w-6 h-6" />
          </Button>
          <div className="space-y-1">
            <p className="text-xl font-bold text-amber-500">{teamName}</p>
            <div className="flex gap-4">
              <Badge variant="outline" className="px-4 py-1.5 border-2 font-bold">Ronda {round}</Badge>
              <Badge className="bg-primary px-5 py-2 font-black shadow-md shadow-primary/20">Puntos: {points}</Badge>
            </div>
          </div>
        </div>
        <div className="text-4xl font-black text-primary tabular-nums">{timeLeft}s</div>
      </div>

      <div className="flex-1 flex items-center justify-center text-center p-4">
        <AnimatePresence mode="wait">
          <motion.h3 
            key={currentIdx}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase"
          >
            {words[currentIdx]}
          </motion.h3>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-6 pb-8">
        <Button onClick={handleSkip} className="h-24 text-2xl font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/20">
          <XCircle className="mr-2 w-8 h-8" /> Pasar (-1)
        </Button>
        <Button onClick={handleGuess} className="h-24 text-2xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground">
          <CheckCircle2 className="mr-2 w-8 h-8" /> ¡Adivinó! (+1)
        </Button>
      </div>
    </div>
  );
}

// --- Podium Component ---

function Podium({ players, onRestart, isTeams }: any) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  // Order for podium display: 2nd, 1st, 3rd
  const podiumOrder = [
    top3[1] || null,
    top3[0] || null,
    top3[2] || null
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <div className="flex justify-start">
        <Button variant="ghost" className="text-muted-foreground hover:text-primary" onClick={onRestart}>
          <ChevronLeft className="w-5 h-5 mr-1" /> Inicio
        </Button>
      </div>
      <h2 className="text-5xl font-black text-center text-primary tracking-tighter">¡FIN DEL JUEGO!</h2>
      
      <div className="flex items-end justify-center gap-2 sm:gap-4 h-64 sm:h-80">
        {podiumOrder.map((p, i) => {
          if (!p) return <div key={i} className="flex-1" />;
          const height = i === 1 ? 'h-full' : i === 0 ? 'h-3/4' : 'h-1/2';
          const color = i === 1 ? 'bg-primary' : i === 0 ? 'bg-slate-400' : 'bg-amber-700';
          const medal = i === 1 ? '🥇' : i === 0 ? '🥈' : '🥉';
          
          return (
            <div key={p.id} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-2xl sm:text-4xl">{medal}</span>
              <div className={`w-full ${height} ${color} rounded-t-xl flex flex-col items-center justify-start p-2 sm:p-4 text-center shadow-xl podium-bar`}>
                <p className="font-bold text-xs sm:text-base truncate w-full">{p.name}</p>
                <p className="font-black text-lg sm:text-3xl">{p.score}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold border-b-2 border-muted pb-2">Tabla de Posiciones</h3>
        <div className="space-y-2">
          {sorted.map((p, i) => (
            <div key={p.id} className="flex items-center justify-between p-4 bg-card/50 rounded-xl border border-muted">
              <div className="flex items-center gap-4">
                <span className="font-black text-muted-foreground w-6">{i + 1}.</span>
                <span className="font-bold">{p.name}</span>
              </div>
              <span className="font-black text-primary">{p.score} pts</span>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={onRestart} className="w-full py-8 text-2xl font-black bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20">
        <RotateCcw className="mr-2" /> Jugar de nuevo
      </Button>
    </div>
  );
}
