// Importando imagens dos fundadores
import HebertImg from "../assets/Hebert.png";
import MarcusImg from "../assets/Marcus.jpg";
import NicolasImg from "../assets/Nicolas.jpg";

export default function QuemSomos() {
  const founders = [
    {
      nome: "Hebert Lopes dos Santos",
      rm: "563192",
      turma: "1TDSR",
      img: HebertImg,
      github: "https://github.com/hebertlps",
      linkedin: "https://www.linkedin.com/in/hebert-lopes-36a3bb12a",
      descricao:
        "Hebert traz para a Skill Up Brasil sua vasta experiência em vendas, combinando conhecimento técnico com habilidades comerciais para ampliar o alcance das soluções desenvolvidas. Seu talento para entender o mercado e criar conexões estratégicas é fundamental para transformar ideias em oportunidades reais.",
    },
    {
      nome: "Marcus Vinícius Vila Nova da Silva",
      rm: "558771",
      turma: "1TDSR",
      img: MarcusImg,
      github: "https://github.com/marcusvilanova",
      linkedin:
        "https://www.linkedin.com/in/marcus-vin%C3%ADcius-vila-nova-da-silva",
      descricao:
        "Marcus é um líder e gerente de projetos dedicado, que conduz a Skill Up Brasil com visão clara e foco na entrega de resultados. Sua capacidade de organizar equipes, alinhar objetivos e motivar pessoas garante que cada projeto seja executado com excelência e eficiência.",
    },
    {
      nome: "Nicolas Monteiro Ramiro",
      rm: "562380",
      turma: "1TDSR",
      img: NicolasImg,
      github: "https://github.com/Nicolas-Ramiro/",
      linkedin: "https://www.linkedin.com/in/nicolas-ramiro-4a44bb346/",
      descricao:
        "Nicolas é o especialista em desenvolvimento da Skill Up Brasil, reconhecido por sua habilidade excepcional em desenvolvimento de software. Ele transforma desafios complexos em soluções digitais robustas e inovadoras, elevando a qualidade técnica dos projetos e garantindo a funcionalidade que o usuário espera.",
    },
  ];

  return (
    <section className="text-white py-20 px-6">
      <h2 className="text-4xl font-bold text-center text-verde mb-16">
        FOUNDERS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-items-center">
        {founders.map((f) => (
          <div
            key={f.nome}
            className="flex flex-col items-center text-center max-w-[350px]"
          >
            <img
              src={f.img}
              alt={f.nome}
              className="rounded-full object-cover mb-5 shadow-lg w-40 h-40"
            />
            <p className="font-bold text-verde">{f.nome}</p>
            <p className="text-justify md:text-lg leading-relaxed mb-3">
              {f.descricao}
            </p>
            <p className="text-md mb-2">
              RM: {f.rm}
              <br />
              {f.turma}
            </p>
            <div className="flex flex-col items-center gap-1">
              <a
                href={f.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                GitHub
              </a>
              <a
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-center my-16 text-verde">
        Nossos Pilares
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Missão */}
        <div className="border-2 border-verde rounded-xl p-6 flex flex-col items-center text-justify">
          <h3 className="text-verde font-bold text-xl mb-4 text-center">
            Missão
          </h3>
          <p className="text-sm">
            Democratizar o acesso às habilidades do futuro, conectando pessoas e empresas através de educação tecnológica personalizada e um ecossistema de troca de conhecimento humano e sustentável.
          </p>
        </div>

        {/* Visão */}
        <div className="border-2 border-verde rounded-xl p-6 flex flex-col items-center text-justify">
          <h3 className="text-verde font-bold text-xl mb-4 text-center">
            Visão
          </h3>
          <p className="text-sm">
            Ser a principal plataforma de desenvolvimento de talentos da América Latina, reconhecida por redefinir a empregabilidade e promover uma economia de habilidades justa e consciente até 2030.
          </p>
        </div>

        {/* Valores */}
        <div className="border-2 border-verde rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-verde font-bold text-xl mb-4 text-center">
            Valores
          </h3>
          <ul className="list-disc list-inside text-sm text-left">
            <li>Inovação inclusiva</li>
            <li>Conexão humana</li>
            <li>Sustentabilidade</li>
            <li>Transparência</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
