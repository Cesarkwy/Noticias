# TCC2 - Sistema de Notícias com ChatBot IA

Sistema de notícias acessível com chatbot inteligente usando Google Gemini AI.

## 🚀 Funcionalidades

- Visualização de notícias
- ChatBot com IA (Google Gemini)
- Funcionalidades de acessibilidade
- Síntese de voz
- Reconhecimento de fala

## 🛠️ Configuração

### 1. Instalação das dependências
```bash
npm install
```

### 2. Configuração da API do Google Gemini

1. Crie um arquivo `.env` na raiz do projeto
2. Adicione sua chave da API do Google Gemini:
```
VITE_GEMINI_API_KEY=sua_chave_api_aqui
```

### 3. Execução do projeto
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🔧 Tecnologias Utilizadas

- **React 18** - Framework frontend
- **Vite** - Build tool
- **Google Gemini AI** - Inteligência artificial
- **React Router** - Navegação
- **React Icons** - Ícones
- **Speech Synthesis API** - Síntese de voz
- **Web Speech API** - Reconhecimento de fala

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ChatBot.jsx       # Componente do chatbot com IA
│   ├── Home.jsx          # Página inicial
│   └── Acessibilidade.jsx # Funcionalidades de acessibilidade
├── App.jsx               # Componente principal
├── Noticia.jsx           # Visualização de notícias
└── main.jsx              # Ponto de entrada
```

## 🤖 Como funciona o ChatBot

O ChatBot utiliza a API do Google Gemini 2.0 Flash com um sistema de prompt robusto e inteligente:

### 🧠 **Sistema de Prompt Avançado**
- **Detecção automática do tipo de pergunta**: Identifica se é resumo, explicação, contexto, detalhes ou opinião
- **Instruções específicas por tipo**: Cada tipo de pergunta recebe instruções personalizadas
- **Contexto histórico**: Mantém consistência com as respostas anteriores na conversa
- **Formatação para acessibilidade**: Otimizado para leitores de tela e síntese de voz

### 📝 **Tipos de Resposta Inteligentes**
- **Resumos**: 3 pontos principais numerados com estrutura clara
- **Explicações**: Linguagem simples com analogias do cotidiano
- **Contexto**: Causas, histórico e consequências
- **Detalhes**: Informações específicas (datas, locais, números)
- **Questões de opinião**: Foco em fatos objetivos e múltiplas perspectivas

### 💬 **Prompts Rápidos Otimizados**
- 📋 Resuma esta notícia em 3 pontos principais
- 🔍 Explique os detalhes mais importantes  
- 💡 Por que essa notícia é relevante?
- 👥 Como isso afeta as pessoas?
- 📚 Explique com palavras mais simples
- ❓ Tire minhas dúvidas sobre o tema

### 🎯 **Funcionalidades Principais**
- Responder perguntas sobre as notícias
- Fornecer resumos acessíveis
- Explicar conteúdo de forma simples
- Integração com síntese de voz para acessibilidade
- Manutenção de contexto na conversa
- Detecção inteligente do tipo de pergunta

## 🔐 Segurança

- A chave da API está configurada em variáveis de ambiente
- O arquivo `.env` está incluído no `.gitignore`
- Use o `.env.example` como referência

## 📝 Comandos Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Visualiza build de produção
```

## 🆘 Solução de Problemas

### ChatBot não responde
1. Verifique se a chave da API está correta no arquivo `.env`
2. Confirme que a chave tem permissões para usar a API do Gemini
3. Verifique a conexão com a internet

### Síntese de voz não funciona
- Certifique-se de que o navegador suporta Speech Synthesis API
- Teste em navegadores modernos (Chrome, Firefox, Safari)

## 📄 Licença

Este projeto é parte de um Trabalho de Conclusão de Curso (TCC).
