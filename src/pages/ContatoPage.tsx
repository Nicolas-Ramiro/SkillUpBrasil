import { useState } from "react";
import { Mail, MapPin } from "lucide-react";

export default function ContatoPage() {
  const [form, setForm] = useState({
    nomeUsuario: "",
    email: "",
    mensagem: "",
  });

  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://skillupbrasil-api.onrender.com/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ nomeUsuario: "", email: "", mensagem: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-black text-white pt-32 flex flex-col items-center">

      {/* Título */}
      <h2 className="text-3xl md:text-4xl font-semibold text-verde">
        Deseja falar conosco?
      </h2>

      <p className="mt-2 text-gray-300 text-center">
        Deixe uma mensagem no formulário abaixo!
      </p>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col items-center w-full max-w-3xl gap-4"
      >
        <div className="flex flex-col md:flex-row w-full gap-4">
            <input
                type="text"
                name="nomeUsuario"
                placeholder="Nome"
                value={form.nomeUsuario}
                onChange={handleChange}
                required
                className="w-full md:w-1/2 bg-gray-200 text-black p-3 rounded-md outline-none"
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full md:w-1/2 bg-gray-200 text-black p-3 rounded-md outline-none"
            />
        </div>


        <textarea
          name="mensagem"
          placeholder="Como podemos te ajudar?"
          value={form.mensagem}
          onChange={handleChange}
          required
          rows={4}
          className="w-full bg-gray-200 text-black p-3 rounded-md outline-none"
        ></textarea>

        <button
          type="submit"
          className="mt-4 bg-verde text-black font-bold px-10 py-3 rounded-full"
        >
          ENVIAR
        </button>

        {status === "success" && (
          <p className="text-emerald-400 mt-2">Mensagem enviada com sucesso!</p>
        )}
        {status === "error" && (
          <p className="text-red-500 mt-2">Erro ao enviar. Tente novamente.</p>
        )}
      </form>

      {/* Bloco inferior */}
      <div className="w-full mt-20 bg-green-400 py-16 flex justify-center">
        <div className="bg-neutral-800 text-gray-300 px-10 py-10 rounded-lg w-[90%] max-w-5xl flex flex-col md:flex-row justify-between gap-10">

          {/* Contato */}
          <div className="flex items-center gap-4">
            <div className="bg-verde rounded-full p-4">
              <Mail size={40} className="text-black" />
            </div>

            <div>
              <h3 className="text-verde text-lg font-semibold">Entre em contato!</h3>
              <p className="text-white font-bold text-xl">Skillup@gmail.com</p>
            </div>
          </div>

          {/* Local */}
          <div className="flex items-center gap-4">
            <div className="bg-verde rounded-full p-4">
              <MapPin size={40} className="text-black" />
            </div>

            <div>
              <h3 className="text-verde text-lg font-semibold">Onde estamos</h3>
              <p className="text-white font-bold text-xl">
                Av. Lins de Vasconcelos, <br /> 1222
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
