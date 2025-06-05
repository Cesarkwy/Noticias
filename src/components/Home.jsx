import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/News.json");
        if (!response.ok) {
          throw new Error("Erro ao carregar as notícias");
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Erro ao buscar as notícias:", error.message);
      }
    };
    fetchNews();
  }, []);

  const categories = [...new Set(news.map(article => article.tag))].sort();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const groupedNews = news.reduce((acc, article) => {
    if (!acc[article.tag]) acc[article.tag] = [];
    acc[article.tag].push(article);
    return acc;
  }, {});

  return (
    <div className="home-container">
      <h2 className="home-title">Destaques</h2>
      <Slider {...sliderSettings} className="carousel">
        {shuffleArray([...news])
          .slice(0, 5)
          .map((article) => (
            <Link
              to={`/noticia/${article.id}`}
              key={article.id}
              className="carousel-item-link"
            >
              <div className="carousel-item">
                <img src={article.image_url} alt={article.title} />
                <h3>{article.title}</h3>
              </div>
            </Link>
          ))}
      </Slider>

      {Object.entries(groupedNews).map(([category, articles]) => (
        <div key={category} id={category} className="category-section">
          <h2>{category}</h2>
          {news
            .filter((article) => article.tag === category)
            .map((article) => (
              <Link to={`/noticia/${article.id}`} key={article.id} className="news-item-link">
                <div className="news-card">
                  <img src={article.image_url} alt={article.title} />
                  <div className="news-content">
                    <h3>{article.title}</h3>
                    <p>{article.subtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
