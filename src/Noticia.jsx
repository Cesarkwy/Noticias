import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Noticia.css";

const Noticia = ({ setCurrentNewsContent, setNoticiaAberta }) => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/News.json");
        const data = await response.json();
        const selectedNews = data.find(article => article.id.toString() === id);

        if (selectedNews) {
          setNoticia(selectedNews);
          setCurrentNewsContent(`${selectedNews.title}. ${selectedNews.subtitle}. ${selectedNews.content}`);
          setNoticiaAberta(selectedNews);
        }
      } catch (error) {
        console.error("Erro ao buscar a notícia:", error.message);
      }
    };

    fetchNews();
  }, [id, setCurrentNewsContent, setNoticiaAberta]);

  if (!noticia) return <p>Carregando notícia...</p>;

  return (
    <div className="noticia-container">
      <h1>{noticia.title}</h1>
      <h3>{noticia.subtitle}</h3>
      <img src={noticia.image_url} alt={noticia.title} />
      <p className="noticia-content">{noticia.content.split('\n').map((linha, index) => (
    <p key={index}>{linha}</p>
  ))}</p>
    </div>
  );
};

export default Noticia;
