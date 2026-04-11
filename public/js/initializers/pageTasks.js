import Category from '../classes/Category.js';
import Task from '../classes/pages/Task.js';

let categories = [];
let tasks = [];

const categoryWarningMessage = 'Ao excluir esta categoria, todas as tarefas relacionadas a ela também serão permanentemente excluídas. Esta ação não pode ser desfeita.';

document.addEventListener('DOMContentLoaded', async ()=>{

    const category = new Category('task-categories', categoryWarningMessage, categories);
    await category.init();

    const task = new Task('tasks', tasks, categories);
    task.init();

    const btnCategory = document.querySelector('#btn-category');

    if(btnCategory){

        btnCategory.addEventListener('click', ()=>{
            category.openModal()
        });

    }

    const btnNewTask = document.querySelector('#btn-new-task');

    if(btnNewTask){

        btnNewTask.addEventListener('click', ()=>{
            task.openModal('add');
        })

    };

    const btnsFilterStatus = Array.from(document.querySelectorAll('.btn-filter-status'));

    if(btnsFilterStatus.length>0){
        task.utils.markNavigation('.btn-filter-status', 'marked-primary', 'tasks', btnsFilterStatus, 'status');
        task.utils.navigation('.btn-filter-status', 'marked-primary', () => task.filterTasks(), 'tasks', 'status');
    }

    const btnDropdownFilter = document.querySelector('.btn-dropdown-filter');

    if(btnDropdownFilter){

        btnDropdownFilter.addEventListener('click', ()=>{

            const itemsDropdownDesktop = task.dropdownFields
            .filter(item => item.render?.desktop === true)
            .map(item => ({ ...item }));

            itemsDropdownDesktop.forEach((item)=>{

                if(item.nameAttribute === "categories"){

                    const data = task.categories;
                    const config = task.selectorOptions.category.config;
                    const defaultOption = task.selectorOptions.category.defaultOption;

                    item.options = task.utils.getOptions(data, defaultOption, config);

                }else if(item.nameAttribute === "priorities"){

                    const data = task.selectorOptions.priority.options;
                    const config = task.selectorOptions.priority.config;
                    const defaultOption = task.selectorOptions.priority.defaultOption;

                    item.options = task.utils.getOptions(data, defaultOption, config);

                }
            })

            task.components.dropdown.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter', itemsDropdownDesktop);
        })
    }

    const btnDropdownOrder = document.querySelector('.btn-dropdown-order');

    if(btnDropdownOrder){
        btnDropdownOrder.addEventListener('click', ()=>{
            task.components.dropdown.createDropdownOrder('.container-dropdown-order', 'dropdown-order');
        })
    }

    const btnCloseMenuMobile = document.querySelector('.btn-close-menu-mobile');

    btnCloseMenuMobile.addEventListener("click", ()=>{
        task.utils.toggleVisibility(".screen-menu-mobile", "hide");
    });

    const btnOpenMenuMobile = document.querySelector('.btn-open-menu-mobile');

    btnOpenMenuMobile.addEventListener("click", ()=>{
        task.utils.toggleVisibility(".screen-menu-mobile", "show");
    });

    const btnCategoryMobile = document.querySelector('#btn-category-mobile');

    if(btnCategoryMobile){

        btnCategoryMobile.addEventListener('click', ()=>{
            category.openModal();
        });

    }

    const btnFilterMobile = document.querySelector('.btn-mobile-filter');

    if(btnFilterMobile){

        btnFilterMobile.addEventListener('click', ()=>{

            const itemsDropdownMobile = task.dropdownFields
            .filter(item => item.render?.mobile === true)
            .map(item => ({ ...item }));

            itemsDropdownMobile.forEach((item)=>{

                if(item.nameAttribute === "categories"){

                    const data = task.categories;
                    const config = task.selectorOptions.category.config;
                    const defaultOption = task.selectorOptions.category.defaultOption;

                    item.options = task.utils.getOptions(data, defaultOption, config);

                }else if(item.nameAttribute === "priorities"){

                    const data = task.selectorOptions.priority.options;
                    const config = task.selectorOptions.priority.config;
                    const defaultOption = task.selectorOptions.priority.defaultOption;

                    item.options = task.utils.getOptions(data, defaultOption, config);

                }else if(item.nameAttribute === "status"){

                    const data = task.selectorOptions.status.options;
                    const config = task.selectorOptions.status.config;
                    const defaultOption = task.selectorOptions.status.defaultOption;

                    item.options = task.utils.getOptions(data, defaultOption, config);

                }

            })

            task.components.dropdown.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter', itemsDropdownMobile);
        })
    }

    const btnOrderMobile = document.querySelector('.btn-mobile-order');

    if(btnOrderMobile){
        btnOrderMobile.addEventListener('click', ()=>{
            task.components.dropdown.createDropdownOrder('.container-dropdown-order', 'dropdown-order');
        })
    }
})



