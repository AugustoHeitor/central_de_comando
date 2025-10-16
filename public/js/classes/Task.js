import Modal  from './components/Modal.js';
import Dropdown  from './components/Dropdown.js';
import ContainerEmpty  from './components/ContainerEmpty.js';
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

        this.components = {
            'modal': new Modal(),
            'dropdown': new Dropdown(this.localStorageName, this.paramKeysFilter, this.filterTasks.bind(this), this.paramKeysOrder, this.createCardTask.bind(this)),
            'containerEmpty': new ContainerEmpty()
        };
    }

    init() {
        this.filterTasks();
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

    createCardTask() {

        document.querySelector('#task-section').innerHTML = "";

        const parameter = this.utils.getParams(this.localStorageName, ['order']);

        let orderedTasks = this.sortTasks(this.tasks, parameter.order);

        if(Array.isArray(orderedTasks) && orderedTasks.length > 0){

            orderedTasks?.forEach((task, index)=>{
                const card = document.createElement('div');

                card.classList.add(
                    'overflow-hidden', 'hover-bg-primary', 'h-mn-157', 'radius-lg', 'pointer',
                    'd-flex', 'flex-column', 'justify-start', 'items-start',
                    'gap-md', 'w-full', 'bg-secondary', 'bd-shadow-primary'
                );

                const topContent = document.createElement('div');
                topContent.classList.add('d-flex', 'flex-column', 'justify-start', 'items-start', 'gap-md', 'w-full');

                const header = document.createElement('div');
                header.classList.add('w-full', 'd-flex', 'justify-between', 'items-center', 'gap-md', 'pt-top-md', 'pt-left-md', 'pt-right-md');

                const title = document.createElement('h3');
                title.classList.add('color-primary', 'fw-m', 'text-sm', "txt-1-line-mobile");
                title.textContent = task.title;

                const priorityBadge = document.createElement('span');
                priorityBadge.classList.add('d-flex', 'justify-center', 'items-center', 'w-70', 'radius-lg', 'text-xs', 'pt-xs');

                const priorities = [
                    { value: 'low', label: 'Baixa', class: "badge-low" },
                    { value: 'medium', label: 'Média', class: "badge-medium" },
                    { value: 'urgent', label: 'Urgente', class: "badge-high" }
                ];

                const priority = priorities.find(p => p.value === task.priority);

                priorityBadge.classList.add(priority.class)

                priorityBadge.textContent = priority.label;

                header.append(title, priorityBadge);

                const description = document.createElement('p');
                description.classList.add('txt-2-lines', 'color-primary', 'd-flex', 'justify-start', 'items-start', 'text-sm', 'h-36', 'pt-left-md', 'pt-right-md');
                description.textContent = task.description || 'Sem descrição';

                topContent.append(header, description);

                const footer = document.createElement('div');
                footer.classList.add('w-full', 'd-flex', 'justify-start', 'items-center', 'gap-lg', 'bd-top', 'pt-left-md', 'pt-right-md', 'pt-top-md', 'pt-bottom-md', 'flex-wrap');

                const createInfoItem = (imgSrc, altText, spanText) => {
                    const wrapper = document.createElement('div');
                    wrapper.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

                    const icon = document.createElement('img');
                    icon.src = imgSrc;
                    icon.alt = altText;
                    icon.classList.add('img-size-10');

                    const text = document.createElement('span');
                    text.classList.add('color-primary', 'text-xs');
                    text.textContent = spanText;

                    wrapper.append(icon, text);
                    return wrapper;
                };

                const categoryName = this.categories.find(category => category.id == task.category_id)?.name;

                footer.append(
                    createInfoItem('imgs/clock-gray.svg', 'Iniciar', task.duration || '00:00:00'),
                    createInfoItem('imgs/calendar-week-gray.svg', 'Prazo', this.utils.formatDate(task.deadline, null)),
                    createInfoItem('imgs/tag-gray.svg', 'Categoria', categoryName)
                );

                card.append(topContent, footer);

                card.addEventListener('click', (e) => {
                    this.openModal('save', task);
                });

                document.querySelector('#task-section').append(card);
            })
        }else{
            this.components.containerEmpty.createContainerEmpty('#task-section', 'Nenhuma tarefa encontrada', 'Não há tarefas que correspondam ao filtro aplicado ou você ainda não criou nenhuma. Experimente ajustar o filtro ou adicionar uma nova tarefa.')
        }

        this.utils.addScrollY('#task-section', true);
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
            label.classList.add('color-light', 'text-base', 'fw-m');
            label.setAttribute('for', labelFor);
            label.textContent = labelText;

            labelWrapper.append(icon);
            labelWrapper.append(label);

            const inputWrapper = document.createElement('div');
            inputWrapper.classList.add('d-flex', 'items-center', 'justify-between', 'w-full', 'bg-secondary', 'pt-input-primary', 'bd-primary', 'radius-lg');
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
        titleInput.classList.add('text-base', 'color-primary', 'w-full');
        container.append(createInputGroup({
            iconSrc: 'imgs/heading-light.svg',
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
        descIcon.src = 'imgs/text-light.svg';
        descIcon.alt = 'Descrição';
        descIcon.classList.add('img-size-15');

        const descLabel = document.createElement('label');
        descLabel.classList.add('color-light', 'text-base', 'fw-m');
        descLabel.setAttribute('for', 'description');
        descLabel.textContent = 'Descrição';

        descLabelWrapper.append(descIcon);
        descLabelWrapper.append(descLabel);

        const descWrapper = document.createElement('div');
        descWrapper.classList.add('w-full', 'h-mn-300', 'bg-secondary', 'pt-right-sm', 'bd-primary', 'radius-lg');

        const descTextarea = document.createElement('textarea');
        descTextarea.value = task?.description ? task.description : "";
        descTextarea.name = 'description';
        descTextarea.classList.add('w-full', 'h-full', 'text-base', 'color-primary', 'pt-input-primary');

        descWrapper.append(descTextarea);
        descGroup.append(descLabelWrapper);
        descGroup.append(descWrapper);
        container.append(descGroup);

        const fieldsWrapper = document.createElement('div');
        fieldsWrapper.classList.add('d-grid', 'w-full', 'align-start', 'justify-start', 'gap-lg', 'grid-tmp-columns-4', "grid-tmp-columns-3-responsive", "grid-tmp-columns-2-responsive", "grid-tmp-columns-1-responsive");

        const fields = [
            {
                name: 'status',
                icon: 'imgs/columns-light.svg',
                label: 'Status',
                options: [
                    { value: 'to_do', text: 'A fazer' },
                    { value: 'in_progress', text: 'Em andamento' },
                    { value: 'done', text: 'Concluído' }
                ]
            },
            {
                name: 'priority',
                icon: 'imgs/circle-exclamation-light.svg',
                label: 'Prioridade',
                options: [
                    { value: 'low', text: 'Baixa' },
                    { value: 'medium', text: 'Média' },
                    { value: 'urgent', text: 'Urgente' }
                ]
            },
            {
                name: 'category_id',
                icon: 'imgs/tag-light.svg',
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
            label.classList.add('color-light', 'text-base', 'fw-m');
            label.setAttribute('for', field.name);
            label.textContent = field.label;

            labelWrapper.append(icon);
            labelWrapper.append(label);

            const selectWrapper = document.createElement('div');
            selectWrapper.classList.add('w-full', 'bg-secondary', 'radius-lg', 'bd-primary', 'pt-input-primary');

            const select = document.createElement('select');
            select.name = field.name;
            select.required = true;
            select.classList.add('w-full', 'text-base', 'color-primary', 'h-21');

            field.options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.classList.add("color-dark");

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
        deadlineIcon.src = 'imgs/calendar-week-light.svg';
        deadlineIcon.alt = 'Tempo';
        deadlineIcon.classList.add('img-size-15');

        const deadlineLabel = document.createElement('label');
        deadlineLabel.classList.add('color-light', 'text-base', 'fw-m');
        deadlineLabel.setAttribute('for', 'deadline');
        deadlineLabel.textContent = 'Prazo';

        deadlineLabelWrapper.append(deadlineIcon);
        deadlineLabelWrapper.append(deadlineLabel);

        const deadlineWrapper = document.createElement('div');
        deadlineWrapper.classList.add('w-full', 'bg-secondary', 'radius-lg', 'bd-primary', 'pt-input-primary');

        const deadlineInput = document.createElement('input');
        deadlineInput.required = true;
        deadlineInput.type = 'date';
        deadlineInput.name = 'deadline';
        deadlineInput.classList.add('w-full', 'text-base', 'color-primary', 'h-21');

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

            const buttons = this.components.modal.createButtons(buttonsConfig);

            const modalConfig = {
                title: "Criar Tarefa",
                img: "imgs/list-check-light.svg",
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

            this.components.modal.createModal(modalConfig, content, buttons);
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
                title: "Editar Tarefa",
                img: "imgs/list-check-light.svg",
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

            this.components.modal.createModal(modalConfig, content, buttons);
        }
    }
}

export default Task;
