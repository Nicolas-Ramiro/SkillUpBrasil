import { useEffect, useState } from "react";
import type { Mentoria } from "../types/Mentoria";

export default function MentoriaCard({ mentoria }: { mentoria: Mentoria }) {
  const [nomeMentor, setNomeMentor] = useState("Carregando...");
  const [nomeAprendiz, setNomeAprendiz] = useState("Carregando...");

  async function buscarNome(idUsuario: number): Promise<string> {
    try {
      const response = await fetch(
        `https://skillupbrasil-api.onrender.com/usuario/${idUsuario}`
      );

      if (!response.ok) return "Não encontrado";

      const data = await response.json();

      return data.nomeUsuario ?? "Sem nome";
    } catch {
      return "Erro ao carregar";
    }
  }

  useEffect(() => {
    buscarNome(mentoria.idMentor).then(setNomeMentor);
    buscarNome(mentoria.idAprendiz).then(setNomeAprendiz);
  }, [mentoria]);

  return (
    <div className="border border-neutral-700 rounded-2xl p-5 bg-neutral-900 text-white shadow-sm">
      <p>
        <strong>Mentor:</strong> {nomeMentor}
      </p>
      <p>
        <strong>Aprendiz:</strong> {nomeAprendiz}
      </p>
      <p>
        <strong>Status:</strong> {mentoria.status}</p>
      <p>
        <strong>Data/Horário:</strong>{" "}
        {new Date(mentoria.dataHorario).toLocaleString()}
      </p>
    </div>
  );
}
