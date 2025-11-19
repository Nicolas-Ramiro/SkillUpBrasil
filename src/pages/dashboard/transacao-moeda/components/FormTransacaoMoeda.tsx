import { useEffect, useState } from "react";
import { type Transacao } from "../TransacaoMoedaPage";

interface FormTransacaoProps {
  transacao?: Transacao | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormTransacao({ transacao, onCancel, onSuccess }: FormTransacaoProps) {
  const [form, setForm] = useState<Transacao>({
    idUsuario: "",
    tipo: "",
    valor: "",
    referencia: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (transacao) setForm(transacao);
  }, [transacao]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = transacao ? "PUT" : "POST";
    const url = transacao
      ? `https://skillupbrasil-api.onrender.com/transacao/${transacao.idTransacao}`
      : "https://skillupbrasil-api.onrender.com/transacao";

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
        {transacao ? "Editar Transação" : "Nova Transação"}
      </h2>

      <input
        name="idUsuario"
        placeholder="ID do Usuário"
        value={form.idUsuario.toString()}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <select
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      >
        <option value="">Selecione o tipo</option>
        <option value="credito">Crédito</option>
        <option value="debito">Débito</option>
      </select>

      <input
        name="valor"
        placeholder="Valor"
        type="number"
        value={form.valor.toString()}
        onChange={handleChange}
        required
        min="0.01"
        step="0.01"
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <input
        name="referencia"
        placeholder="Referência"
        value={form.referencia}
        onChange={handleChange}
        maxLength={50}
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
