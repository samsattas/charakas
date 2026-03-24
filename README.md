# Charakas

App de juegos de fiesta para grupos, con temática colombiana. Sin instalación, corre directo en el navegador.

## Modos de juego

### Charadas
Juego individual por turnos. Un jugador describe una palabra sin decirla y los demás intentan adivinarla. Al final de cada turno se registran los aciertos y errores, y al terminar la ronda se muestra el podio con los puntajes.

- Configurable: número de rondas, tiempo por turno y dificultad de palabras
- Palabras en categorías: animales, comida colombiana, lugares de Colombia y más
- Soporte para importar palabras personalizadas desde CSV

### Mímicas
Juego por equipos. Un integrante actúa (sin hablar) una palabra o frase mientras su equipo adivina contra el reloj. El jurado (el equipo contrario) valida los aciertos.

- Dos tipos de contenido: palabras sueltas o frases
- Configurable: tiempo por turno y número de rondas
- Podio final por equipos

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui + Radix UI
- Framer Motion

## Desarrollo local

```bash
npm install
npm run dev
```

La app corre en `http://localhost:3000`.

## Deploy

El sitio se despliega automáticamente en GitHub Pages al hacer push a `main`.

URL: https://samsattas.github.io/charakas/
