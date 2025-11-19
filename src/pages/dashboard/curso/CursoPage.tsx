import { useState } from "react";
import FormCurso from "./components/FormCurso";
import ListaCurso from "./components/ListaCurso";
import BotaoDashboard from "../../../components/BotaoDashboard";

type Curso = {
  idCurso?: number;
  titulo: string;
  descricao: string;
  categoria: string;
  nivel: string;
  qtdHoras: number;
};

export default function CursoPage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [cursoEdit, setCursoEdit] = useState<Curso | null>(null);

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-verde">Cursos</h1>

      {modo === "lista" ? (
        <ListaCurso
          onNovo={() => setModo("form")}
          onEditar={(curso) => {
            setCursoEdit(curso);
            setModo("form");
          }}
        />
      ) : (
        <FormCurso
          curso={cursoEdit}
          onCancel={() => {
            setCursoEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setCursoEdit(null);
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
