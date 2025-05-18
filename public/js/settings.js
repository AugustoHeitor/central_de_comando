import { createModal, createButtons } from './utils.js';

document.addEventListener('DOMContentLoaded', ()=>{

    const form = document.querySelector('form');

    if(form){

        form.addEventListener('submit', (event)=>{
            event.preventDefault();
        
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
    
            const buttons = createButtons(buttonsConfig);
            const content = createContentModal();

            const modalConfig = { 
                title: "Insira sua senha", 
                img: "imgs/lock-dark.svg",
                class: ["h-mx-none", "w-mx-400", "h-auto", "w-full"],
                event: (e)=>{
                    e.preventDefault();

                    const formModal = document.querySelector('#form-modal');
                    const screenModal = document.querySelector('.screen-modal');
                    const buttonSubmit = e.submitter;
    

                    const data = getFormValues(form);
                    const currentPasswordInput = formModal.querySelector('input[name="current-password"]');
                    if (currentPasswordInput.value) data.current_password = currentPasswordInput?.value;

                    updateUser(data, buttonSubmit, screenModal);
                }
            };

            createModal(modalConfig, content, buttons);

        })
    }
})

function getFormValues(form){
    const newPasswordInput = form.querySelector('input[name="new-password"]');
    const fullNameInput = form.querySelector('input[name="full-name"]');
    const nicknameInput = form.querySelector('input[name="nickname"]');
    const photoInput = form.querySelector('input[name="photo"]');

    const data = {};

    if (newPasswordInput?.value) data.new_password = newPasswordInput?.value;
    if (fullNameInput?.value) data.full_name = fullNameInput?.value;
    if (nicknameInput?.value) data.nickname = nicknameInput?.value;
    if (photoInput?.files[0]) data.photo = photoInput?.files[0];

    return data;
}

async function updateUser(data, button, screenModal) {

    const csrfToken = document.querySelector('input[name="_token"]').value;
    button.disabled = true;

    const formData = new FormData();
    formData.append('_token', csrfToken);

    for (const key in data) {
        if (data[key]) {
            formData.append(key, data[key]);
        }
    }

    try {
        const response = await axios.post('/user/update', formData, {
            timeout: 5000
        });

        if (response.status === 200 && response.data.status === 'success') {

            toastr.success(response.data.message, 'Configurações', { timeOut: 2000 });

            screenModal.remove();

        }
    } catch (error) {

        let message = 'Erro ao salvar os dados';

        if (error.response?.data?.message) {
            message = error.response.data.message;
        }

        console.log(error)
        
        toastr.error(message, 'Configurações', { timeOut: 2000 });

        setTimeout(() => {
            button.disabled = false;
        }, 2000);

    }
}

function createContentModal() {

    const container = document.createElement('div');
    const containerContent = document.createElement('div');

    container.classList.add('d-flex', 'justify-start', 'items-start', 'gap-lg', 'flex-column', 'w-full');
    containerContent.classList.add('d-flex', 'justify-start', 'items-start', 'gap-sm', 'flex-column', 'w-full');

    const paragraph = document.createElement('p');

    paragraph.classList.add('text-xs', 'color-secondary', 'w-full');

    paragraph.innerText = 'Antes de continuar o salvamento das alterações precisamos que confirme que é realmente você que está alterando suas informações, por favor insira sua senha';
    
    const label = document.createElement('label');
    label.className = 'color-dark text-base fw-m';
    label.htmlFor = 'current-password';
    label.innerText = 'Senha Atual';

    const containerInput = document.createElement('div');

    const input = document.createElement('input');
    input.type = 'password';
    input.id = 'current-password';
    input.name = 'current-password';
    input.required = true;

    containerInput.classList.add(
        'd-flex',
        'items-center',
        'justify-between',
        'w-full',
        'bg-light',
        'pt-input-primary',
        'bd-primary',
        'radius-lg'
    );

    label.classList.add(
        'color-dark',
        'text-base',
        'fw-m'
    );

    input.classList.add(
        'text-base',
        'color-secondary',
        'w-full'
    );

    containerInput.append(input);
    containerContent.append(label, containerInput);
    container.append(paragraph, containerContent)

    return container;
}