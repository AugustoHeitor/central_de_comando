import Modal from '../components/Modal.js';
import Master from '../Master.js';
import Utils from '../Utils.js';

class Setting extends Master {

    constructor(endpoint, form) {
        super();
        this.baseUrl = '/api/';
        this.endpoint = endpoint;
        this.localStorageName = "settings";
        this.url = this.baseUrl + endpoint;
        this.utils = new Utils();
        this.modal = new Modal();
        this.form = form;
    }

    init(){
        this.utils.addScrollY('form', true);
    }

    async updateUser(formData, button, screenModal) {

        button.disabled = true;

        try {
            const response = await axios.post(`${this.url}/update`, formData, {
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {

                if(response?.data?.data){
                    this.updateValues(response.data.data);
                }

                toastr.success(response.data.message, { timeOut: 2000 });

                screenModal.remove();

            }
        } catch (error) {

            let message = 'Erro ao salvar os dados';

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

    openModal(){
        const buttonsConfig = [
            {
                text: "Cancelar",
                type: "cancel",
                event: ()=>{
                    document.querySelector('.screen-modal').remove();
                }
            },
            {
                text: "Salvar",
                type: "save",
            },
        ];

        const buttons = this.modal.createButtons(buttonsConfig);
        const content = this.createContentModal();

        const modalConfig = {
            title: "Insira sua senha",
            img: "imgs/lock-light.svg",
            class: ["h-mx-none", "w-mx-400", "h-auto", "w-full"],
            visible: {
                'footer': true,
            },
            csrfToken: true,
            event: (e)=>{
                e.preventDefault();

                const formModal = document.querySelector('#form-modal');
                const screenModal = document.querySelector('.screen-modal');
                const buttonSubmit = e.submitter;

                const formData = this.utils.getFormValues(this.form);

                const currentPasswordInput = formModal.querySelector('input[name="current_password"]');

                if (currentPasswordInput.value) {
                    formData.append(currentPasswordInput.name, currentPasswordInput.value);
                }

                this.updateUser(formData, buttonSubmit, screenModal);
            }
        };

        this.modal.createModal(modalConfig, content, buttons);
    }

    createContentModal() {

        const container = document.createElement('div');
        const containerContent = document.createElement('div');

        container.classList.add('d-flex', 'justify-start', 'items-start', 'gap-lg', 'flex-column', 'w-full');
        containerContent.classList.add('d-flex', 'justify-start', 'items-start', 'gap-sm', 'flex-column', 'w-full');

        const paragraph = document.createElement('p');

        paragraph.classList.add('text-xs', 'color-primary', 'w-full');

        paragraph.innerText = 'Antes de continuar o salvamento das alterações precisamos que confirme que é realmente você que está alterando suas informações, por favor insira sua senha';

        const label = document.createElement('label');
        label.className = 'color-light text-base fw-m';
        label.htmlFor = 'current_password';
        label.innerText = 'Senha Atual';

        const containerInput = document.createElement('div');

        const input = document.createElement('input');
        input.type = 'password';
        input.id = 'current_password';
        input.name = 'current_password';
        input.required = true;

        containerInput.classList.add(
            'd-flex',
            'items-center',
            'justify-between',
            'w-full',
            'bg-secondary',
            'pt-input-primary',
            'bd-primary',
            'radius-sm'
        );

        label.classList.add(
            'color-light',
            'text-base',
            'fw-m'
        );

        input.classList.add(
            'text-base',
            'color-primary',
            'w-full'
        );

        containerInput.append(input);
        containerContent.append(label, containerInput);
        container.append(paragraph, containerContent)

        return container;
    }

    setupImageUploadPreview(input, img) {
        input.addEventListener('change', (event) => {
            const file = event.target.files[0];

            if (file && file.type.startsWith('image/')) {
                const tempUrl = URL.createObjectURL(file);
                img.src = tempUrl;
            }
        });
    }

    deleteImageUpload(input, img) {
        input.value = null;
        img.src = null;
    }

    updateValues(data){

        const sideMenu = document.querySelector('#side-menu-desktop');
        const img = sideMenu.querySelector('.img-profile-menu');
        const nickname = sideMenu.querySelector('.nickname-menu');

        if (img) img.src = data.photo;
        if (nickname) nickname.innerText = data.nickname;

    }


}

export default Setting;
