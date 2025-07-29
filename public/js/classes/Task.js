import Modal  from './Modal.js';
import Utils from './Utils.js';
import Master from './Master.js';

class Task extends Master {
    constructor(endpoint, tasks, categories) {
        super();
        this.categories = categories;
        this.tasks = tasks;
        this.baseUrl = '/api/';
        this.endpoint = endpoint;
        this.localStorageName = "tasks";
        this.url = this.baseUrl + endpoint;
        this.utils = new Utils(); 
        this.modal = new Modal(); 
        this.paramKeysFilter = [
            'status',
            'priority',
            'category',
            'start_deadline',
            'end_deadline',
        ];

        this.paramKeysOrder = [
            { name: "Sem Ordenação", value: "none" },
            { name: "Prazo", value: "deadline" },
            { name: "Prioridade", value: "priority" },
        ];
    }

    init() {
        this.filterTasks();
    }

    createContentModal(task = null) {

        const categories = this.categories.map((category) => ({
            value: category.id,
            text: category.name
        }));

        const container = document.createElement('div');
        container.classList.add('w-full', 'h-full', 'd-flex', 'align-start', 'justify-start', 'flex-column', 'gap-lg', 'scroll-auto');

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
        titleInput.value = task?.title ? task.title : "";
        titleInput.required = true;
        titleInput.type = 'text';
        titleInput.name = 'title';
        titleInput.classList.add('text-base', 'color-secondary', 'w-full');
        container.append(createInputGroup({
            iconSrc: 'imgs/heading-dark.svg',
            iconAlt: 'Título',
            labelFor: 'title',
            labelText: 'Título',
            inputElement: titleInput
        }));

        const descGroup = document.createElement('div');
        descGroup.classList.add('w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm');

        const descLabelWrapper = document.createElement('div');
        descLabelWrapper.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

        const descIcon = document.createElement('img');
        descIcon.src = 'imgs/text-dark.svg';
        descIcon.alt = 'Descrição';
        descIcon.classList.add('img-size-15');

        const descLabel = document.createElement('label');
        descLabel.classList.add('color-dark', 'text-base', 'fw-m');
        descLabel.setAttribute('for', 'description');
        descLabel.textContent = 'Descrição';

        descLabelWrapper.append(descIcon);
        descLabelWrapper.append(descLabel);

        const descWrapper = document.createElement('div');
        descWrapper.classList.add('w-full', 'h-mn-300', 'bg-light', 'pt-right-sm', 'bd-primary', 'radius-lg');

        const descTextarea = document.createElement('textarea');
        descTextarea.value = task?.description ? task.description : "";
        descTextarea.name = 'description';
        descTextarea.classList.add('w-full', 'h-full', 'text-base', 'color-secondary', 'pt-input-primary');

        descWrapper.append(descTextarea);
        descGroup.append(descLabelWrapper);
        descGroup.append(descWrapper);
        container.append(descGroup);

        const fieldsWrapper = document.createElement('div');
        fieldsWrapper.classList.add('d-flex', 'w-full', 'align-start', 'justify-start', 'gap-lg', 'flex-wrap');

        const fields = [
            {
                name: 'status',
                icon: 'imgs/columns-dark.svg',
                label: 'Status',
                options: [
                    { value: 'to_do', text: 'A fazer' },
                    { value: 'in_progress', text: 'Em andamento' },
                    { value: 'done', text: 'Concluído' }
                ]
            },
            {
                name: 'priority',
                icon: 'imgs/circle-exclamation-dark.svg',
                label: 'Prioridade',
                options: [
                    { value: 'low', text: 'Baixa' },
                    { value: 'medium', text: 'Média' },
                    { value: 'urgent', text: 'Urgente' }
                ]
            },
            {
                name: 'category_id',
                icon: 'imgs/tag-dark.svg',
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
            icon.classList.add('img-size-15');

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

                if(task){
                    if (task[field.name] == opt.value) {
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

        const deadlineGroup = document.createElement('div');
        deadlineGroup.classList.add('w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'cnt-input-w');

        const deadlineLabelWrapper = document.createElement('div');
        deadlineLabelWrapper.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

        const deadlineIcon = document.createElement('img');
        deadlineIcon.src = 'imgs/calendar-week-dark.svg';
        deadlineIcon.alt = 'Tempo';
        deadlineIcon.classList.add('img-size-15');

        const deadlineLabel = document.createElement('label');
        deadlineLabel.classList.add('color-dark', 'text-base', 'fw-m');
        deadlineLabel.setAttribute('for', 'deadline');
        deadlineLabel.textContent = 'Prazo';

        deadlineLabelWrapper.append(deadlineIcon);
        deadlineLabelWrapper.append(deadlineLabel);

        const deadlineWrapper = document.createElement('div');
        deadlineWrapper.classList.add('w-full', 'bg-light', 'radius-lg', 'bd-primary', 'pt-input-primary');

        const deadlineInput = document.createElement('input');
        deadlineInput.required = true;
        deadlineInput.type = 'date';
        deadlineInput.name = 'deadline';
        deadlineInput.classList.add('w-full', 'text-base', 'color-secondary', 'h-21');
        
        if(task?.deadline){
            const taskDeadline = this.utils.formatDate(task?.deadline, 'iso'); 
            deadlineInput.value = taskDeadline;  
        }else{
            const dateToday = this.utils.formatDate(new Date().toISOString().split('T')[0], 'iso'); 
            deadlineInput.value = dateToday;  
        }

        deadlineWrapper.append(deadlineInput);
        deadlineGroup.append(deadlineLabelWrapper);
        deadlineGroup.append(deadlineWrapper);
        fieldsWrapper.append(deadlineGroup);

        container.append(fieldsWrapper);

        return container;
    }

    createCardTask() {

        document.querySelector('#task-section').innerHTML = "";

        const parameter = this.utils.getParams(this.localStorageName, ['order']);

        let orderedTasks = this.sortTasks(this.tasks, parameter.order);
        
        orderedTasks?.forEach((task)=>{
            const card = document.createElement('div');

            card.classList.add(
                'overflow-hidden', 'h-mn-157', 'radius-lg', 'pointer',
                'd-flex', 'flex-column', 'justify-start', 'items-start',
                'gap-md', 'w-full', 'bg-light', 'bd-primary', 'radius-sm'
            );

            const topContent = document.createElement('div');
            topContent.classList.add('d-flex', 'flex-column', 'justify-start', 'items-start', 'gap-md', 'w-full');

            const header = document.createElement('div');
            header.classList.add('w-full', 'd-flex', 'justify-between', 'items-center', 'gap-md', 'pt-top-md', 'pt-left-md', 'pt-right-md');

            const title = document.createElement('h3');
            title.classList.add('color-third', 'fw-m', 'text-sm');
            title.textContent = task.title;

            const priorityBadge = document.createElement('span');
            priorityBadge.classList.add('d-flex', 'justify-center', 'items-center', 'badge-high', 'w-70', 'radius-lg', 'text-xs', 'pt-xs');

            priorityBadge.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

            header.append(title, priorityBadge);

            const description = document.createElement('p');
            description.classList.add('txt-2-lines', 'color-secondary', 'd-flex', 'justify-start', 'items-start', 'text-sm', 'h-36', 'pt-left-md', 'pt-right-md');
            description.textContent = task.description || 'Sem descrição';

            topContent.append(header, description);

            const footer = document.createElement('div');
            footer.classList.add('w-full', 'd-flex', 'justify-start', 'items-center', 'gap-lg', 'bd-top', 'bg-third', 'pt-left-md', 'pt-right-md', 'pt-top-md', 'pt-bottom-md', 'flex-wrap');

            const createInfoItem = (imgSrc, altText, spanText) => {
                const wrapper = document.createElement('div');
                wrapper.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

                const icon = document.createElement('img');
                icon.src = imgSrc;
                icon.alt = altText;
                icon.classList.add('img-size-10');

                const text = document.createElement('span');
                text.classList.add('color-secondary', 'text-xs');
                text.textContent = spanText;

                wrapper.append(icon, text);
                return wrapper;
            };

            const categoryName = this.categories.find(category => category.id == task.category_id)?.name;

            footer.append(
                createInfoItem('imgs/clock.svg', 'Iniciar', task.duration || '00:00:00'),
                createInfoItem('imgs/calendar-week.svg', 'Prazo', this.utils.formatDate(task.deadline, null)),
                createInfoItem('imgs/tag.svg', 'Categoria', categoryName)
            );

            card.append(topContent, footer);

            card.addEventListener('click', (e) => {
                this.openModal('save', task);
            });

            document.querySelector('#task-section').append(card);
        })

        this.utils.addScrollY('#task-section');
    }

    openModal(type, task = null){

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
                title: "Criar Tarefa", 
                img: "imgs/list-check-dark.svg",
                class: ["h-full", "w-full", "w-mx-1000"],
                visible: {
                    'footer': true,
                },
                csrfToken: true,
                event: (e)=>{
                    e.preventDefault();

                    const formModal = document.querySelector('#form-modal');
                    const buttonSubmit = e.submitter;

                    const formData = this.utils.getFormValues(formModal);

                    this.createTask(formData, buttonSubmit);
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
                            'message': `Tem certeza de que deseja excluir a tarefa ${task.title}?`,
                            'messageWarning': 'Atenção: essa ação não poderá ser desfeita. Você irá excluir todas as informações que estão interligadas a esta tarefa.',
                            'class': ['container-delete-task'],
                            'title': 'Tarefa'
                        }

                        const buttonsConfig = [
                            { 
                                text: "Cancelar", 
                                type: "cancel", 
                                event: ()=>{
                                    this.openModal('save', task)
                                }
                            },
                            { 
                                text: "Deletar", 
                                type: "delete",
                                event: (event)=>{
                                    const button = event.target;
                                    const csrfToken = document.querySelector('input[name="_token"]').value;
                                    this.deleteTask(button, csrfToken, task.id);
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
                title: "Editar Tarefa", 
                img: "imgs/list-check-dark.svg",
                class: ["h-full", "w-full", "w-mx-1000"],
                visible: {
                    'footer': true,
                },
                csrfToken: true,
                event: (e)=>{
                    e.preventDefault();

                    const formModal = document.querySelector('#form-modal');
                    const buttonSubmit = e.submitter;

                    const formData = this.utils.getFormValues(formModal);

                    this.updateTask(formData, buttonSubmit, task?.id);
                    
                }
            };

            const content = this.createContentModal(task);

            this.modal.createModal(modalConfig, content, buttons);
        }
    }

    async getAllTasks(params){
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

    async createTask(formData, button){

        button.disabled = true;

        try {
            const response = await axios.post(this.url, formData, {
                timeout: 5000
            });

            if (response.status === 201 && response.data.status === 'success') {

                this.tasks.push(response.data.data);
                this.createCardTask();

                if(response?.data?.data){
                    const screenModal = document.querySelector('.screen-modal');
                    if(screenModal){
                        screenModal.remove();
                    }
                }

                toastr.success(response.data.message, 'Tarefa', { timeOut: 2000 });

                setTimeout(() => {
                    button.disabled = false;
                }, 2000);

            }
        } catch (error) {

            let message = 'Erro ao criar tarefa!';

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

    async updateTask(formData, button, id){

        button.disabled = true;

        try {
            const response = await axios.patch(`${this.url}/${id}`, formData, {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 && response.data.status === 'success') {

                this.tasks?.splice(0, this.tasks.length, 
                    ...this.tasks.filter((task) => task.id !== id)
                );

                this.tasks.push(response.data.data)

                this.createCardTask();

                if(response?.data?.data){
                    const screenModal = document.querySelector('.screen-modal');
                    if(screenModal){
                        screenModal.remove();
                    }
                }

                toastr.success(response.data.message, 'Tarefa', { timeOut: 2000 });

                setTimeout(() => {
                    button.disabled = false;
                }, 2000);

            }
        } catch (error) {

            let message = 'Erro ao atualizar tarefa!';

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

    async deleteTask(button, csrfToken, id){

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

                this.tasks?.splice(0, this.tasks.length, 
                    ...this.tasks.filter((task) => task.id !== id)
                );

                this.createCardTask();

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

    async filterTasks() {

        const params = this.utils.getParams(this.localStorageName, this.paramKeysFilter);

        const result = await this.getAllTasks(params);

        this.tasks?.splice(0, this.tasks.length, 
            ...result
        );

        this.createCardTask();
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
                this.createDateDropdown('Prazo Inicial', 'input-start-deadline', 'start_deadline'),
                this.createDateDropdown('Prazo Final', 'input-end-deadline', 'end_deadline'),
                this.createSelectDropdown('Categorias', 'taskCategories', 'select-category', categories, 'category'),
                this.createSelectDropdown('Prioridade', 'priority', 'select-priority', [
                    { value: '', label: 'Todos' },
                    { value: 'low', label: 'Baixa' },
                    { value: 'medium', label: 'Média' },
                    { value: 'urgent', label: 'Urgente' }
                ], 'priority')
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
                    this.createCardTask();
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
            this.filterTasks();
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

    sortTasks(tasks, order){

        let orderedTasks = [...tasks];

        if (order === "deadline") {

            orderedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

        } else if (order === "priority") {

            const priorityOrder = ['urgent', 'medium', 'low'];

            orderedTasks.sort((a, b) => {
                return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
            });
            
        }else{
            orderedTasks.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        }

        return orderedTasks;
    }
    
}

export default Task;
