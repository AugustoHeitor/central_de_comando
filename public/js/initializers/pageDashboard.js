import Dashboard from '../classes/pages/Dashboard.js';

let tasks = [];
let transactions = [];
let timeDistribution = [];

const itemsDropdown = [
    {
        "type": "inputDate",
        "label": "Data Inicial",
        "class": "input-start-date",
        "storageKey": "start_date"
    },
    {
        "type": "inputDate",
        "label": "Data Final",
        "class": "input-end-date",
        "storageKey": "end_date"
    }
];

const chartSettings = [
    {
        "type": "bar",
        "selector": "#container-time-distribution",
        "labels": ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        "label": 'Horas',
        "data": [0, 0, 0, 0, 0, 0, 0],
        "text": "Horas",
        "converter": "hours",
        "color": "#364dcd"
    }
]

document.addEventListener('DOMContentLoaded', async ()=>{

    const dashboard = new Dashboard('dashboard', tasks, transactions, timeDistribution, chartSettings);
    dashboard.init();

    const btnDropdownFilter = document.querySelector('.btn-dropdown-filter');
    const btnCloseMenuMobile = document.querySelector('.btn-close-menu-mobile');
    const btnOpenMenuMobile = document.querySelector('.btn-open-menu-mobile');
    const btnFilterMobile = document.querySelector('.btn-mobile-filter');

    if(btnDropdownFilter){
        btnDropdownFilter.addEventListener('click', ()=>{
            dashboard.components.dropdown.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter', itemsDropdown);
        })
    }

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

    if(btnFilterMobile){
        btnFilterMobile.addEventListener('click', ()=>{
            dashboard.components.dropdown.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter', itemsDropdown);
        })
    }
})
