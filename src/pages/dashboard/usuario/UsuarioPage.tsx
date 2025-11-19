import { useState } from "react";
import FormUsuario from "./components/FormUsuario";
import ListaUsuario from "./components/ListaUsuario";
import BotaoDashboard from "../../../components/BotaoDashboard";

export type Usuario = {
  idUsuario?: number;
  nomeUsuario: string;
  email: string;
  tipo: string;
  profissao: string;
  areaInteresse: string;
  saldoEscambo: number;
};

export default function UsuarioPage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [usuarioEdit, setUsuarioEdit] = useState<Usuario | null>(null);

  return (
    <div className="min-h-screen text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-verde">
        Usuários
      </h1>

      {modo === "lista" ? (
        <ListaUsuario
          onNovo={() => setModo("form")}
          onEditar={(usuario) => {
            setUsuarioEdit(usuario);
            setModo("form");
          }}
        />
      ) : (
        <FormUsuario
          usuario={usuarioEdit}
          onCancel={() => {
            setUsuarioEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setUsuarioEdit(null);
            setModo("lista");
          }}
        />
      )}

      <div className="flex justify-between items-center mb-6 mt-6">
        <BotaoDashboard />
      </div>
    </div>
  );
}
