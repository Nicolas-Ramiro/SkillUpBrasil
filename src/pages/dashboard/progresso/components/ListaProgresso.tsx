import { useEffect, useState } from "react";

type Progresso = {
  idProgresso?: number;
  idUsuario: number;
  idCurso: number;
  percentual: number;
  dataAtualizacao?: string;
};

interface ListaProgressoProps {
  onNovo: () => void;
  onEditar: (progresso: Progresso) => void;
}

export default function ListaProgresso({ onNovo, onEditar }: ListaProgressoProps) {
  const [progresso, setProgresso] = useState<Progresso[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProgresso() {
    try {
      const res = await fetch("https://skillupbrasil-api.onrender.com/progresso");
      const data = await res.json();
      setProgresso(data || []);
    } catch (err) {
      console.error("Erro ao carregar progresso:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProgresso();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este progresso?")) return;
    await fetch(`https://skillupbrasil-api.onrender.com/progresso/${id}`, { method: "DELETE" });
    fetchProgresso();
  }

  if (loading)
    return <p className="text-center text-neutral-300 mt-10">Carregando progresso...</p>;

  return (
    <div>
      <button
        onClick={onNovo}
        className="bg-verde hover:bg-verde px-4 py-2 rounded-md mb-6 font-semibold transition"
      >
        Novo Progresso
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-700 rounded-md">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3 text-left">ID Usuário</th>
              <th className="p-3 text-left">ID Curso</th>
              <th className="p-3 text-left">Percentual (%)</th>
              <th className="p-3 text-left">Data Atualização</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {progresso.map((p) => (
              <tr
                key={p.idProgresso}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{p.idUsuario}</td>
                <td className="p-3">{p.idCurso}</td>
                <td className="p-3">{p.percentual}%</td>
                <td className="p-3">
                  {p.dataAtualizacao
                    ? new Date(p.dataAtualizacao).toLocaleString("pt-BR")
                    : "-"}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(p)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.idProgresso!)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {progresso.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-neutral-400">
                  Nenhum progresso encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
