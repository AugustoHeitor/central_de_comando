import Utils from '../Utils.js';

class Dropdown{

    constructor(localStorageName, paramKeysFilter, filter, paramKeysOrder = null, reorderItems = null){
        this.utils = new Utils();
        this.localStorageName = localStorageName;
        this.paramKeysFilter = paramKeysFilter;
        this.filter = filter;
        this.paramKeysOrder = paramKeysOrder;
        this.reorderItems = reorderItems;
    }

    createDateDropdown(labelText, inputClass, storageKey) {

        const params = this.utils.getParams(this.localStorageName, this.paramKeysFilter);

        const li = document.createElement('li');
        const container = document.createElement('div');
        const label = document.createElement('label');
        const containerInput = document.createElement('div');
        const input = document.createElement('input');

        container.classList.add('w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'cnt-input-w');
        label.classList.add('text-sm', 'color-primary', 'fw-m');
        containerInput.classList.add('w-full', 'bg-secondary', 'radius-lg', 'bd-primary');
        input.classList.add('pt-input-primary', inputClass, 'w-full', 'text-sm', 'color-primary');

        label.textContent = labelText;
        input.name = storageKey;

        label.setAttribute('for', storageKey);
        input.type = 'date';

        input.addEventListener('input', () => {
            const value = input.value || null;
            this.utils.setLocalStroageParam(this.localStorageName, storageKey, value);
            this.filter();
        });

        if (params[storageKey] != null) {
            input.value = params[storageKey];
        }

        containerInput.append(input);
        container.append(label, containerInput);
        li.append(container);

        return li;
    }

    createSelectDropdown(labelText, name, selectClass, options, storageKey) {
        const params = this.utils.getParams(this.localStorageName, this.paramKeysFilter);

        const li = document.createElement('li');

        const container = document.createElement('div');
        container.classList.add('w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'cnt-input-w');

        const label = document.createElement('label');
        label.classList.add('text-sm', 'color-primary', 'fw-m');
        label.textContent = labelText;
        label.setAttribute('for', name);

        const divSelect = document.createElement('div');
        divSelect.classList.add('pt-input-primary', 'w-full', 'bg-secondary', 'radius-lg', 'bd-primary');

        const select = document.createElement('select');
        select.name = name;
        select.classList.add(selectClass, 'w-full', 'text-sm', 'color-primary');

        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            option.classList.add("color-dark");

            if (params[storageKey] == option.value) {
                option.selected = true;
            }else if(params[storageKey] == null){
                if(opt.value === ""){
                    option.selected = true;
                }
            }

            select.append(option);
        });

        select.addEventListener('change', () => {
            const value = select.value || null;
            this.utils.setLocalStroageParam(this.localStorageName, storageKey, value);
            this.filter();
        });

        divSelect.append(select);
        container.append(label, divSelect);
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

                buttonClose.classList.add("d-flex", "items-center", "justify-center", "soft-shake");
                imgClose.src = "/imgs/xmark-light.svg";
                imgClose.classList.add("img-size-15");

                dropdown.classList.add('w-full', 'bg-secondary',  'dropdown', 'pt-md', 'd-flex', 'align-start', 'justify-start', 'flex-column', 'gap-md', 'fixed', 'left-0', 'bottom-0')

                containerTitle.classList.add("d-flex", "align-center", "justify-start", "gap-sm");
                title.classList.add("color-light", "text-xl", "fw-m");

                imgTitle.src="/imgs/sort-light.svg";
                imgTitle.classList.add("img-size-15");

                title.innerText = "Ordem"

                header.classList.add("w-full", "d-dlex", "align-center", "justify-between", "gap-md")

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

                ul.id = selectorDropdown;
                ul.classList.add(
                'overflow-hidden', 'w-160', 'dropdown', 'bd-primary', 'z-index-dropdown',
                'bg-secondary', 'align-start', 'justify-start', 'flex-column',
                'radius-lg', 'position-absolute', 'mt-top-sm'
                );

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
