/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Word {
  palabra: string;
  categoria: string;
  dificultad: 'fácil' | 'medio' | 'difícil';
}

export const CHARADAS_WORDS: Word[] = [
  // Animales
  { palabra: "perro", categoria: "Animales", dificultad: "fácil" },
  { palabra: "gato", categoria: "Animales", dificultad: "fácil" },
  { palabra: "loro", categoria: "Animales", dificultad: "fácil" },
  { palabra: "iguana", categoria: "Animales", dificultad: "medio" },
  { palabra: "hormiga", categoria: "Animales", dificultad: "fácil" },
  { palabra: "vaca", categoria: "Animales", dificultad: "fácil" },
  { palabra: "caballo", categoria: "Animales", dificultad: "fácil" },
  { palabra: "delfín", categoria: "Animales", dificultad: "fácil" },
  { palabra: "tiburón", categoria: "Animales", dificultad: "fácil" },
  { palabra: "mariposa", categoria: "Animales", dificultad: "fácil" },
  { palabra: "rana", categoria: "Animales", dificultad: "fácil" },
  { palabra: "serpiente", categoria: "Animales", dificultad: "fácil" },
  { palabra: "pavo", categoria: "Animales", dificultad: "fácil" },
  { palabra: "conejo", categoria: "Animales", dificultad: "fácil" },
  { palabra: "ardilla", categoria: "Animales", dificultad: "medio" },
  // Comida colombiana
  { palabra: "arepas", categoria: "Comida colombiana", dificultad: "fácil" },
  { palabra: "bandeja paisa", categoria: "Comida colombiana", dificultad: "fácil" },
  { palabra: "sancocho", categoria: "Comida colombiana", dificultad: "fácil" },
  { palabra: "empanadas", categoria: "Comida colombiana", dificultad: "fácil" },
  { palabra: "buñuelos", categoria: "Comida colombiana", dificultad: "fácil" },
  { palabra: "natilla", categoria: "Comida colombiana", dificultad: "fácil" },
  { palabra: "chicharrón", categoria: "Comida colombiana", dificultad: "fácil" },
  { palabra: "aguapanela", categoria: "Comida colombiana", dificultad: "fácil" },
  { palabra: "mazamorra", categoria: "Comida colombiana", dificultad: "medio" },
  { palabra: "obleas", categoria: "Comida colombiana", dificultad: "fácil" },
  { palabra: "cholado", categoria: "Comida colombiana", dificultad: "medio" },
  { palabra: "pandebono", categoria: "Comida colombiana", dificultad: "fácil" },
  { palabra: "almojábana", categoria: "Comida colombiana", dificultad: "medio" },
  { palabra: "picada", categoria: "Comida colombiana", dificultad: "fácil" },
  { palabra: "lechona", categoria: "Comida colombiana", dificultad: "fácil" },
  // Lugares Colombia
  { palabra: "Cartagena", categoria: "Lugares Colombia", dificultad: "fácil" },
  { palabra: "Medellín", categoria: "Lugares Colombia", dificultad: "fácil" },
  { palabra: "el Eje Cafetero", categoria: "Lugares Colombia", dificultad: "medio" },
  { palabra: "las playas de Santa Marta", categoria: "Lugares Colombia", dificultad: "fácil" },
  { palabra: "el Amazonas", categoria: "Lugares Colombia", dificultad: "fácil" },
  { palabra: "el desierto de la Tatacoa", categoria: "Lugares Colombia", dificultad: "medio" },
  { palabra: "Monserrate", categoria: "Lugares Colombia", dificultad: "medio" },
  { palabra: "el río Magdalena", categoria: "Lugares Colombia", dificultad: "fácil" },
  { palabra: "Villa de Leyva", categoria: "Lugares Colombia", dificultad: "medio" },
  { palabra: "Caño Cristales", categoria: "Lugares Colombia", dificultad: "difícil" },
  // Deportes
  { palabra: "fútbol", categoria: "Deportes", dificultad: "fácil" },
  { palabra: "ciclismo", categoria: "Deportes", dificultad: "fácil" },
  { palabra: "natación", categoria: "Deportes", dificultad: "fácil" },
  { palabra: "patinaje", categoria: "Deportes", dificultad: "fácil" },
  { palabra: "tejo", categoria: "Deportes", dificultad: "medio" },
  { palabra: "rana (juego)", categoria: "Deportes", dificultad: "medio" },
  { palabra: "voleibol", categoria: "Deportes", dificultad: "fácil" },
  { palabra: "béisbol", categoria: "Deportes", dificultad: "fácil" },
  { palabra: "boxeo", categoria: "Deportes", dificultad: "fácil" },
  { palabra: "golf", categoria: "Deportes", dificultad: "fácil" },
  // Objetos cotidianos
  { palabra: "nevera", categoria: "Objetos cotidianos", dificultad: "fácil" },
  { palabra: "licuadora", categoria: "Objetos cotidianos", dificultad: "fácil" },
  { palabra: "control remoto", categoria: "Objetos cotidianos", dificultad: "fácil" },
  { palabra: "paraguas", categoria: "Objetos cotidianos", dificultad: "fácil" },
  { palabra: "mochila", categoria: "Objetos cotidianos", dificultad: "fácil" },
  { palabra: "billetera", categoria: "Objetos cotidianos", dificultad: "fácil" },
  { palabra: "bombillo", categoria: "Objetos cotidianos", dificultad: "fácil" },
  { palabra: "tijeras", categoria: "Objetos cotidianos", dificultad: "fácil" },
  { palabra: "llave", categoria: "Objetos cotidianos", dificultad: "fácil" },
  { palabra: "espejo", categoria: "Objetos cotidianos", dificultad: "fácil" },
  // Oficios
  { palabra: "médico", categoria: "Oficios", dificultad: "fácil" },
  { palabra: "maestro", categoria: "Oficios", dificultad: "fácil" },
  { palabra: "chef", categoria: "Oficios", dificultad: "fácil" },
  { palabra: "plomero", categoria: "Oficios", dificultad: "medio" },
  { palabra: "electricista", categoria: "Oficios", dificultad: "medio" },
  { palabra: "carpintero", categoria: "Oficios", dificultad: "medio" },
  { palabra: "enfermero", categoria: "Oficios", dificultad: "fácil" },
  { palabra: "abogado", categoria: "Oficios", dificultad: "fácil" },
  { palabra: "taxista", categoria: "Oficios", dificultad: "fácil" },
  { palabra: "cantante", categoria: "Oficios", dificultad: "fácil" },
  // Entretenimiento
  { palabra: "Netflix", categoria: "Entretenimiento", dificultad: "fácil" },
  { palabra: "reguetón", categoria: "Entretenimiento", dificultad: "fácil" },
  { palabra: "carnaval", categoria: "Entretenimiento", dificultad: "fácil" },
  { palabra: "novela", categoria: "Entretenimiento", dificultad: "fácil" },
  { palabra: "chirimía", categoria: "Entretenimiento", dificultad: "medio" },
  { palabra: "vallenato", categoria: "Entretenimiento", dificultad: "fácil" },
  { palabra: "salsa", categoria: "Entretenimiento", dificultad: "fácil" },
  { palabra: "marimonda", categoria: "Entretenimiento", dificultad: "medio" },
  { palabra: "diablito", categoria: "Entretenimiento", dificultad: "medio" },
  { palabra: "feria", categoria: "Entretenimiento", dificultad: "fácil" },
  // Naturaleza
  { palabra: "volcán", categoria: "Naturaleza", dificultad: "fácil" },
  { palabra: "río", categoria: "Naturaleza", dificultad: "fácil" },
  { palabra: "cascada", categoria: "Naturaleza", dificultad: "fácil" },
  { palabra: "selva", categoria: "Naturaleza", dificultad: "fácil" },
  { palabra: "páramo", categoria: "Naturaleza", dificultad: "medio" },
  { palabra: "palma", categoria: "Naturaleza", dificultad: "fácil" },
  { palabra: "orquídea", categoria: "Naturaleza", dificultad: "medio" },
  { palabra: "trueno", categoria: "Naturaleza", dificultad: "fácil" },
  { palabra: "arcoíris", categoria: "Naturaleza", dificultad: "fácil" },
  { palabra: "terremoto", categoria: "Naturaleza", dificultad: "fácil" },
  // Tecnología
  { palabra: "celular", categoria: "Tecnología", dificultad: "fácil" },
  { palabra: "computador", categoria: "Tecnología", dificultad: "fácil" },
  { palabra: "tablet", categoria: "Tecnología", dificultad: "fácil" },
  { palabra: "auriculares", categoria: "Tecnología", dificultad: "fácil" },
  { palabra: "wifi", categoria: "Tecnología", dificultad: "fácil" },
  { palabra: "cargador", categoria: "Tecnología", dificultad: "fácil" },
  { palabra: "cámara", categoria: "Tecnología", dificultad: "fácil" },
  { palabra: "televisor", categoria: "Tecnología", dificultad: "fácil" },
  { palabra: "drone", categoria: "Tecnología", dificultad: "medio" },
  { palabra: "robot", categoria: "Tecnología", dificultad: "fácil" },
];

export const MIMICAS_PALABRAS: string[] = [
  "profesora", "futbolista", "cocinero", "dentista", "superhéroe", "astronauta", "fantasma", "pirata", "bombero", "robot",
  "vaca", "gato", "mono", "pingüino", "elefante", "serpiente", "cangrejo", "murciélago", "loro", "rana",
  "teléfono", "avión", "bicicleta", "paraguas", "guitarra", "nevera", "televisor", "carro", "moto", "barco",
  "bailar", "correr", "nadar", "dormir", "llorar", "reír", "comer", "escribir", "cocinar", "saltar",
  "medellín", "bogotá", "cali", "cartagena", "caño cristales", "tamal", "arepa", "aguardiente", "cumbia", "vallenato",
  "marimba", "chiva", "sombrero vueltiao", "mochila wayuu", "café", "esmeralda", "cóndor", "orquídea", "palma de cera", "tejo"
];

export const MIMICAS_FRASES: string[] = [
  "Montando en bicicleta bajo la lluvia", "Comiendo una arepa caliente", "Sacando al perro a pasear", "Jugando fútbol en el barro",
  "Bailando en una fiesta", "Tomando tinto en la mañana", "Atrapado en el tráfico", "Buscando señal de wifi",
  "Viendo una película de terror", "Perdido en el supermercado", "Haciendo cola en el banco", "Durmiendo en el bus",
  "Tomando fotos para Instagram", "Aplaudiendo en un concierto", "Peleando con el control remoto", "Hablando por teléfono",
  "Cargando maletas pesadas", "Esperando el ascensor", "Cocinando sin receta", "Saltando charcos en la lluvia",
  "Persiguiendo un taxi", "Mandando mensajes rápido", "Jugando videojuegos", "Despertando con alarma", "Asustando a alguien en el baño",
  "Buscando las llaves perdidas", "Tratando de abrir un frasco", "Haciendo ejercicio cansado", "Cantando en la ducha", "Pintando una pared",
  "Pescando en el río", "Remando en un bote", "Escalando una montaña", "Volando una cometa", "Comiendo espaguetis",
  "Limpiando los vidrios", "Planchando una camisa", "Arreglando un zapato", "Buscando un mosquito", "Enhebrando una aguja"
];
