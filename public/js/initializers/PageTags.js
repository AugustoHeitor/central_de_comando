import Tag from '../classes/pages/Tag.js';

let tags = [];

document.addEventListener('DOMContentLoaded', async ()=>{

    const tag = new Tag('tags', tags);
    tag.init();

    const btnNewTag = document.querySelector('#btn-new-tag');

    if(btnNewTag){
        btnNewTag.addEventListener('click', ()=>{
            tag.openModal('add');
        })
    }

    const btnsFilterIsActive = Array.from(document.querySelectorAll('.btn-filter-is-active'));

    if(btnsFilterIsActive.length>0){
        tag.utils.markNavigation('.btn-filter-is-active', 'marked-primary', 'tags', btnsFilterIsActive, 'is_active');
        tag.utils.navigation('.btn-filter-is-active', 'marked-primary', () => tag.filterTags(), 'tags', 'is_active');
    }

    const btnCloseMenuMobile = document.querySelector('.btn-close-menu-mobile');

    btnCloseMenuMobile.addEventListener("click", ()=>{
        tag.utils.toggleVisibility(".screen-menu-mobile", "hide");
    })

    const btnOpenMenuMobile = document.querySelector('.btn-open-menu-mobile');

    btnOpenMenuMobile.addEventListener("click", ()=>{
        tag.utils.toggleVisibility(".screen-menu-mobile", "show");
    })

    const btnFilterMobile = document.querySelector('.btn-mobile-filter');

    if(btnFilterMobile){

        btnFilterMobile.addEventListener('click', ()=>{

            const statusOptions = [
                { value: "null", label: 'Todos' },
                { value: "true", label: 'Ativas' },
                { value: "false", label: 'Inativas' },
            ];

            const itemsDropdown = [
                {
                    "type": "select",
                    "label": "Status",
                    "class": "select-status",
                    "storageKey": "is_active",
                    "nameAttribute": "isActive",
                    "options": statusOptions
                },
            ];

            const itemsDropdownMobile = itemsDropdown.map(item => ({ ...item }));
            tag.components.dropdown.createDropdownFilter('.container-dropdown-filter', 'dropdown-filter', itemsDropdownMobile);
        })
    }

})



