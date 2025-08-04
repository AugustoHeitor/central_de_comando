import Utils from './Utils.js';
import Master from './Master.js';

class Dashboard extends Master {

    constructor(endpoint, tasks, transactions) {
        super();
        this.tasks = tasks;
        this.transactions = transactions;
        this.baseUrl = '/api/';
        this.endpoint = endpoint;
        this.url = this.baseUrl + endpoint;
        this.utils = new Utils(); 
        this.localStorageName = "dashboard";
        this.paramKeysFilter = [
            'start_date',
            'end_date',
        ];
    }

    init() {
        this.filterDashboard();
    }

    async getAllTasks(params){
        try {

            const response = await axios.get(`${this.url}/tasks/`, {
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

    async getAllTransactions(params){
        try {

            console.log(params)
            const response = await axios.get(`${this.url}/financial-transactions/`, {
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

    createDropdownFilter(selectorContainer, selectorDropdown) {

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
                imgClose.src = "/imgs/xmark-dark.svg";
                imgClose.classList.add("img-size-15");
                
                dropdown.classList.add('w-full', 'bg-light',  'dropdown', 'pt-md', 'd-flex', 'align-start', 'justify-start', 'flex-column', 'gap-md', 'fixed', 'left-0', 'bottom-0')

                containerTitle.classList.add("d-flex", "align-center", "justify-start", "gap-sm");
                title.classList.add("color-third", "text-xl", "fw-m");

                imgTitle.src="/imgs/filter.svg";
                imgTitle.classList.add("img-size-20");

                title.innerText = "Filtros"

                header.classList.add("w-full", "d-dlex", "align-center", "justify-between", "gap-md")

                ul.append(
                    this.createDateDropdown('Data Inicial', 'input-start-date', 'start_date'),
                    this.createDateDropdown('Data Final', 'input-end-date', 'end_date'),
                );

                buttonClose.addEventListener("click", ()=>{
                    screen.remove();
                })

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

                const ul = document.createElement('ul');
                ul.id = selectorDropdown;
                ul.classList.add(
                    'dropdown', 'bd-primary', 'z-index-dropdown', 'bg-light',
                    'pt-md', 'd-flex', 'align-start', 'justify-start',
                    'flex-column', 'gap-md', 'radius-lg', 'position-absolute', 'mt-top-sm'
                );

                ul.append(
                    this.createDateDropdown('Data Inicial', 'input-start-date', 'start_date'),
                    this.createDateDropdown('Data Final', 'input-end-date', 'end_date'),
                );

                containerDropdown.append(ul);
            } else {
                containerDropdown.querySelector('ul').remove();
            }
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
            this.filterDashboard();
        });

        if (params[storageKey] != null) {
            input.value = params[storageKey];
        }

        divInput.append(input);
        container.append(label, divInput);
        li.append(container);

        return li;
    }
    
    async filterDashboard() {

        const params = this.utils.getParams(this.localStorageName, this.paramKeysFilter);

        const dataTransactions = await this.getAllTransactions(params);

        this.transactions = dataTransactions;

        this.updateValueTransaction();

        const dataTasks = await this.getAllTasks(params);

        this.tasks = dataTasks;

        this.updateValueTask();

    }

    updateValueTask(){
        document.querySelector('#value-to-do').innerText = this.tasks.to_do || 0;
        document.querySelector('#value-in-progress').innerText = this.tasks.in_progress || 0;
        document.querySelector('#value-done').innerText = this.tasks.done || 0;
    }

    updateValueTransaction() {
        document.querySelector('#value-income').innerText = 
            (this.transactions.income || 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
        });

        document.querySelector('#value-expense').innerText = 
            (this.transactions.expense || 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
        });

        document.querySelector('#value-total').innerText = 
            (this.transactions.total || 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });
        }
    }

export default Dashboard;
