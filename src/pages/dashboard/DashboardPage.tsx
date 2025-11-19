import { useNavigate } from "react-router-dom";

export function DashboardPage() {
    const navigate = useNavigate();

    const links = [
        { label: "Usuário", path: "/dashboard/usuario" },
        { label: "Curso", path: "/dashboard/curso" },
        { label: "Mentoria", path: "/dashboard/mentoria" },
        { label: "Recomendação", path: "/dashboard/recomendacao" },
        { label: "Progresso", path: "/dashboard/progresso" },
        { label: "Oferta Habilidade", path: "/dashboard/habilidade" },
        { label: "Transação Moeda", path: "/dashboard/moeda" },
        { label: "Troca Escambo", path: "/dashboard/escambo" },
    ];


    return (
        <div className="mt-12 flex flex-col items-center justify-center p-6 text-white">
            <h1 className="text-3xl font-bold text-verde mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-xl">
                {links.map((btn, i) => (
                <button
                    key={i}
                    onClick={() => navigate(btn.path)}
                    className="bg-zinc-900 hover:bg-verde transition text-sm sm:text-base font-medium py-3 rounded-lg border border-zinc-700"
                >
                    {btn.label}
                </button>
                ))}
            </div>
        </div>
    );
}