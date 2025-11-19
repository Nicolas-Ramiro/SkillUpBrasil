import logo from "../assets/SkillUp.png";
import linkedIn from "../assets/linkedinLogo.webp";

export default function Footer() {
  const pessoas = [
    {
      nome: "Hebert",
      url: "https://www.linkedin.com/in/hebert-lopes-36a3bb12a",
    },
    {
      nome: "Marcus",
      url: "https://www.linkedin.com/in/marcus-vin%C3%ADcius-vila-nova-da-silva",
    },
    {
      nome: "Nicolas",
      url: "https://www.linkedin.com/in/nicolas-ramiro-4a44bb346",
    },
  ];

  return (
    <footer
      className="
        left-0 w-full 
        bg-neutral-800 text-white 
        px-6 sm:px-10 lg:px-20 
        py-8 sm:py-10 
        shadow-[0_-2px_10px_rgba(0,0,0,0.4)]
        z-30
      "
    >
      <div className="flex flex-col lg:flex-row flex-wrap justify-center lg:justify-between items-center lg:items-start gap-8 sm:gap-10 text-center lg:text-left">
        
        {/* Logo */}
        <div className="flex-1 min-w-[200px] flex flex-col items-center lg:items-start">
          <img
            src={logo}
            alt="Logo Mindev"
            className="w-20 h-20 mb-4"
          />
          <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-xs">
            Conectando você ao futuro do trabalho.
          </p>
        </div>

        {/* Contato */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-verde font-semibold text-base sm:text-lg mb-3">
            Contato
          </h3>
          <a
            href="mailto:Skillup@gmail.com"
            className="block text-xs sm:text-sm md:text-base text-white hover:underline"
          >
            Skillup@gmail.com
          </a>
        </div>

        {/* Redes Sociais */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-verde font-semibold text-base sm:text-lg mb-3">
            Redes Sociais
          </h3>
          <div className="space-y-3">
            {pessoas.map((pessoa) => (
              <div
                key={pessoa.nome}
                className="flex justify-center lg:justify-start items-center gap-2"
              >
                <img
                  src={linkedIn}
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
                <a
                  href={pessoa.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm md:text-base hover:underline"
                >
                  {pessoa.nome}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 sm:mt-10 pt-4 text-center text-xs sm:text-sm text-gray-400">
        © {new Date().getFullYear()} Skill Up Brasil. Todos os direitos reservados.
      </div>
    </footer>
  );
}
