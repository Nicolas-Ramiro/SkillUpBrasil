import { Link } from "react-router-dom";

export default function BotaoRecursos() {
  return (
    <div className="w-full flex justify-start mb-8">
      <Link
        to="/recursos"
        className="px-6 py-3 border border-verde text-verde rounded-xl 
        hover:bg-verde hover:text-black transition-all duration-300 font-medium"
      >
        ← Voltar para Recursos
      </Link>
    </div>
  );
}
