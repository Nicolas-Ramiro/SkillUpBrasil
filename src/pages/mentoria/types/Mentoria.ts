export interface Mentoria {
  idMentoria: number;
  idMentor: number;
  idAprendiz: number;
  status: "agendada" | "em_andamento" | "concluida" | "cancelada";
  dataHorario: string; // Timestamp ISO
}
