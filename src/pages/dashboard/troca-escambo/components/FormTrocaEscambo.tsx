import { useEffect, useState } from "react";

type TrocaEscambo = {
  idTroca?: number;
  idOfertante: number | string;
  idReceptor: number | string;
  habilidadeOfertada: string;
  habilidadeRecebida: string;
  valorEscambo: number | string;
};

interface FormTrocaProps {
  troca?: TrocaEscambo | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormTrocaEscambo({ troca, onCancel, onSuccess }: FormTrocaProps) {
  const [form, setForm] = useState<TrocaEscambo>({
    idOfertante: "",
    idReceptor: "",
    habilidadeOfertada: "",
    habilidadeRecebida: "",
    valorEscambo: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (troca) setForm(troca);
  }, [troca]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = troca ? "PUT" : "POST";
    const url = troca
      ? `https://skillupbrasil-api.onrender.com/troca/${troca.idTroca}`
      : "https://skillupbrasil-api.onrender.com/troca";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idOfertante: Number(form.idOfertante),
        idReceptor: Number(form.idReceptor),
        habilidadeOfertada: form.habilidadeOfertada,
        habilidadeRecebida: form.habilidadeRecebida,
        valorEscambo: Number(form.valorEscambo),
      }),
    });

    onSuccess();
  }

  const campos = [
    { name: "idOfertante", label: "ID Ofertante" },
    { name: "idReceptor", label: "ID Receptor" },
    { name: "habilidadeOfertada", label: "Habilidade Ofertada" },
    { name: "habilidadeRecebida", label: "Habilidade Recebida" },
    { name: "valorEscambo", label: "Valor do Escambo" },
  ] as const;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {troca ? "Editar Troca de Escambo" : "Nova Troca de Escambo"}
      </h2>

      {campos.map((campo) => (
        <input
          key={campo.name}
          name={campo.name}
          placeholder={campo.label}
          type={campo.name === "valorEscambo" ? "number" : "text"}
          step={campo.name === "valorEscambo" ? "0.01" : undefined}
          value={form[campo.name]?.toString() ?? ""}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
        />
      ))}

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
