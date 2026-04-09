import { motion } from 'motion/react';
import { Theater, MessageSquare, Link2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GameMode } from '../types';

interface HomePageProps {
  onSelectMode: (mode: GameMode) => void;
}

export function HomePage({ onSelectMode }: HomePageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-12">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-2"
      >
        <h1 className="text-6xl font-extrabold text-primary tracking-tighter">Charakas</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectMode('MIMICAS')}
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
          onClick={() => onSelectMode('CHARADAS')}
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
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectMode('ENCADENADOS')}
        >
          <Card className="cursor-pointer h-full border-4 border-emerald-500 hover:bg-emerald-500/10 transition-colors bg-card/50 backdrop-blur shadow-lg shadow-emerald-500/20">
            <CardHeader className="text-center">
              <div className="mx-auto bg-emerald-500/30 p-4 rounded-full w-fit mb-4">
                <Link2 className="w-16 h-16 text-emerald-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-emerald-600">Encadenados</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Adivina las palabras secretas de los demás y encadénalos a tu grupo.
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
