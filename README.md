# Skill Up Brasil - Talent Hub (Frontend)

<p align="center">
  <img src="./src/assets/SkillUp.png" alt="Logo Skill Up Brasil" width="150"/>
</p>

## 📝 Sumário

*   [Sobre o Projeto](#-sobre-o-projeto)
*   [Status do Projeto](#-status-do-projeto)
*   [Tecnologias Utilizadas](#-tecnologias-utilizadas)
*   [Estrutura de Pastas](#-estrutura-de-pastas)
*   [Endpoints ou Rotas Principais](#-endpoints-ou-rotas-principais)
*   [Instalação](#-instalação)
*   [Como Usar](#-como-usar)
*   [Demonstração](#-demonstração)
*   [Autores e Créditos](#-autores-e-créditos)
*   [Contato](#-contato)

***

## 💡 Sobre o Projeto

O **Skill Up Brasil - Talent Hub** é uma plataforma inovadora desenvolvida para **democratizar o acesso às habilidades do futuro**, conectando pessoas através de educação tecnológica personalizada e um ecossistema de troca de conhecimento humano e sustentável.

Este repositório contém o código-fonte do **Frontend** da aplicação, construído com **React** e **TypeScript**. Ele é responsável pela interface do usuário, permitindo a navegação pelos módulos de Cursos, Mentoria e o marketplace de Escambo IA, além de gerenciar o progresso e as transações dos usuários.

***

## 🚀 Status do Projeto

| Status | Descrição |
| :--- | :--- |
| **Concluído** | O projeto está em sua versão final de entrega, com todas as funcionalidades principais implementadas e prontas para demonstração. |

***

## 💻 Tecnologias Utilizadas

O projeto de frontend foi desenvolvido utilizando as seguintes tecnologias:

| Categoria | Tecnologia | Versão | Descrição |
| :--- | :--- | :--- | :--- |
| **Framework** | React | ^19.2.0 | Biblioteca JavaScript para construção de interfaces de usuário. |
| **Linguagem** | TypeScript | ~5.9.3 | Superset do JavaScript que adiciona tipagem estática. |
| **Roteamento** | `react-router-dom` | ^7.9.6 | Gerenciamento de rotas e navegação na aplicação. |
| **Estilização** | Tailwind CSS | ^4.1.17 | Framework CSS *utility-first* para estilização rápida e responsiva. |
| **Build Tool** | Vite | ^7.2.2 | Ferramenta de *build* e servidor de desenvolvimento rápido. |
| **Ícones** | `lucide-react` | ^0.554.0 | Biblioteca de ícones para a interface. |

***

## 📂 Estrutura de Pastas

A estrutura de pastas do projeto segue o padrão de aplicações React, com foco na organização por funcionalidades e tipos de arquivos:

```
SkillUpBrasil/
├── public/
├── src/
│   ├── assets/             # Imagens, logos e outros arquivos estáticos
│   ├── components/         # Componentes reutilizáveis (Header, Footer, Botões, etc.)
│   │   └── login/          # Componentes específicos para a tela de login
│   ├── pages/              # Páginas principais da aplicação
│   │   ├── dashboard/      # Páginas de gestão (CRUD) dos recursos
│   │   │   ├── curso/
│   │   │   ├── mentoria/
│   │   │   ├── ...         # Outros módulos de gestão (usuario, progresso, etc.)
│   │   ├── mentoria/       # Páginas de visualização e interação com mentorias
│   │   ├── ContatoPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── ...             # Outras páginas (Faq, QuemSomos, Recursos)
│   ├── App.tsx             # Componente principal e roteamento
│   ├── main.tsx            # Ponto de entrada da aplicação
│   └── index.css           # Estilos globais
├── package.json            # Dependências e scripts do projeto
└── vite.config.ts          # Configuração do Vite
```

***

## 🗺️ Endpoints ou Rotas Principais

As rotas da aplicação são gerenciadas pelo `react-router-dom` e correspondem às diferentes telas acessíveis pelo usuário:

| Rota | Descrição | Acesso |
| :--- | :--- | :--- |
| `/` | **Home Page:** Página inicial e de apresentação da plataforma. | Público |
| `/login` | **Login Page:** Tela de autenticação para acesso ao dashboard. | Público |
| `/cursos` | **Cursos Page:** Visualização das trilhas de aprendizado disponíveis. | Público |
| `/mentoria` | **Mentoria Page:** Visualização e agendamento de sessões de mentoria. | Público |
| `/dashboard` | **Dashboard:** Painel de controle principal do usuário. | Privado |
| `/dashboard/curso` | **Gestão de Cursos:** CRUD para a entidade Curso (Acesso administrativo). | Privado |
| `/dashboard/usuario` | **Gestão de Usuários:** CRUD para a entidade Usuário (Acesso administrativo). | Privado |
| `/dashboard/troca-escambo` | **Gestão de Escambo:** CRUD para as transações de troca de habilidades. | Privado |
| `/faq` | **FAQ Page:** Perguntas Frequentes sobre a plataforma. | Público |
| `/quem-somos` | **Quem Somos Page:** Informações sobre a equipe e a missão da Skill Up Brasil. | Público |

***

## ⚙️ Instalação

Para configurar e rodar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Nicolas-Ramiro/SkillUpBrasil.git
    cd SkillUpBrasil
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    pnpm install
    ```

3.  **Configure a API (Backend):**
    *   Este frontend depende de uma API RESTful para funcionar. Certifique-se de que o backend (projeto Java/Quarkus) esteja rodando e acessível.
    *   Verifique e ajuste a URL base da API no código-fonte, se necessário (geralmente em um arquivo de configuração ou *service*).

***

## ▶️ Como Usar

Para iniciar o servidor de desenvolvimento local:

```bash
npm run dev
# ou
pnpm run dev
```

O projeto será iniciado em `http://localhost:5173` (ou outra porta indicada pelo Vite).

Para gerar a versão de produção:

```bash
npm run build
# ou
pnpm run build
```

Os arquivos estáticos otimizados serão gerados no diretório `dist/`.

***

## 📺 Demonstração

| Tipo | Link |
| :--- | :--- |
| **Repositório GitHub** | [https://github.com/Nicolas-Ramiro/SkillUpBrasil](https://github.com/Nicolas-Ramiro/SkillUpBrasil) |
| **Vídeo de Demonstração** | [https://youtu.be/lo97igC4kOs](https://youtu.be/lo97igC4kOs) |
| **Repositorio na VERCEL** | [https://skill-up-brasil.vercel.app/](https://skill-up-brasil.vercel.app/)|

### Screenshots / Demonstração

<img width="1864" height="892" alt="image" src="https://github.com/user-attachments/assets/4dc5c31f-7e81-4432-9d9f-9cdfb002b67f" />
<img width="1846" height="861" alt="image" src="https://github.com/user-attachments/assets/e1bb85d8-191a-448e-9f7b-190c3f4defec" />
<img width="1839" height="812" alt="image" src="https://github.com/user-attachments/assets/6906b858-6c44-4099-b195-fd74d969e143" />

***

## 👥 Autores e Créditos

O projeto **Skill Up Brasil - Talent Hub** foi desenvolvido pelos seguintes membros:

*   **Nicolas Monteiro Ramiro**
*   **Hebert Lopes da Silva**
*   **Marcus Vinivius Vila Nova**

***

## 📞 Contato

Para dúvidas, sugestões ou mais informações sobre o projeto, entre em contato com os autores através do repositório GitHub.

| Nome | GitHub |
| :--- | :--- |
| Nicolas Monteiro Ramiro | [https://github.com/Nicolas-Ramiro](https://github.com/Nicolas-Ramiro) |
| Hebert Lopes da Silva | [https://github.com/hebertlps](https://github.com/hebertlps) |
| Marcus Vinivius Vila Nova | [https://github.com/marcusvilanova](https://github.com/marcusvilanova) |
