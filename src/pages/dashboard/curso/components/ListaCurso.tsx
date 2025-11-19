import { useEffect, useState } from "react";

type Curso = {
  idCurso?: number;
  titulo: string;
  descricao: string;
  categoria: string;
  nivel: string;
  qtdHoras: number;

};

interface ListaCursoProps {
  onNovo: () => void;
  onEditar: (curso: Curso) => void;
}

export default function ListaCurso({ onNovo, onEditar }: ListaCursoProps) {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCursos() {
    try {
      const res = await fetch("https://skillupbrasil-api.onrender.com/curso");
      const data = await res.json();
      setCursos(data || []);
    } catch (err) {
      console.error("Erro ao carregar cursos:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCursos();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este curso?")) return;
    await fetch(`https://skillupbrasil-api.onrender.com/curso/${id}`, { method: "DELETE" });
    fetchCursos();
  }

  if (loading)
    return <p className="text-center text-neutral-300 mt-10">Carregando cursos...</p>;

  return (
    <div>
      <button
        onClick={onNovo}
        className="bg-verde hover:bg-verde px-4 py-2 rounded-md mb-6 font-semibold transition"
      >
        Novo Curso
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-700 rounded-md">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Descrição</th>
              <th className="p-3 text-left">Categoria</th>
              <th className="p-3 text-left">Nível</th>
              <th className="p-3 text-left">Horas</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((c) => (
              <tr
                key={c.idCurso}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{c.titulo}</td>
                <td className="p-3">{c.descricao}</td>
                <td className="p-3">{c.categoria}</td>
                <td className="p-3 capitalize">{c.nivel}</td>
                <td className="p-3">{c.qtdHoras}h</td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(c)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.idCurso!)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {cursos.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-neutral-400">
                  Nenhum curso encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
