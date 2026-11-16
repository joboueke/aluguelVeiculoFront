Edite e expanda o projeto RentCar já existente, preservando integralmente a identidade visual e o design system das telas atuais.

IMPORTANTE:
- Não redesenhe do zero as telas existentes.
- Não altere desnecessariamente a estrutura das telas já prontas.
- Use as telas existentes como referência visual obrigatória.
- Mantenha a mesma paleta de cores, tipografia, navbar, botões, inputs, cards, badges, bordas, sombras, espaçamentos e estilo geral.
- O resultado deve parecer parte do mesmo sistema, e não um novo projeto.
- Mantenha o nome "RentCar".
- Interface em português do Brasil.
- Priorize desktop, seguindo as dimensões e proporções das telas existentes.

O sistema é uma plataforma de aluguel de veículos com dois contextos principais:
1. Área do Cliente
2. Área Administrativa/Operacional

As telas existentes atualmente são:
- Home / catálogo de veículos
- Minhas Reservas
- Minhas Cobranças

Essas três telas devem ser consideradas parte da ÁREA DO CLIENTE.

==================================================
1. ADICIONAR TELA DE LOGIN
==================================================

Crie uma nova tela de Login antes do acesso ao sistema.

Ela deve seguir a mesma identidade visual do RentCar.

Não criar seleção manual "Cliente ou Administrador".

O usuário deve informar:
- E-mail
- Senha

Elementos:
- Logo RentCar
- Título "Bem-vindo de volta"
- Subtítulo "Entre para acessar sua conta"
- Campo E-mail
- Campo Senha
- Ícone para mostrar/ocultar senha
- Checkbox "Lembrar de mim"
- Link "Esqueci minha senha"
- Botão principal "Entrar"
- Texto/link "Não possui uma conta? Cadastre-se"

O tipo do usuário será identificado pelo sistema após o login.

Existem três tipos de usuário:
1 = Cliente
2 = Funcionário
3 = Administrador

Cliente será direcionado para a Home atual.
Funcionário e Administrador serão direcionados para a área administrativa.

Não é necessário mostrar esses códigos numéricos na interface.

==================================================
2. AJUSTAR NAVEGAÇÃO DA ÁREA DO CLIENTE
==================================================

Preserve as três telas existentes.

Na navbar superior, mantenha:
- Logo RentCar à esquerda
- Usuário autenticado à direita, como já existe

Ao clicar no usuário, manter o dropdown com as paginas que já existem


A navegação do cliente deve permitir acessar:
- Veículos / Home
- Minhas Reservas
- Minhas Cobranças

Não adicionar Manutenção à área do cliente.

Preservar o conteúdo e estilo atuais das telas:
- catálogo e filtros de veículos;
- cards de veículos;
- Minhas Reservas;
- Minhas Cobranças.

==================================================
3. CRIAR ÁREA ADMINISTRATIVA
==================================================

Crie uma interface administrativa separada visualmente da área do cliente, mas utilizando exatamente o mesmo design system do RentCar.

Criar um layout administrativo com:

NAVBAR SUPERIOR:
- Logo RentCar
- Nome do usuário
- Identificação discreta do perfil, como "Administrador" ou "Funcionário"
- Avatar
- Dropdown com "Minha conta" e "Sair"

MENU LATERAL:
- Dashboard
- Frota
- Reservas
- Cobranças
- Manutenções

Utilizar o azul escuro já existente no sistema no menu lateral e/ou navbar.
Destacar o item atualmente selecionado utilizando o azul claro já usado nos botões do RentCar.

==================================================
4. DASHBOARD ADMINISTRATIVO
==================================================

Criar a página inicial da área administrativa.

Título:
"Dashboard"

Subtítulo:
"Visão geral da operação da locadora"

Criar quatro cards de indicadores:

1. Frota
Exemplo:
32 veículos

2. Reservas
Exemplo:
12 reservas ativas

3. Cobranças
Exemplo:
4 cobranças pendentes

4. Manutenções
Exemplo:
3 veículos em manutenção

Abaixo, criar uma seção:
"Atividades recentes"

Mostrar exemplos como:
- R-025 — Nova reserva — Confirmada
- M-008 — Toyota Corolla — Em manutenção
- C-019 — Cobrança — Pendente

Usar badges de status seguindo o padrão visual existente.

==================================================
5. CRIAR TELA "GESTÃO DE MANUTENÇÕES"
==================================================

Essa será uma tela administrativa.

Manter navbar e menu lateral da área administrativa.

Título:
"Gestão de Manutenções"

Subtítulo:
"Acompanhe e gerencie as manutenções da frota"

Adicionar botão principal no canto superior direito:
"+ Nova manutenção"

Criar cards de resumo:
- Agendadas
- Em andamento
- Concluídas
- Total de manutenções

Adicionar área de filtros contendo:
- Busca por veículo ou placa
- Tipo de manutenção
- Status
- Período

Tipos de manutenção:
- Preventiva
- Corretiva
- Inspeção

Status:
- Agendada
- Em andamento
- Concluída
- Cancelada

Abaixo dos filtros, criar uma tabela/listagem contendo:

- Código
- Veículo
- Placa
- Tipo
- Quilometragem
- Data de início
- Previsão de término
- Status
- Custo
- Ações

Exemplos:

M-001
Toyota Corolla
ABC-1234
Preventiva
52.430 km
20/09/2026
22/09/2026
Em andamento
R$ 850,00

M-002
Honda Civic
DEF-5678
Corretiva
68.200 km
23/09/2026
25/09/2026
Agendada
R$ 0,00

Usar badges:
- Agendada: amarelo/laranja suave
- Em andamento: azul
- Concluída: verde
- Cancelada: vermelho

Cada manutenção deve possuir ações:
- Ver detalhes
- Editar
- Concluir
- Cancelar

As ações podem ficar dentro de um menu de três pontos para manter a interface limpa.

==================================================
6. MODAL "NOVA MANUTENÇÃO"
==================================================

Ao clicar em "+ Nova manutenção", criar um modal.

Título:
"Registrar manutenção"

Campos:

Veículo
Select com modelo e placa.
Exemplo:
"Toyota Corolla — ABC-1234"

Tipo de manutenção
Select:
- Preventiva
- Corretiva
- Inspeção

Tipo de serviço
Select com o serviço que será realizado.

Quilometragem
Campo numérico.

Data de início
Campo de data.

Previsão de término
Campo de data.

Descrição
Textarea.

Exemplo:
"Troca de óleo, filtros e revisão geral do veículo."

Botões:
- Cancelar
- Registrar manutenção

==================================================
7. DETALHES DA MANUTENÇÃO
==================================================

Criar também o estado/modal de visualização de uma manutenção.

Exibir:

- Código da manutenção
- Veículo
- Placa
- Tipo
- Status
- Quilometragem
- Data de início
- Previsão de término
- Data de conclusão, quando houver
- Funcionário responsável
- Descrição
- Custo total

Criar uma seção:
"Serviços realizados"

Exibir os serviços relacionados à manutenção com:
- Descrição
- Custo parcial
- Custo adicional
- Indicação de imprevisto, quando existir

Exemplo:

Troca de óleo
R$ 250,00

Troca de pastilhas de freio
R$ 400,00
Imprevisto identificado durante a manutenção

Custo total:
R$ 650,00

Quando a manutenção estiver "Em andamento", disponibilizar:
- Editar
- Concluir manutenção
- Cancelar

==================================================
8. CONSISTÊNCIA DOS STATUS
==================================================

Manter consistência visual em todo o projeto.

Veículos:
- Disponível = verde
- Reservado = amarelo/laranja
- Alugado = azul
- Em manutenção = vermelho
- Inativo = cinza

Reservas:
- Pendente = amarelo/laranja
- Confirmada = azul
- Em andamento = azul
- Finalizada = verde
- Cancelada = vermelho

Cobranças:
- Pendente = amarelo/laranja
- Paga = verde
- Cancelada = vermelho
- Falhou = vermelho

Manutenções:
- Agendada = amarelo/laranja
- Em andamento = azul
- Concluída = verde
- Cancelada = vermelho

==================================================
9. REGRAS DE UX E DESIGN
==================================================

Reutilize os componentes existentes sempre que possível.

Manter:
- fundo claro;
- azul escuro como cor institucional;
- azul claro como cor de ação;
- cards brancos;
- bordas suaves;
- cantos arredondados;
- sombras discretas;
- badges coloridos;
- tipografia e hierarquia visual das telas existentes;
- bastante espaço em branco;
- interface moderna e limpa.

Evite:
- gradientes excessivos;
- sombras pesadas;
- excesso de cores;
- mudanças na identidade visual existente;
- criar uma aparência diferente entre a área administrativa e a área do cliente.

O painel administrativo deve parecer uma extensão natural do RentCar existente.

==================================================
10. FLUXO FINAL
==================================================

Representar visualmente o seguinte fluxo:

LOGIN
↓
Identificação automática do perfil

CLIENTE:
Login
→ Home / Veículos
→ Minhas Reservas
→ Minhas Cobranças

FUNCIONÁRIO / ADMINISTRADOR:
Login
→ Dashboard Administrativo
→ Frota
→ Reservas
→ Cobranças
→ Manutenções

Não misturar funcionalidades administrativas com a área do cliente.

Priorize a criação das novas telas e componentes sem apagar ou descaracterizar as telas existentes.