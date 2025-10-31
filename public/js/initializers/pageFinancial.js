import Category from '../classes/Category.js';
import Financial from '../classes/pages/Financial.js';

let categories = [];
let transactions = [];

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
    },
    {
        "type": "select",
        "label": "Categorias",
        "class": "select-category",
        "storageKey": "category",
        "nameAttribute": "financialCategories",
        "options": []
    },
];

document.addEventListener('DOMContentLoaded', async ()=>{

    const messageWarning = 'Ao excluir esta categoria, todas as transações relacionadas a ela também serão permanentemente excluídas. Esta ação não pode ser desfeita.';

    const category = new Category('financial-categories', messageWarning, categories);
    await category.init();


    const financial = new Financial('financial-transactions', transactions, categories);

    financial.init();

    const btnCategory = document.querySelector('#btn-category');

    if(btnCategory){

        btnCategory.addEventListener('click', ()=>{
            category.openModal()
        })

    }

    const btnNewTransaction = document.querySelector('#btn-new-financial');

    if(btnNewTransaction){
        btnNewTransaction.addEventListener('click', ()=>{
            financial.openModal('add');
        })
    }

    const btnsFilterType = Array.from(document.querySelectorAll('.btn-filter-type'));

    if(btnsFilterType.length>0){
        financial.utils.markNavigation('.btn-filter-type', 'marked-primary', 'financial_transactions', btnsFilterType, 'type');
        financial.utils.navigation('.btn-filter-type', 'marked-primary', () => financial.filterTransactions(), 'financial_transactions', 'type');
    }

    const btnDropdownFilter = document.querySelector('.btn-dropdown-filter');

    if(btnDropdownFilter){
        btnDropdownFilter.addEventListener('click', ()=>{
            itemsDropdown.forEach((item)=>{
                if(item.nameAttribute === "financialCategories"){
                    item.options = financial.createCategoryOptions();
                }
            })

            financial.components.dropdown.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter', itemsDropdown);
        })
    }

    const btnDropdownOrder = document.querySelector('.btn-dropdown-order');

    if(btnDropdownOrder){
        btnDropdownOrder.addEventListener('click', ()=>{
           financial.components.dropdown.createDropdownOrder('.container-dropdown-order', 'dropdown-order');
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

            itemsDropdown.forEach((item)=>{
                if(item.nameAttribute === "financialCategories"){
                    item.options = financial.createCategoryOptions();
                }
            })

            const itemsDropdownMobile = itemsDropdown.map(item => ({ ...item }));

            const selectStatus = {
                "type": "select",
                "label": "Tipos",
                "class": "select-type",
                "storageKey": "type",
                "nameAttribute": "financialType",
                "options": [
                    { value: '', label: 'Todos' },
                    { value: 'income', label: 'Entrada' },
                    { value: 'expense', label: 'Saída' }
                ]
            }

            itemsDropdownMobile.push(selectStatus);

            financial.components.dropdown.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter', itemsDropdownMobile);
        })
    }

    const btnOrderMobile = document.querySelector('.btn-mobile-order');

    if(btnOrderMobile){
        btnOrderMobile.addEventListener('click', ()=>{
            financial.components.dropdown.createDropdownOrder('.container-dropdown-order', 'dropdown-order');
        })
    }
})


