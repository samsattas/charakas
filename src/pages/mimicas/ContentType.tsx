import { motion } from 'motion/react';
import { ChevronLeft, Type, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentType as ContentTypeValue } from '../../types';

interface ContentTypeProps {
  onSelect: (type: ContentTypeValue) => void;
  onBack: () => void;
}

export function ContentType({ onSelect, onBack }: ContentTypeProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <div className="flex justify-start">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={onBack}>
          <ChevronLeft className="w-7 h-7" />
        </Button>
      </div>
      <h2 className="text-4xl font-bold text-primary text-center">¿Qué quieren actuar?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onSelect('PALABRAS')}>
          <Card className="cursor-pointer h-full border-4 border-amber-500 hover:bg-amber-500/10 transition-colors bg-card/50 shadow-lg shadow-amber-500/20">
            <CardHeader className="text-center">
              <div className="mx-auto bg-amber-500/30 p-4 rounded-full w-fit mb-4">
                <Type className="w-16 h-16 text-amber-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-amber-600">Palabras</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground font-medium">
              Palabras sueltas para mímica rápida.
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onSelect('FRASES')}>
          <Card className="cursor-pointer h-full border-4 border-amber-600 hover:bg-amber-600/10 transition-colors bg-card/50 shadow-lg shadow-amber-600/20">
            <CardHeader className="text-center">
              <div className="mx-auto bg-amber-600/30 p-4 rounded-full w-fit mb-4">
                <Quote className="w-16 h-16 text-amber-700" />
              </div>
              <CardTitle className="text-3xl font-bold text-amber-700">Frases</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground font-medium">
              Frases cortas y situaciones divertidas.
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
