import Report from '../classes/Report.js';


const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

const formatDate = date => date.toISOString().split('T')[0];

const pieChartColors = [
  '#3A0CA3', '#6BCB77', '#FF8C42', '#4BC0C0', '#9966FF',
  '#FF9F40', '#C9CBCF', '#00A8E8', '#F94144', '#90BE6D',
  '#577590', '#F3722C', '#43AA8B', '#F8961E', '#277DA1',
  '#F9844A', '#B5179E', '#7209B7', '#560BAD', '#480CA8',
  '#FF6384', '#4361EE', '#4895EF', '#4CC9F0', '#FF6B6B',
  '#FFD93D', '#36A2EB', '#4D96FF', '#FFCE56', '#8338EC'
];

const cardsData = [
  {
    title: "Entradas por Categoria",
    description: "As categorias com maior número de entradas em finanças",
    imgSrc: "imgs/money-bill-wave-gray.svg",
    buttonText: "Ver Relátorio",
    chartRenderFunction: "getIncomesCategory",
    reportExportFunction: "exportIncomesCategory",
    filterInputs: [
        {
            labelText: 'Data Inicial',
            inputClass: 'w-full',
            inputName: 'start_date',
            inputValue: formatDate(startOfMonth),
        },
        {
            labelText: 'Data Final',
            inputClass: 'w-full',
            inputName: 'end_date',
            inputValue: formatDate(endOfMonth),
        }
    ],
    settings: {
        "chartName": "incomesCategory",
        "type": "bar",
        "converter": "real",
        "selector": "#canvas-chart",
        "labels": ['Salário', 'Freelance', 'Investimentos', 'Outros'],
        "label": 'Entradas',
        "data": [5000, 1200, 800, 300],
        "text": "Entradas",
        "color": "#31c429ff"
    },
  },
  {
    title: "Saídas por Categoria",
    description: "As categorias com maior número de saídas em finanças",
    imgSrc: "imgs/piggy-bank-gray.svg",
    buttonText: "Ver Relátorio",
    chartRenderFunction: "getExpensesCategory",
    reportExportFunction: "exportExpensesCategory",
    filterInputs: [
        {
            labelText: 'Data Inicial',
            inputClass: 'w-full',
            inputName: 'start_date',
            inputValue: formatDate(startOfMonth),
        },
        {
            labelText: 'Data Final',
            inputClass: 'w-full',
            inputName: 'end_date',
            inputValue: formatDate(endOfMonth),
        }
    ],
    settings: {
        "chartName": "expensesCategory",
        "type": "bar",
        "converter": "real",
        "selector": "#canvas-chart",
        "labels": ['Alimentação', 'Transporte', 'Aluguel', 'Lazer', 'Outros'],
        "label": 'Saídas',
        "data": [1000, 300, 2000, 400, 150],
        "text": "Saídas",
        "color": "#ce2e2eff"
    },
  },
  {
    title: "Alocação de Tempo por Categoria",
    description: "Quanto tempo você dedicou a cada categoria de tarefa",
    imgSrc: "imgs/clock-gray.svg",
    buttonText: "Ver Relátorio",
    chartRenderFunction: "getTimeAllocationCategory",
    reportExportFunction: "exportTimeAllocationCategory",
    filterInputs: [
            {
                labelText: 'Data Inicial',
                inputClass: 'w-full',
                inputName: 'start_date',
                inputValue: formatDate(startOfMonth),
            },
            {
                labelText: 'Data Final',
                inputClass: 'w-full',
                inputName: 'end_date',
                inputValue: formatDate(endOfMonth),
            }
    ],
    settings: {
        "chartName": "timeAllocationCategory",
        "type": "pie",
        "selector": "#canvas-chart",
        "labels": ['Categoria A', 'Categoria B', 'Categoria C'],
        "converter": "hours",
        "datasets": [{
                label: 'Tempo por Categoria',
                data: [30, 50, 20],
                backgroundColor: pieChartColors,
                hoverOffset: 4
        }],

    },
  },
  {
    title: "Entradas vs Saídas",
    description: "Todas as movimentações financeiras: entradas e saídas",
    imgSrc: "imgs/wallet-gray.svg",
    buttonText: "Ver Relátorio",
    chartRenderFunction: "getIncomeAndExpenses",
    reportExportFunction: "exportIncomeAndExpenses",
    filterInputs: [
        {
            labelText: 'Data Inicial',
            inputClass: 'w-full',
            inputName: 'start_date',
            inputValue: formatDate(startOfMonth),
        },
        {
            labelText: 'Data Final',
            inputClass: 'w-full',
            inputName: 'end_date',
            inputValue: formatDate(endOfMonth),
        }
    ],
    settings: {
        "chartName": "incomeAndExpenses",
        "converter": "real",
        "type": "line",
        "selector": "#canvas-chart",
        "labels": ['1', '5', '10', '15', '20', '25', '30'],
        "datasets": [
            {
                label: 'Entradas',
                data: [100, 2000, 3054, 50, 243, 9000, 15000],
                borderColor: '#008000ff',
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            },
            {
                label: 'Saídas',
                data: [4000, 423, 1000, 6000, 231, 900, 20],
                borderColor: '#ff000069',
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }
        ],
    },
  }
];


document.addEventListener('DOMContentLoaded', async ()=>{

    const report = new Report('report', cardsData);
    report.init();

    const btnCloseMenuMobile = document.querySelector('.btn-close-menu-mobile');
    const btnOpenMenuMobile = document.querySelector('.btn-open-menu-mobile');

    if(btnCloseMenuMobile){
        btnCloseMenuMobile.addEventListener("click", ()=>{
            document.querySelector(".screen-menu-mobile").classList.remove("d-flex");
            document.querySelector(".screen-menu-mobile").classList.add("none");
        })
    }

    if(btnOpenMenuMobile){
        btnOpenMenuMobile.addEventListener("click", ()=>{
            document.querySelector(".screen-menu-mobile").classList.add("d-flex");
            document.querySelector(".screen-menu-mobile").classList.remove("none");
        })
    }
})
