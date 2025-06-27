# Notícias

Projeto de uma página de notícias com foco em acessibilidade e uso de Inteligência Artificial .

## Principais Funcionalidades

- **Leitura de notícias**: Apresenta notícias organizadas por categorias, com destaque em carrossel e agrupamento por tags.
- **Acessibilidade**:
  - Controle de tamanho da fonte.
  - Alternância de contraste de cores.
  - Opção entre fontes com ou sem serifa.
  - Atalhos por teclado (ex: iniciar leitura, voltar, ir para home).
  - Suporte a leitura de conteúdo por voz (Web Speech) e controle por comandos de voz.
  - Integração com o plugin VLibras para tradução em Libras.
- **Chatbot com IA local**:
  - Assistente para dúvidas e explicações acessíveis sobre notícias.
  - Utiliza modelo local via [Ollama](https://ollama.com/) (modelo: `mistral`).

## Tecnologias Utilizadas

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- JavaScript
- [Ollama](https://ollama.com/) para IA local (modelo Mistral)
- Web Speech API (leitura e reconhecimento de voz)
- [VLibras](https://www.gov.br/governodigital/pt-br/vlibras) para acessibilidade em Libras

## Como rodar o projeto

### 1. Requisitos

- Node.js e npm instalados
- [Ollama](https://ollama.com/) instalado
- Modelo Mistral baixado no Ollama (`ollama pull mistral`)

### 2. Iniciar o backend da IA local

Em um terminal, rode:
```bash
ollama run mistral
```
> **Observação:** O tempo de inicialização e resposta do modelo depende do seu hardware. A IA precisa estar ativa para que o chatbot funcione.

### 3. Rodar o frontend (React/Vite)

Em outro terminal, rode:
```bash
npm install
npm run dev
```

O projeto estará disponível normalmente em [http://localhost:5173](http://localhost:5173) (ou porta que o Vite indicar).

## Atalhos de teclado

- **1**: Ativar/desativar escuta por voz (comandos como "ler", "parar", "home", "voltar")
- **2**: Ir para a página inicial
- **3**: Iniciar leitura da notícia atual
- **4**: Parar leitura

## Estrutura do Projeto

- `src/`
  - `App.jsx`: Componente principal, controla rotas, menu e integra acessibilidade e IA.
  - `components/`: Componentes de Home, Main (leitura/acessibilidade), ChatBot, Acessibilidade, etc.
  - `Noticia.jsx`: Página de visualização individual de notícia.
- `public/`
  - `logo_news.png`: Logo do projeto.
  - `News.json`: Fonte dos dados das notícias.

## Observações

- O projeto não possui backend próprio para persistência; as notícias são carregadas de um arquivo JSON local.
- O chatbot de acessibilidade responde sempre baseado no conteúdo da notícia. Perguntas não relacionadas são ignoradas.
- Para funcionamento da leitura por voz e reconhecimento, é necessário que o navegador suporte a Web Speech API (recomendado: Google Chrome ou Microsoft Edge).


Feito por [Cesarkwy](https://github.com/Cesarkwy)
