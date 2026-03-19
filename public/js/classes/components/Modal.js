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
            'gap-md', 'bg-secondary', 'radius-lg', ...config?.class
        );
        closeBtn.classList.add('d-flex', 'items-center', 'justify-center', 'soft-shake');
        topSection.classList.add('pt-md', 'bd-bottom', 'pt-bottom-md', 'w-full', 'd-flex', 'items-center', 'justify-between', 'gap-md', 'section-top-modal');
        topLeft.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');
        icon.classList.add('img-size-20');
        title.classList.add('color-light', 'text-xl', 'fw-m');
        closeIcon.classList.add('img-size-15');
        contentSection.classList.add('pt-md', 'w-full', 'h-full', 'pt-right-md', 'overflow-hidden', 'section-content-modal');
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

        screen.addEventListener("mousedown", (event) => {
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
        warningContainer.classList.add('d-flex', 'justify-start', 'items-center', 'gap-md', 'w-full', 'radius-lg', 'pt-md');
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

    createFieldGroup(config) {

        const group = document.createElement('div');

        if(config.containerGroup.class == null){
            group.classList.add('w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm');
        }else{
            group.classList.add(...config.containerGroup.class);
        }

        const labelWrapper = document.createElement('div');
        labelWrapper.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

        const icon = document.createElement('img');
        icon.src = config.icon.src;
        icon.alt = config.icon.alt;
        icon.classList.add('img-size-15');

        const label = document.createElement('label');
        label.classList.add('color-light', 'text-base', 'fw-m');
        label.setAttribute('for', config.label.for);
        label.textContent = config.label.text;

        labelWrapper.append(icon);
        labelWrapper.append(label);

        const fieldWrapper = document.createElement('div');

        if(config.field.type == "text"){

            const field = this.createTextField(config);

            if(config.containerField.class == null){
                fieldWrapper.classList.add('d-flex', 'items-center', 'justify-between', 'w-full', 'bg-secondary',  'bd-primary', 'radius-sm');
            }

            fieldWrapper.append(field);

        }else if(config.field.type == "textarea"){

            const field = this.createTextAreaField(config);

            if(config.containerField.class == null){
                fieldWrapper.classList.add('w-full', 'h-mn-300', 'bg-secondary', 'pt-right-sm', 'bd-primary', 'radius-sm')
            }

            fieldWrapper.append(field);

        }else if(config.field.type == "color"){

            const field = this.createColorField(config);

            if(config.containerField.class == null){
                fieldWrapper.classList.add('d-flex', 'items-center', 'justify-between', 'w-full');
            }

            fieldWrapper.append(field);

        }else if(config.field.type == "icon-select"){

            config.field.value.forEach((icon) => {
                const field = this.createIconSelectField(config, icon);
                fieldWrapper.append(field);
            });

            if(config.containerField.class == null){
                fieldWrapper.classList.add('d-flex', 'items-start', 'justify-start','w-full', 'gap-md', 'flex-wrap');
            }

        }else if(config.field.type == "toggle_track"){

            const field = this.createToggleTrackField(config);

            if(config.containerField.class == null){
                fieldWrapper.classList.add('d-flex', 'items-center', 'justify-between', 'w-full');
            }

            fieldWrapper.append(field);

        }

        if(config.containerField.class != null){
            fieldWrapper.classList.add(...config.containerField.class)
        }

        group.append(labelWrapper);
        group.append(fieldWrapper);

        return group;
    }

    createTextField(config) {

        const field = document.createElement('input');
        field.value = config?.field?.value ? config?.field?.value : "";
        field.required = config.field.required;
        field.type = 'text';
        field.name = config.field.name;

        if(config.field.class == null){
            field.classList.add('text-base', 'color-primary', 'w-full', 'pt-input-primary', 'h-35');
        }else{
            field.classList.add(...config.field.class);
        }

        return field;

    }

    createTextAreaField(config) {

        const field = document.createElement('textarea');
        field.value = config?.field?.value ? config?.field?.value : "";
        field.required = config.field.required;
        field.name = config.field.name;

        if(config.field.class == null){
            field.classList.add('w-full', 'h-full', 'text-base', 'color-primary', 'pt-input-primary');
        }else{
            field.classList.add(...config.field.class);
        }

        return field;

    }

    createColorField(config) {

        const field = document.createElement('input');
        field.value = config?.field?.value ? config?.field?.value : '#2f07bf';
        field.required = config.field.required;
        field.type = 'color';
        field.name = config.field.name;

        if(config.field.class == null){
            field.classList.add('text-base', 'color-primary', 'w-full', 'h-35');
        }else{
            field.classList.add(...config.field.class);
        }

        return field;
    }

    createIconSelectField(config, icon) {

        const item = document.createElement("label");

        const field = document.createElement("input");
        field.type = "radio";
        field.name = config.field.name;
        field.value = icon.name;
        field.checked = icon.checked;

        const img = document.createElement("img");
        img.src = icon.src;
        img.classList.add('img-size-20');

        item.append(field, img);

        if (config.field.class != null) {
            item.classList.add(...config.field.class);
        }else{
            item.classList.add('w-full', 'w-mx-100', 'd-flex', 'items-center', 'justify-center', 'radius-sm', "pointer", 'pt-input-primary', 'gap-sm', 'hover-scale', 'bd-shadow-secondary');
        }

        if(icon.checked){
            item.classList.add('bg-active', 'bd-active');
        }else{
            item.classList.add('bg-secondary', 'bd-primary');
        }

        field.addEventListener("change", () => {

            const fieldRadios = document.querySelectorAll(`input[name="${field.name}"]`);

            fieldRadios.forEach((radio) => {
                const label = radio.closest("label");

                label.classList.toggle('bg-active', false);
                label.classList.toggle('bd-active', false);
                label.classList.toggle('bg-secondary', true);
                label.classList.toggle('bd-primary', true);
            });

            const currentLabel = field.closest("label");

            currentLabel.classList.toggle('bg-active', true);
            currentLabel.classList.toggle('bd-active', true);
            currentLabel.classList.toggle('bg-secondary', false);
            currentLabel.classList.toggle('bd-primary', false);
        });

        return item;

    }

    createToggleTrackField(config) {

        const wrapper = document.createElement('div');
        wrapper.classList.add('toggle-wrapper');

        const field = document.createElement('input');
        field.type = 'checkbox';
        field.checked = config?.field?.value ?? false;
        field.required = false;
        field.name = config.field.name;
        field.value = config?.field?.value ? '1' : '0';

        field.classList.add('none');

        const track = document.createElement('div');
        track.classList.add('toggle-track');

        if (field.checked){
            track.classList.add('active');
        }

        const thumb = document.createElement('div');
        thumb.classList.add('toggle-thumb');
        track.appendChild(thumb);

        track.addEventListener('click', () => {
            field.checked = !field.checked;
            field.value = !field.checked ? '0' : '1';
            track.classList.toggle('active', field.checked);
            field.dispatchEvent(new Event('change', { bubbles: true }));
        });

        wrapper.appendChild(track);
        wrapper.appendChild(field);

        if (config.field.class) {
            wrapper.classList.add(...config.field.class);
        }

        return wrapper;
    }
}

export default Modal
