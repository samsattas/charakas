import Papa from 'papaparse';
import { Word } from '../data/words';

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const parseWordsCSV = (file: File): Promise<Word[]> =>
  new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const words = (results.data as Record<string, string>[])
          .map((row) => ({
            palabra: row.palabra,
            categoria: row.categoria,
            dificultad: (row.dificultad || 'medio') as Word['dificultad'],
          }))
          .filter((w) => w.palabra);
        if (words.length > 0) resolve(words);
        else reject(new Error('Formato inválido'));
      },
      error: reject,
    });
  });

export const downloadCSV = (data: object[], filename: string) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
