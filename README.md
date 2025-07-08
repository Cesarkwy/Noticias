# TCC - Sistema de Notícias com ChatBot IA

Aplicativo de notícias acessível com ChatBot IA.

## Principais Funcionalidades
- Leitura de conteúdo por voz (Web Speech API)
- Reconhecimento de voz para entrada de mensagens (Web Speech API)
- ChatBot que responde perguntas e resumos baseados nas notícias
- Interface acessível e responsiva para usuários com diferentes necessidades

## Como iniciar o projeto
1. Clone o repositório e acesse a pasta:
   ```bash
   git clone https://github.com/Cesarkwy/Noticias.git
   cd Noticias
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure a API:
   ```bash
   cp .env.example .env
   # Preencha VITE_GEMINI_API_KEY no .env
   ```
4. Execute em modo desenvolvimento:
   ```bash
   npm run dev  # http://localhost:5173
   ```

## Atalhos de teclado

- **1**: Ativar/desativar escuta por voz (comandos como "ler", "parar", "home", "voltar")
- **2**: Ir para a página inicial
- **3**: Iniciar leitura da notícia atual
- **4**: Parar leitura

## Estrutura do Projeto
```
Noticias/
├─ public/
│  └─ News.json          # Dados das notícias
├─ src/
│  ├─ components/
│  │  ├─ ChatBot.jsx
│  │  ├─ Home.jsx
│  │  └─ Acessibilidade.jsx
│  ├─ App.jsx
│  ├─ Noticia.jsx
│  └─ main.jsx
├─ .env.example
└─ package.json
```

## Observações
- O projeto não possui backend próprio para persistência; as notícias são carregadas de um arquivo JSON local.
- O chatbot de acessibilidade responde sempre baseado no conteúdo da notícia. Perguntas não relacionadas são ignoradas.
- Para funcionamento da leitura por voz e reconhecimento, é necessário que o navegador suporte a Web Speech API (recomendado: Chrome ou Edge).
