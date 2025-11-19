import { useState } from "react";
import FormMentoria from "./components/FormMentoria";
import ListaMentoria from "./components/ListaMentoria";
import BotaoDashboard from "../../../components/BotaoDashboard";

type Mentoria = {
  idMentoria?: number;
  idMentor: number | string;
  idAprendiz: number | string;
  status: string;
  dataHorario: string; // ISO string
};

export default function MentoriaPage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [mentoriaEdit, setMentoriaEdit] = useState<Mentoria | null>(null);

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-verde">Mentorias</h1>

      {modo === "lista" ? (
        <ListaMentoria
          onNovo={() => setModo("form")}
          onEditar={(mentoria) => {
            setMentoriaEdit(mentoria);
            setModo("form");
          }}
        />
      ) : (
        <FormMentoria
          mentoria={mentoriaEdit}
          onCancel={() => {
            setMentoriaEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setMentoriaEdit(null);
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
