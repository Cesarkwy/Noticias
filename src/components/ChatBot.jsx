import React, { useState, useEffect, useRef } from "react";
import { FaComments, FaMicrophone } from "react-icons/fa";
import "./ChatBot.css";

const ChatBot = ({ noticias = [], noticiaAberta = null }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.lang = "pt-BR";

      recognitionRef.current.onresult = (event) => {
        const command = event.results[0][0].transcript;
        setInput(command);
        sendMessage(command);
      };

      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      window.speechSynthesis.speak(utterance);
    }
  };

  const sendMessage = async (msgText = input) => {
    if (!msgText.trim()) return;

    const userMessage = { role: "user", content: msgText };
    setMessages((prev) => [...prev, userMessage]);

    try {
      let contexto = "";

      if (noticiaAberta) {
        contexto = `Título: ${noticiaAberta.title}\nConteúdo: ${noticiaAberta.content || noticiaAberta.description}`;
      } else {
        contexto = noticias.map(n => `${n.title}: ${n.description || n.subtitle || ""}`).join("\n\n");
      }

      const prompt = `Você é um assistente de acessibilidade em português brasileiro. Responda APENAS com base no conteúdo da notícia abaixo. 
      Se a pergunta não estiver relacionada ao conteúdo, diga educadamente que não pode responder.

Conteúdo da notícia: ${contexto}

Pergunta do usuário: ${msgText}`;

      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mistral",
          prompt,
          stream: false,
        }),
      });

      const data = await response.json();
      const botMessage = { role: "bot", content: data.response };
      setMessages((prev) => [...prev, botMessage]);
      speak(data.response);
      setInput("");
    } catch (error) {
      console.error("Erro ao conversar com o modelo:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const quickPrompts = [
    "O que diz essa notícia?",
    "Resuma o conteúdo.",
    "Explique com palavras simples.",
  ];

  return (
    <div>
      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        <FaComments />
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.role === "user" ? "user" : "bot"}`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className="chatbot-input-area">
            <button className="mic-button" onClick={startListening} title="Falar">
              <FaMicrophone />
            </button>
            <input
              type="text"
              className="chatbot-input"
              placeholder="Digite ou fale sua pergunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>

          <div className="chatbot-quick-prompts">
            {quickPrompts.map((prompt, idx) => (
              <button key={idx} onClick={() => sendMessage(prompt)}>{prompt}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
