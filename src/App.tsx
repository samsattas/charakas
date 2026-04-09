import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from '@/components/ui/sonner';
import { GameMode } from './types';
import { HomePage } from './pages/HomePage';
import { CharadasPage } from './pages/charadas/CharadasPage';
import { MimicasPage } from './pages/mimicas/MimicasPage';
import { EncadenadosPage } from './pages/encadenados/EncadenadosPage';

export default function App() {
  const [gameMode, setGameMode] = useState<GameMode>('HOME');

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <AnimatePresence mode="wait">
        {gameMode === 'HOME' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomePage onSelectMode={setGameMode} />
          </motion.div>
        )}
        {gameMode === 'CHARADAS' && (
          <motion.div key="charadas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CharadasPage onExit={() => setGameMode('HOME')} />
          </motion.div>
        )}
        {gameMode === 'MIMICAS' && (
          <motion.div key="mimicas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MimicasPage onExit={() => setGameMode('HOME')} />
          </motion.div>
        )}
        {gameMode === 'ENCADENADOS' && (
          <motion.div key="encadenados" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EncadenadosPage onExit={() => setGameMode('HOME')} />
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster position="top-center" />
    </div>
  );
}
