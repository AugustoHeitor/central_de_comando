import Utils from '../Utils.js';
import Input from './Input.js';
import Select from './Select.js';

class Dropdown{

    constructor(localStorageName, paramKeysFilter, filterItems, paramKeysOrder = null, reorderItems = null){
        this.utils = new Utils();
        this.localStorageName = localStorageName;
        this.paramKeysFilter = paramKeysFilter;
        this.filterItems = filterItems;
        this.paramKeysOrder = paramKeysOrder;
        this.reorderItems = reorderItems;

        this.components = {
            'input': new Input(),
            'select': new Select()
        };

    }

    createDateDropdown(labelText, inputClass, storageKey) {

        const params = this.utils.getParams(this.localStorageName, this.paramKeysFilter);
        let inputValue = null;

        const li = document.createElement('li');

        const functionCallback = (value)=>{
            this.utils.setLocalStroageParam(this.localStorageName, storageKey, value);
            this.filterItems();
        }

        if (params[storageKey] != null) {
            inputValue = params[storageKey];
        }

        const container = this.components.input.createInputDate(labelText, inputClass, storageKey, inputValue, functionCallback)
        li.append(container);

        return li;
    }

    createSelectDropdown(labelText, selectName, selectClass, options, storageKey) {

        const params = this.utils.getParams(this.localStorageName, this.paramKeysFilter);
        let optionValue = null;

        if (params[storageKey] != null) {
            optionValue = params[storageKey];
        }

        const li = document.createElement('li');

        const functionCallback = (value)=>{
            this.utils.setLocalStroageParam(this.localStorageName, storageKey, value);
            this.filterItems();
        }

        const container = this.components.select.createSelect(labelText, selectName, optionValue, selectClass, options, functionCallback);
        li.append(container);

        return li;
    }

    createDropdownFilter(selectorContainer, selectorDropdown, items) {

        const widthWindow = window.screen.width

        if(widthWindow <= 800){

            const containerDropdown = document.querySelector("body");
            const screen = document.createElement("div");
            screen.classList.add("screen-modal");

            screen.addEventListener("click", (event)=>{
                if (event.target === screen) {
                    screen.remove();
                }
            })

            if (!containerDropdown.querySelector('screen-modal')) {

                const dropdown = document.createElement("div");

                const header = document.createElement("div");
                header.classList.add("w-full", "d-flex", "items-start", "justify-start");

                const buttonClose = document.createElement("button");
                const imgClose = document.createElement("img");

                const title = document.createElement("h3");
                const imgTitle = document.createElement("img");

                const containerTitle = document.createElement("div");

                const ul = document.createElement('ul');
                ul.id = selectorDropdown;
                ul.classList.add(
                    'w-full',
                    'd-flex', 'align-start', 'justify-start',
                    'flex-column', 'gap-md',
                );

                buttonClose.classList.add("d-flex", "items-center", "justify-center", "soft-shake");
                imgClose.src = "/imgs/xmark-light.svg";
                imgClose.classList.add("img-size-15");

                dropdown.classList.add('z-index-dropdown', 'w-full', 'bg-secondary',  'dropdown', 'pt-md', 'd-flex', 'align-start', 'justify-start', 'flex-column', 'gap-md', 'fixed', 'left-0', 'bottom-0', 'bd-top')

                containerTitle.classList.add("d-flex", "align-center", "justify-start", "gap-sm");
                title.classList.add("color-light", "text-xl", "fw-m");

                imgTitle.src="/imgs/filter-light.svg";
                imgTitle.classList.add("img-size-20");

                title.innerText = "Filtros";

                header.classList.add("w-full", "d-dlex", "align-center", "justify-between", "gap-md");

                items.forEach((item)=>{
                    if(item.type == "inputDate"){
                        ul.append(this.createDateDropdown(item.label, item.class, item.storageKey));
                    }else if(item.type == "select"){
                        ul.append(this.createSelectDropdown(item.label, item.nameAttribute, item.class, item.options, item.storageKey));
                    }
                });

                buttonClose.addEventListener("click", ()=>{
                    screen.remove();
                });

                buttonClose.append(imgClose);
                containerTitle.append(imgTitle, title);
                header.append(containerTitle, buttonClose);
                dropdown.append(header, ul);
                screen.append(dropdown);
                containerDropdown.append(screen);
            } else {
                containerDropdown.querySelector('ul').remove();
            }
        }else{

            const containerDropdown = document.querySelector(selectorContainer);

            if (!containerDropdown.querySelector('ul')) {

                this.utils.removeElements(".dropdown");

                const ul = document.createElement('ul');
                ul.id = selectorDropdown;
                ul.classList.add(
                    'dropdown', 'bd-primary', 'z-index-dropdown', 'bg-secondary',
                    'pt-md', 'd-flex', 'align-start', 'justify-start',
                    'flex-column', 'gap-md', 'radius-lg', 'position-absolute', 'mt-top-sm'
                );

                items.forEach((item)=>{
                    if(item.type == "inputDate"){
                        ul.append(this.createDateDropdown(item.label, item.class, item.storageKey));
                    }else if(item.type == "select"){
                        ul.append(this.createSelectDropdown(item.label, item.nameAttribute, item.class, item.options, item.storageKey));
                    }
                });

                containerDropdown.append(ul);
            } else {
                this.utils.removeElements(".dropdown");
            }
        }
    }

    createDropdownOrder(selectorContainer, selectorDropdown) {

        const widthWindow = window.screen.width

        if(widthWindow <= 800){

            const containerDropdown = document.querySelector("body");

            const screen = document.createElement("div");
            screen.classList.add("screen-modal");

            screen.addEventListener("click", (event)=>{
                if (event.target === screen) {
                    screen.remove();
                }
            })

            if(!containerDropdown.querySelector('screen-modal')){

                const dropdown = document.createElement("div");
                const header = document.createElement("div");
                const buttonClose = document.createElement("button");
                const imgClose = document.createElement("img");
                const title = document.createElement("h3");
                const imgTitle = document.createElement("img");
                const containerTitle = document.createElement("div");
                const ul = document.createElement('ul');

                buttonClose.classList.add("d-flex", "items-center", "justify-center", "soft-shake");
                imgClose.classList.add("img-size-15");
                dropdown.classList.add('w-full', 'bg-secondary',  'dropdown', 'pt-md', 'd-flex', 'align-start', 'justify-start', 'flex-column', 'gap-md', 'fixed', 'left-0', 'bottom-0');
                header.classList.add("w-full", "d-flex", "items-start", "justify-start");
                containerTitle.classList.add("d-flex", "align-center", "justify-start", "gap-sm");
                title.classList.add("color-light", "text-xl", "fw-m");
                imgTitle.classList.add("img-size-15");
                header.classList.add("w-full", "d-dlex", "align-center", "justify-between", "gap-md");
                ul.classList.add(
                    'w-full',
                    'd-flex', 'align-start', 'justify-start',
                    'flex-column', 'gap-md',
                );

                ul.id = selectorDropdown;

                const markItem = (ul, button, value)=>{

                    const buttons = Array.from(ul.querySelectorAll('li > button'));

                    if (buttons.length > 0) {
                        buttons.forEach((btn) => {
                            if (btn.classList.contains('marked-order')) {
                                btn.classList.remove('marked-order');
                            }
                        });
                    }

                    if(button.dataset.value === value){
                        button.classList.add('marked-order');
                    }
                }

                const createListItem = (value, text, hasBorder = true)=> {
                    const li = document.createElement('li');
                    li.classList.add('w-full');

                    if (hasBorder) li.classList.add('bd-bottom');

                    const button = document.createElement('button');
                    button.dataset.value = value;
                    button.textContent = text;
                    button.classList.add(
                        'd-flex', 'justify-start', 'items-center', 'w-full', 'pt-md',
                        'text-sm', 'color-primary', 'fw-nm', 'text-align-start'
                    );

                    li.append(button);

                    li.addEventListener('click', ()=>{
                        const value = button.dataset.value || null;
                        this.utils.setLocalStroageParam(this.localStorageName, 'order', value);
                        this.reorderItems();
                        markItem(ul, button, value);
                    })

                    const parameter = this.utils.getParams(this.localStorageName, ['order']);

                    if(button.dataset.value === parameter.order){
                        button.classList.add('marked-order');
                    }

                    return li;
                }

                this.paramKeysOrder.forEach((order, index) => {
                    if(this.paramKeysOrder.length === index + 1){
                        ul.append(createListItem(order.value, order.name, false));
                    }else{
                        ul.append(createListItem(order.value, order.name));
                    }
                });

                imgClose.src = "/imgs/xmark-light.svg";
                imgTitle.src="/imgs/sort-light.svg";

                title.innerText = "Ordem"

                buttonClose.addEventListener("click", ()=>{
                    screen.remove();
                })

                buttonClose.append(imgClose);
                containerTitle.append(imgTitle, title);
                header.append(containerTitle, buttonClose);
                dropdown.append(header, ul);
                screen.append(dropdown);
                containerDropdown.append(screen);

            }else{
                containerDropdown.querySelector('ul').remove();
            }

        }else{
            const containerDropdown = document.querySelector(selectorContainer);

            if(!containerDropdown.querySelector('ul')){

                this.utils.removeElements(".dropdown");

                const ul = document.createElement('ul');

                ul.classList.add(
                'overflow-hidden', 'w-160', 'dropdown', 'bd-primary', 'z-index-dropdown',
                'bg-secondary', 'align-start', 'justify-start', 'flex-column',
                'radius-lg', 'position-absolute', 'mt-top-sm'
                );

                ul.id = selectorDropdown;

                const markItem = (ul, button, value)=>{

                    const buttons = Array.from(ul.querySelectorAll('li > button'));

                    if (buttons.length > 0) {
                        buttons.forEach((btn) => {
                            if (btn.classList.contains('marked-order')) {
                                btn.classList.remove('marked-order');
                            }
                        });
                    }

                    if(button.dataset.value === value){
                        button.classList.add('marked-order');
                    }
                }

                const createListItem = (value, text, hasBorder = true)=> {
                    const li = document.createElement('li');
                    li.classList.add('w-full');
                    if (hasBorder) li.classList.add('bd-bottom');

                    const button = document.createElement('button');
                    button.dataset.value = value;
                    button.textContent = text;
                    button.classList.add(
                        'd-flex', 'justify-start', 'items-center', 'w-full', 'pt-md',
                        'text-sm', 'color-primary', 'fw-nm', 'text-align-start'
                    );

                    li.append(button);

                    li.addEventListener('click', ()=>{
                        const value = button.dataset.value || null;
                        this.utils.setLocalStroageParam(this.localStorageName, 'order', value);
                        this.reorderItems();
                        markItem(ul, button, value);
                    })

                    const parameter = this.utils.getParams(this.localStorageName, ['order']);

                    if(button.dataset.value === parameter.order){
                        button.classList.add('marked-order');
                    }

                    return li;
                }

                this.paramKeysOrder.forEach((order, index) => {
                    if(this.paramKeysOrder.length === index + 1){
                        ul.append(createListItem(order.value, order.name, false));
                    }else{
                        ul.append(createListItem(order.value, order.name));
                    }
                });

                document.querySelector(selectorContainer).append(ul);

            }else{
                this.utils.removeElements(".dropdown");
            }
        }

    }
}

export default Dropdown;
