import Modal  from '../components/Modal.js';
import Dropdown  from '../components/Dropdown.js';
import ContainerEmpty  from '../components/ContainerEmpty.js';
import Utils from '../Utils.js';
import Master from '../Master.js';

class Tag extends Master {

    constructor(endpoint, tags) {
        super();
        this.tags = tags;
        this.baseUrl = '/api/';
        this.endpoint = endpoint;
        this.localStorageName = "tags";
        this.url = this.baseUrl + endpoint;
        this.utils = new Utils();

        this.paramKeysFilter = [
            'is_active',
        ];

        this.components = {
            'modal': new Modal(),
            'dropdown': new Dropdown(this.localStorageName, this.paramKeysFilter, this.filterTags.bind(this), this.paramKeysOrder, this.createCardTag.bind(this)),
            'containerEmpty': new ContainerEmpty()
        };

        this.tagIcons = [
            { name: "bug", src: "imgs/tagIcons/bug.svg", checked: false },
            { name: "hard", src: "imgs/tagIcons/hard.svg", checked: false },
            { name: "lock-open", src: "imgs/tagIcons/lock-open.svg", checked: false },
            { name: "ghost", src: "imgs/tagIcons/ghost.svg", checked: false },
            { name: "folder", src: "imgs/tagIcons/folder.svg", checked: false },
            { name: "chart-pie", src: "imgs/tagIcons/chart-pie.svg", checked: false },
            { name: "face-tired", src: "imgs/tagIcons/face-tired.svg", checked: false },
            { name: "user-slash", src: "imgs/tagIcons/user-slash.svg", checked: false },
            { name: "user-gear", src: "imgs/tagIcons/user-gear.svg", checked: false },
            { name: "triangle-exclamation", src: "imgs/tagIcons/triangle-exclamation.svg", checked: false },
            { name: "phone", src: "imgs/tagIcons/phone.svg", checked: false },
            { name: "mobile-screen-button", src: "imgs/tagIcons/mobile-screen-button.svg", checked: false },
            { name: "thumbs", src: "imgs/tagIcons/thumbs.svg", checked: false },
            { name: "computer", src: "imgs/tagIcons/computer.svg", checked: false },
            { name: "coins", src: "imgs/tagIcons/coins.svg", checked: false },
            { name: "cart-shopping", src: "imgs/tagIcons/cart-shopping.svg", checked: false },
            { name: "paper-plane", src: "imgs/tagIcons/paper-plane.svg", checked: false },
            { name: "chart-simple", src: "imgs/tagIcons/chart-simple.svg", checked: false },
            { name: "bolt", src: "imgs/tagIcons/bolt.svg", checked: false },
            { name: "user", src: "imgs/tagIcons/user.svg", checked: false },
            { name: "skull", src: "imgs/tagIcons/skull.svg", checked: false },
            { name: "envelope", src: "imgs/tagIcons/envelope.svg", checked: false },
            { name: "phone-slash", src: "imgs/tagIcons/phone-slash.svg", checked: false },
            { name: "book", src: "imgs/tagIcons/book.svg", checked: false },
            { name: "film", src: "imgs/tagIcons/film.svg", checked: false },
            { name: "piggy-bank", src: "imgs/tagIcons/piggy-bank.svg", checked: false },
            { name: "basket-shopping", src: "imgs/tagIcons/basket-shopping.svg", checked: false },
            { name: "face-surprise", src: "imgs/tagIcons/face-surprise.svg", checked: false },
            { name: "fire", src: "imgs/tagIcons/fire.svg", checked: false },
            { name: "robot", src: "imgs/tagIcons/robot.svg", checked: false },
            { name: "user-check", src: "imgs/tagIcons/user-check.svg", checked: false },
            { name: "user-lock", src: "imgs/tagIcons/user-lock.svg", checked: false },
            { name: "truck-fast", src: "imgs/tagIcons/truck-fast.svg", checked: false },
            { name: "comment-sms", src: "imgs/tagIcons/comment-sms.svg", checked: false },
            { name: "house", src: "imgs/tagIcons/house.svg", checked: false },
            { name: "lock", src: "imgs/tagIcons/lock.svg", checked: false },
            { name: "sack-dollar", src: "imgs/tagIcons/sack-dollar.svg", checked: false },
            { name: "box-archive", src: "imgs/tagIcons/box-archive.svg", checked: false },
            { name: "android-brands", src: "imgs/tagIcons/android-brands.svg", checked: false },
            { name: "pix-brands", src: "imgs/tagIcons/pix-brands.svg", checked: false },
            { name: "alarm", src: "imgs/tagIcons/alarm.svg", checked: false },
            { name: "user-clock", src: "imgs/tagIcons/user-clock.svg", checked: false },
            { name: "circle-exclamation", src: "imgs/tagIcons/circle-exclamation.svg", checked: false },
            { name: "comments-dollar", src: "imgs/tagIcons/comments-dollar.svg", checked: false },
            { name: "mobile-button", src: "imgs/tagIcons/mobile-button.svg", checked: false }
        ];
    }

    init() {
        this.filterTags();
    }

    async getAllTags(params){
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

    async createTag(formData, button){

        button.disabled = true;

        try {
            const response = await axios.post(this.url, formData, {
                timeout: 5000
            });

            if (response.status === 201 && response.data.status === 'success') {

                this.tags.push(response.data.data);
                this.createCardTag();

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

            let message = 'Erro ao criar tag!';

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

    async updateTag(formData, button, id){

        button.disabled = true;

        try {
            const response = await axios.patch(`${this.url}/${id}`, formData, {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 && response.data.status === 'success') {

                this.tags?.splice(0, this.tags.length,
                    ...this.tags.filter((tag) => tag.id !== id)
                );

                this.tags.push(response.data.data)

                this.createCardTag();

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

            let message = 'Erro ao atualizar tag!';

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

    async deleteTag(button, csrfToken, id){

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

                this.tags?.splice(0, this.tags.length,
                    ...this.tags.filter((tag) => tag.id !== id)
                );

                this.createCardTag();

                toastr.success(response.data.message, { timeOut: 2000 });

            }
        } catch (error) {

            let message = 'Erro ao deletar tag!';

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

    async filterTags() {

        const params = this.utils.getParams(this.localStorageName, this.paramKeysFilter);

        const result = await this.getAllTags(params);

        this.tags?.splice(0, this.tags.length,
            ...result
        );

        this.createCardTag();
    }

    createCardTag() {

        document.querySelector('#tag-section').replaceChildren();

        let orderedTags = this.tags;

        if(Array.isArray(orderedTags) && orderedTags.length > 0){

            orderedTags?.forEach((tag)=>{
                const card = document.createElement('div');
                const containerColor = document.createElement('div');
                const color = document.createElement('div');
                const textColor = document.createElement('div');
                const name = document.createElement('h3');
                const description = document.createElement('p');
                const containerPrimary = document.createElement('div');
                const containerHeader = document.createElement('div');
                const containerFooter = document.createElement('div');
                const containerIcon = document.createElement('div');
                const icon = document.createElement('img');
                const isActive = document.createElement('p');

                description.classList.add('txt-2-lines', 'color-primary', 'd-flex', 'justify-start', 'items-start', 'text-sm', 'h-36');

                name.classList.add('color-primary', 'fw-m', 'text-sm', "txt-1-line-mobile");
                icon.classList.add('img-size-22', 'h-22', 'img-contain');

                card.classList.add(
                    'overflow-hidden', 'hover-bg-primary', 'h-mn-157', 'radius-sm', 'pointer',
                    'd-flex', 'justify-center', 'items-center',
                    'gap-md', 'w-full', 'bg-secondary', 'bd-shadow-primary', 'flex-column',
                );

                containerHeader.classList.add(
                    'd-flex', 'justify-start', 'items-start',
                    'gap-sm', 'w-full', 'pt-top-md', 'pt-left-md', 'pt-right-md'
                );

                containerFooter.classList.add(
                    'd-flex', 'justify-start', 'items-center',
                    'gap-md', 'w-full', 'bd-top', "pt-left-md", "pt-right-md", "pt-top-md",
                    "pt-bottom-md",
                );

                containerIcon.classList.add(
                    'd-flex', 'justify-center', 'items-center', 'pt-md',
                    'bg-quinary', 'radius-sm'
                );

                containerPrimary.classList.add(
                    'd-flex', 'justify-start', 'items-start',
                    'gap-sm', 'w-full', 'flex-column',
                );

                containerColor.classList.add(
                    'd-flex', 'justify-start', 'items-center', 'gap-sm',
                )

                textColor.classList.add(
                    'text-sm', 'fw-m', 'color-primary'
                )

                color.classList.add(
                    'w-15', 'h-15', 'radius-50p', 'overflow-hidden'
                );

                isActive.classList.add('d-flex', 'justify-center', 'items-center', 'radius-sm', 'text-xs', 'pt-xs', 'w-70');

                color.style.backgroundColor = tag.color;
                name.textContent = tag.name;
                textColor.innerText = tag.color;
                description.textContent = tag.description || 'Sem descrição';

                if(tag.is_active == true){
                    isActive.innerText = "Ativa";
                    isActive.classList.add("bg-active", "color-active-secondary");
                }else{
                    isActive.innerText = "Inativa";
                    isActive.classList.add("bg-inactive", "color-inactive-secondary");
                }

                const selectedIcon = this.tagIcons.find(icon => icon.name === tag.icon);

                if (selectedIcon) {
                    icon.src = selectedIcon.src;
                }

                containerIcon.append(icon);
                containerColor.append(color, textColor);
                containerPrimary.append(name, description);

                containerHeader.append(containerIcon, containerPrimary);
                containerFooter.append(containerColor, isActive);
                card.append(containerHeader, containerFooter)

                card.addEventListener('click', () => {
                    this.openModal('save', tag);
                });

                document.querySelector('#tag-section').append(card);
            })

        }else{
            this.components.containerEmpty.createContainerEmpty('#tag-section', 'Nenhuma tag encontrada', 'Não há tags que correspondam ao filtro aplicado ou você ainda não criou nenhuma. Experimente ajustar o filtro ou adicionar uma nova tag.')
        }

        this.utils.addScrollY('#tag-section', false);
    }

    createContentModal(tag = null) {

        const container = document.createElement('div');

        container.classList.add('w-full', 'h-full', 'd-flex', 'align-start', 'justify-start', 'flex-column', 'gap-lg', 'scroll-auto');

        const containerPrimary = document.createElement('div');
        containerPrimary.classList.add('w-full', 'd-flex', 'align-center', 'justify-start', 'gap-lg', 'responsive-wrap');

        const configFieldName = {
            icon: {
                src: 'imgs/heading-light.svg',
                alt: 'Nome'
            },
            label: {
                for: 'name',
                text: 'Nome'
            },
            field: {
                type: 'text',
                required: true,
                value: tag?.name || null,
                class: null,
                name: 'name'
            },
            containerField: {
                class: null,
            },
            containerGroup: {
                class: null
            }
        }

        const fieldName = this.components.modal.createFieldGroup(configFieldName);

        const configFieldColor = {
            icon: {
                src: 'imgs/color-light.svg',
                alt: 'Cor'
            },
            label: {
                for: 'color',
                text: 'Cor'
            },
            field: {
                type: 'color',
                required: true,
                value: tag?.color || null,
                class: null,
                name: 'color'
            },
            containerField: {
                class: null,
            },
            containerGroup: {
                class: ['w-mx-100', 'w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm']
            }
        }

        const fieldColor = this.components.modal.createFieldGroup(configFieldColor);

        const configFieldActive = {
            icon: {
                src: 'imgs/lightbulb-light.svg',
                alt: 'Inativa / Ativa'
            },
            label: {
                for: 'is_active',
                text: 'Inativa / Ativa'
            },
            field: {
                type: 'toggle_track',
                required: false,
                value: tag?.is_active || false,
                class: null,
                name: 'is_active'
            },
            containerField: {
                class: null,
            },
            containerGroup: {
                class: ['w-mx-130', 'w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm']
            }
        }

        const fieldActive = this.components.modal.createFieldGroup(configFieldActive);

        containerPrimary.append(fieldName, fieldColor, fieldActive);
        container.append(containerPrimary);

        const configFieldDescription = {
            icon: {
                src: 'imgs/text-light.svg',
                alt: 'Descrição'
            },
            label: {
                for: 'description',
                text: 'Descrição'
            },
            field: {
                type: 'textarea',
                required: false,
                value: tag?.description || null,
                class: null,
                name: 'description'
            },
            containerField: {
                class: ['w-full', 'h-mn-130', 'bg-secondary', 'pt-right-sm', 'bd-primary', 'radius-sm']
            },
            containerGroup: {
                class: null,
            }
        }

        const fieldDescription = this.components.modal.createFieldGroup(configFieldDescription);

        container.append(fieldDescription);

        const tagIcons = this.tagIcons.map(icon => ({ ...icon }));

        const tagIconindex = tagIcons.findIndex(icon => icon.name == tag?.icon);

        if(tagIconindex !== -1){
            tagIcons[tagIconindex].checked = true;
        }else{
            tagIcons[0].checked = true;
        }

        const configFieldIcon = {
            icon: {
                src: 'imgs/icons-light.svg',
                alt: 'Icone'
            },
            label: {
                for: 'icon',
                text: 'Ícones'
            },
            field: {
                type: 'icon-select',
                required: true,
                value: tagIcons || null,
                class: ['w-full', 'd-flex', 'items-center', 'justify-center', 'radius-sm', "pointer", 'pt-input-primary', 'gap-sm', 'hover-scale', 'bd-shadow-secondary'],
                name: 'icon'
            },
            containerField: {
                class: ['d-grid', 'responsive-icon-grid', 'w-full', 'gap-md']
            },
            containerGroup: {
                class: null,
            }
        }

        const fieldIcon = this.components.modal.createFieldGroup(configFieldIcon);

        container.append(fieldIcon);

        return container;
    }

    openModal(type, tag = null){

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
                title: "Criar Tag",
                img: "imgs/hashtag-light.svg",
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

                    this.createTag(formData, buttonSubmit);
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
                            'message': `Tem certeza de que deseja excluir a tag ${tag.name}?`,
                            'messageWarning': 'Atenção: essa ação não poderá ser desfeita. Você irá excluir todas as informações que estão interligadas a esta tag.',
                            'class': ['container-delete-tag'],
                            'title': 'Tag'
                        }

                        const buttonsConfig = [
                            {
                                text: "Cancelar",
                                type: "cancel",
                                event: ()=>{
                                    this.openModal('save', tag)
                                }
                            },
                            {
                                text: "Deletar",
                                type: "delete",
                                event: (event)=>{
                                    const button = event.target;
                                    const csrfToken = document.querySelector('input[name="_token"]').value;
                                    this.deleteTag(button, csrfToken, tag.id);
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
                title: "Editar Tag",
                img: "imgs/hashtag-light.svg",
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

                    this.updateTag(formData, buttonSubmit, tag?.id);

                }
            };

            const content = this.createContentModal(tag);
            this.components.modal.createModal(modalConfig, content, buttons);

        }
    }
}

export default Tag;
