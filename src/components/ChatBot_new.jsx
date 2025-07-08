import React, { useState, useEffect, useRef } from "react";
import { FaComments, FaMicrophone } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
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
        setInput("");
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

  // Função para detectar o tipo de pergunta e personalizar o prompt
  const detectQuestionType = (question) => {
    const questionLower = question.toLowerCase();
    
    if (questionLower.includes('resumo') || questionLower.includes('resuma') || questionLower.includes('principais pontos')) {
      return 'resumo';
    }
    if (questionLower.includes('explique') || questionLower.includes('explicar') || questionLower.includes('o que significa')) {
      return 'explicacao';
    }
    if (questionLower.includes('por que') || questionLower.includes('porque') || questionLower.includes('motivo')) {
      return 'contexto';
    }
    if (questionLower.includes('como') || questionLower.includes('quando') || questionLower.includes('onde')) {
      return 'detalhes';
    }
    if (questionLower.includes('opinião') || questionLower.includes('acha') || questionLower.includes('pensa')) {
      return 'opiniao';
    }
    return 'geral';
  };

  // Função para gerar instruções específicas baseadas no tipo de pergunta
  const getSpecificInstructions = (questionType) => {
    switch (questionType) {
      case 'resumo':
        return `
### INSTRUÇÃO ESPECÍFICA PARA RESUMO:
- Identifique exatamente 3 pontos principais
- Use numeração (1., 2., 3.)
- Cada ponto deve ter no máximo 20 palavras
- Termine com uma frase sobre a importância geral`;
        
      case 'explicacao':
        return `
### INSTRUÇÃO ESPECÍFICA PARA EXPLICAÇÃO:
- Defina termos técnicos em linguagem simples
- Use comparações com situações do dia a dia
- Divida conceitos complexos em partes menores
- Termine perguntando se ficou claro`;
        
      case 'contexto':
        return `
### INSTRUÇÃO ESPECÍFICA PARA CONTEXTO:
- Explique as causas do evento/situação
- Mencione o histórico relevante se houver na notícia
- Conecte com situações similares se apropriado
- Explique as consequências ou impactos`;
        
      case 'detalhes':
        return `
### INSTRUÇÃO ESPECÍFICA PARA DETALHES:
- Forneça informações específicas (datas, locais, números)
- Organize cronologicamente se for sobre eventos
- Destaque detalhes práticos que afetam o leitor
- Se a informação não estiver na notícia, mencione claramente`;
        
      case 'opiniao':
        return `
### INSTRUÇÃO ESPECÍFICA PARA QUESTÕES DE OPINIÃO:
- Responda: "Como assistente, não posso dar opiniões pessoais"
- Apresente diferentes perspectivas mencionadas na notícia
- Foque em fatos e dados objetivos
- Incentive o usuário a formar sua própria opinião`;
        
      default:
        return `
### INSTRUÇÃO ESPECÍFICA GERAL:
- Responda de forma direta e objetiva
- Use a informação da notícia como base
- Seja claro sobre limitações se houver
- Pergunte se precisa de esclarecimentos adicionais`;
    }
  };

  // Função para gerar contexto da conversa
  const getConversationContext = () => {
    if (messages.length === 0) return "";
    
    const recentMessages = messages.slice(-4); // Últimas 4 mensagens
    const conversationHistory = recentMessages
      .map(msg => `${msg.role === 'user' ? 'Usuário' : 'Assistente'}: ${msg.content}`)
      .join('\n');
    
    return `
### HISTÓRICO DA CONVERSA ATUAL:
${conversationHistory}

### CONTEXTO PARA RESPOSTA ATUAL:
- Mantenha consistência com respostas anteriores
- Se for uma pergunta de seguimento, referencie a resposta anterior
- Se o usuário pedir esclarecimentos, seja mais específico
`;
  };

  const sendMessage = async (msgText = input) => {
    if (!msgText.trim()) return;

    const userMessage = { role: "user", content: msgText };
    setMessages((prev) => [...prev, userMessage]);

    try {
      let contexto = "";

      if (noticiaAberta) {
        contexto = `NOTÍCIA ATUAL:
Título: ${noticiaAberta.title}
${noticiaAberta.subtitle ? `Subtítulo: ${noticiaAberta.subtitle}` : ''}
Conteúdo: ${noticiaAberta.content || noticiaAberta.description}`;
      } else {
        contexto = `NOTÍCIAS DISPONÍVEIS:
${noticias.map((n, index) => `${index + 1}. ${n.title}: ${n.description || n.subtitle || ""}`).join("\n")}`;
      }

      // Detecta o tipo de pergunta
      const questionType = detectQuestionType(msgText);
      const specificInstructions = getSpecificInstructions(questionType);
      const conversationContext = getConversationContext();

      const prompt = `# ASSISTENTE DE ACESSIBILIDADE PARA NOTÍCIAS

## IDENTIDADE E PROPÓSITO
Você é um assistente especializado em tornar notícias acessíveis para todos os públicos, incluindo pessoas com deficiências, idosos, e pessoas com diferentes níveis de escolaridade. Sua missão é democratizar o acesso à informação.

## DIRETRIZES DE RESPOSTA

### 1. ESCOPO DE ATUAÇÃO
- Responda APENAS sobre o conteúdo das notícias fornecidas
- Se a pergunta não estiver relacionada às notícias, responda educadamente: "Desculpe, posso ajudar apenas com questões relacionadas às notícias apresentadas."

### 2. ESTILO DE COMUNICAÇÃO
- Use linguagem clara, simples e direta
- Evite jargões técnicos ou termos complexos
- Prefira frases curtas e bem estruturadas
- Seja empático e inclusivo

### 3. ACESSIBILIDADE
- Formate respostas para facilitar leitura por sintetizadores de voz
- Use pontuação adequada para pausas naturais
- Evite abreviações que possam confundir
- Numere itens quando listar informações

${specificInstructions}

${conversationContext}

---

## CONTEÚDO DAS NOTÍCIAS:
${contexto}

---

## PERGUNTA DO USUÁRIO:
"${msgText}"

## SUA RESPOSTA:
Baseando-me nas informações da notícia, vou responder de forma clara e acessível:`;

      console.log("Prompt completo:", prompt); // PARA VER O PROMPT NO CONSOLE

      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        }),
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        const responseText = data.candidates[0].content.parts[0].text;
        const botMessage = { role: "bot", content: responseText };
        setMessages((prev) => [...prev, botMessage]);
        speak(responseText);
      } else {
        throw new Error("Resposta inválida da API do Gemini");
      }
      
      setInput("");
    } catch (error) {
      console.error("Erro ao conversar com o modelo:", error);
      const errorMessage = { role: "bot", content: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const quickPrompts = [
    "📋 Resuma esta notícia em 3 pontos principais",
    "🔍 Explique os detalhes mais importantes",
    "💡 Por que essa notícia é relevante?",
    "👥 Como isso afeta as pessoas?",
    "📚 Explique com palavras mais simples",
    "❓ Tire minhas dúvidas sobre o tema"
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
            <button className="send-button" onClick={() => sendMessage()} title="Enviar">
              <IoMdSend size={20} />
            </button>
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
