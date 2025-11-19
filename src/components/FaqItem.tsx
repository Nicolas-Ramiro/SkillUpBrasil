import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-md shadow-md overflow-hidden transition-all w-full bg-neutral-800">
      <button
        className="w-full flex justify-between items-center p-6 text-lg font-semibold text-verde"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className="text-2xl text-verde">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="bg-neutral-700 px-6 py-4 text-base whitespace-pre-line text-white transition-all duration-300">
          {answer}
        </div>
      )}
    </div>
  );
}
