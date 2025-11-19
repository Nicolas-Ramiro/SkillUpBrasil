import { useState } from "react";
import FormOfertaHabilidade from "./components/FormOfertaHabilidade";
import ListaOfertaHabilidade from "./components/ListaOfertaHabilidade";
import BotaoDashboard from "../../../components/BotaoDashboard";

type OfertaHabilidade = {
  idOferta?: number;
  idUsuario: number | string;
  habilidade: string;
  tempoHoras: number | string;
  status: string;
};

export default function OfertaHabilidadePage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [ofertaEdit, setOfertaEdit] = useState<OfertaHabilidade | null>(null);

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-verde">
        Ofertas de Habilidades
      </h1>

      {modo === "lista" ? (
        <ListaOfertaHabilidade
          onNovo={() => setModo("form")}
          onEditar={(oferta) => {
            setOfertaEdit(oferta);
            setModo("form");
          }}
        />
      ) : (
        <FormOfertaHabilidade
          oferta={ofertaEdit}
          onCancel={() => {
            setOfertaEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setOfertaEdit(null);
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
