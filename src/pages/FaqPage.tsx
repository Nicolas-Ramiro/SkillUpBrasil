import FaqItem from "../components/FaqItem";

const faqData = [
  {
    question: "O que é a Skill Up Brasil e qual é sua proposta de valor?",
    answer:
      "A Skill Up Brasil é uma iniciativa que conecta educação tecnológica, impacto social e o futuro do trabalho. Através da plataforma Talent Hub, ela democratiza o acesso às habilidades mais demandadas do mercado, combinando Inteligência Artificial, mentoria humana e um ecossistema sustentável de troca de conhecimento.",
  },
  {
    question: "Como a plataforma Talent Hub funciona na prática?",
    answer:
      "A Talent Hub funciona com três pilares principais: cursos especializados em profissões do futuro, mentoria personalizada com profissionais experientes e o Escambo IA, um marketplace onde você troca habilidades usando uma moeda social. A Inteligência Artificial garante uma experiência justa, personalizada e alinhada ao seu desenvolvimento profissional.",
  },
  {
    question: "Quais valores norteiam a Skill Up Brasil?",
    answer:
      "A Skill Up Brasil é guiada por quatro valores fundamentais: Inovação Inclusiva, garantindo acesso igualitário à tecnologia; Conexão Humana, valorizando a troca de conhecimento por meio da mentoria; Sustentabilidade, promovendo impacto social e ambiental; e Transparência, presente em todas as transações e processos da plataforma.",
  },
];

export default function FaqPage() {
  return (
    <section className=" min-h-[70vh] flex flex-col items-center justify-center px-6 text-white">
      <h2 className="text-4xl font-bold text-verde mb-8">FAQ</h2>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        {faqData.map((item, idx) => (
          <FaqItem key={idx} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}
