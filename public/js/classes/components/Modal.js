class Modal {

    createModal(config, contentHTML, buttonsHTML) {

        const screen = document.createElement('div');
        const modal = document.createElement('form');
        const topSection = document.createElement('section');
        const topLeft = document.createElement('div');
        const icon = document.createElement('img');
        const title = document.createElement('h2');
        const contentSection = document.createElement('section');
        const closeBtn = document.createElement('button');
        const bottomSection = document.createElement('section');
        const closeIcon = document.createElement('img');

        screen.classList.add('screen-modal');
        modal.classList.add(
            'bd-primary', 'd-flex',
            'align-start', 'justify-between', 'flex-column',
            'gap-md', 'bg-secondary', 'radius-sm', ...config?.class
        );
        closeBtn.classList.add('d-flex', 'items-center', 'justify-center', 'soft-shake');
        topSection.classList.add('pt-md', 'bd-bottom', 'pt-bottom-md', 'w-full', 'd-flex', 'items-center', 'justify-between', 'gap-md', 'section-top-modal');
        topLeft.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');
        icon.classList.add('img-size-20');
        title.classList.add('color-light', 'text-xl', 'fw-m');
        closeIcon.classList.add('img-size-15');
        contentSection.classList.add('pt-md', 'w-full', 'pt-right-md', 'overflow-hidden', 'section-content-modal');
        bottomSection.classList.add('pt-md', 'bd-top', 'pt-top-md', 'w-full', 'd-flex', 'align-start', 'justify-end', 'gap-md', 'section-bottom-modal');

        if(config?.event){
            modal.addEventListener('submit', config.event);
        }

        modal.id = "form-modal";

        title.textContent = config.title;
        icon.src = config.img;

        topLeft.append(icon);
        topLeft.append(title);

        closeBtn.setAttribute('aria-label', 'Fechar modal');
        closeBtn.type = "button";

        closeIcon.src = '/imgs/xmark-light.svg';
        closeIcon.alt = 'Fechar';

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

                btn.className = 'w-full d-flex justify-center items-center gap-sm color-light text-sm pt-btn-primary radius-sm fw-m bd-shadow-secondary w-mx-280 bg-btn-delete hover-scale';
                const img = document.createElement('img');
                img.src = '/imgs/trash-light.svg';
                img.alt = 'Deletar';
                img.classList.add('img-size-15');
                btn.append(img);
                btn.innerText = config.text;

            } else if (config.type === 'save') {

                btn.className = 'hover-scale w-full d-flex justify-center items-center gap-sm color-light text-sm pt-btn-primary radius-sm fw-m bg-btn-save bd-shadow-secondary w-mx-280';
                const img = document.createElement('img');
                img.src = '/imgs/save-light.svg';
                img.alt = 'Salvar';
                img.classList.add('img-size-15');
                btn.append(img);
                btn.innerText = config.text;

            } else if (config.type === 'add') {

                btn.className = 'hover-scale w-full d-flex justify-center items-center gap-sm color-light text-sm pt-btn-primary radius-sm fw-m bg-btn-create bd-shadow-secondary w-mx-280';
                const img = document.createElement('img');
                img.src = '/imgs/create-light.svg';
                img.alt = 'Adicionar';
                img.classList.add('img-size-15');
                btn.append(img);
                btn.innerText = config.text;

            }else if (config.type === 'cancel'){

                btn.className = 'hover-scale w-full d-flex justify-center items-center gap-sm w-full color-primary text-sm pt-btn-primary radius-sm fw-m bg-secondary bd-shadow-secondary w-mx-280';
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

        const widthWindow = window.screen.width

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
        const modalContent = document.querySelector('.section-content-modal');
        const modalButtons = document.querySelector('.section-bottom-modal');

        const wrapper = document.createElement('div');
        const warningContainer = document.createElement('div');
        const warningIcon = document.createElement('img');
        const warningTextContainer = document.createElement('div');
        const warningText = document.createElement('p');
        const messageText = document.createElement('p');

        modalContent.replaceChildren();
        modalButtons.replaceChildren();
        warningText.innerHTML = `<strong class="text-sm color-primary fw-b">Atenção! </strong>${config.messageWarning}`;

        titleModal.textContent = `Deletar ${config.title}`;
        messageText.textContent = config.message;

        wrapper.classList.add('d-flex', 'flex-column', 'justify-center', 'items-center', 'gap-sm', 'w-full', 'h-full', ...config.class);
        warningContainer.classList.add('d-flex', 'justify-start', 'items-center', 'gap-md', 'w-full', 'radius-sm', 'pt-md');
        warningIcon.classList.add('img-size-20');
        warningTextContainer.classList.add('d-flex', 'justify-start', 'items-start');
        warningText.classList.add('text-sm', 'color-primary', 'fw-n');
        messageText.classList.add('text-base', 'color-light', 'fw-n', 'pt-md', 'w-full');

        if(widthWindow <= 800){
            warningContainer.classList.add("flex-column")
        }else{
            messageText.classList.add('w-mx-600');
            warningContainer.classList.add('w-mx-600');
            wrapper.classList.add("pt-md");
            warningContainer.append(warningIcon);
        }

        warningIcon.src = '/imgs/circle-exclamation-red.svg';
        warningIcon.alt = 'Aviso';

        warningTextContainer.append(warningText);
        warningContainer.append(warningTextContainer);
        wrapper.append(warningContainer);
        wrapper.append(messageText);
        modalContent.append(wrapper);
        const buttons = this.createButtons(buttonsConfig);
        modalButtons.append(...buttons);
    }
}

export default Modal
