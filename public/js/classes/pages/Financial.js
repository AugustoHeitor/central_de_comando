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

        this.selectorOptions = {
            "type": {
                "defaultOption": { value: '', label: 'Todos' },
                "options": [
                    { value: 'income', label: 'Entrada' },
                    { value: 'expense', label: 'Saída' }
                ],
                "config": {
                    "labelKey": "label",
                    "valueKey": "value",
                }
            },
            "category": {
                "defaultOption": { value: '', label: 'Todas' },
                "options": [],
                "config": {
                    "labelKey": "name",
                    "valueKey": "id",
                }
            },
        }

        this.dropdownFields = [
            {
                "type": "inputDate",
                "label": "Data Inicial",
                "class": "input-start-date",
                "storageKey": "start_date",
                "render": {
                    "desktop": true,
                    "mobile": true
                }
            },
            {
                "type": "inputDate",
                "label": "Data Final",
                "class": "input-end-date",
                "storageKey": "end_date",
                "render": {
                    "desktop": true,
                    "mobile": true
                }
            },
            {
                "type": "select",
                "label": "Categorias",
                "class": "select-category",
                "storageKey": "category",
                "nameAttribute": "categories",
                "options": [],
                "render": {
                    "desktop": true,
                    "mobile": true
                }
            },
            {
                "type": "select",
                "label": "Tipos",
                "class": "select-type",
                "storageKey": "type",
                "nameAttribute": "types",
                "options": [],
                "render": {
                    "desktop": false,
                    "mobile": true
                }
            }
        ];

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

        const configFieldTitle = {
            icon: { src: 'imgs/heading-light.svg', alt: 'Título' },
            label: { for: 'title', text: 'Título' },
            field: { type: 'text', required: true, value: transaction?.title || '', class: null, name: 'title' },
            containerField: { class: null },
            containerGroup: { class: null }
        };

        containerPrimary.append(this.components.modal.createFieldGroup(configFieldTitle));

        const configFieldAmount = {
            icon: { src: 'imgs/coins-light.svg', alt: 'Valor' },
            label: { for: 'amount', text: 'Valor' },
            field: {
                type: 'number',
                required: true,
                value: transaction?.amount ? this.utils.centsToReais(transaction.amount) : '',
                class: null,
                name: 'amount',
                step: '0.01'
            },
            containerField: { class: null },
            containerGroup: { class: ['w-full', 'd-flex', 'flex-column', 'w-mx-200-mobile', 'justify-start', 'items-start', 'gap-sm'] }
        };

        containerPrimary.append(this.components.modal.createFieldGroup(configFieldAmount));

        container.appendChild(containerPrimary);

        const fieldsWrapper = document.createElement('div');
        fieldsWrapper.classList.add('d-grid', 'grid-tmp-columns-3', 'grid-tmp-columns-2-responsive', 'grid-tmp-columns-1-responsive', 'w-full', 'align-start', 'justify-start', 'gap-lg');

        const typeOptions = [
            { value: 'income', text: 'Entrada', selected: transaction?.type == 'income' },
            { value: 'expense', text: 'Saída', selected: transaction?.type == 'expense' }
        ];

        const configFieldType = {
            icon: { src: 'imgs/up-down-light.svg', alt: 'Tipo' },
            label: { for: 'type', text: 'Tipo' },
            field: { type: 'select', required: true, value: typeOptions, class: null, name: 'type' },
            containerField: { class: null },
            containerGroup: { class: ['w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'cnt-input-w'] }
        };

        fieldsWrapper.append(this.components.modal.createFieldGroup(configFieldType));

        const categoryOptions = categories.map((category) => ({
            ...category,
            selected: transaction?.category_id == category.value
        }));

        const configFieldCategory = {
            icon: { src: 'imgs/tag-light.svg', alt: 'Categorias' },
            label: { for: 'category_id', text: 'Categorias' },
            field: { type: 'select', required: true, value: categoryOptions, class: null, name: 'category_id' },
            containerField: { class: null },
            containerGroup: { class: ['w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'cnt-input-w'] }
        };

        fieldsWrapper.append(this.components.modal.createFieldGroup(configFieldCategory));

        const configFieldDate = {
            icon: { src: 'imgs/calendar-week-light.svg', alt: 'Data' },
            label: { for: 'transaction_date', text: 'Data' },
            field: {
                type: 'date',
                required: true,
                value: transaction?.transaction_date
                    ? this.utils.formatDate(transaction.transaction_date, 'iso')
                    : this.utils.formatDate(new Date().toISOString().split('T')[0], 'iso'),
                class: null,
                name: 'transaction_date'
            },
            containerField: { class: null },
            containerGroup: { class: ['w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'cnt-input-w'] }
        };

        fieldsWrapper.append(this.components.modal.createFieldGroup(configFieldDate));

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
                                    const csrfToken = this.utils.getCsrfTokenValue();
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
