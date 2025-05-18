
export function addScrollY(selector) {
    
    const container = document.querySelector(selector);

    if (!container) return;

    if (container.scrollHeight > container.clientHeight) {
        container.classList.add('scroll-auto');
    } else {
        container.classList.remove('scroll-auto');
    }
}

export function openDropdown(selector){
    
    const selectedDropdown = document.querySelector(selector);
    const dropdowns = document.querySelectorAll('.dropdown');
    const dropdownArray = Array.from(dropdowns); 

    if(dropdownArray.length > 0){
        dropdownArray.forEach((dropdown) => {
            const id = "#" + dropdown.id;
            if(id !== selector){
                if(dropdown.classList.contains('d-flex')){
                    dropdown.classList.remove('d-flex');
                    dropdown.classList.add('none');
                }
            }
        })
    }
    
    if(selectedDropdown){
        if(selectedDropdown.classList.contains('d-flex')){
            selectedDropdown.classList.remove('d-flex');
            selectedDropdown.classList.add('none');
        }else{
            selectedDropdown.classList.remove('none');
            selectedDropdown.classList.add('d-flex');
        }
    }
}

export function createModal(config, contentHTML, buttonsHTML) {

    const screen = document.createElement('div');
    screen.classList.add('screen-modal');

    const modal = document.createElement('form');

    if(config?.event){
        modal.addEventListener('submit', config.event);
    }

    modal.classList.add(
        'bd-primary', 'd-flex',
        'align-start', 'justify-between', 'flex-column',
        'gap-md', 'bg-light', 'radius-lg', ...config?.class
    );

    modal.id = "form-modal";

    const topSection = document.createElement('section');
    topSection.classList.add('pt-md', 'bd-bottom', 'pt-bottom-md', 'w-full', 'd-flex', 'items-center', 'justify-between', 'gap-md');

    const topLeft = document.createElement('div');
    topLeft.classList.add('d-flex', 'justify-start', 'items-center', 'gap-sm');

    const icon = document.createElement('img');
    icon.src = config.img; 
    icon.classList.add('img-size-20');

    const title = document.createElement('h2');
    title.classList.add('color-third', 'text-xl', 'fw-m');
    title.textContent = config.title;

    topLeft.append(icon);
    topLeft.append(title);

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('d-flex', 'items-center', 'justify-center', 'soft-shake');
    closeBtn.setAttribute('aria-label', 'Fechar modal');
    closeBtn.type = "button";

    const closeIcon = document.createElement('img');
    closeIcon.src = '/imgs/xmark-dark.svg'; 
    closeIcon.alt = 'Fechar';
    closeIcon.classList.add('img-size-15');

    closeBtn.append(closeIcon);
    closeBtn.addEventListener('click', () => {
        screen.remove(); 
    });

    topSection.append(topLeft);
    topSection.append(closeBtn);

    const contentSection = document.createElement('section');
    contentSection.classList.add('pt-md', 'w-full', 'h-full', 'pt-right-sm', 'overflow-hidden');

    const bottomSection = document.createElement('section');
    bottomSection.classList.add('pt-md', 'bd-top', 'pt-top-md', 'w-full', 'd-flex', 'align-start', 'justify-end', 'gap-md');

    contentSection.append(contentHTML);
    bottomSection.append(...buttonsHTML);
    modal.append(topSection);
    modal.append(contentSection);
    modal.append(bottomSection);
    screen.append(modal);

    document.body.append(screen);
}

export function createButtons(configs) {
    
    const buttons = [];

    configs.forEach((config) => {

        const btn = document.createElement('button');
        btn.type = config.type === 'save' || config.type === 'add' ? 'submit' : 'button';

        if (config.type === 'delete') {

            btn.className = 'w-full d-flex justify-center items-center gap-sm color-light text-sm pt-btn-primary radius-lg fw-m bd-primary w-mx-280 bg-btn-delete';
            const img = document.createElement('img');
            img.src = '/imgs/trash-light.svg';
            img.alt = 'Deletar';
            img.classList.add('img-size-15');
            btn.append(img);
            btn.innerText = config.text;

        } else if (config.type === 'save') {

            btn.className = 'hover-scale w-full d-flex justify-center items-center gap-sm color-light text-sm pt-btn-primary radius-lg fw-m bg-btn-save w-mx-280';
            const img = document.createElement('img');
            img.src = '/imgs/save.svg';
            img.alt = 'Salvar';
            img.classList.add('img-size-15');
            btn.append(img);
            btn.innerText = config.text;

        } else if (config.type === 'add') {

            btn.className = 'hover-scale w-full d-flex justify-center items-center gap-sm color-light text-sm pt-btn-primary radius-lg fw-m bg-btn-create w-mx-280';
            const img = document.createElement('img');
            img.src = '/imgs/create-light.svg'; 
            img.alt = 'Adicionar';
            img.classList.add('img-size-15');
            btn.append(img);
            btn.innerText = config.text;

        }else if (config.type === 'cancel'){

            btn.className = 'hover-scale w-full d-flex justify-center items-center gap-sm w-full color-secondary text-sm pt-btn-primary radius-lg fw-m bg-light bd-primary w-mx-280';
            const img = document.createElement('img');
            img.src = '/imgs/xmark-dark.svg'; 
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

