import { Link } from "react-router-dom";
import { Book, Users } from "lucide-react";

export default function RecursosPage() {
  return (
    <section className="text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Descubra suas possibilidades</h1>
        <p className="text-gray-300 text-lg mb-12">
          Ferramentas e recursos para impulsionar sua carreira rumo ao futuro
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* CARD 1 - Cursos */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-left shadow-xl hover:shadow-emerald-500/20 transition">
            <div className="bg-verde text-black w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Book size={26} />
            </div>

            <h2 className="text-xl font-semibold mb-2">Cursos do futuro</h2>
            <p className="text-gray-400 mb-4">
              Descubra sobre IA, Ética digital, sustentabilidade e automação
            </p>

            <Link
              to="/cursos"
              className="text-verde font-medium flex items-center gap-1 hover:underline"
            >
              Explore →
            </Link>
          </div>

          {/* CARD 2 - Mentoria */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-left shadow-xl hover:shadow-emerald-500/20 transition">
            <div className="bg-verde text-black w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users size={26} />
            </div>

            <h2 className="text-xl font-semibold mb-2">Rede de mentoria</h2>
            <p className="text-gray-400 mb-4">
              Conecte-se com mentores experientes ou compartilhe seu conhecimento
            </p>

            <Link
              to="/mentorias"
              className="text-verde font-medium flex items-center gap-1 hover:underline"
            >
              Explore →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
