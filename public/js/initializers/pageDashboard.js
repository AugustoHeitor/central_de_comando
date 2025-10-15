import Dashboard from '../classes/Dashboard.js';

let tasks = {};
let transactions = {};

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

document.addEventListener('DOMContentLoaded', async ()=>{

    const dashboard = new Dashboard('dashboard', tasks, transactions);
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
