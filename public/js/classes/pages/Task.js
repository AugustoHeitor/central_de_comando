import Modal  from '../components/Modal.js';
import Dropdown  from '../components/Dropdown.js';
import ContainerEmpty  from '../components/ContainerEmpty.js';
import Utils from '../Utils.js';
import Master from '../Master.js';

class Task extends Master {
    constructor(endpoint, tasks, categories) {
        super();
        this.categories = categories;
        this.tasks = tasks;
        this.baseUrl = '/api/';
        this.intervalTimeLogUpdate = null;
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

    async startTimeLog(id, button, timeCounter){

        button.disabled = true;
        const formData = new FormData();
        const formattedDate = this.utils.localDateTimeGenerator();

        const csrfToken = document.querySelector('input[name="_token"]').value;
        formData.append('_token', csrfToken);

        formData.append('started_at', formattedDate);

        try {
            const response = await axios.post(`${this.baseUrl}task-time-logs/start/${id}`, formData, {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201 && response.data.status === 'success') {

                toastr.success(response.data.message, 'Tarefa', { timeOut: 2000 });

                button.querySelector("img").src = "imgs/pause-light.svg";
                button.setAttribute("data-status", "started");

                this.intervalTimeLogUpdate = setInterval(()=>{
                    this.updateTimeCounter(timeCounter, response.data.data.started_at);
                }, 500);

                const data = response.data.data;

                this.tasks?.forEach((task)=>{
                    if(task.id == id){
                        task.time_logs.push(data);
                        this.createTimeLogs('.container-time-logs', task.time_logs, id);
                    }
                })

                this.createCardTask();

                setTimeout(() => {
                    button.disabled = false;
                }, 2000);

            }
        } catch (error) {

            let message = 'Erro ao iniciar o registro de tempo da tarefa!';

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

    async stopTimeLog(id, button, timeCounter){

        button.disabled = true;
        const formData = new FormData();
        const formattedDate = this.utils.localDateTimeGenerator();

        const csrfToken = document.querySelector('input[name="_token"]').value;
        formData.append('_token', csrfToken);

        formData.append('stopped_at', formattedDate);

        try {
            const response = await axios.patch(`${this.baseUrl}task-time-logs/stop/${id}`, formData, {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 && response.data.status === 'success') {

                toastr.success(response.data.message, 'Tarefa', { timeOut: 2000 });

                button.querySelector("img").src = "imgs/play-light.svg";
                timeCounter.innerText = "00:00:00";
                button.setAttribute("data-status", "stopped");

                clearInterval(this.intervalTimeLogUpdate);

                const data = response.data.data;

                this.tasks?.forEach((task)=>{
                    if(task.id == id){
                        task.time_logs.forEach((log)=>{
                            if(data.id == log.id){
                                log.stopped_at = data.stopped_at;

                                this.createTimeLogs('.container-time-logs', task.time_logs, id);
                            }
                        })
                    }
                })

                this.createCardTask();

                setTimeout(() => {
                    button.disabled = false;
                }, 2000);

            }
        } catch (error) {

            let message = 'Erro ao parar o registro de tempo da tarefa!';

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

    async updateTimeLog(taskId, timeLogId, input, formData){

        const csrfToken = document.querySelector('input[name="_token"]').value;
        formData.append('_token', csrfToken);

        input.disabled = true;

        try {
            const response = await axios.patch(`${this.baseUrl}task-time-logs/${timeLogId}`, formData, {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 && response.data.status === 'success') {

                toastr.success(response.data.message, 'Tarefa', { timeOut: 2000 });

                const data = response.data.data;

                this.tasks?.forEach((task)=>{
                    if(task.id == taskId){
                        task.time_logs.forEach((log)=>{
                            if(data.id == log.id){
                                log.started_at = data.started_at;
                                log.stopped_at = data.stopped_at;

                                this.createTimeLogs('.container-time-logs', task.time_logs, taskId);
                            }
                        })
                    }
                })

                this.createCardTask();

                setTimeout(() => {
                    input.disabled = false;
                }, 2000);

            }
        } catch (error) {

            let message = 'Erro ao atualizar o registro de tempo da tarefa!';

            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            console.log(error)

            toastr.error(message, 'Tarefa', { timeOut: 2000 });

            setTimeout(() => {
                input.disabled = false;
            }, 2000);

        }
    }

    async deleteTimeLog(taskId, logId, button){

        button.disabled = true;

        try {
            const response = await axios.delete(`${this.baseUrl}task-time-logs/${logId}`, {
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {

                toastr.success(response.data.message, 'Tarefa', { timeOut: 2000 });

                this.tasks?.forEach((task) => {
                    if (task.id == taskId) {
                        const index = task.time_logs.findIndex(log => log.id === logId);
                        if (index !== -1) {
                            task.time_logs.splice(index, 1);
                            this.createTimeLogs('.container-time-logs', task.time_logs, taskId);
                        }
                    }
                });

                this.createCardTask();

                setTimeout(() => {
                    button.disabled = false;
                }, 2000);

            }
        } catch (error) {

            let message = 'Erro ao deletar o registro de tempo da tarefa!';

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

        document.querySelector('#task-section').replaceChildren();

        const parameter = this.utils.getParams(this.localStorageName, ['order']);

        let orderedTasks = this.sortTasks(this.tasks, parameter.order);

        if(Array.isArray(orderedTasks) && orderedTasks.length > 0){

            orderedTasks?.forEach((task, index)=>{
                const card = document.createElement('div');

                card.classList.add(
                    'overflow-hidden', 'hover-bg-primary', 'h-mn-157', 'radius-sm', 'pointer',
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
                priorityBadge.classList.add('d-flex', 'justify-center', 'items-center', 'w-70', 'radius-sm', 'text-xs', 'pt-xs');

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

                const createInfoItem = (imgSrc, altText, spanText, highlight = false) => {
                    const wrapper = document.createElement('div');
                    wrapper.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

                    const icon = document.createElement('img');
                    icon.src = imgSrc;
                    icon.alt = altText;
                    icon.classList.add('img-size-10');

                    const text = document.createElement('span');
                    text.textContent = spanText;

                    if(highlight == true){
                        wrapper.classList.add('pulse-animation');
                        text.classList.add('color-active', 'text-xs', 'fw-sb');
                    }else{
                        text.classList.add('color-primary', 'text-xs');
                    }

                    wrapper.title = altText;
                    wrapper.append(icon, text);
                    return wrapper;
                };

                const categoryName = this.categories.find(category => category.id == task.category_id)?.name;
                const timeLogs = task?.time_logs?.filter(log => log.stopped_at != null);
                const statusTimeLog = task?.time_logs?.findIndex(log => log.stopped_at == null);

                if(statusTimeLog != -1){
                    footer.append(
                        createInfoItem('imgs/clock-green.svg', 'Tempo de Execução', this.utils.calculateTotalTime(timeLogs), true),
                    );
                }else{
                    footer.append(
                        createInfoItem('imgs/clock-gray.svg', 'Tempo de Execução', this.utils.calculateTotalTime(timeLogs)),
                    );
                }

                footer.append(
                    createInfoItem('imgs/calendar-week-gray.svg', 'Prazo de Entrega', this.utils.formatDate(task.deadline, null)),
                    createInfoItem('imgs/tag-gray.svg', 'Categoria', categoryName)
                )

                card.append(topContent, footer);

                card.addEventListener('click', (e) => {
                    this.openModal('save', task);
                });

                document.querySelector('#task-section').append(card);
            })
        }else{
            this.components.containerEmpty.createContainerEmpty('#task-section', 'Nenhuma tarefa encontrada', 'Não há tarefas que correspondam ao filtro aplicado ou você ainda não criou nenhuma. Experimente ajustar o filtro ou adicionar uma nova tarefa.')
        }

        this.utils.addScrollY('#task-section', false);
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
            inputWrapper.classList.add('d-flex', 'items-center', 'justify-between', 'w-full', 'bg-secondary', 'pt-input-primary', 'bd-primary', 'radius-sm');
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
        descWrapper.classList.add('w-full', 'h-mn-300', 'bg-secondary', 'pt-right-sm', 'bd-primary', 'radius-sm');

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
            selectWrapper.classList.add('w-full', 'bg-secondary', 'radius-sm', 'bd-primary', 'pt-input-primary');

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
        deadlineWrapper.classList.add('w-full', 'bg-secondary', 'radius-sm', 'bd-primary', 'pt-input-primary');

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
            const lastLog = task?.time_logs[task.time_logs.length - 1];
            let statusLog = null;

            if(task?.time_logs[task.time_logs.length - 1] && lastLog?.stopped_at === null){
                statusLog = "started";
            }else{
                statusLog = "stopped";
            }

            const timeContainer = this.createTimeControl(task.id, statusLog, lastLog?.started_at);

            const containerTimeLogs = document.createElement("div");
            containerTimeLogs.classList.add(
                'w-full',
                'd-flex',
                'justify-start',
                'items-start',
                'gap-sm',
                'flex-column',
                'container-time-logs'
            );

            content.append(timeContainer, containerTimeLogs);

            this.components.modal.createModal(modalConfig, content, buttons);
            this.createTimeLogs('.container-time-logs', task.time_logs, task.id);

        }
    }

    createTimeControl(id, status, startDate = null) {

        const container = document.createElement('div');
        const containerButton = document.createElement('div');

        container.classList.add(
            'w-full',
            'd-flex',
            'justify-start',
            'items-start',
            'gap-sm',
            'flex-column'
        );

        containerButton.classList.add(
            'w-full',
            'd-flex',
            'justify-between',
            'items-center',
            'gap-sm',
            'radius-sm',
            'pt-input-primary',
            'bd-shadow-secondary',
            'bd-primary'
        );

        const leftDiv = document.createElement('div');
        leftDiv.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

        const containerLabel = document.createElement('div');
        containerLabel.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

        const clockImg = document.createElement('img');
        clockImg.src = "imgs/clock-light.svg";
        clockImg.alt = "Tempo";
        clockImg.classList.add('img-size-15');

        const label = document.createElement('label');
        label.classList.add('color-light', 'text-base', 'fw-m');
        label.setAttribute('for', 'time');
        label.textContent = 'Controle de Tempo';

        containerLabel.append(clockImg, label);

        const timeSpan = document.createElement('span');
        timeSpan.classList.add("text-base", "color-primary");
        timeSpan.textContent = '00:00:00';

        leftDiv.append(timeSpan);

        const button = document.createElement('button');
        button.classList.add('d-flex', 'justify-center', 'items-center', 'radius-sm');
        button.type = "button";
        button.setAttribute("data-status", status);

        const playImg = document.createElement('img');
        playImg.alt = "Tempo";
        playImg.classList.add('img-size-15');

        if(status === "started"){
            playImg.src = "imgs/pause-light.svg";
            this.intervalTimeLogUpdate = setInterval(()=>{
                this.updateTimeCounter(timeSpan, startDate);
            }, 500);
        }else if(status === "stopped"){
            timeSpan.textContent = '00:00:00';
            playImg.src = "imgs/play-light.svg";
        }

        button.append(playImg);

        button.addEventListener("click", ()=>{
            const status = button.dataset.status;

            if(status === "started"){
                this.stopTimeLog(id, button, timeSpan);
            }else if(status === "stopped"){
                this.startTimeLog(id, button, timeSpan);
            }

        });

        containerButton.append(leftDiv, button);
        container.append(containerLabel, containerButton)

        return container;
    }

    createTimeLogs(containerSelector, data, taskId) {

        const container = document.querySelector(containerSelector);
        container.replaceChildren();

        if(Array.isArray(data) && data.length > 0){

            const timeLogs = data.filter(log => log.stopped_at != null);

            if(timeLogs.length == 0){
                return;
            }

            const containerPrimary = document.createElement('div');
            const containerSecondary = document.createElement('div');
            const containerTertiary = document.createElement('div');
            const textTotalTime = document.createElement('p');
            const valueTotalTime = document.createElement('p');

            containerPrimary.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

            containerSecondary.classList.add(
                'w-full',
                'd-flex',
                'justify-start',
                'items-start',
                'gap-sm',
                'flex-column'
            );

            containerTertiary.classList.add('d-flex', 'justify-between', 'items-center', 'gap-sm', 'bd-top', 'pt-sm', 'w-full');

            const img = document.createElement('img');
            img.src = "imgs/time-logs-light.svg";
            img.alt = "Tempo";
            img.classList.add('img-size-20');

            const label = document.createElement('label');
            label.classList.add('color-light', 'text-base', 'fw-m');

            label.textContent = 'Registros de Tempo';

            containerPrimary.append(img, label);


            timeLogs.forEach((log) => {

                    const containerTime = document.createElement("div");
                    const containerLog = document.createElement("div");
                    const containerInputs = document.createElement("div");
                    const inputDateStart = document.createElement("input");
                    const inputDateEnd = document.createElement("input");
                    const textTime = document.createElement("p");
                    const btnDelete = document.createElement("button");
                    const imgDelete = document.createElement("img");

                    btnDelete.classList.add("hover-scale", "d-flex", 'justify-center', 'items-center');
                    containerTime.classList.add("d-flex", 'justify-start', 'items-center', 'gap-md');
                    containerLog.classList.add("d-flex", 'justify-between', 'items-center', 'gap-sm', 'w-full',"bg-secondary", "radius-sm", "bd-primary", "pt-input-primary");
                    containerInputs.classList.add("d-flex", 'justify-start', 'items-center', 'gap-md', 'flex-direction-mobile');
                    textTime.classList.add("color-primary", "text-base", "flex-desktop");
                    inputDateStart.classList.add("color-primary", "text-base", "w-full", "h-21");
                    inputDateEnd.classList.add("color-primary", "text-base", "w-full", "h-21");
                    imgDelete.classList.add("img-size-15");

                    inputDateStart.value = this.utils.formatForDatetime(log.started_at);
                    inputDateEnd.value = this.utils.formatForDatetime(log.stopped_at);

                    inputDateStart.type = "datetime-local";
                    inputDateStart.step = 1;
                    inputDateEnd.type = "datetime-local";
                    inputDateEnd.step = 1;
                    btnDelete.type = "button";

                    inputDateStart.addEventListener("input", ()=>{

                        const formData = new FormData();
                        formData.append("started_at", inputDateStart.value);
                        formData.append("stopped_at", inputDateEnd.value);

                        this.updateTimeLog(taskId, log.id, inputDateStart, formData);
                    })

                    inputDateEnd.addEventListener("input", ()=>{

                        const formData = new FormData();
                        formData.append("started_at", inputDateStart.value);
                        formData.append("stopped_at", inputDateEnd.value);

                        this.updateTimeLog(taskId, log.id, inputDateEnd, formData);
                    })

                    imgDelete.src = "/imgs/trash-light.svg";
                    imgDelete.alt = "Deletar";

                    btnDelete.appendChild(imgDelete);

                    btnDelete.addEventListener("click", ()=>{
                        this.deleteTimeLog(taskId, log.id, btnDelete);
                    })

                    textTime.innerText = this.utils.calculateTimeDifference(log.started_at, log.stopped_at);

                    containerInputs.append(inputDateStart, inputDateEnd);
                    containerTime.append(textTime, btnDelete);
                    containerLog.append(containerInputs, containerTime);
                    containerSecondary.append(containerLog);

            });


            textTotalTime.classList.add("color-primary", "text-base");
            valueTotalTime.classList.add("color-primary", "text-base");

            textTotalTime.innerText = "Tempo Total:";
            valueTotalTime.innerText = this.utils.calculateTotalTime(timeLogs);

            containerTertiary.append(textTotalTime, valueTotalTime);
            container.append(containerPrimary, containerSecondary, containerTertiary);

        }

    }

    updateTimeCounter(timeCounter, startDate){
        timeCounter.innerText = this.utils.calculateTimeDifference(startDate);
    }
}

export default Task;
