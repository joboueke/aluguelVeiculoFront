Crie o frontend completo e responsivo de uma aplicação web para aluguel de veículos chamada "RentCar".

TECNOLOGIAS
- React
- JavaScript ou TypeScript
- Componentização e reutilização de componentes
- Interface responsiva para desktop, tablet e mobile
- O frontend posteriormente consumirá APIs REST de microserviços Node.js/NestJS.
- Não é necessário implementar o backend neste momento.
- Quando necessário, utilize dados mockados para representar veículos, usuários, reservas, cobranças e manutenções.

==================================================
1. IDENTIDADE VISUAL
==================================================

A aplicação deve transmitir:
- Confiança
- Modernidade
- Mobilidade
- Simplicidade
- Profissionalismo

Utilizar a seguinte paleta:

Cor primária:
#1E3A5F

Cor secundária / destaque:
#0EA5E9

Texto principal:
#1F2937

Texto secundário:
#64748B

Fundo:
#F8FAFC

Cards:
#FFFFFF

Bordas:
#E2E8F0

Sucesso / disponível:
#16A34A

Atenção / reservado:
#F59E0B

Erro / cancelado / manutenção:
#DC2626

Utilizar bastante espaço em branco.

Os cards devem possuir:
- Fundo branco
- Bordas suaves
- Cantos arredondados
- Sombras discretas
- Hierarquia visual clara

Os botões principais devem utilizar #0EA5E9.
A navbar/sidebar deve utilizar principalmente #1E3A5F.

Evitar excesso de gradientes, sombras fortes ou elementos decorativos.

A interface deve ter aparência de uma aplicação SaaS moderna.

==================================================
2. COMPONENTES GLOBAIS
==================================================

Criar componentes reutilizáveis para:

- Navbar
- Sidebar administrativa
- Footer
- Botão
- Input
- Select
- DatePicker
- Modal de confirmação
- Badge de status
- Loading
- Alertas
- Paginação
- Campo de pesquisa
- Filtros
- Tabelas
- Cards
- Card de veículo
- Empty State

Criar badges padronizados para status.

VEÍCULOS:

Disponível:
verde #16A34A

Reservado:
laranja #F59E0B

Alugado:
azul #0EA5E9

Em manutenção:
vermelho #DC2626

Inativo:
cinza #64748B

RESERVAS:

Pendente
Confirmada
Em andamento
Finalizada
Cancelada

COBRANÇAS:

Pendente
Paga
Cancelada
Falhou

==================================================
3. NAVEGAÇÃO
==================================================

Existirão dois contextos principais.

ÁREA DO CLIENTE:

- Veículos
- Minhas reservas
- Minhas cobranças
- Perfil
- Sair

ÁREA ADMINISTRATIVA:

- Dashboard
- Veículos
- Reservas
- Cobranças
- Manutenções
- Sair

A navegação deve destacar claramente a página atualmente selecionada.

==================================================
4. PÁGINA 1 — LOGIN
==================================================

Criar uma página de login moderna.

Elementos:

- Logo/nome RentCar
- Título "Bem-vindo"
- Texto "Entre para continuar"
- Campo e-mail
- Campo senha
- Checkbox "Lembrar de mim"
- Link "Esqueci minha senha"
- Botão "Entrar"
- Link "Ainda não possui conta? Cadastre-se"

Exibir mensagens de erro de validação.

A página deve funcionar bem em desktop e mobile.

==================================================
5. PÁGINA 2 — CADASTRO DE USUÁRIO
==================================================

Criar formulário de cadastro contendo:

- Nome completo
- CPF
- Data de nascimento
- E-mail
- Telefone
- Número da CNH
- Validade da CNH
- Senha
- Confirmar senha

Adicionar:

- Máscaras para CPF e telefone
- Validação dos campos
- Indicação visual de campos obrigatórios
- Botão "Criar conta"
- Link para voltar ao login

Organizar o formulário de maneira que não fique excessivamente longo.

==================================================
6. PÁGINA 3 — CATÁLOGO DE VEÍCULOS
==================================================

Esta será uma das principais páginas da aplicação.

Topo:

"Encontre o veículo ideal para sua viagem"

Adicionar filtros:

- Data de retirada
- Data de devolução
- Categoria
- Marca
- Faixa de preço
- Apenas veículos disponíveis

Adicionar botão:

"Buscar veículos"

Exibir veículos através de cards.

Cada card deve possuir:

- Foto do veículo
- Marca
- Modelo
- Ano
- Categoria
- Tipo de transmissão, se disponível
- Valor da diária
- Badge de disponibilidade
- Botão "Ver detalhes"

Exemplo:

Toyota Corolla
Sedan • Automático • 2025

R$ 180 / dia

● Disponível

[ Ver detalhes ]

Adicionar ordenação:

- Menor preço
- Maior preço
- Mais recentes

Criar estado visual para quando nenhum veículo for encontrado.

==================================================
7. PÁGINA 4 — DETALHES DO VEÍCULO
==================================================

Criar página detalhada do veículo.

Mostrar:

- Foto grande
- Possibilidade de galeria
- Marca
- Modelo
- Ano
- Cor
- Categoria
- Quilometragem
- Valor da diária
- Status

Criar uma área lateral ou card para reserva.

Campos:

Data de retirada
Data de devolução

Mostrar:

Valor da diária
Quantidade de diárias
Valor estimado

Exemplo:

R$ 180 x 4 dias = R$ 720

Adicionar botão:

"Reservar veículo"

Caso o veículo esteja indisponível, substituir por mensagem clara indicando indisponibilidade.

==================================================
8. PÁGINA 5 — NOVA RESERVA
==================================================

Criar página para confirmação da reserva.

Exibir resumo do veículo:

- Foto
- Marca
- Modelo
- Categoria

Exibir:

- Data e hora de retirada
- Data e hora de devolução
- Quantidade de diárias
- Valor da diária
- Valor estimado

Exibir dados básicos do cliente.

Adicionar checkbox:

"Confirmo que os dados da reserva estão corretos."

Botões:

"Voltar"
"Confirmar reserva"

Após confirmação, mostrar feedback visual de sucesso.

==================================================
9. PÁGINA 6 — MINHAS RESERVAS
==================================================

Criar página onde o cliente acompanha suas reservas.

Mostrar cards ou tabela responsiva contendo:

- Número da reserva
- Veículo
- Data de retirada
- Data de devolução
- Valor estimado
- Status

Adicionar filtros:

- Todas
- Pendentes
- Confirmadas
- Em andamento
- Finalizadas
- Canceladas

Permitir abrir detalhes da reserva.

Dentro dos detalhes mostrar:

- Informações do veículo
- Período
- Valor
- Status
- Linha do tempo da reserva

Exemplo:

Reserva criada
    ↓
Confirmada
    ↓
Veículo retirado
    ↓
Veículo devolvido
    ↓
Finalizada

Quando permitido, disponibilizar botão:

"Cancelar reserva"

A ação deve solicitar confirmação através de modal.

==================================================
10. PÁGINA 7 — GESTÃO DE VEÍCULOS
==================================================

Página administrativa.

Utilizar sidebar administrativa.

Topo:

"Gestão de Veículos"

Adicionar indicadores:

Total de veículos
Disponíveis
Alugados
Em manutenção

Adicionar botão:

"+ Cadastrar veículo"

Criar tabela contendo:

- ID
- Placa
- Marca
- Modelo
- Categoria
- Ano
- Quilometragem
- Valor da diária
- Status
- Ações

Ações:

- Visualizar
- Editar
- Inativar

Adicionar:

- Pesquisa
- Filtro por categoria
- Filtro por status
- Paginação

Criar formulário/modal para cadastrar e editar veículo.

Campos:

- Placa
- Marca
- Modelo
- Categoria
- Ano de fabricação
- Ano do modelo
- Cor
- Quilometragem
- Valor da diária
- Status

==================================================
11. PÁGINA 8 — GESTÃO DE RESERVAS
==================================================

Página administrativa para funcionários.

Topo:

"Gestão de Reservas"

Indicadores:

Reservas hoje
Confirmadas
Em andamento
Aguardando devolução

Criar tabela:

- ID
- Cliente
- Veículo
- Retirada
- Devolução
- Valor estimado
- Status
- Ações

Filtros:

- Cliente
- Veículo
- Status
- Período

Ações disponíveis:

- Visualizar
- Confirmar reserva
- Registrar retirada
- Registrar devolução
- Cancelar

Ao registrar retirada:

Solicitar:
- Quilometragem atual
- Data/hora da retirada

Ao registrar devolução:

Solicitar:
- Quilometragem final
- Data/hora da devolução

Mostrar confirmação antes das operações importantes.

==================================================
12. PÁGINA 9 — GESTÃO DE COBRANÇAS
==================================================

Página administrativa.

Topo:

"Gestão de Cobranças"

Indicadores:

Total pendente
Total recebido
Cobranças pendentes
Cobranças pagas

Criar tabela:

- ID
- Reserva
- Cliente
- Valor base
- Taxas
- Descontos
- Valor total
- Status
- Ações

Permitir visualizar detalhes da cobrança.

Nos detalhes mostrar os itens:

Diárias
Multa por atraso
Danos
Taxas adicionais
Descontos

Exemplo:

4 diárias             R$ 720
Multa por atraso      R$ 180
Taxa adicional        R$  50
Desconto             -R$  30
--------------------------------
TOTAL                  R$ 920

Permitir:

- Registrar pagamento
- Adicionar taxa
- Adicionar desconto

Formas de pagamento:

- PIX
- Cartão de crédito
- Cartão de débito
- Dinheiro

==================================================
13. PÁGINA 10 — GESTÃO DE MANUTENÇÃO
==================================================

Página administrativa.

Topo:

"Gestão de Manutenções"

Indicadores:

Em manutenção
Manutenções agendadas
Concluídas
Veículos próximos da revisão

Botão:

"+ Registrar manutenção"

Tabela:

- ID
- Veículo
- Tipo
- Quilometragem
- Início
- Previsão de término
- Status
- Custo
- Ações

Tipos:

1 - Preventiva
2 - Corretiva
3 - Inspeção

Status:

1 - Agendada
2 - Em andamento
3 - Concluída
4 - Cancelada

Ações:

- Visualizar
- Editar
- Concluir
- Cancelar

Na tela/modal de detalhes mostrar:

- Veículo
- Tipo
- Descrição
- Quilometragem
- Data de início
- Previsão de conclusão
- Serviços realizados
- Custos
- Status

Permitir adicionar serviços realizados durante a manutenção.

==================================================
14. DASHBOARD
==================================================

Caso seja necessário um dashboard para a área administrativa, ele pode ser incorporado à página inicial administrativa sem aumentar obrigatoriamente o número de páginas principais.

Mostrar cards:

- Veículos disponíveis
- Veículos alugados
- Reservas ativas
- Veículos em manutenção
- Cobranças pendentes

Mostrar também:

- Reservas recentes
- Próximas devoluções
- Manutenções em andamento

==================================================
15. RESPONSIVIDADE
==================================================

Todas as páginas devem funcionar em:

- Desktop
- Tablet
- Smartphone

Em dispositivos pequenos:

- Tabelas devem se adaptar ou virar cards
- Sidebar deve virar menu lateral recolhível
- Formulários devem usar uma coluna
- Cards devem ocupar a largura disponível
- Botões importantes devem permanecer facilmente acessíveis

==================================================
16. EXPERIÊNCIA DO USUÁRIO
==================================================

Implementar estados visuais para:

- Carregamento
- Sucesso
- Erro
- Lista vazia
- Operação em processamento
- Botão desabilitado

Utilizar modais de confirmação para ações destrutivas:

- Cancelar reserva
- Inativar veículo
- Cancelar manutenção

Não utilizar alert() nativo do navegador.

Exibir mensagens amigáveis.

Exemplo:

"O veículo não está disponível para o período selecionado."

Em vez de:

"Erro 409."

==================================================
17. ORGANIZAÇÃO DO CÓDIGO
==================================================

Organizar o projeto de maneira profissional.

Exemplo:

src/
├── components/
├── pages/
├── layouts/
├── services/
├── hooks/
├── contexts/
├── utils/
├── assets/
└── styles/

Separar páginas da área do cliente das páginas administrativas.

Criar componentes reutilizáveis e evitar duplicação de código.

Criar camada "services" preparada para posteriormente consumir as APIs REST.

==================================================
18. IMPORTANTE
==================================================

Não implementar todas as páginas como protótipos isolados.

Elas devem fazer parte da MESMA aplicação e compartilhar:

- Identidade visual
- Navbar
- Sidebar
- Componentes
- Tipografia
- Cores
- Padrão de formulários
- Padrão de tabelas
- Padrão de badges
- Navegação

A experiência deve parecer um único produto.

Priorizar clareza e usabilidade sobre elementos decorativos.

O resultado final deve ter aparência profissional, moderna e adequada para apresentação de um projeto universitário de arquitetura de microserviços.