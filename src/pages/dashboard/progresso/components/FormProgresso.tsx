import { useEffect, useState } from "react";

type Progresso = {
  idProgresso?: number;
  idUsuario: number | string;
  idCurso: number | string;
  percentual: number | string;
  dataAtualizacao?: string;
};

interface FormProgressoProps {
  progresso?: Progresso | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormProgresso({ progresso, onCancel, onSuccess }: FormProgressoProps) {
  const [form, setForm] = useState<Progresso>({
    idUsuario: "",
    idCurso: "",
    percentual: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (progresso) setForm(progresso);
  }, [progresso]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = progresso ? "PUT" : "POST";
    const url = progresso
      ? `https://skillupbrasil-api.onrender.com/progresso/${progresso.idProgresso}`
      : "https://skillupbrasil-api.onrender.com/progresso";

    const body = {
      idUsuario: Number(form.idUsuario),
      idCurso: Number(form.idCurso),
      percentual: Number(form.percentual),
      dataAtualizacao: new Date().toISOString(),
    };

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {progresso ? "Editar Progresso" : "Novo Progresso"}
      </h2>

      <input
        name="idUsuario"
        placeholder="ID Usuário"
        type="number"
        value={form.idUsuario}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <input
        name="idCurso"
        placeholder="ID Curso"
        type="number"
        value={form.idCurso}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <input
        name="percentual"
        placeholder="Percentual (0 a 100)"
        type="number"
        min="0"
        max="100"
        step="0.1"
        value={form.percentual}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
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
