"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import MentorCard from "./components/MentorCard";
import MentoriaCard from "./components/MentoriaCard";
import type { Usuario } from "./types/Usuario";
import type { Mentoria } from "./types/Mentoria";
import BotaoRecursos from "../../components/BotaoRecursos";

export default function MentoriaPage() {
  const [aba, setAba] = useState<"mentores" | "minhas">("mentores");
  const [mentores, setMentores] = useState<Usuario[]>([]);
  const [mentorias, setMentorias] = useState<Mentoria[]>([]);
  const [search, setSearch] = useState("");
  const [areaFiltro, setAreaFiltro] = useState("");

  // Estatísticas
  const qtdMentores = mentores.length;
  const qtdMentorias = mentorias.length;
  const conexoesAtivas = mentorias.filter(
    (m) => m.status === "agendada" || m.status === "em_andamento"
  ).length;

  useEffect(() => {
    fetch("https://skillupbrasil-api.onrender.com/usuario")
      .then((res) => res.json())
      .then((data: Usuario[]) =>
        setMentores(data.filter((u) => u.tipo === "mentor"))
      );

    fetch("https://skillupbrasil-api.onrender.com/mentoria")
      .then((res) => res.json())
      .then((data: Mentoria[]) => setMentorias(data));
  }, []);

  const mentoresFiltrados = mentores.filter((m) => {
    const matchNome = m.nomeUsuario.toLowerCase().includes(search.toLowerCase());
    const matchArea = areaFiltro ? m.areaInteresse === areaFiltro : true;
    return matchNome && matchArea;
  });

  return (
    <main className="text-white p-10">

      {/* Título */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-verde">Rede de Mentoria</h1>
        <p className="text-neutral-400 mt-2">
          Conecte-se com especialistas ou compartilhe seu conhecimento
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-neutral-800 border border-neutral-700 rounded-2xl text-center">
          <h2 className="text-5xl font-bold text-verde">{qtdMentores}</h2>
          <p className="text-neutral-400">Mentores Disponíveis</p>
        </div>

        <div className="p-6 bg-neutral-800 border border-neutral-700 rounded-2xl text-center">
          <h2 className="text-5xl font-bold text-verde">{qtdMentorias}</h2>
          <p className="text-neutral-400">Minhas Mentorias</p>
        </div>

        <div className="p-6 bg-neutral-800 border border-neutral-700 rounded-2xl text-center">
          <h2 className="text-5xl font-bold text-verde">{conexoesAtivas}</h2>
          <p className="text-neutral-400">Conexões Ativas</p>
        </div>
      </div>

      {/* Abas */}
      <div className="flex justify-center gap-6 mb-10">
        <button
          className={`px-6 py-3 rounded-xl ${
            aba === "mentores"
              ? "bg-verde"
              : "bg-neutral-800 border border-neutral-700"
          }`}
          onClick={() => setAba("mentores")}
        >
          Encontrar Mentores
        </button>

        <button
          className={`px-6 py-3 rounded-xl ${
            aba === "minhas"
              ? "bg-verde"
              : "bg-neutral-800 border border-neutral-700"
          }`}
          onClick={() => setAba("minhas")}
        >
          Minhas Mentorias
        </button>
      </div>

      {/* Conteúdo da aba */}
      {aba === "mentores" ? (
        <>
          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Buscar mentores..."
              className="w-full p-3 rounded-xl bg-neutral-800 border border-neutral-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="w-full md:w-60 p-3 rounded-xl bg-neutral-800 border border-neutral-700"
              value={areaFiltro}
              onChange={(e) => setAreaFiltro(e.target.value)}
            >
              <option value="">Todas as Áreas</option>
              {Array.from(
                new Set(mentores.map((m) => m.areaInteresse))
              ).map(
                (area) =>
                  area && (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  )
              )}
            </select>
          </div>

          {/* Lista de Mentores */}
          {mentoresFiltrados.length === 0 ? (
            <div className="text-center text-neutral-500 flex flex-col items-center">
              <User className="w-12 h-12 mb-2" />
              Nenhum mentor encontrado
            </div>
          ) : (
            <div className="grid grid-cols-1 mb-10 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentoresFiltrados.map((mentor) => (
                <MentorCard key={mentor.idUsuario} mentor={mentor} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Lista de Mentorias */}
          {mentorias.length === 0 ? (
            <p className="text-center text-neutral-500">
              Nenhuma mentoria cadastrada
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mentorias.map((mentoria) => (
                <MentoriaCard key={mentoria.idMentoria} mentoria={mentoria} />
              ))}
            </div>
          )}
        </>
      )}
      <BotaoRecursos/>
    </main>
  );
}
