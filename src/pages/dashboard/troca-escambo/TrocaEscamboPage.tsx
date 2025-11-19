import { useState } from "react";
import FormTrocaEscambo from "./components/FormTrocaEscambo";
import ListaTrocaEscambo from "./components/ListaTrocaEscambo";
import BotaoDashboard from "../../../components/BotaoDashboard";

type TrocaEscambo = {
  idTroca?: number;
  idOfertante: number | string;
  idReceptor: number | string;
  habilidadeOfertada: string;
  habilidadeRecebida: string;
  valorEscambo: number | string;
  dataTroca?: string;
};

export default function TrocaEscamboPage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [trocaEdit, setTrocaEdit] = useState<TrocaEscambo | null>(null);

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-verde">
        Trocas de Escambo
      </h1>

      {modo === "lista" ? (
        <ListaTrocaEscambo
          onNovo={() => setModo("form")}
          onEditar={(troca) => {
            setTrocaEdit(troca);
            setModo("form");
          }}
        />
      ) : (
        <FormTrocaEscambo
          troca={trocaEdit}
          onCancel={() => {
            setTrocaEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setTrocaEdit(null);
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
