import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/SkillUp.png";

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="w-full flex flex-col items-center">

      {/* HEADER */}
      <header className="w-full py-6 flex flex-col items-center">
        <Link to="/">
          <img src={logo} className="w-24 opacity-90 hover:opacity-100 transition" />
        </Link>

        <h1 className="text-4xl font-bold mt-4 text-verde">
          Portal SkillUp
        </h1>
        <p className="text-neutral-400">
          Acesso exclusivo para membros e desenvolvedores
        </p>
      </header>

      {/* CONTENT */}
      <main className="flex justify-center items-center w-full py-10">
        {children}
      </main>
    </div>
  );
}
