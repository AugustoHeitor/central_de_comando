import Modal  from './Modal.js';
import Utils from './Utils.js';
import Master from './Master.js';

class Financial extends Master {
    constructor(endpoint, transactions, categories) {
        super();
        this.categories = categories;
        this.transactions = transactions;
        this.baseUrl = '/api/';
        this.endpoint = endpoint;
        this.localStorageName = "financial_transactions";
        this.url = this.baseUrl + endpoint;
        this.utils = new Utils(); 
        this.modal = new Modal(); 

        this.paramKeysFilter = [
            'type',
            'category',
            'start_date',
            'end_date',
        ];

        this.paramKeysOrder = [
            { name: "Sem Ordenação", value: "none" },
            { name: "Maior Valor", value: "highest_value" },
            { name: "Menor Valor", value: "lowest_value" },
            { name: "Data da Transação", value: "transaction_date" },
        ];
    }

    init() {
        this.filterTransactions();
    }

    createContentModal(transaction = null) {

        const categories = this.categories.map((category) => ({
            value: category.id,
            text: category.name
        }));

        const container = document.createElement('div');
        const containerPrimary = document.createElement('div');

        container.classList.add('w-full', 'h-full', 'd-flex', 'align-start', 'justify-start', 'flex-column', 'gap-lg', 'scroll-auto');

        containerPrimary.classList.add('w-full', 'd-flex', 'align-start', 'justify-start', 'gap-lg', 'flex-direction-mobile');

        function createInputGroup({ iconSrc, iconAlt, labelFor, labelText, inputElement }) {
            const group = document.createElement('div');
            group.classList.add('w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm');

            const labelWrapper = document.createElement('div');
            labelWrapper.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

            const icon = document.createElement('img');
            icon.src = iconSrc;
            icon.alt = iconAlt;
            icon.classList.add('img-size-15');

            const label = document.createElement('label');
            label.classList.add('color-dark', 'text-base', 'fw-m');
            label.setAttribute('for', labelFor);
            label.textContent = labelText;

            labelWrapper.append(icon);
            labelWrapper.append(label);

            const inputWrapper = document.createElement('div');
            inputWrapper.classList.add('d-flex', 'items-center', 'justify-between', 'w-full', 'bg-light', 'pt-input-primary', 'bd-primary', 'radius-lg');
            inputWrapper.append(inputElement);

            group.append(labelWrapper);
            group.append(inputWrapper);

            return group;
        }

        const titleInput = document.createElement('input');
        titleInput.value = transaction?.title ? transaction.title : "";
        titleInput.required = true;
        titleInput.type = 'text';
        titleInput.name = 'title';
        titleInput.classList.add('text-base', 'color-secondary', 'w-full');
        containerPrimary.append(createInputGroup({
            iconSrc: 'imgs/heading-dark.svg',
            iconAlt: 'Título',
            labelFor: 'title',
            labelText: 'Título',
            inputElement: titleInput
        }));

        container.appendChild(containerPrimary);

        const amountGroup = document.createElement('div');
        amountGroup.classList.add("w-full", "d-flex", "flex-column", "w-mx-200-mobile", "justify-start", "items-start", "gap-sm");

        const amountLabelWrapper = document.createElement('div');
        amountLabelWrapper.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

        const amountIcon = document.createElement('img');
        amountIcon.src = 'imgs/coins-dark.svg'; 
        amountIcon.alt = 'Valor';
        amountIcon.classList.add('img-size-20');

        const amountLabel = document.createElement('label');
        amountLabel.classList.add('color-dark', 'text-base', 'fw-m');
        amountLabel.setAttribute('for', 'amount');
        amountLabel.textContent = 'Valor';

        amountLabelWrapper.append(amountIcon);
        amountLabelWrapper.append(amountLabel);

        const amountWrapper = document.createElement('div');
        amountWrapper.classList.add("d-flex", "items-center", "justify-between", "w-full", "bg-light", "pt-input-primary", "bd-primary", "radius-lg");

        const amountInput = document.createElement('input');
        amountInput.required = true;
        amountInput.type = 'number';
        amountInput.name = 'amount';
        amountInput.classList.add('w-full', 'text-base', 'color-secondary', 'h-21');
        amountInput.step = '0.01'; 

        if(transaction?.amount){
            amountInput.value = transaction.amount;
        } else {
            amountInput.value = ''; 
        }

        amountWrapper.append(amountInput);
        amountGroup.append(amountLabelWrapper);
        amountGroup.append(amountWrapper);
        containerPrimary.append(amountGroup);

        const fieldsWrapper = document.createElement('div');
        fieldsWrapper.classList.add('d-flex', 'w-full', 'align-start', 'justify-start', 'gap-lg', 'flex-wrap');

        const fields = [
            {
                name: 'type',
                icon: 'imgs/up-down-dark.svg',
                label: 'Tipo',
                iconClass: "img-size-20",
                options: [
                    { value: 'income', text: 'Entrada' },
                    { value: 'expense', text: 'Saída' },
                ]
            },
            {
                name: 'category_id',
                icon: 'imgs/tag-dark.svg',
                iconClass: "img-size-15",
                label: 'Categorias',
                options: categories
            }
        ];

        fields.forEach((field) => {
            const group = document.createElement('div');
            group.classList.add('w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'cnt-input-w');

            const labelWrapper = document.createElement('div');
            labelWrapper.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

            const icon = document.createElement('img');
            icon.src = field.icon;
            icon.alt = field.label;
            icon.classList.add(field.iconClass);

            const label = document.createElement('label');
            label.classList.add('color-dark', 'text-base', 'fw-m');
            label.setAttribute('for', field.name);
            label.textContent = field.label;

            labelWrapper.append(icon);
            labelWrapper.append(label);

            const selectWrapper = document.createElement('div');
            selectWrapper.classList.add('w-full', 'bg-light', 'radius-lg', 'bd-primary', 'pt-input-primary');

            const select = document.createElement('select');
            select.name = field.name;
            select.required = true;
            select.classList.add('w-full', 'text-base', 'color-secondary', 'h-21');

            field.options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;

                if(transaction){
                    if (transaction[field.name] == opt.value) {
                        option.selected = true;
                    }
                }

                option.textContent = opt.text;
                select.append(option);
            });

            selectWrapper.append(select);
            group.append(labelWrapper);
            group.append(selectWrapper);
            fieldsWrapper.append(group);
        });

        const dateGroup = document.createElement('div');
        dateGroup.classList.add('w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'cnt-input-w');

        const dateLabelWrapper = document.createElement('div');
        dateLabelWrapper.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

        const dateIcon = document.createElement('img');
        dateIcon.src = 'imgs/calendar-week-dark.svg';
        dateIcon.alt = 'Data';
        dateIcon.classList.add('img-size-15');

        const dateLabel = document.createElement('label');
        dateLabel.classList.add('color-dark', 'text-base', 'fw-m');
        dateLabel.setAttribute('for', 'transaction_date');
        dateLabel.textContent = 'Data';

        dateLabelWrapper.append(dateIcon);
        dateLabelWrapper.append(dateLabel);

        const dateWrapper = document.createElement('div');
        dateWrapper.classList.add('w-full', 'bg-light', 'radius-lg', 'bd-primary', 'pt-input-primary');

        const dateInput = document.createElement('input');
        dateInput.required = true;
        dateInput.type = 'date';
        dateInput.name = 'transaction_date';
        dateInput.classList.add('w-full', 'text-base', 'color-secondary', 'h-21');
        
        if(transaction?.transaction_date){
            const transactionDate = this.utils.formatDate(transaction?.transaction_date, 'iso'); 
            dateInput.value = transactionDate;  
        }else{

            const dateToday = this.utils.formatDate(new Date().toISOString().split('T')[0], 'iso'); 
            dateInput.value = dateToday;  

        }

        dateWrapper.append(dateInput);
        dateGroup.append(dateLabelWrapper);
        dateGroup.append(dateWrapper);
        fieldsWrapper.append(dateGroup);

        container.append(fieldsWrapper);

        return container;
    };

    createCardTransaction() {

        document.querySelector('#financial-section').innerHTML = "";

        const parameter = this.utils.getParams(this.localStorageName, ['order']);

        let orderedTransactions = this.sortTransactions(this.transactions, parameter.order);


        orderedTransactions?.forEach((transaction) => {
            const card = document.createElement("div");

            card.classList.add(
                "overflow-hidden", "h-mn-157", "radius-lg", "pointer", "d-flex",
                "flex-column", "justify-between", "items-start", "gap-md", "w-full",
                "bg-light", "bd-primary", "radius-sm"
            );

            const contentTop = document.createElement("div");
            contentTop.classList.add("d-flex", "flex-column", "justify-start", "items-start", "gap-md", "w-full");

            const header = document.createElement("div");
            header.classList.add("w-full", "d-flex", "justify-between", "items-center", "gap-md", "pt-top-md", "pt-left-md", "pt-right-md");

            const leftSide = document.createElement("div");
            leftSide.classList.add("d-flex", "justify-center", "items-center", "gap-sm");

            const imgIcon = document.createElement("img");
            imgIcon.src = "imgs/piggy-bank-dark.svg";
            imgIcon.alt = "Entrada";
            imgIcon.classList.add("img-size-15");

            const title = document.createElement("h3");
            title.textContent = transaction.title;
            title.classList.add("color-third", "fw-m", "text-sm");

            leftSide.append(imgIcon, title);

            const rightSide = document.createElement("div");
            rightSide.classList.add("d-flex", "justify-center", "items-end", "gap-sm", "flex-column");

            const value = document.createElement("span");

            value.textContent = transaction?.amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

            if(transaction.type === "income"){
                value.classList.add("text-x1", "fw-sb", "color-income");
            }else{
                value.classList.add("text-x1", "fw-sb", "color-expense");
            }

            const date = document.createElement("span");

            date.textContent = this.utils.formatDate(transaction?.transaction_date);
            date.classList.add("text-sm", "fw-m", "color-secondary", "txt-align-end");

            rightSide.append(value, date);
            header.append(leftSide, rightSide);
            contentTop.append(header);

            const contentBottom = document.createElement("div");
            contentBottom.classList.add(
                "w-full", "d-flex", "justify-start", "items-center", "gap-lg",
                "bd-top", "bg-third", "pt-left-md", "pt-right-md", "pt-top-md",
                "pt-bottom-md", "flex-wrap"
            );

            const typeTag = document.createElement("p");
            typeTag.textContent = transaction.type === "income" ? "Entrada" : "Saída";
            

            if(transaction.type === "income"){
                typeTag.classList.add("d-flex", "justify-center", "items-center", "bg-income", "color-income", "radius-lg", "text-sm", "pt-top-sm", "pt-bottom-sm", "pt-left-md", "pt-right-md");
            }else{
                typeTag.classList.add("d-flex", "justify-center", "items-center", "bg-expense", "color-expense", "radius-lg", "text-sm", "pt-top-sm", "pt-bottom-sm", "pt-left-md", "pt-right-md");
            }

            const category = document.createElement("div");
            category.classList.add("d-flex", "justify-start", "items-center", "gap-sm");

            const tagIcon = document.createElement("img");
            tagIcon.src = "imgs/tag.svg";
            tagIcon.alt = "Categoria";
            tagIcon.classList.add("img-size-10");


            const categoryName = this.categories.find(category => category.id == transaction.category_id)?.name;

            const categoryText = document.createElement("span");
            categoryText.textContent = categoryName;
            categoryText.classList.add("color-secondary", "text-sm", "fw-m");

            category.append(tagIcon, categoryText);

            contentBottom.append(typeTag, category);

            card.append(contentTop, contentBottom);

            card.addEventListener('click', (e) => {
                this.openModal('save', transaction);
            });

            document.querySelector("#financial-section").append(card);
        });

        this.utils.addScrollY('#financial-section');
    }

    openModal(type, transaction = null){

        if(document.querySelector('.screen-modal')){
            document.querySelector('.screen-modal').remove();
        }

        if(type === 'add'){
            const buttonsConfig = [
                { 
                    text: "Cancelar", 
                    type: "cancel", 
                    event: ()=>{
                        document.querySelector('.screen-modal').remove();
                    }
                },
                { 
                    text: "Adicionar", 
                    type: "add"
                },
            ];

            const buttons = this.modal.createButtons(buttonsConfig);

            const modalConfig = { 
                title: "Criar Transação", 
                img: "imgs/wallet-dark.svg",
                class: ["h-auto", "w-full", "w-mx-1000"],
                visible: {
                    'footer': true,
                },
                csrfToken: true,
                event: (e)=>{
                    e.preventDefault();

                    const formModal = document.querySelector('#form-modal');
                    const buttonSubmit = e.submitter;

                    const formData = this.utils.getFormValues(formModal);

                    this.createTransaction(formData, buttonSubmit);
                }
            };

            const content = this.createContentModal();

            this.modal.createModal(modalConfig, content, buttons);
        }else if(type === "save"){

            const buttonsConfig = [
                { 
                    text: "Deletar", 
                    type: "delete", 
                    event: ()=>{

                        const configContainer = {
                            'message': `Tem certeza de que deseja excluir a transação ${transaction.title}?`,
                            'messageWarning': 'Essa ação não poderá ser desfeita. Você irá excluir todas as informações que estão interligadas a esta transação.',
                            'class': ['container-delete-transaction'],
                            'title': 'Transação'
                        }

                        const buttonsConfig = [
                            { 
                                text: "Cancelar", 
                                type: "cancel", 
                                event: ()=>{
                                    this.openModal('save', transaction)
                                }
                            },
                            { 
                                text: "Deletar", 
                                type: "delete",
                                event: (event)=>{
                                    const button = event.target;
                                    const csrfToken = document.querySelector('input[name="_token"]').value;
                                    this.deleteTransaction(button, csrfToken, transaction.id);
                                }
                            }
                        ];

                        this.modal.createContainerDelete(configContainer, buttonsConfig);
                    }
                },
                { 
                    text: "Salvar", 
                    type: "save"
                },
            ];

            const buttons = this.modal.createButtons(buttonsConfig);

            const modalConfig = { 
                title: "Editar Transação", 
                img: "imgs/wallet-dark.svg",
                class: ["w-full", "w-mx-1000"],
                visible: {
                    'footer': true,
                },
                csrfToken: true,
                event: (e)=>{
                    e.preventDefault();

                    const formModal = document.querySelector('#form-modal');
                    const buttonSubmit = e.submitter;

                    const formData = this.utils.getFormValues(formModal);

                    this.updateTransaction(formData, buttonSubmit, transaction?.id);
                    
                }
            };

            const content = this.createContentModal(transaction);

            this.modal.createModal(modalConfig, content, buttons);
        }
    }

    async getAllTransactions(params){
        try {

            console.log(params)
            const response = await axios.get(this.url, {
                params: params,
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {

                return response.data.data;

            }

        } catch (error) {
            console.error(error);
        }
    }

    async createTransaction(formData, button){

        button.disabled = true;

        try {
            const response = await axios.post(this.url, formData, {
                timeout: 5000
            });

            if (response.status === 201 && response.data.status === 'success') {

                this.transactions.push(response.data.data);
                this.createCardTransaction();

                if(response?.data?.data){
                    const screenModal = document.querySelector('.screen-modal');
                    if(screenModal){
                        screenModal.remove();
                    }
                }

                toastr.success(response.data.message, 'Transação', { timeOut: 2000 });

                setTimeout(() => {
                    button.disabled = false;
                }, 2000);

            }
        } catch (error) {

            let message = 'Erro ao criar transação!';

            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            console.log(error)
            
            toastr.error(message, 'Transação', { timeOut: 2000 });

            setTimeout(() => {
                button.disabled = false;
            }, 2000);

        }
    }

    async updateTransaction(formData, button, id){

        button.disabled = true;

        try {
            const response = await axios.patch(`${this.url}/${id}`, formData, {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 && response.data.status === 'success') {

                this.transactions?.splice(0, this.transactions.length, 
                    ...this.transactions.filter((transaction) => transaction.id !== id)
                );

                this.transactions.push(response.data.data)

                this.createCardTransaction();

                if(response?.data?.data){
                    const screenModal = document.querySelector('.screen-modal');
                    if(screenModal){
                        screenModal.remove();
                    }
                }

                toastr.success(response.data.message, 'Transação', { timeOut: 2000 });

                setTimeout(() => {
                    button.disabled = false;
                }, 2000);

            }
        } catch (error) {

            let message = 'Erro ao atualizar transação!';

            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            console.log(error)
            
            toastr.error(message, 'Transação', { timeOut: 2000 });

            setTimeout(() => {
                button.disabled = false;
            }, 2000);

        }
    }

    async deleteTransaction(button, csrfToken, id){

        button.disabled = true;

        const formData = new FormData();
        formData.append('_token', csrfToken);

        try {
            const response = await axios.delete(`${this.url}/${id}`, {
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {

                if(document.querySelector('.screen-modal')){
                    document.querySelector('.screen-modal').remove();
                }

                this.transactions?.splice(0, this.transactions.length, 
                    ...this.transactions.filter((transaction) => transaction.id !== id)
                );

                this.createCardTransaction();

                toastr.success(response.data.message, 'Tarefa', { timeOut: 2000 });

            }
        } catch (error) {

            let message = 'Erro ao deletar tarefa!';

            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            console.log(error)
            
            toastr.error(message, 'Tarefa', { timeOut: 2000 });

            setTimeout(() => {
                button.disabled = false;
            }, 2000);

        }
        
    }

    async filterTransactions() {

        const params = this.utils.getParams(this.localStorageName, this.paramKeysFilter);

        const result = await this.getAllTransactions(params);

        this.transactions?.splice(0, this.transactions.length, 
            ...result
        );

        this.createCardTransaction();
    }

   sortTransactions(transactions, order) {

        let orderedTransactions = [...transactions];

        if (order === "highest_value") {
            orderedTransactions.sort((a, b) => b.amount - a.amount); 
        } else if (order === "lowest_value") {
            orderedTransactions.sort((a, b) => a.amount - b.amount); 
        } else if (order === "transaction_date") {
            orderedTransactions.sort((a, b) => new Date(a.transaction_date) - new Date(b.transaction_date)); 
        }else{
            orderedTransactions.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); 
        }

        return orderedTransactions;

    }

    createDropdownFilter(selectorContainer, selectorDropdown) {
        const containerDropdown = document.querySelector(selectorContainer);

        if (!containerDropdown.querySelector('ul')) {
            const categories = this.categories.map((category) => ({
                value: category.id,
                label: category.name
            }));

            categories.unshift({
                value: "",
                label: "Todas"
            });

            const ul = document.createElement('ul');
            ul.id = selectorDropdown;
            ul.classList.add(
                'dropdown', 'bd-primary', 'z-index-9', 'bg-light',
                'pt-md', 'd-flex', 'align-start', 'justify-start',
                'flex-column', 'gap-md', 'radius-lg', 'position-absolute', 'mt-top-sm'
            );

            ul.append(
                this.createDateDropdown('Data Inicial', 'input-start-date', 'start_date'),
                this.createDateDropdown('Data Final', 'input-end-date', 'end_date'),
                this.createSelectDropdown('Categorias', 'taskCategories', 'select-category', categories, 'category'),
            );

            containerDropdown.append(ul);
        } else {
            containerDropdown.querySelector('ul').remove();
        }
    }

    createDropdownOrder(selectorContainer, selectorDropdown) {
        const containerDropdown = document.querySelector(selectorContainer);
        const parameter = this.utils.getParams(this.localStorageName, ['order']);

        if(!containerDropdown.querySelector('ul')){
            const ul = document.createElement('ul');

            ul.id = selectorDropdown;
            ul.classList.add(
            'overflow-hidden', 'w-160', 'dropdown', 'bd-primary', 'z-index-9',
            'bg-light', 'align-start', 'justify-start', 'flex-column',
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
                    'text-sm', 'color-third', 'fw-sb', 'text-align-start'
                );

                li.append(button);

                li.addEventListener('click', ()=>{
                    const value = button.dataset.value || null;
                    this.utils.setLocalStroageParam(this.localStorageName, 'order', value);
                    this.createCardTransaction();
                    markItem(ul, button, value);
                })

                const parameter = this.utils.getParams(this.localStorageName, ['order']);

                if(button.dataset.value === parameter.order){
                    button.classList.add('marked-order');
                }

                return li;
            }

            this.paramKeysOrder.forEach((order) => {
                ul.append(createListItem(order.value, order.name));
            });

            document.querySelector(selectorContainer).append(ul);

        }else{
            containerDropdown.querySelector('ul').remove();
        }
    }

    createDateDropdown(labelText, inputClass, storageKey) {

        const params = this.utils.getParams(this.localStorageName, this.paramKeysFilter);
   
        const li = document.createElement('li');

        const container = document.createElement('div');
        container.classList.add('w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'cnt-input-w');

        const label = document.createElement('label');
        label.classList.add('text-sm', 'color-third', 'fw-m');
        label.textContent = labelText;
        label.setAttribute('for', storageKey);

        const divInput = document.createElement('div');
        divInput.classList.add('w-full', 'bg-light', 'radius-lg', 'bd-primary');

        const input = document.createElement('input');
        input.type = 'date';
        input.name = storageKey;
        input.classList.add('pt-input-primary', inputClass, 'w-full', 'text-sm', 'color-secondary');

        input.addEventListener('blur', () => {
            const value = input.value || null;
            this.utils.setLocalStroageParam(this.localStorageName, storageKey, value);
            this.filterTransactions();
        });

        if (params[storageKey] != null) {
            input.value = params[storageKey];
        }

        divInput.append(input);
        container.append(label, divInput);
        li.append(container);

        return li;
    }

    createSelectDropdown(labelText, name, selectClass, options, storageKey) {
        const params = this.utils.getParams(this.localStorageName, this.paramKeysFilter);

        const li = document.createElement('li');

        const container = document.createElement('div');
        container.classList.add('w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'cnt-input-w');

        const label = document.createElement('label');
        label.classList.add('text-sm', 'color-third', 'fw-m');
        label.textContent = labelText;
        label.setAttribute('for', name);

        const divSelect = document.createElement('div');
        divSelect.classList.add('w-full', 'bg-light', 'radius-lg', 'bd-primary');

        const select = document.createElement('select');
        select.name = name;
        select.classList.add('pt-input-primary', selectClass, 'w-full', 'text-sm', 'color-secondary');

        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;

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
            this.filterTasks();
        });

        divSelect.append(select);
        container.append(label, divSelect);
        li.append(container);

        return li;
    }
    
}

export default Financial;
