import { User } from "lucide-react";
import type { Usuario } from "../types/Usuario";

export default function MentorCard({ mentor }: { mentor: Usuario }) {
  return (
    <div className="border border-neutral-700 rounded-2xl p-5 bg-neutral-900 text-white shadow-sm hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        <User className="w-10 h-10 text-verde" />

        <div>
          <h3 className="text-lg font-semibold">{mentor.nomeUsuario}</h3>
          <p className="text-sm text-neutral-400">{mentor.profissao}</p>
          {mentor.areaInteresse && (
            <p className="text-sm text-neutral-500">
              Área: {mentor.areaInteresse}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
