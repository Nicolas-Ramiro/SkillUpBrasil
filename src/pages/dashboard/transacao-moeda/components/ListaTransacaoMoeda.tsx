import { useEffect, useState } from "react";
import { type Transacao } from "../TransacaoMoedaPage";

interface ListaTransacaoProps {
  onNovo: () => void;
  onEditar: (transacao: Transacao) => void;
}

export default function ListaTransacao({ onNovo, onEditar }: ListaTransacaoProps) {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTransacoes() {
    try {
      const res = await fetch("https://skillupbrasil-api.onrender.com/transacao");
      const data = await res.json();
      setTransacoes(data || []);
    } catch (err) {
      console.error("Erro ao carregar transações:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransacoes();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir esta transação?")) return;
    await fetch(`https://skillupbrasil-api.onrender.com/transacao/${id}`, { method: "DELETE" });
    fetchTransacoes();
  }

  if (loading)
    return <p className="text-center text-neutral-300 mt-10">Carregando transações...</p>;

  return (
    <div>
      <button
        onClick={onNovo}
        className="bg-verde hover:bg-verde px-4 py-2 rounded-md mb-6 font-semibold transition"
      >
        Nova Transação
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-700 rounded-md">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Usuário</th>
              <th className="p-3 text-left">Tipo</th>
              <th className="p-3 text-left">Valor</th>
              <th className="p-3 text-left">Referência</th>
              <th className="p-3 text-left">Data</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((t) => (
              <tr
                key={t.idTransacao}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{t.idTransacao}</td>
                <td className="p-3">{t.idUsuario}</td>
                <td className="p-3 capitalize">{t.tipo}</td>
                <td className="p-3">R$ {Number(t.valor).toFixed(2)}</td>
                <td className="p-3">{t.referencia}</td>
                <td className="p-3">
                  {t.dataTransacao
                    ? new Date(t.dataTransacao).toLocaleString("pt-BR")
                    : "-"}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(t)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(t.idTransacao!)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {transacoes.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-4 text-neutral-400">
                  Nenhuma transação encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
