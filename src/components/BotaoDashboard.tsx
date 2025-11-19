import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BotaoDashboard() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard")}
      className="flex items-center gap-2 bg-neutral-700 hover:bg-verde text-white font-semibold px-4 py-2 rounded-md transition-colors"
    >
      <ArrowLeft size={18} />
      Voltar ao Dashboard
    </button>
  );
}
