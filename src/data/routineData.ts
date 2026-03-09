export type MonthPlan = {
  month: number;
  title: string;
  series: number | string;
  reps: string;
  weight: string;
  rest: string;
  notes: string;
};

export const progressionPlan: Record<number, MonthPlan> = {
  1: { month: 1, title: "Adaptación y Técnica", series: 3, reps: "12", weight: "8 kg / mancuerna", rest: "90s", notes: "Acostumbrar tendones y articulaciones." },
  2: { month: 2, title: "Incremento de Carga", series: 3, reps: "8-10", weight: "9-10 kg / mancuerna", rest: "90s", notes: "Añadir lastres si es muy fácil." },
  3: { month: 3, title: "Hipertrofia y Volumen", series: 4, reps: "10-12", weight: "Máximo (10-11 kg)", rest: "90s", notes: "Progresión doble: mantener peso hasta lograr 4x12." },
  4: { month: 4, title: "Hipertrofia y Volumen", series: 4, reps: "10-12", weight: "Máximo (10-11 kg)", rest: "90s", notes: "Progresión doble: mantener peso hasta lograr 4x12." },
  5: { month: 5, title: "Intensidad por 'Tempo'", series: 4, reps: "8-10", weight: "Máximo", rest: "90s", notes: "Tempo 3-1-X-1 (3s bajar, 1s pausa, subir explosivo, 1s apretar)." },
  6: { month: 6, title: "Densidad (Superseries)", series: 4, reps: "12", weight: "Máximo", rest: "90s", notes: "Emparejar ejercicios sin descanso (ej. 1+2, 3+4). Descanso al final de la superserie." },
};

export type Exercise = {
  id: string;
  title: string;
  muscles: string;
  images: string[];
  description?: string;
};

export const rutinaA: Exercise[] = [
  { id: "A1", title: "Flexiones con barras (Push-ups)", muscles: "Pecho, hombros, tríceps", images: ["/Rutina_A_1.jpg"] },
  { id: "A2", title: "Sentadilla Búlgara con mancuernas", muscles: "Cuádriceps, glúteos", images: ["/Rutina_A_2.jpg"] },
  { id: "A3", title: "Remo con mancuerna a una mano", muscles: "Espalda, bíceps", images: ["/Rutina_A_3.jpg"] },
  { id: "A4", title: "Press Militar sentado en banco", muscles: "Hombros", images: ["/Rutina_A_4.jpg"] },
  { id: "A5", title: "Entrenador de muslos", muscles: "Adductores", images: ["/Rutina_A_5.jpg"] },
  { id: "A6", title: "Plancha abdominal (Plank)", muscles: "Core", images: ["/Rutina_A_6.jpg"] },
];

export const rutinaB: Exercise[] = [
  { id: "B1", title: "Press de banca plano con mancuernas", muscles: "Pecho, tríceps", images: ["/Rutina_B_1.jpg"] },
  { id: "B2", title: "Peso Muerto Rumano con mancuernas", muscles: "Isquiosurales, glúteos, espalda baja", images: ["/Rutina_B_2.jpg"] },
  { id: "B3", title: "Pullovers con una mancuerna", muscles: "Espalda (dorsales) y pecho", images: ["/Rutina_B_3.jpg"] },
  { id: "B4", title: "Aperturas con mancuernas", muscles: "Pecho superior", images: ["/Rutina_B_4.jpg"] },
  { id: "B5", title: "Curl de Bíceps alterno + Extensión de Tríceps tras nuca", muscles: "Brazos", images: ["/Rutina_B_5A.jpg", "/Rutina_B_5B.jpg"] },
  { id: "B6", title: "Elevación de piernas acostado", muscles: "Abdomen inferior", images: ["/Rutina_B_6.jpg"] },
];
