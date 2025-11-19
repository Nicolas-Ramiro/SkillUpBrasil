import { useEffect, useState } from "react";
import { type Usuario } from "../UsuarioPage";

interface FormUsuarioProps {
  usuario?: Usuario | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormUsuario({ usuario, onCancel, onSuccess }: FormUsuarioProps) {
  const [form, setForm] = useState<Usuario>({
    nomeUsuario: "",
    email: "",
    tipo: "",
    profissao: "",
    areaInteresse: "",
    saldoEscambo: 0,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (usuario) setForm(usuario);
  }, [usuario]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = usuario ? "PUT" : "POST";
    const url = usuario
      ? `https://skillupbrasil-api.onrender.com/usuario/${usuario.idUsuario}`
      : "https://skillupbrasil-api.onrender.com/usuario";

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
        {usuario ? "Editar Usuário" : "Novo Usuário"}
      </h2>

      <input
        name="nomeUsuario"
        placeholder="Nome"
        value={form.nomeUsuario}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={form.email}
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
        <option value="mentor">Mentor</option>
        <option value="aluno">Aluno</option>
      </select>

      <input
        name="profissao"
        placeholder="Profissão"
        value={form.profissao}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <input
        name="areaInteresse"
        placeholder="Área de Interesse"
        value={form.areaInteresse}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <input
        type="number"
        step="0.01"
        name="saldoEscambo"
        placeholder="Saldo Escambo"
        value={form.saldoEscambo}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-verde focus:outline-none"
      />

      <div className="flex justify-between gap-3 mt-4">
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
