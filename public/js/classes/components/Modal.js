class Modal {

    createModal(config, contentHTML, buttonsHTML) {

        const screen = document.createElement('div');
        screen.classList.add('screen-modal');

        const modal = document.createElement('form');

        if(config?.event){
            modal.addEventListener('submit', config.event);
        }

        modal.classList.add(
            'bd-primary', 'd-flex',
            'align-start', 'justify-between', 'flex-column',
            'gap-md', 'bg-secondary', 'radius-lg', ...config?.class
        );

        modal.id = "form-modal";

        const topSection = document.createElement('section');
        topSection.classList.add('pt-md', 'bd-bottom', 'pt-bottom-md', 'w-full', 'd-flex', 'items-center', 'justify-between', 'gap-md', 'section-top-modal');

        const topLeft = document.createElement('div');
        topLeft.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

        const icon = document.createElement('img');
        icon.src = config.img;
        icon.classList.add('img-size-20');

        const title = document.createElement('h2');
        title.classList.add('color-light', 'text-xl', 'fw-m');
        title.textContent = config.title;

        topLeft.append(icon);
        topLeft.append(title);

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('d-flex', 'items-center', 'justify-center', 'soft-shake');
        closeBtn.setAttribute('aria-label', 'Fechar modal');
        closeBtn.type = "button";

        const closeIcon = document.createElement('img');
        closeIcon.src = '/imgs/xmark-light.svg';
        closeIcon.alt = 'Fechar';
        closeIcon.classList.add('img-size-15');

        closeBtn.append(closeIcon);
        closeBtn.addEventListener('click', () => {
            screen.remove();
        });

        screen.addEventListener('click', (event) => {
            if (event.target === screen) {
                screen.remove();
            }
        });

        topSection.append(topLeft);
        topSection.append(closeBtn);

        const contentSection = document.createElement('section');
        contentSection.classList.add('pt-md', 'w-full', 'h-full', 'pt-right-md', 'overflow-hidden', 'section-content-modal');

        const bottomSection = document.createElement('section');
        bottomSection.classList.add('pt-md', 'bd-top', 'pt-top-md', 'w-full', 'd-flex', 'align-start', 'justify-end', 'gap-md', 'section-bottom-modal');

        contentSection.append(contentHTML);
        bottomSection.append(...buttonsHTML);
        modal.append(topSection);
        modal.append(contentSection);

        if(config.visible.footer === true){
            modal.append(bottomSection);
        }

        if(config?.csrfToken === true){
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            modal.append(csrfInput);
        }

        screen.append(modal);

        document.body.append(screen);
    }

    createButtons(configs) {

        const buttons = [];

        configs.forEach((config) => {

            const btn = document.createElement('button');
            btn.type = config.type === 'save' || config.type === 'add' ? 'submit' : 'button';

            if (config.type === 'delete') {

                btn.className = 'w-full d-flex justify-center items-center gap-sm color-light text-sm pt-btn-primary radius-lg fw-m bd-shadow-secondary w-mx-280 bg-btn-delete hover-scale';
                const img = document.createElement('img');
                img.src = '/imgs/trash-light.svg';
                img.alt = 'Deletar';
                img.classList.add('img-size-15');
                btn.append(img);
                btn.innerText = config.text;

            } else if (config.type === 'save') {

                btn.className = 'hover-scale w-full d-flex justify-center items-center gap-sm color-light text-sm pt-btn-primary radius-lg fw-m bg-btn-save bd-shadow-secondary w-mx-280';
                const img = document.createElement('img');
                img.src = '/imgs/save-light.svg';
                img.alt = 'Salvar';
                img.classList.add('img-size-15');
                btn.append(img);
                btn.innerText = config.text;

            } else if (config.type === 'add') {

                btn.className = 'hover-scale w-full d-flex justify-center items-center gap-sm color-light text-sm pt-btn-primary radius-lg fw-m bg-btn-create bd-shadow-secondary w-mx-280';
                const img = document.createElement('img');
                img.src = '/imgs/create-light.svg';
                img.alt = 'Adicionar';
                img.classList.add('img-size-15');
                btn.append(img);
                btn.innerText = config.text;

            }else if (config.type === 'cancel'){

                btn.className = 'hover-scale w-full d-flex justify-center items-center gap-sm w-full color-primary text-sm pt-btn-primary radius-lg fw-m bg-secondary bd-shadow-secondary w-mx-280';
                const img = document.createElement('img');
                img.src = '/imgs/xmark-light.svg';
                img.alt = 'Cancelar';
                img.classList.add('img-size-15');
                btn.append(img);
                btn.innerText = config.text;

            }


            if (config?.event) {
                btn.addEventListener('click', config.event);
            }

            buttons.push(btn);

        });

        return buttons;
    }

    createContainerDelete(config, buttonsConfig){

        const modal = document.querySelector('#form-modal');

        if (modal.classList.contains('h-full')) {
            modal.classList.remove('h-full');
            modal.classList.add('h-auto');
        }

        if (modal.classList.contains('w-full')) {
            modal.classList.remove('w-full');
            modal.classList.add('w-auto');
        }

        const titleModal = document.querySelector('.section-top-modal>div>h2');
        titleModal.innerHTML = `Deletar ${config.title}`;

        const modalContent = document.querySelector('.section-content-modal');
        modalContent.innerHTML = "";

        const modalButtons = document.querySelector('.section-bottom-modal');
        modalButtons.innerHTML = "";

        const wrapper = document.createElement('div');
        wrapper.classList.add('d-flex', 'flex-column', 'justify-center', 'items-center', 'gap-sm', 'w-full', 'h-full', 'pt-md', ...config.class);

        const warningContainer = document.createElement('div');
        warningContainer.classList.add('d-flex', 'justify-start', 'items-center', 'gap-md', 'w-full', 'radius-lg', 'pt-md', 'w-mx-600');

        const warningIcon = document.createElement('img');
        warningIcon.src = '/imgs/circle-exclamation-red.svg';
        warningIcon.alt = 'Aviso';
        warningIcon.classList.add('img-size-20');

        const warningTextContainer = document.createElement('div');
        warningTextContainer.classList.add('d-flex', 'justify-start', 'items-start');

        const warningText = document.createElement('p');
        warningText.classList.add('text-sm', 'color-primary', 'fw-n');
        warningText.innerHTML = `<strong class="text-sm color-primary fw-b">Atenção! </strong>${config.messageWarning}`;

        warningTextContainer.append(warningText);
        warningContainer.append(warningIcon);
        warningContainer.append(warningTextContainer);

        const messageText = document.createElement('p');
        messageText.classList.add('text-base', 'color-light', 'fw-n', 'pt-md', 'w-full', 'w-mx-600');
        messageText.textContent = config.message;

        wrapper.append(warningContainer);
        wrapper.append(messageText);

        modalContent.append(wrapper);

        const buttons = this.createButtons(buttonsConfig);
        modalButtons.append(...buttons);
    }
}

export default Modal
