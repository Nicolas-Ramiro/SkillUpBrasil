import { Link } from "react-router-dom";
import logo from "../assets/SkillUp.png"; // ajuste o caminho da sua logo

export default function HomePage() {
  return (
    <main className="w-full flex flex-col justify-center items-center text-center px-6 mt-16">

      {/* LOGO */}
      <div className="mb-10">
        <img
          src={logo}
          alt="Logo"
          className="w-56 h-auto select-none"
        />
      </div>

      {/* TEXTO */}
      <div className="flex flex-col mb-10">
        <span className="text-white text-3xl md:text-4xl font-light">
          Conectando você ao
        </span>

        <span className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white via-verde to-white bg-clip-text text-transparent">
          futuro do trabalho
        </span>
      </div>

      {/* BOTÃO PARA CONTATO */}
      <Link
        to="/contato"
        className="px-8 py-3 border border-verde text-verde rounded-xl hover:bg-verde hover:text-black transition-all duration-300"
      >
        Contato
      </Link>
    </main>
  );
}
