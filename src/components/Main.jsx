import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMicrophone, FaPlay, FaStop, FaMicrophoneSlash } from "react-icons/fa";

const Main = ({ textToRead, newsContent, children }) => {
  const [isListening, setIsListening] = useState(false);
  const [synth, setSynth] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if ("speechSynthesis" in window) {
      setSynth(window.speechSynthesis);
    } else {
      alert("Seu navegador não suporta a síntese de voz.");
    }
  }, []);

  const startReading = () => {
    if (synth) {
      let text = "";

      if (location.pathname.includes("/noticia/") && newsContent) {
        text = newsContent;
      } else if (textToRead && textToRead.length > 0) {
        text = textToRead;
      }

      if (text && text.trim().length > 0) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "pt-BR";
        synth.speak(utterance);
      } else {
        alert("Nenhum conteúdo disponível para leitura.");
      }
    }
  };

  const stopReading = () => {
    if (synth) {
      synth.cancel();
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Seu navegador não suporta o reconhecimento de voz.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.start();
    setIsListening(true);

    const timeout = setTimeout(() => {
    recognition.stop();
  }, 4000); // Tempo de escuta

    recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();

    if (command.includes("ler")) {
      startReading();
    } else if (command.includes("parar")) {
      stopReading();
    } else if (command.includes("home") || command.includes("início")) {
      navigate("/");
    } else if (command.includes("voltar")) {
      navigate(-1);
    }
  };

  recognition.onend = () => {
    clearTimeout(timeout);
    setIsListening(false);
  };
};

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      startListening();
    }
  };

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "1":
          toggleListening();
          break;
        case "2":
          navigate("/");
          break;
        case "3":
          startReading();
          break;
        case "4":
          stopReading();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isListening]);

  return (
    <div>
      {children}
      {/* Display de Áudio com Play e Stop; Microfone */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          background: "#fff",
          padding: "10px 15px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <button onClick={startReading} style={{ cursor: "pointer" }}>
          <FaPlay />
        </button>
        <button onClick={stopReading} style={{ cursor: "pointer" }}>
          <FaStop />
        </button>
         <button onClick={toggleListening} style={{ cursor: "pointer",  background: isListening ? "red" : "#1a1a1a", }}>
        {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>
      </div>
    </div>
  );
};

export default Main;
