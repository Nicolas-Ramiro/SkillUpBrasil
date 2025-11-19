"use client";

import { useState } from "react";
import ListaTransacao from "./components/ListaTransacaoMoeda";
import FormTransacao from "./components/FormTransacaoMoeda";
import BotaoDashboard from "../../../components/BotaoDashboard";

export type Transacao = {
  idTransacao?: number;
  idUsuario: number | string;
  tipo: string;
  valor: number | string;
  referencia: string;
  dataTransacao?: string;
};

export default function TransacaoPage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [transacaoEdit, setTransacaoEdit] = useState<Transacao | null>(null);

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-verde">
        Transações de Moeda
      </h1>

      {modo === "lista" ? (
        <ListaTransacao
          onNovo={() => setModo("form")}
          onEditar={(transacao) => {
            setTransacaoEdit(transacao);
            setModo("form");
          }}
        />
      ) : (
        <FormTransacao
          transacao={transacaoEdit}
          onCancel={() => {
            setTransacaoEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setTransacaoEdit(null);
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
