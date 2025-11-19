import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import QuemSomos from "./pages/QuemSomosPage";
import FaqPage from "./pages/FaqPage";
import PropostaPage from "./pages/proposta";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Header />
        <main className="flex-1 pt-[140px] md:pt-20 pb-40 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/proposta" element={<PropostaPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
