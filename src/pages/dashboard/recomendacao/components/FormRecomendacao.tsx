import { useEffect, useState } from "react";

type Recomendacao = {
  idRecomendacao?: number;
  idUsuario: number | string;
  idCurso?: number | string;
  idMentor?: number | string;
  dataRecomendacao?: string;
};

interface FormRecomendacaoProps {
  recomendacao?: Recomendacao | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormRecomendacao({ recomendacao, onCancel, onSuccess }: FormRecomendacaoProps) {
  const [form, setForm] = useState<Recomendacao>({
    idUsuario: "",
    idCurso: "",
    idMentor: "",
    dataRecomendacao: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (recomendacao) setForm(recomendacao);
  }, [recomendacao]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = recomendacao ? "PUT" : "POST";
    const url = recomendacao
      ? `https://skillupbrasil-api.onrender.com/recomendacao/${recomendacao.idRecomendacao}`
      : "https://skillupbrasil-api.onrender.com/recomendacao";

    const body = {
      idUsuario: form.idUsuario,
      idCurso: form.idCurso || null,
      idMentor: form.idMentor || null,
      dataRecomendacao: form.dataRecomendacao
        ? new Date(form.dataRecomendacao).toISOString()
        : null,
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
        {recomendacao ? "Editar Recomendação" : "Nova Recomendação"}
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
        placeholder="ID Curso (opcional)"
        type="number"
        value={form.idCurso || ""}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <input
        name="idMentor"
        placeholder="ID Mentor (opcional)"
        type="number"
        value={form.idMentor || ""}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <input
        name="dataRecomendacao"
        type="datetime-local"
        value={form.dataRecomendacao || ""}
        onChange={handleChange}
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
