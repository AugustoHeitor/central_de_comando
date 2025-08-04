import Category from '../classes/Category.js';
import Task from '../classes/Task.js';

let categories = [];
let tasks = [];

document.addEventListener('DOMContentLoaded', async ()=>{

    const messageWarning = 'Ao excluir esta categoria, todas as tarefas relacionadas a ela também serão permanentemente excluídas. Esta ação não pode ser desfeita.';

    const category = new Category('task-categories', messageWarning, categories);
    await category.init();

    const task = new Task('tasks', tasks, categories);
    task.init();

    task.createCardTask();

    const btnCategory = document.querySelector('#btn-category');

    if(btnCategory){

        btnCategory.addEventListener('click', ()=>{
            category.openModal()
        })
    }

    const btnNewTask = document.querySelector('#btn-new-task');

    if(btnNewTask){
        btnNewTask.addEventListener('click', ()=>{
            task.openModal('add');
        })
    }

    const btnsFilterStatus = Array.from(document.querySelectorAll('.btn-filter-status'));

    if(btnsFilterStatus.length>0){
        task.utils.markNavigation('.btn-filter-status', 'marked-primary', 'tasks', btnsFilterStatus, 'status');
        task.utils.navigation('.btn-filter-status', 'marked-primary', () => task.filterTasks(), 'tasks', 'status');
    }

    const btnDropdownFilter = document.querySelector('.btn-dropdown-filter');

    if(btnDropdownFilter){
        btnDropdownFilter.addEventListener('click', ()=>{
            task.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter');
        })
    }

    const btnDropdownOrder = document.querySelector('.btn-dropdown-order');

    if(btnDropdownOrder){
        btnDropdownOrder.addEventListener('click', ()=>{
            task.createDropdownOrder('.container-dropdown-order', 'dropdown-order');
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

    const btnCategoryMobile = document.querySelector('#btn-category-mobile');

    if(btnCategoryMobile){
  
        btnCategoryMobile.addEventListener('click', ()=>{
            category.openModal()
        })
    }

    const btnFilterMobile = document.querySelector('.btn-mobile-filter');

    if(btnFilterMobile){
        btnFilterMobile.addEventListener('click', ()=>{
            task.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter');
        })
    }

    const btnOrderMobile = document.querySelector('.btn-mobile-order');

    if(btnOrderMobile){
        btnOrderMobile.addEventListener('click', ()=>{
            console.log("oi");
            task.createDropdownOrder('.container-dropdown-order', 'dropdown-order');
        })
    }
})



