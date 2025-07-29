import Modal  from './Modal.js';
import Master from './Master.js';
import Utils from './Utils.js';

class Category extends Master {
    constructor(endpoint, messageWarning, categories) {
        super();
        this.categories = categories;
        this.baseUrl = '/api/';
        this.endpoint = endpoint;
        this.url = this.baseUrl + endpoint;
        this.messageWarning = messageWarning;
        this.utils = new Utils(); 
        this.modal = new Modal(); 
    }

    async init() {
        const result = await this.getAllCategories();
        this.categories.push(...result);
    }

    openModal(){

        const config = { 
            title: "Gestão de Categorias", 
            img: "imgs/tag-dark.svg",
            class: ["h-full", "w-full", "w-mx-600"],
            visible: {
                'footer': false,
            },
            csrfToken: true,
            event: (e)=>{
                e.preventDefault();

                const formModal = document.querySelector('#form-modal');
                const buttonSubmit = e.submitter;
                const csrfToken = formModal.querySelector('input[name="_token"]').value;
                const inputName = formModal.querySelector('input[name="name"]');
                const name = inputName?.value?.trim();

                this.createCategory(name, buttonSubmit, inputName, csrfToken);
            }
        };
        
        const content = this.createModalContent();
        
        this.modal.createModal(config, content, '');
    }

    createContainerDelete(config, buttons) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('d-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'w-full', ...config.class);

        const warningContainer = document.createElement('div');
        warningContainer.classList.add('d-flex', 'justify-start', 'items-start', 'gap-md', 'w-full', 'bd-primary', 'radius-lg', 'pt-md');

        const warningIcon = document.createElement('img');
        warningIcon.src = '/imgs/circle-exclamation-red.svg'; 
        warningIcon.alt = 'Aviso';
        warningIcon.classList.add('img-size-15');

        const warningTextContainer = document.createElement('div');
        warningTextContainer.classList.add('d-flex', 'justify-start', 'items-start');

        const warningText = document.createElement('p');
        warningText.classList.add('text-xs', 'color-warning', 'fw-n');
        warningText.innerHTML = `<strong class="text-xs color-warning fw-b">Atenção! </strong>${config.messageWarning}`;

        warningTextContainer.append(warningText);
        warningContainer.append(warningIcon);
        warningContainer.append(warningTextContainer);

        const messageText = document.createElement('p');
        messageText.classList.add('text-sm', 'color-dark', 'fw-n', 'pt-md');
        messageText.textContent = config.message;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('d-flex', 'justify-end', 'items-end', 'gap-md', 'w-full', 'pt-md');

        buttonsContainer.append(...buttons);

        wrapper.append(warningContainer);
        wrapper.append(messageText);
        wrapper.append(buttonsContainer);

        return wrapper;
    }

    createContainerEdit(config, buttons) {

        const containerContent = document.createElement('div');
        const container = document.createElement('div');

        container.classList.add('d-flex', 'flex-column', 'justify-start', 'items-start', 'gap-md', 'w-full', ...config.class);
        containerContent.classList.add('d-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'w-full');

        const label = document.createElement('label');
        label.className = 'color-dark text-sm fw-m';
        label.htmlFor = 'name';
        label.innerText = 'Nome da Categoria';

        const containerInput = document.createElement('div');

        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'name';
        input.required = true;
        input.value = config.inputValue;
        input.id = config.inputId;

        containerInput.classList.add(
            'd-flex',
            'items-center',
            'justify-between',
            'w-full',
            'bg-light',
            'pt-input-primary',
            'bd-primary',
            'radius-lg',
        );

        input.classList.add(
            'text-base',
            'color-secondary',
            'w-full',
        );

        containerInput.append(input);
        containerContent.append(label, containerInput);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('d-flex', 'justify-end', 'items-end', 'gap-md', 'w-full', 'pt-md');

        buttonsContainer.append(...buttons);

        container.append(containerContent, buttonsContainer);

        return container;
    }

    createModalContent() {
        const wrapper = document.createElement("div");
        wrapper.classList.add("w-full", "h-full", "d-flex", "align-start", "justify-start", "flex-column", "gap-lg");

        const firstBlock = document.createElement("div");
        firstBlock.classList.add("w-full", "d-flex", "flex-column", "justify-start", "items-start", "gap-sm");

        const labelWrapper = document.createElement("div");
        labelWrapper.classList.add("d-flex", "justify-start", "items-center", "gap-sm");

        const label = document.createElement("label");
        label.classList.add("color-dark", "text-base", "fw-m");
        label.setAttribute("for", "name");
        label.textContent = "Adicionar nova categoria";

        labelWrapper.append(label);

        const containerCreateCategory = document.createElement("div");
        containerCreateCategory.classList.add("d-flex", "items-center", "justify-between", "w-full", "gap-md");

        const inputBox = document.createElement("div");
        inputBox.classList.add("d-flex", "items-center", "justify-between", "w-full", "bg-light", "pt-input-primary", "bd-primary", "radius-lg");

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "name");
        input.required = true;
        input.classList.add("text-base", "color-secondary", "w-full");

        inputBox.append(input);

        const button = document.createElement("button");
        button.setAttribute("type", "submit");
        button.classList.add("bg-btn-create", "bd-primary", "d-flex", "justify-start", "items-center", "gap-sm", "pt-btn-primary", "radius-lg", "h-36");

        const img = document.createElement("img");
        img.setAttribute("src", "imgs/create-light.svg");
        img.setAttribute("alt", "Adicionar");
        img.classList.add("img-size-15");

        const span = document.createElement("span");
        span.classList.add("color-light", "text-sm", "fw-sb");
        span.textContent = "Adicionar";

        button.append(img);
        button.append(span);

        containerCreateCategory.append(inputBox);
        containerCreateCategory.append(button);

        firstBlock.append(labelWrapper);

        firstBlock.append(containerCreateCategory);

        const secondBlock = document.createElement("div");
        secondBlock.classList.add("w-full", "d-flex", "justify-start", "items-start", "flex-column", "gap-sm", "overflow-hidden");

        const secondBlockHeader = document.createElement("div");
        secondBlockHeader.classList.add("d-flex", "justify-between", "items-center", "gap-sm", "w-full");

        const h3 = document.createElement("h3");
        h3.classList.add("color-dark", "text-base", "fw-m");
        h3.textContent = "Suas categorias";

        const categoryCount = document.createElement("span");
        categoryCount.classList.add("color-secondary", "text-sm", "fw-m", 'category-count');
        categoryCount.textContent = this.categories.length > 1 ? `${this.categories.length} Categorias` : this.categories.length == 1
        ? `${this.categories.length} Categoria` : "";

        secondBlockHeader.append(h3);
        secondBlockHeader.append(categoryCount);

        const scrollArea = document.createElement("div");
        scrollArea.classList.add("d-flex", "align-start", "justify-start", "w-full", "flex-column", "gap-sm", "scroll-auto", "h-100vh", "pt-top-md", "pt-bottom-sm");
        scrollArea.id = "category-cards-section"

        secondBlock.append(secondBlockHeader);

        const cards = this.createCardCategory();

        scrollArea.append(...cards)
        secondBlock.append(scrollArea);

        wrapper.append(firstBlock);
        wrapper.append(secondBlock);

        return wrapper;
    }

    createCardCategory() {
        
        this.categories.sort((a, b) => a.id - b.id);

        return this.categories.map((category) => {
            const card = document.createElement('div');
            const containerPrimary = document.createElement('div');

            containerPrimary.classList.add('d-flex', 'justify-between', 'items-center', 'gap-md', 'w-full')

            card.classList.add(
                'h-mn-55',
                'overflow-hidden',
                'radius-lg',
                'd-flex',
                'flex-column',
                'justify-start',
                'items-center',
                'gap-md',
                'w-full',
                'bg-light',
                'bd-primary',
                'radius-sm',
                'pt-left-md',
                'pt-right-md',
                'pt-top-sm',
                'pt-bottom-sm',
                'flex-shrink'
            );

            const title = document.createElement('p');
            title.classList.add('color-dark', 'text-sm', 'fw-m');
            title.textContent = category.name;

            const actionWrapper = document.createElement('div');
            actionWrapper.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

            const editBtn = document.createElement('button');
            editBtn.classList.add('radius-lg', 'bd-primary', 'pt-md', 'bg-third', 'h-36', 'pt-btn-primary');

            const editImg = document.createElement('img');
            editImg.src = '/imgs/pencil-dark.svg'; 
            editImg.alt = 'Editar';
            editImg.classList.add('img-size-15');
            editBtn.type = 'button';

            editBtn.append(editImg);

            editBtn.addEventListener('click', ()=>{

                this.utils.removeElements('.container-delete-category');
                this.utils.removeElements('.container-edit-category');

                const buttonsConfig = [
                    { 
                        text: "Cancelar", 
                        type: "cancel", 
                        event: ()=>{
                            const container = card.children[1];
                            if (container) container.remove();
                        }
                    },
                    { 
                        text: "Salvar", 
                        type: "save",
                        event:  (event)=>{

                            const button = event.target;
                            const csrfToken = document.querySelector('input[name="_token"]').value;
                            const inputValue = document.querySelector('#input-category-edit').value;
                            this.updateCategory(inputValue, button, csrfToken, category.id);
                        }
                    },
                ];

                const buttons = this.modal.createButtons(buttonsConfig);

                const configContainer = {
                    'title': `Editar Categoria`,
                    'inputValue': category.name,
                    'inputId': 'input-category-edit',
                    'class': ['container-edit-category']
                }

                const editContainer = this.createContainerEdit(configContainer, buttons);
                
                card.append(editContainer);
            })

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('radius-lg', 'bd-primary', 'pt-md', 'bg-third', 'h-36', 'pt-btn-primary');

            const deleteImg = document.createElement('img');
            deleteImg.src = '/imgs/trash-dark.svg'; 
            deleteImg.alt = 'Deletar';
            deleteImg.classList.add('img-size-15');
            deleteBtn.type = 'button';

            deleteBtn.append(deleteImg);

            deleteBtn.addEventListener('click', ()=>{

                this.utils.removeElements('.container-delete-category');
                this.utils.removeElements('.container-edit-category');

                const buttonsConfig = [
                    { 
                        text: "Cancelar", 
                        type: "cancel", 
                        event: ()=>{
                            const container = card.children[1];
                            if (container) container.remove();
                        }
                    },
                    { 
                        text: "Deletar", 
                        type: "delete",
                        event:  (event)=>{

                            const button = event.target;
                            const csrfToken = document.querySelector('input[name="_token"]').value;
                            this.deleteCategory(button, csrfToken, category.id);
                        }
                    },
                ];

                const buttons = this.modal.createButtons(buttonsConfig);

                const configContainer = {
                    'message': `Você tem certeza de que deseja excluir a categoria ${category.name}?`,
                    'messageWarning': this.messageWarning,
                    'class': ['container-delete-category']
                }

                const deleteCategory = this.createContainerDelete(configContainer, buttons);
                
                card.append(deleteCategory);
            })

            actionWrapper.append(editBtn);
            actionWrapper.append(deleteBtn);

            containerPrimary.append(title, actionWrapper)
            card.append(containerPrimary);

            return card;
        });

    }

    updateCardsCategory(){

        const container = document.querySelector('#category-cards-section');
        container.innerHTML = '';

        if(this.categories.length > 0){
            document.querySelector('.category-count').innerText = this.categories.length > 1 ? `${this.categories.length} Categorias` : this.categories.length == 1 ? `${this.categories.length} Categoria` : "";
        }else{
            document.querySelector('.category-count').innerText = "";
        }
        
        const cards = this.createCardCategory();
        container.append(...cards);

    }

    async createCategory(name, button, inputName, csrfToken){

        button.disabled = true;

        const formData = new FormData();
        formData.append('_token', csrfToken);
        formData.append('name', name);

        try {
            const response = await axios.post(`${this.url}`, formData, {
                timeout: 5000
            });

            if (response.status === 201 && response.data.status === 'success') {

                if(response?.data?.data){
                    inputName.value = "";
                    this.categories.push(response?.data?.data);
                    this.updateCardsCategory();
                }

                toastr.success(response.data.message, 'Categoria', { timeOut: 2000 });

                setTimeout(() => {
                    button.disabled = false;
                }, 2000);

            }
        } catch (error) {

            let message = 'Erro ao criar categoria!';

            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            console.log(error)
            
            toastr.error(message, 'Categoria', { timeOut: 2000 });

            setTimeout(() => {
                button.disabled = false;
            }, 2000);

        }
    }

    async deleteCategory(button, csrfToken, id){

        button.disabled = true;

        const formData = new FormData();
        formData.append('_token', csrfToken);

        try {
            const response = await axios.delete(`${this.url}/${id}`, {
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {

        
                this.utils.removeElements('.container-delete-category');
                this.utils.removeElements('.container-edit-category');

                this.categories?.splice(0, this.categories.length, 
                    ...this.categories.filter((category) => category.id !== id)
                );

                this.updateCardsCategory();

                toastr.success(response.data.message, 'Categoria', { timeOut: 2000 });

            }
        } catch (error) {

            let message = 'Erro ao deletar categoria!';

            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            console.log(error)
            
            toastr.error(message, 'Categoria', { timeOut: 2000 });

            setTimeout(() => {
                button.disabled = false;
            }, 2000);

        }
    }

    async updateCategory(name, button, csrfToken, id){

        button.disabled = true;

        const formData = new FormData();
        formData.append('_token', csrfToken);
        formData.append('name', name);

        try {
            const response = await axios.patch(`${this.url}/${id}`, formData, {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 && response.data.status === 'success') {
        
                this.utils.removeElements('.container-delete-category');
                this.utils.removeElements('.container-edit-category');

                this.categories?.splice(0, this.categories.length, 
                    ...this.categories.filter((category) => category.id !== id)
                );

                this.categories.push(response.data.data)

                this.updateCardsCategory();

                toastr.success(response.data.message, 'Categoria', { timeOut: 2000 });

            }
        } catch (error) {

            let message = 'Erro ao atualizar categoria!';

            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            console.log(error)
            
            toastr.error(message, 'Categoria', { timeOut: 2000 });

            setTimeout(() => {
                button.disabled = false;
            }, 2000);

        }
    }

    async getAllCategories(){
        try {

            const response = await axios.get(`${this.url}`, {
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {

                return response.data.data;

            }

        } catch (error) {
            console.error(error);
        }
    }
}

export default Category;