import { useEffect, useState } from "react";

type Mentoria = {
  idMentoria?: number;
  idMentor: number;
  idAprendiz: number;
  status: string;
  dataHorario: string;
};

interface ListaMentoriaProps {
  onNovo: () => void;
  onEditar: (mentoria: Mentoria) => void;
}

export default function ListaMentoria({ onNovo, onEditar }: ListaMentoriaProps) {
  const [mentorias, setMentorias] = useState<Mentoria[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMentorias() {
    try {
      const res = await fetch("https://skillupbrasil-api.onrender.com/mentoria");
      const data = await res.json();
      setMentorias(data || []);
    } catch (err) {
      console.error("Erro ao carregar mentorias:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMentorias();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir esta mentoria?")) return;
    await fetch(`https://skillupbrasil-api.onrender.com/mentoria/${id}`, { method: "DELETE" });
    fetchMentorias();
  }

  if (loading)
    return <p className="text-center text-neutral-300 mt-10">Carregando mentorias...</p>;

  return (
    <div>
      <button
        onClick={onNovo}
        className="bg-verde hover:bg-verde px-4 py-2 rounded-md mb-6 font-semibold transition"
      >
        Nova Mentoria
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-700 rounded-md">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3 text-left">ID Mentor</th>
              <th className="p-3 text-left">ID Aprendiz</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Data e Horário</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {mentorias.map((m) => (
              <tr
                key={m.idMentoria}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{m.idMentor}</td>
                <td className="p-3">{m.idAprendiz}</td>
                <td className="p-3 capitalize">{m.status}</td>
                <td className="p-3">
                  {new Date(m.dataHorario).toLocaleString("pt-BR")}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(m)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(m.idMentoria!)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {mentorias.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-neutral-400">
                  Nenhuma mentoria encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
