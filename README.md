Aluguel de Veículos — Frontend

Frontend do projeto Aluguel de Veículos, desenvolvido a partir de uma interface criada com auxílio da IA do Figma.

Tecnologias
Vite — ambiente de desenvolvimento e build.
Node.js — ambiente de execução.
NPM — gerenciamento de dependências.
Pré-requisitos

Antes de executar o projeto, instale:

Node.js
Visual Studio Code
Como executar o projeto localmente
1. Clonar o repositório
bash
git clone https://github.com/joboueke/aluguelVeiculoFront.git

2. Entrar na pasta do projeto
bash
cd aluguelVeiculoFront

3. Instalar as dependências
bash
npm install


Observação para Windows: caso o PowerShell bloqueie a execução do arquivo npm.ps1 por causa da política de execução de scripts, utilize npm.cmd no lugar de npm.

powershell
npm.cmd install

4. Iniciar o servidor de desenvolvimento
bash
npm run dev


No Windows PowerShell, caso necessário:

powershell
npm.cmd run dev


O Vite disponibilizará um endereço local, normalmente:

text
http://localhost:5173/


Abra esse endereço no navegador para visualizar a aplicação.

Outros comandos disponíveis
Gerar build de produção
bash
npm run build

Visualizar a build de produção
bash
npm run preview

Formatar o código
bash
npm run format

Estrutura e desenvolvimento

O projeto utiliza Vite para executar o ambiente de desenvolvimento e gerar a versão de produção.

As dependências e os comandos disponíveis estão definidos no arquivo package.json.

Repositório

GitHub — aluguelVeiculoFront
