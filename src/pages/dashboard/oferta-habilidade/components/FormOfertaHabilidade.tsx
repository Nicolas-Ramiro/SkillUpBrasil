import { useEffect, useState } from "react";

type OfertaHabilidade = {
  idOferta?: number;
  idUsuario: number | string;
  habilidade: string;
  tempoHoras: number | string;
  status: string;
};

interface FormOfertaProps {
  oferta?: OfertaHabilidade | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormOfertaHabilidade({ oferta, onCancel, onSuccess }: FormOfertaProps) {
  const [form, setForm] = useState<OfertaHabilidade>({
    idUsuario: "",
    habilidade: "",
    tempoHoras: "",
    status: "disponivel",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (oferta) setForm(oferta);
  }, [oferta]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = oferta ? "PUT" : "POST";
    const url = oferta
      ? `https://skillupbrasil-api.onrender.com/oferta/${oferta.idOferta}`
      : "https://skillupbrasil-api.onrender.com/oferta";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idUsuario: Number(form.idUsuario),
        habilidade: form.habilidade,
        tempoHoras: Number(form.tempoHoras),
        status: form.status,
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
        {oferta ? "Editar Oferta" : "Nova Oferta"}
      </h2>

      <input
        name="idUsuario"
        placeholder="ID do Usuário"
        type="number"
        value={form.idUsuario}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <input
        name="habilidade"
        placeholder="Descrição da Habilidade"
        value={form.habilidade}
        onChange={handleChange}
        required
        maxLength={100}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <input
        name="tempoHoras"
        placeholder="Tempo (horas)"
        type="number"
        min="0.5"
        step="0.1"
        value={form.tempoHoras}
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
        <option value="disponivel">Disponível</option>
        <option value="em_negociacao">Em Negociação</option>
        <option value="concluida">Concluída</option>
        <option value="cancelada">Cancelada</option>
      </select>

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
