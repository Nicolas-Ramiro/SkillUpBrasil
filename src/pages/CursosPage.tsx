import { useEffect, useState } from "react";
import { BookOpen, Filter, TrendingUp, Search } from "lucide-react";
import BotaoRecursos from "../components/BotaoRecursos";

// IMPORT DAS IMAGENS
import IAImage from "../assets/IAImage.jpg";
import EticaDigitalImage from "../assets/EticaDigitalImage.png";
import SustentabilidadeImage from "../assets/SustentabilidadeImage.jpg";
import AutomacaoImage from "../assets/AutomacaoImage.webp";
import DesenvolvimentoWebImage from "../assets/DesenvolvimentoWebImage.jpg";
import DataScienceImage from "../assets/DataScienceImage.webp";

// MAPEAMENTO categoria → imagem
const categoriaImages: Record<string, string> = {
  "Inteligencia Artificial": IAImage,
  "Etica Digital": EticaDigitalImage,
  "Sustentabilidade": SustentabilidadeImage,
  "Automacao": AutomacaoImage,
  "Desenvolvimento Web": DesenvolvimentoWebImage,
  "Data Science": DataScienceImage,
};

type Curso = {
  idCurso: number;
  titulo: string;
  descricao: string;
  categoria: string;
  nivel: string;
  qtdHoras: number;
};

export default function CursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [filtered, setFiltered] = useState<Curso[]>([]);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [nivel, setNivel] = useState("todos");

  const categorias = Object.keys(categoriaImages);
  const niveis = ["iniciante", "intermediario", "avancado"];

  useEffect(() => {
    fetch("https://skillupbrasil-api.onrender.com/curso")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCursos(data);
          setFiltered(data);
        }
      })
      .catch(() => {
        setCursos([]);
        setFiltered([]);
      });
  }, []);

  // FILTROS
  useEffect(() => {
    let data = [...cursos];

    if (search.trim() !== "") {
      data = data.filter((c) =>
        c.titulo.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoria !== "Todas") {
      data = data.filter((c) => c.categoria === categoria);
    }

    if (nivel !== "todos") {
      data = data.filter((c) => c.nivel === nivel);
    }

    setFiltered(data);
  }, [search, categoria, nivel, cursos]);

  return (
    <div className="text-white px-6 md:px-20 py-10">
      {/* Titulo */}
      <h1 className="text-4xl font-bold text-verde mb-3">Cursos do Futuro</h1>
      <p className="text-lg text-neutral-300 mb-10">
        Desenvolva habilidades essenciais para as profissões emergentes
      </p>

      {/* Cards de contadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 flex items-center gap-4">
          <div className="p-3 bg-verde/20 rounded-lg">
            <BookOpen className="text-verde" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{cursos.length}</h2>
            <p className="text-neutral-300">Cursos Disponíveis</p>
          </div>
        </div>

        <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Filter className="text-purple-400" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{categorias.length}</h2>
            <p className="text-neutral-300">Categorias</p>
          </div>
        </div>

        <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 flex items-center gap-4">
          <div className="p-3 bg-pink-500/20 rounded-lg">
            <TrendingUp className="text-pink-400" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold">24</h2>
            <p className="text-neutral-300">Em Alta</p>
          </div>
        </div>
      </div>

      {/* Busca e filtros */}
      <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 mb-10">
        <div className="flex items-center gap-3 bg-neutral-900 px-4 py-3 rounded-lg border border-neutral-700 mb-5">
          <Search />
          <input
            type="text"
            placeholder="Buscar cursos..."
            className="bg-transparent w-full outline-none text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filtro de categoria */}
        <div className="flex flex-wrap gap-3 mb-5">
          <button
            onClick={() => setCategoria("Todas")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              categoria === "Todas"
                ? "bg-verde text-black"
                : "bg-neutral-700 hover:bg-neutral-600"
            }`}
          >
            Todas Categorias
          </button>

          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                categoria === cat
                  ? "bg-verde text-black"
                  : "bg-neutral-700 hover:bg-neutral-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtro de nível */}
        <div className="flex flex-wrap gap-3">
        <button
            onClick={() => setNivel("todos")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
            nivel === "todos"
                ? "bg-verde text-black"
                : "bg-neutral-700 hover:bg-neutral-600"
            }`}
        >
            Todos
        </button>

        {niveis.map((n) => (
        <button
            key={n}
            onClick={() => setNivel(n)}
            className={`capitalize px-4 py-2 rounded-lg text-sm font-medium ${
                nivel === n
                    ? "bg-verde text-black"
                    : "bg-neutral-700 hover:bg-neutral-600"
            }`}
        >
            {n}
        </button>
        ))}
        </div>

      {/* LISTAGEM DE CURSOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((curso) => {
          const image = categoriaImages[curso.categoria];

          return (
            <div
              key={curso.idCurso}
              className="bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700 shadow-lg hover:scale-[1.02] transition"
            >
              {/* IMAGEM DA CATEGORIA */}
              <img
                src={image}
                alt={curso.categoria}
                className="w-full h-40 object-cover"
              />

              <div className="p-5">
                <span className="text-xs px-3 py-1 rounded-full bg-verde/20 text-verde mr-2">
                  {curso.categoria}
                </span>

                <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 capitalize">
                  {curso.nivel}
                </span>

                <h2 className="text-xl font-bold mt-4 mb-2">
                  {curso.titulo}
                </h2>

                <p className="text-neutral-300 text-sm mb-4">
                  {curso.descricao}
                </p>

                <div className="text-neutral-400 text-sm flex items-center gap-2">
                  <span>⏱ {curso.qtdHoras}h</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <BotaoRecursos/>
    </div>
  );
}
