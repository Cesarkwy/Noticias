import React, { useEffect, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa"; // Importação dos ícones
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; //rotas
import "./App.css";
import Main from "./components/Main.jsx";
import Home from "./components/Home.jsx";
import Noticia from "./Noticia";
import ChatBot from "./components/ChatBot";
import Acessibilidade from "./components/Acessibilidade";


function App() {
  const [news, setNews] = useState([]);
  const [currentNewsContent, setCurrentNewsContent] = useState(""); // Armazena o conteúdo da notícia atual (Web Speech)
  const [noticiaAberta, setNoticiaAberta] = useState(null); // Armazena o conteúdo da notícia atual (ChatBot)

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);


  // Fetch do arquivo JSON
  useEffect(() => {
    // Função para buscar o JSON
    const fetchNews = async () => {
      try {
        const response = await fetch("/News.json"); // Caminho relativo ao arquivo no public
        if (!response.ok) {
          throw new Error("Erro ao carregar as notícias");
        }
        const data = await response.json();
        setNews(data); // Atualiza o estado com os dados carregados

        const categorias = [...new Set(data.map((item) => item.tag))];
        setCategoriasUnicas(categorias);

      } catch (error) {
        console.error("Erro ao buscar as notícias:", error.message);
      }
    };

    fetchNews();

    // Adiciona evento de scroll para alterar o cabeçalho
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.querySelector(".header").classList.add("small");
      } else {
        document.querySelector(".header").classList.remove("small");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <Router>
      <div>
        <header className="header">
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </div>
          <Link to="/">
            <img src="/logo_news.png" alt="Logo Notícias" className="logo" />
          </Link>
          <div className="search-icon">
            <FaSearch />
          </div>
        </header>

        {menuOpen && (
          <nav className="menu-categorias">
            {categoriasUnicas.map((categoria) => (
              <div
                key={categoria}
                className="menu-item"
                onClick={() => {
                  const section = document.getElementById(categoria);
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                  setMenuOpen(false);
                }}
              >
                {categoria}
              </div>
            ))}
          </nav>
        )}

        {/* Passa `currentNewsContent` para o Main */}
        <Main
          textToRead={currentNewsContent}
          newsContent={currentNewsContent}
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/noticia/:id"
              element={<Noticia
                setCurrentNewsContent={setCurrentNewsContent}
                setNoticiaAberta={setNoticiaAberta}
              />}
            />
          </Routes>
        </main>

        {/* Chatbot */}
        <ChatBot noticias={news} noticiaAberta={noticiaAberta} />

        {/* Acessibilidade */}
        <Acessibilidade />

      </div>
    </Router>
  );
}

export default App;
