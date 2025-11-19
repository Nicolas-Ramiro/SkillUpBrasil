import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Header />
        <main className="flex-1 pt-[140px] md:pt-20 pb-40 px-4">
        </main>
        <Footer />
      </div>
    </Router>
  );
}
