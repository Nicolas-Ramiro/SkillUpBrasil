import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/SkillUp.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Quem Somos", path: "/quem-somos" },
    { name: "FAQ", path: "/faq" },
    { name: "Proposta", path: "/proposta" },
    { name: "Contato", path: "/contato" },
    { name: "Recursos", path: "/recursos" },
    { name: "Login", path: "/login" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-neutral-800 z-30 shadow-md">
        <div className="flex flex-col items-center justify-center py-3 px-6 md:h-20 w-full">

          {/* MOBILE */}
          <div className="flex flex-col items-center justify-center w-full md:hidden">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img src={logo} alt="Logo Skill Up Brasil" className="w-20 h-20 mb-1" />
            </Link>

            <button
              className="text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menu"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex w-full justify-center mt-3">
            <div className="flex">
              {links.map((link, index) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      text-white text-lg font-medium px-6 py-2 border-y border-neutral-600 transition-all duration-200
                      ${index === 0 ? "border-l rounded-l-lg" : ""}
                      ${index === links.length - 1 ? "border-r rounded-r-lg" : ""}
                      ${
                        isActive
                          ? "bg-verde border-verde !text-neutral-900"
                          : "bg-neutral-700 border-neutral-600 hover:bg-verde hover:!text-black"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* SIDEBAR MOBILE */}
      <nav
        className={`fixed top-0 left-0 h-full w-2/3 bg-neutral-900 shadow-lg transform transition-transform duration-300 z-20 md:hidden flex flex-col items-start pt-40 pl-6 gap-6 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-white text-lg font-medium border-2 rounded-md px-3 py-2 transition-all duration-200 w-[80%] ${
                isActive
                  ? "bg-verde border-verde !text-neutral-900"
                  : "bg-neutral-700 border-neutral-600 hover:bg-verde hover:!text-black"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* OVERLAY MOBILE */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
