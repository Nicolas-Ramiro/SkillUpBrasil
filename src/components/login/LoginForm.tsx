import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // Loading fake

      const empresaEmail = "Adminskillup@gmail.com";
      const senhaEmpresa = "123456";

      // Salva email para o Header identificar o tipo de conta
      localStorage.setItem("userEmail", values.email);

      // Login da empresa → dashboard
      if (values.email === empresaEmail && values.password === senhaEmpresa) {
        localStorage.setItem("authToken", "token_empresa_123");
        navigate("/dashboard");
        return;
      }

      // Login normal → volta para home
      localStorage.setItem("authToken", "token_comum_123");
      navigate("/");
    } catch {
      alert("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-900/60 border border-verde p-8 rounded-xl w-[350px] shadow-xl backdrop-blur-md"
    >
      <h2 className="text-3xl font-bold text-verde text-center mb-6">
        Entrar
      </h2>

      {/* EMAIL */}
      <div className="mb-4">
        <label className="text-neutral-300 text-sm">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Digite seu email"
          required
          value={values.email}
          onChange={handleChange}
          disabled={loading}
          className="w-full mt-1 px-3 py-2 bg-neutral-800 border border-neutral-600 text-white rounded-md 
          focus:ring-2 focus:ring-verde focus:outline-none"
        />
      </div>

      {/* SENHA */}
      <div className="mb-6">
        <label className="text-neutral-300 text-sm">Senha</label>
        <input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          required
          minLength={6}
          value={values.password}
          onChange={handleChange}
          disabled={loading}
          className="w-full mt-1 px-3 py-2 bg-neutral-800 border border-neutral-600 text-white rounded-md 
          focus:ring-2 focus:ring-verde focus:outline-none"
        />
      </div>

      {/* BOTÃO */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-verde text-black font-bold py-2 rounded-md 
        hover:bg-green-400 transition disabled:opacity-50"
      >
        {loading ? "Entrando..." : "Acessar"}
      </button>

      <p className="text-neutral-400 text-sm text-center mt-4">
        Apenas contas autorizadas terão acesso ao painel
      </p>
    </form>
  );
}
