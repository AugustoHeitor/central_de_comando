import Modal  from '../components/Modal.js';
import Utils from '../Utils.js';
import Master from '../Master.js';
import Dropdown  from '../components/Dropdown.js';
import ContainerEmpty  from '../components/ContainerEmpty.js';

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


        this.components = {
            'modal': new Modal(),
            'dropdown': new Dropdown(this.localStorageName, this.paramKeysFilter, this.filterTransactions.bind(this), this.paramKeysOrder, this.createCardTransaction.bind(this)),
            'containerEmpty': new ContainerEmpty()
        };
    }

    init() {
        this.filterTransactions();
    }

    async getAllTransactions(params){
        try {

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

                toastr.success(response.data.message, { timeOut: 2000 });

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

            toastr.error(message, { timeOut: 2000 });

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

                toastr.success(response.data.message, { timeOut: 2000 });

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

            toastr.error(message, { timeOut: 2000 });

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

                toastr.success(response.data.message, { timeOut: 2000 });

            }
        } catch (error) {

            let message = 'Erro ao deletar tarefa!';

            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            console.log(error)

            toastr.error(message, { timeOut: 2000 });

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
            label.classList.add('color-light', 'text-base', 'fw-m');
            label.setAttribute('for', labelFor);
            label.textContent = labelText;

            labelWrapper.append(icon);
            labelWrapper.append(label);

            const inputWrapper = document.createElement('div');
            inputWrapper.classList.add('d-flex', 'items-center', 'justify-between', 'w-full', 'bg-secondary', 'pt-input-primary', 'bd-primary', 'radius-sm');
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
        titleInput.classList.add('text-base', 'color-primary', 'w-full');
        containerPrimary.append(createInputGroup({
            iconSrc: 'imgs/heading-light.svg',
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
        amountIcon.src = 'imgs/coins-light.svg';
        amountIcon.alt = 'Valor';
        amountIcon.classList.add('img-size-20');

        const amountLabel = document.createElement('label');
        amountLabel.classList.add('color-light', 'text-base', 'fw-m');
        amountLabel.setAttribute('for', 'amount');
        amountLabel.textContent = 'Valor';

        amountLabelWrapper.append(amountIcon);
        amountLabelWrapper.append(amountLabel);

        const amountWrapper = document.createElement('div');
        amountWrapper.classList.add("d-flex", "items-center", "justify-between", "w-full", "bg-secondary", "pt-input-primary", "bd-primary", "radius-sm");

        const amountInput = document.createElement('input');
        amountInput.required = true;
        amountInput.type = 'number';
        amountInput.name = 'amount';
        amountInput.classList.add('w-full', 'text-base', 'color-primary', 'h-21');
        amountInput.step = '0.01';

        if(transaction?.amount){
            amountInput.value = this.utils.centsToReais(transaction.amount);
        } else {
            amountInput.value = '';
        }

        amountWrapper.append(amountInput);
        amountGroup.append(amountLabelWrapper);
        amountGroup.append(amountWrapper);
        containerPrimary.append(amountGroup);

        const fieldsWrapper = document.createElement('div');
        fieldsWrapper.classList.add('d-grid', 'grid-tmp-columns-3', 'grid-tmp-columns-2-responsive', 'grid-tmp-columns-1-responsive', 'w-full', 'align-start', 'justify-start', 'gap-lg');

        const fields = [
            {
                name: 'type',
                icon: 'imgs/up-down-light.svg',
                label: 'Tipo',
                iconClass: "img-size-20",
                options: [
                    { value: 'income', text: 'Entrada' },
                    { value: 'expense', text: 'Saída' },
                ]
            },
            {
                name: 'category_id',
                icon: 'imgs/tag-light.svg',
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
            label.classList.add('color-light', 'text-base', 'fw-m');
            label.setAttribute('for', field.name);
            label.textContent = field.label;

            labelWrapper.append(icon);
            labelWrapper.append(label);

            const selectWrapper = document.createElement('div');
            selectWrapper.classList.add('w-full', 'bg-secondary', 'radius-sm', 'bd-primary', 'pt-input-primary');

            const select = document.createElement('select');
            select.name = field.name;
            select.required = true;
            select.classList.add('w-full', 'text-base', 'color-primary', 'h-21');

            field.options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.classList.add("color-dark");

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
        dateIcon.src = 'imgs/calendar-week-light.svg';
        dateIcon.alt = 'Data';
        dateIcon.classList.add('img-size-15');

        const dateLabel = document.createElement('label');
        dateLabel.classList.add('color-light', 'text-base', 'fw-m');
        dateLabel.setAttribute('for', 'transaction_date');
        dateLabel.textContent = 'Data';

        dateLabelWrapper.append(dateIcon);
        dateLabelWrapper.append(dateLabel);

        const dateWrapper = document.createElement('div');
        dateWrapper.classList.add('w-full', 'bg-secondary', 'radius-sm', 'bd-primary', 'pt-input-primary');

        const dateInput = document.createElement('input');
        dateInput.required = true;
        dateInput.type = 'date';
        dateInput.name = 'transaction_date';
        dateInput.classList.add('w-full', 'text-base', 'color-primary', 'h-21');

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

        document.querySelector('#financial-section').replaceChildren();

        const parameter = this.utils.getParams(this.localStorageName, ['order']);

        let orderedTransactions = this.sortTransactions(this.transactions, parameter.order);

        if(Array.from(orderedTransactions) && orderedTransactions.length > 0){

            orderedTransactions?.forEach((transaction) => {
                const card = document.createElement("div");

                card.classList.add(
                    "overflow-hidden", "h-mn-157", "hover-bg-primary", "radius-sm", "pointer", "d-flex",
                    "flex-column", "justify-between", "items-start", "gap-md", "w-full",
                    "bg-secondary", "bd-shadow-primary"
                );

                const contentTop = document.createElement("div");
                contentTop.classList.add("d-flex", "flex-column", "justify-start", "items-start", "gap-md", "w-full");

                const header = document.createElement("div");
                header.classList.add("w-full", "d-flex", "justify-between", "items-center", "gap-md", "pt-top-md", "pt-left-md", "pt-right-md");

                const leftSide = document.createElement("div");
                leftSide.classList.add("d-flex", "justify-center", "items-center", "gap-sm");

                const imgIcon = document.createElement("img");
                imgIcon.src = transaction.type === "income" ? "imgs/piggy-bank-gray.svg" : "imgs/money-bill-wave-gray.svg";
                imgIcon.alt = "Entrada";
                imgIcon.classList.add("img-size-15");

                const title = document.createElement("h3");
                title.textContent = transaction.title;
                title.classList.add("color-primary", "fw-m", "text-sm", "txt-1-line-mobile");

                leftSide.append(imgIcon, title);

                const rightSide = document.createElement("div");
                rightSide.classList.add("d-flex", "justify-center", "items-end", "gap-sm", "flex-column");

                const value = document.createElement("span");
                const amount =  this.utils.centsToReais(transaction?.amount);

                value.textContent = this.utils.formatToBRLCurrency(amount);

                if(transaction.type === "income"){
                    value.classList.add("text-x1", "fw-sb", "color-primary");
                }else{
                    value.classList.add("text-x1", "fw-sb", "color-primary");
                }

                const date = document.createElement("span");

                date.textContent = this.utils.formatDate(transaction?.transaction_date);
                date.classList.add("text-sm", "fw-m", "color-primary", "txt-align-end");

                rightSide.append(value, date);
                header.append(leftSide, rightSide);
                contentTop.append(header);

                const contentBottom = document.createElement("div");
                contentBottom.classList.add(
                    "w-full", "d-flex", "justify-start", "items-center", "gap-lg",
                    "bd-top", "pt-left-md", "pt-right-md", "pt-top-md",
                    "pt-bottom-md", "flex-wrap"
                );

                const typeTag = document.createElement("p");
                typeTag.textContent = transaction.type === "income" ? "Entrada" : "Saída";


                if(transaction.type === "income"){
                    typeTag.classList.add("d-flex", "justify-center", "items-center", "bg-income", "color-income", "radius-sm", "text-xs", "pt-top-sm", "pt-bottom-sm", "pt-left-md", "pt-right-md");
                }else{
                    typeTag.classList.add("d-flex", "justify-center", "items-center", "bg-expense", "color-expense", "radius-sm", "text-xs", "pt-top-sm", "pt-bottom-sm", "pt-left-md", "pt-right-md");
                }

                const category = document.createElement("div");
                category.classList.add("d-flex", "justify-start", "items-center", "gap-sm");

                const tagIcon = document.createElement("img");
                tagIcon.src = "imgs/tag-gray.svg";
                tagIcon.alt = "Categoria";
                tagIcon.classList.add("img-size-10");


                const categoryName = this.categories.find(category => category.id == transaction.category_id)?.name;

                const categoryText = document.createElement("span");
                categoryText.textContent = categoryName;
                categoryText.classList.add("color-primary", "text-xs", "fw-m");

                category.append(tagIcon, categoryText);

                contentBottom.append(typeTag, category);

                card.append(contentTop, contentBottom);

                card.addEventListener('click', (e) => {
                    this.openModal('save', transaction);
                });

                document.querySelector("#financial-section").append(card);
            });
        }else{
            this.components.containerEmpty.createContainerEmpty('#financial-section', 'Nenhuma transação encontrada', 'Não há transações que correspondam ao filtro aplicado ou você ainda não criou nenhuma. Experimente ajustar o filtro ou adicionar uma nova transação.');
        }

        this.utils.addScrollY('#financial-section');
    }

    createCategoryOptions(){
        const categoryOptions = this.categories.map((category) => ({
            value: category.id,
            label: category.name
        }));

        categoryOptions.unshift({
            value: "",
            label: "Todas"
        });

        return categoryOptions;
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

            const buttons = this.components.modal.createButtons(buttonsConfig);

            const modalConfig = {
                title: "Criar Transação",
                img: "imgs/wallet-light.svg",
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
                    const amount = formData.get('amount');
                    formData.set("amount", this.utils.reaisToCents(amount));
                    this.createTransaction(formData, buttonSubmit);
                }
            };

            const content = this.createContentModal();

            this.components.modal.createModal(modalConfig, content, buttons);
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

                        this.components.modal.createContainerDelete(configContainer, buttonsConfig);
                    }
                },
                {
                    text: "Salvar",
                    type: "save"
                },
            ];

            const buttons = this.components.modal.createButtons(buttonsConfig);

            const modalConfig = {
                title: "Editar Transação",
                img: "imgs/wallet-light.svg",
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
                    const amount = formData.get('amount');
                    formData.set("amount", this.utils.reaisToCents(amount));
                    this.updateTransaction(formData, buttonSubmit, transaction?.id);

                }
            };

            const content = this.createContentModal(transaction);

            this.components.modal.createModal(modalConfig, content, buttons);
        }
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
}

export default Financial;
