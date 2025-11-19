import { useState } from "react";
import FormRecomendacao from "./components/FormRecomendacao";
import ListaRecomendacao from "./components/ListaRecomendacao";
import BotaoDashboard from "../../../components/BotaoDashboard";

type Recomendacao = {
  idRecomendacao?: number;
  idUsuario: number | string;
  idCurso?: number | string;
  idMentor?: number | string;
  dataRecomendacao?: string;
};

export default function RecomendacaoPage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [recomendacaoEdit, setRecomendacaoEdit] = useState<Recomendacao | null>(null);

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-verde">Recomendações</h1>

      {modo === "lista" ? (
        <ListaRecomendacao
          onNovo={() => setModo("form")}
          onEditar={(recomendacao) => {
            setRecomendacaoEdit(recomendacao);
            setModo("form");
          }}
        />
      ) : (
        <FormRecomendacao
          recomendacao={recomendacaoEdit}
          onCancel={() => {
            setRecomendacaoEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setRecomendacaoEdit(null);
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
