import { useEffect, useState } from "react";

type Recomendacao = {
  idRecomendacao?: number;
  idUsuario: number;
  idCurso?: number;
  idMentor?: number;
  dataRecomendacao?: string;
};

interface ListaRecomendacaoProps {
  onNovo: () => void;
  onEditar: (recomendacao: Recomendacao) => void;
}

export default function ListaRecomendacao({ onNovo, onEditar }: ListaRecomendacaoProps) {
  const [recomendacoes, setRecomendacoes] = useState<Recomendacao[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchRecomendacoes() {
    try {
      const res = await fetch("https://skillupbrasil-api.onrender.com/recomendacao");
      const data = await res.json();
      setRecomendacoes(data || []);
    } catch (err) {
      console.error("Erro ao carregar recomendações:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecomendacoes();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir esta recomendação?")) return;
    await fetch(`https://skillupbrasil-api.onrender.com/recomendacao/${id}`, { method: "DELETE" });
    fetchRecomendacoes();
  }

  if (loading)
    return <p className="text-center text-neutral-300 mt-10">Carregando recomendações...</p>;

  return (
    <div>
      <button
        onClick={onNovo}
        className="bg-verde hover:bg-verde px-4 py-2 rounded-md mb-6 font-semibold transition"
      >
        Nova Recomendação
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-700 rounded-md">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3 text-left">ID Usuário</th>
              <th className="p-3 text-left">ID Curso</th>
              <th className="p-3 text-left">ID Mentor</th>
              <th className="p-3 text-left">Data Recomendação</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {recomendacoes.map((r) => (
              <tr
                key={r.idRecomendacao}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{r.idUsuario}</td>
                <td className="p-3">{r.idCurso ?? "-"}</td>
                <td className="p-3">{r.idMentor ?? "-"}</td>
                <td className="p-3">
                  {r.dataRecomendacao
                    ? new Date(r.dataRecomendacao).toLocaleString("pt-BR")
                    : "-"}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(r)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(r.idRecomendacao!)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {recomendacoes.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-neutral-400">
                  Nenhuma recomendação encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
