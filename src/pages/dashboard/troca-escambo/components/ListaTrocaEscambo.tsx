import { useEffect, useState } from "react";

type TrocaEscambo = {
  idTroca?: number;
  idOfertante: number;
  idReceptor: number;
  habilidadeOfertada: string;
  habilidadeRecebida: string;
  valorEscambo: number;
  dataTroca?: string;
};

interface ListaTrocaProps {
  onNovo: () => void;
  onEditar: (troca: TrocaEscambo) => void;
}

export default function ListaTrocaEscambo({ onNovo, onEditar }: ListaTrocaProps) {
  const [trocas, setTrocas] = useState<TrocaEscambo[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTrocas() {
    try {
      const res = await fetch("https://skillupbrasil-api.onrender.com/troca");
      const data = await res.json();
      setTrocas(data || []);
    } catch (err) {
      console.error("Erro ao carregar trocas de escambo:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTrocas();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir esta troca?")) return;
    await fetch(`https://skillupbrasil-api.onrender.com/troca/${id}`, { method: "DELETE" });
    fetchTrocas();
  }

  if (loading)
    return <p className="text-center text-neutral-300 mt-10">Carregando trocas...</p>;

  return (
    <div>
      <button
        onClick={onNovo}
        className="bg-verde hover:bg-verde px-4 py-2 rounded-md mb-6 font-semibold transition"
      >
        Nova Troca
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-700 rounded-md">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3 text-left">Ofertante</th>
              <th className="p-3 text-left">Receptor</th>
              <th className="p-3 text-left">Habilidade Ofertada</th>
              <th className="p-3 text-left">Habilidade Recebida</th>
              <th className="p-3 text-left">Valor</th>
              <th className="p-3 text-left">Data</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {trocas.map((t) => (
              <tr
                key={t.idTroca}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{t.idOfertante}</td>
                <td className="p-3">{t.idReceptor}</td>
                <td className="p-3">{t.habilidadeOfertada}</td>
                <td className="p-3">{t.habilidadeRecebida}</td>
                <td className="p-3">{t.valorEscambo}</td>
                <td className="p-3">
                  {t.dataTroca ? new Date(t.dataTroca).toLocaleString() : "-"}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(t)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(t.idTroca!)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {trocas.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-4 text-neutral-400">
                  Nenhuma troca registrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
