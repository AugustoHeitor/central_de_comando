class Select{

    #createContainerLabel(labelText, containerSelect){
        const container = document.createElement('div');
        const label = document.createElement('label');

        container.classList.add('w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'cnt-input-w');
        label.classList.add('text-sm', 'color-primary', 'fw-m');

        label.textContent = labelText;

        label.addEventListener('click', () => {
            containerSelect.querySelector("selector").focus();
        });

        container.append(label, containerSelect);

        return container;
    }

    createSelect(labelText, selectName, optionValue = null, selectClass, options, functionCallback) {

        const containerSelect = document.createElement('div');
        const select = document.createElement('select');

        containerSelect.classList.add('pt-input-primary', 'w-full', 'bg-secondary', 'radius-lg', 'bd-primary');
        select.classList.add(selectClass, 'w-full', 'text-sm', 'color-primary');

        select.name = selectName;

        options.forEach((opt) => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            option.classList.add("color-dark");

            if (optionValue == option.value) {
                option.selected = true;
            }else if(optionValue == null){
                if(opt.value === ""){
                    option.selected = true;
                }
            }

            select.append(option);
        });

        select.addEventListener('change', () => {
            const value = select.value || null;
            functionCallback(value);
        });

        containerSelect.append(select);
        const container = this.#createContainerLabel(labelText, containerSelect);

        return container;
    }

}

export default Select;
