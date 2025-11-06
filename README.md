# EXPRESSO CONSULTORIA

# 📊 Dashboard Financeiro — Next.js + PrimeReact

Um painel administrativo moderno e responsivo para visualização e análise de dados financeiros, desenvolvido com **Next.js**, **PrimeReact** e **Styled-components**.

O sistema simula a integração com uma API financeira e apresenta recursos como filtros por data, gráficos de desempenho, indicadores resumidos (cards) e tabela de resultados.

- [x] Dashboard moderno e responsivo
- [x] Opções de Filtro por data e Centro de Custo (com lazy loading)
- [x] Exportar para PDF
- [x] Consumir os dados de API Rest

## 🚀 Tecnologias e Ferramentas Utilizadas

| **Framework Web** | [Next.js 14+](https://nextjs.org/) | Framework React com suporte a SSR e rotas App Router |  
| **UI Components** | [PrimeReact](https://primereact.org/) | Biblioteca de componentes visuais com tema moderno |  
| **Estilização** | [Styled-components](https://styled-components.com/) | CSS-in-JS para escopar estilos e customizar componentes |  
| **Gráficos** | [Chart.js](https://www.chartjs.org/) via `primereact/chart` | Exibição de dados financeiros por período |  
| **Estado / Hooks** | React Hooks (`useState`, `useEffect`) | Gerenciamento de estado e efeitos assíncronos |  
| **Mock API** | Arquivo `mockData.js` | Simulação de dados vindos de uma API financeira |  
| **Skeleton Loading** | PrimeReact `Skeleton` / `ProgressBar` | Placeholders visuais durante o carregamento |

## 📁 Estrutura do Projeto

📦 src  
┣ 📂 app  
┃ ┣ 📜 page.js # Página de acesso ao Login  
┃ ┗ 📂 dashboard  
┃ ┗ 📜 page.js # Página principal do dashboard  
┣ 📂 Components  
┃ ┣ 📂 dashboard  
┃ ┃ ┣ 📂 header # Cabeçalho fixo do sistema  
┃ ┃ ┣ 📂 filterBar # Barra de filtros (datas, centro de custo, emitidos)  
┃ ┃ ┃ ┣ 📜 filterBar.jsx  
┃ ┃ ┃ ┣ 📜 styles.js  
┃ ┃ ┃ ┗ 📜 loading.js # Skeleton da barra de filtros  
┃ ┃ ┣ 📂 infoCards # Cards com indicadores financeiros  
┃ ┃ ┃ ┣ 📜 infoCards.jsx  
┃ ┃ ┃ ┣ 📜 styles.js  
┃ ┃ ┃ ┗ 📜 loading.js # Skeleton dos cards  
┃ ┃ ┣ 📂 periodChart # Gráfico de linha (Receita x Despesa)  
┃ ┃ ┃ ┣ 📜 periodChart.jsx  
┃ ┃ ┃ ┣ 📜 styles.js  
┃ ┃ ┃ ┗ 📜 loading.js # Skeleton do gráfico  
┃ ┃ ┣ 📂 resultTable # Tabela de resultados agrupados  
┃ ┃ ┣ 📜 resultTable.jsx  
┃ ┃ ┣ 📜 styles.js  
┃ ┃ ┗ 📜 loading.js # Skeleton da tabela  
┣ 📂 context  
┃ ┗ 📜 UserContext.js # Context API para controle de estado do login  
┣ 📂 hooks  
┃ ┗ 📜 useFinanceData.js # Hook customizado para buscar e filtrar dados da API mockada  
┣ 📂 data  
┃ ┗ 📜 mockData.js # Mock de dados financeiros (simula a API /api/finance)  
┗ 📜 globals.css # Estilos globais opcionais

## 🧠 Principais Funcionalidades

✅ **Filtros Dinâmicos** — seleção de datas, centros de custo e status “emitidos” com atualização automática dos componentes.  
✅ **Indicadores Financeiros (InfoCards)** — cálculo e exibição de totais de Receita, Despesa, Lucro, Contas Vencidas e a Vencer.  
✅ **Gráfico de Período (Chart)** — comparação visual de receitas e despesas por data.  
✅ **Tabela de Resultados (DataTable)** — agrupamento por usuário, com totais e colunas calculadas dinamicamente.  
✅ **Loadings inteligentes** — skeletons e barras de progresso que refletem a experiência real de carregamento de API.  
✅ **Estilização Modular** — cada componente possui seu próprio `styles.js`, mantendo o layout isolado e reutilizável.  
✅ **Mock API Simulada** — os dados vêm de `mockData.js`, simulando uma chamada HTTP real (`/api/finance`).

## ⚙️ Como Executar o Projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/gpjgabriel/EXPRESSO.git
cd expresso
```

### 2️⃣ Instalar dependências

```bash
npm install
 ou
yarn install
```

### 3️⃣ Executar em modo de desenvolvimento

```bash
npm run dev
 ou
yarn dev
```

O projeto estará disponível em:
👉 http://localhost:3000

🔑 Para login:  
 👨‍💻 Usuário: Admin | Departamento: Financeiro  
 ou  
 ⬇️ Clique no botão que já será redirecionado com o usuário padrão.

## 🧪 Próximos Passos

- [ ] Adicionar testes unitários e de integração - _Em Desenvolvimento_

👨‍💻 Autor

Desenvolvido por: Gabriel Paiva Justo  
📧 gpj_gabriel@hotmail.com  
💼 LinkedIn: linkedin.com/in/gabriel-paiva-justo
