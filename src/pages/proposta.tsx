import bgImage from "../assets/proposta.png"; // coloque aqui a imagem que enviou

export default function PropostaPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white pt-32 px-6 md:px-20 relative overflow-hidden">

      {/* Background com fade escuro */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-5xl">

        {/* Título */}
        <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left leading-tight">
          TALENT HUB
        </h1>

        <h2 className="text-3xl md:text-5xl font-bold mt-2 bg-linear-to-r from-white via-verde to-white bg-clip-text text-transparent text-center md:text-left">
          futuro do trabalho
        </h2>

        {/* Subtítulo "Proposta" */}
        <h3 className="text-verde text-3xl font-semibold mt-10">
          Proposta
        </h3>

        {/* Parágrafo */}
        <p className="mt-4 text-gray-200 text-lg leading-relaxed max-w-4xl">
          A Talent Hub é uma solução digital inovadora projetada pela Skill UP
          Brasil para enfrentar os desafios impostos pela rápida transformação
          do mercado de trabalho, impulsionada pela Inteligência Artificial e
          pela automação. Nosso objetivo é criar um ecossistema inclusivo e
          sustentável que una educação tecnológica personalizada, mentoria
          humana e um marketplace de troca de habilidades (Escambo IA),
          preparando indivíduos e empresas para as profissões do futuro.
        </p>
      </div>
    </div>
  );
}
