import Dashboard from '../classes/pages/Dashboard.js';

let tasks = [];
let transactions = [];
let timeDistribution = [];

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
            const itemsDropdownDesktop = dashboard.dropdownFields
            .filter(item => item.render?.desktop === true)
            .map(item => ({ ...item }));

            dashboard.components.dropdown.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter', itemsDropdownDesktop);
        })
    }

    if(btnCloseMenuMobile){
        btnCloseMenuMobile.addEventListener("click", ()=>{
            dashboard.utils.toggleVisibility(".screen-menu-mobile", "hide");
        })
    }

    if(btnOpenMenuMobile){
        btnOpenMenuMobile.addEventListener("click", ()=>{
            dashboard.utils.toggleVisibility(".screen-menu-mobile", "show");
        })
    }

    if(btnFilterMobile){
        btnFilterMobile.addEventListener('click', ()=>{
            dashboard.components.dropdown.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter', itemsDropdown);
        })
    }
})
