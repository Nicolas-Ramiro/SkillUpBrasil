export interface Usuario {
  idUsuario: number;
  nomeUsuario: string;
  email: string;
  tipo: "mentor" | "aluno" | "ambos";
  profissao: string;
  areaInteresse?: string;
  saldoEscambo: number;
}
