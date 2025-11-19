import { useEffect, useState } from "react";

type Mentoria = {
  idMentoria?: number;
  idMentor: number | string;
  idAprendiz: number | string;
  status: string;
  dataHorario: string;
};

interface FormMentoriaProps {
  mentoria?: Mentoria | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormMentoria({ mentoria, onCancel, onSuccess }: FormMentoriaProps) {
  const [form, setForm] = useState<Mentoria>({
    idMentor: "",
    idAprendiz: "",
    status: "agendada",
    dataHorario: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (mentoria) setForm(mentoria);
  }, [mentoria]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = mentoria ? "PUT" : "POST";
    const url = mentoria
      ? `https://skillupbrasil-api.onrender.com/mentoria/${mentoria.idMentoria}`
      : "https://skillupbrasil-api.onrender.com/mentoria";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        dataHorario: new Date(form.dataHorario).toISOString(),
      }),
    });

    onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {mentoria ? "Editar Mentoria" : "Nova Mentoria"}
      </h2>

      <input
        name="idMentor"
        type="number"
        placeholder="ID do Mentor"
        value={form.idMentor}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <input
        name="idAprendiz"
        type="number"
        placeholder="ID do Aprendiz"
        value={form.idAprendiz}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      >
        <option value="agendada">Agendada</option>
        <option value="em_andamento">Em andamento</option>
        <option value="concluida">Concluída</option>
        <option value="cancelada">Cancelada</option>
      </select>

      <input
        name="dataHorario"
        type="datetime-local"
        value={form.dataHorario}
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
