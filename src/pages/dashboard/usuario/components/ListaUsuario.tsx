import { useEffect, useState } from "react";
import { type Usuario } from "../UsuarioPage";

interface ListaUsuarioProps {
  onNovo: () => void;
  onEditar: (usuario: Usuario) => void;
}

export default function ListaUsuario({ onNovo, onEditar }: ListaUsuarioProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsuarios() {
    try {
      const res = await fetch("https://skillupbrasil-api.onrender.com/usuario");
      const data = await res.json();
      setUsuarios(data || []);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este usuário?")) return;
    await fetch(`https://skillupbrasil-api.onrender.com/usuario/${id}`, {
      method: "DELETE",
    });
    fetchUsuarios();
  }

  if (loading)
    return (
      <p className="text-center text-neutral-300 mt-10">
        Carregando usuários...
      </p>
    );

  return (
    <div>
      <button
        onClick={onNovo}
        className="bg-verde hover:bg-verde px-4 py-2 rounded-md mb-6 font-semibold transition"
      >
        Novo Usuário
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-700 rounded-md">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">E-mail</th>
              <th className="p-3 text-left">Tipo</th>
              <th className="p-3 text-left">Profissão</th>
              <th className="p-3 text-left">Área de Interesse</th>
              <th className="p-3 text-left">Saldo Escambo</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr
                key={u.idUsuario}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{u.nomeUsuario}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.tipo}</td>
                <td className="p-3">{u.profissao}</td>
                <td className="p-3">{u.areaInteresse}</td>
                <td className="p-3">{u.saldoEscambo.toFixed(2)}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(u)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(u.idUsuario!)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {usuarios.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-4 text-neutral-400"
                >
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
