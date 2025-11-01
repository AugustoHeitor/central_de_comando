class Input{

    #createContainerLabel(labelText, containerInput){
        const container = document.createElement('div');
        const label = document.createElement('label');

        container.classList.add('w-full', 'd-flex', 'flex-column', 'justify-start', 'items-start', 'gap-sm', 'cnt-input-w');
        label.classList.add('text-sm', 'color-primary', 'fw-m');

        label.textContent = labelText;


        label.addEventListener("click", ()=>{
            containerInput.querySelector("input").focus();
        });

        container.append(label, containerInput);

        return container;
    }

    createInputDate(labelText, inputClass, inputName, inputValue, functionCallback = null) {


        const containerInput = document.createElement('div');
        const input = document.createElement('input');

        containerInput.classList.add('w-full', 'bg-secondary', 'radius-sm', 'bd-primary');
        input.classList.add('pt-input-primary', inputClass, 'w-full', 'text-sm', 'color-primary');

        input.name = inputName;

        input.type = 'date';

        if(functionCallback !== null){
            input.addEventListener('input', () => {
                const value = input.value || null;
                functionCallback(value);
            });
        }

        if (inputValue != null) {
            input.value = inputValue;
        }

        containerInput.append(input);

        const container = this.#createContainerLabel(labelText, containerInput);

        return container;
    }

}

export default Input;
