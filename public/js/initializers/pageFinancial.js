import Category from '../classes/Category.js';
import Financial from '../classes/pages/Financial.js';

let categories = [];
let transactions = [];

const categoryWarningMessage = 'Ao excluir esta categoria, todas as transações relacionadas a ela também serão permanentemente excluídas. Esta ação não pode ser desfeita.';

document.addEventListener('DOMContentLoaded', async ()=>{

    const category = new Category('financial-categories', categoryWarningMessage, categories);
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
            const itemsDropdownDesktop = financial.dropdownFields
            .filter(item => item.render?.desktop === true)
            .map(item => ({ ...item }));

            itemsDropdownDesktop.forEach((item)=>{

                if(item.nameAttribute === "categories"){

                    const data = financial.categories;
                    const config = financial.selectorOptions.category.config;
                    const defaultOption = financial.selectorOptions.category.defaultOption;

                    item.options = financial.utils.getOptions(data, defaultOption, config);

                }
            })

            financial.components.dropdown.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter', itemsDropdownDesktop);
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
        financial.utils.toggleVisibility(".screen-menu-mobile", "hide");
    })

    const btnOpenMenuMobile = document.querySelector('.btn-open-menu-mobile');

    btnOpenMenuMobile.addEventListener("click", ()=>{
        financial.utils.toggleVisibility(".screen-menu-mobile", "show");
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

           const itemsDropdownMobile = financial.dropdownFields
            .filter(item => item.render?.mobile === true)
            .map(item => ({ ...item }));

            itemsDropdownMobile.forEach((item)=>{

                if(item.nameAttribute === "categories"){

                    const data = financial.categories;
                    const config = financial.selectorOptions.category.config;
                    const defaultOption = financial.selectorOptions.category.defaultOption;

                    item.options = financial.utils.getOptions(data, defaultOption, config);

                }else if(item.nameAttribute === "types"){

                    const data = financial.selectorOptions.type.options;
                    const config = financial.selectorOptions.type.config;
                    const defaultOption = financial.selectorOptions.type.defaultOption;

                    item.options = financial.utils.getOptions(data, defaultOption, config);

                }

            })

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


