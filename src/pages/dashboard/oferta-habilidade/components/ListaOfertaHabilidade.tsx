import { useEffect, useState } from "react";

type OfertaHabilidade = {
  idOferta?: number;
  idUsuario: number;
  habilidade: string;
  tempoHoras: number;
  status: string;
};

interface ListaOfertaProps {
  onNovo: () => void;
  onEditar: (oferta: OfertaHabilidade) => void;
}

export default function ListaOfertaHabilidade({ onNovo, onEditar }: ListaOfertaProps) {
  const [ofertas, setOfertas] = useState<OfertaHabilidade[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchOfertas() {
    try {
      const res = await fetch("https://skillupbrasil-api.onrender.com/oferta");
      const data = await res.json();
      setOfertas(data || []);
    } catch (err) {
      console.error("Erro ao carregar ofertas:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOfertas();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir esta oferta?")) return;
    await fetch(`https://skillupbrasil-api.onrender.com/oferta/${id}`, { method: "DELETE" });
    fetchOfertas();
  }

  if (loading)
    return <p className="text-center text-neutral-300 mt-10">Carregando ofertas...</p>;

  return (
    <div>
      <button
        onClick={onNovo}
        className="bg-verde hover:bg-verde px-4 py-2 rounded-md mb-6 font-semibold transition"
      >
        Nova Oferta
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-700 rounded-md">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3 text-left">ID Usuário</th>
              <th className="p-3 text-left">Habilidade</th>
              <th className="p-3 text-left">Tempo (horas)</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {ofertas.map((o) => (
              <tr
                key={o.idOferta}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{o.idUsuario}</td>
                <td className="p-3">{o.habilidade}</td>
                <td className="p-3">{o.tempoHoras}</td>
                <td className="p-3 capitalize">{o.status}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(o)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(o.idOferta!)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {ofertas.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-neutral-400">
                  Nenhuma oferta encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
