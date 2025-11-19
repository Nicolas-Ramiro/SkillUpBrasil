import { useEffect, useState } from "react";

type Curso = {
  idCurso?: number;
  titulo: string;
  descricao: string;
  categoria: string;
  nivel: string;
  qtdHoras: number;
};

interface FormCursoProps {
  curso?: Curso | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormCurso({ curso, onCancel, onSuccess }: FormCursoProps) {
  const [form, setForm] = useState<Curso>({
    titulo: "",
    descricao: "",
    categoria: "",
    nivel: "",
    qtdHoras: 0,
  });

  useEffect(() => {
    if (curso) setForm(curso);
  }, [curso]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "qtdHoras" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = curso ? "PUT" : "POST";
    const url = curso
      ? `https://skillupbrasil-api.onrender.com/curso/${curso.idCurso}`
      : "https://skillupbrasil-api.onrender.com/curso";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {curso ? "Editar Curso" : "Novo Curso"}
      </h2>

      <input
        name="titulo"
        placeholder="Título"
        value={form.titulo}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <textarea
        name="descricao"
        placeholder="Descrição"
        value={form.descricao}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <input
        name="categoria"
        placeholder="Categoria"
        value={form.categoria}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <select
        name="nivel"
        value={form.nivel}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      >
        <option value="">Selecione o nível</option>
        <option value="iniciante">Iniciante</option>
        <option value="intermediario">Intermediário</option>
        <option value="avancado">Avançado</option>
      </select>

      {/* NOVO CAMPO */}
      <input
        type="number"
        name="qtdHoras"
        placeholder="Quantidade de horas"
        value={form.qtdHoras}
        onChange={handleChange}
        required
        min={1}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white 
                   focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <div className="flex justify-between gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="w-1/2 bg-neutral-600 hover:bg-neutral-700 text-white py-2 rounded-md transition font-semibold"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="w-1/2 bg-verde hover:bg-verde text-white py-2 rounded-md transition font-semibold"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
