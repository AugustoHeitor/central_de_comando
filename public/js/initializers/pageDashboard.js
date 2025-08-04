import Dashboard from '../classes/Dashboard.js';

let tasks = {};
let transactions = {};

document.addEventListener('DOMContentLoaded', async ()=>{

    const dashboard = new Dashboard('dashboard', tasks, transactions);
    dashboard.init();

    const btnDropdownFilter = document.querySelector('.btn-dropdown-filter');

    if(btnDropdownFilter){
        btnDropdownFilter.addEventListener('click', ()=>{
            dashboard.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter');
        })
    }

    const btnCloseMenuMobile = document.querySelector('.btn-close-menu-mobile');

    btnCloseMenuMobile.addEventListener("click", ()=>{
        document.querySelector(".screen-menu-mobile").classList.remove("d-flex");
        document.querySelector(".screen-menu-mobile").classList.add("none");
    })

    const btnOpenMenuMobile = document.querySelector('.btn-open-menu-mobile');

    btnOpenMenuMobile.addEventListener("click", ()=>{
        document.querySelector(".screen-menu-mobile").classList.add("d-flex");
        document.querySelector(".screen-menu-mobile").classList.remove("none");
    })

    const btnFilterMobile = document.querySelector('.btn-mobile-filter');

    if(btnFilterMobile){
        btnFilterMobile.addEventListener('click', ()=>{
            dashboard.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter');
        })
    }
})
