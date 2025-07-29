class Utils {

    addScrollY(selector) {
    
        const container = document.querySelector(selector);

        if (!container) return;

        if (container.scrollHeight > container.clientHeight) {
            container.classList.add('scroll-auto');
        } else {
            container.classList.remove('scroll-auto');
        }

    }

    openDropdown(selector){
    
        const selectedDropdown = document.querySelector(selector);
        const dropdowns = document.querySelectorAll(selector);
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

    removeElements(selector){
        const elementsToRemove = document.querySelectorAll(selector);
        const arrayToRemove = Array.from(elementsToRemove);

        if (arrayToRemove.length > 0) {
            arrayToRemove.forEach((e) => {
                e.remove();
            });
        }
    }

    getFormValues(form) {

        const data = {};
        
        const fields = form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            if (field.name) {
            if (field.type === 'file') {
                if (field.files[0]) {
                data[field.name] = field.files[0];
                }
            } else if (field.value.trim() !== "") {
                data[field.name] = field.value.trim();
            }
            }
        });

        const formData = new FormData();

        for (const key in data) {
            if (data[key]) {
                formData.append(key, data[key]);
            }
        }

        return formData;
    }

    formatDate(isoDate, type) {
        const date = new Date(isoDate + 'T00:00:00Z'); 

        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();

        if(type === "iso"){
            return `${year}-${month}-${day}`;
        } else {
            return `${day}/${month}/${year}`;
        }
    }
   
    navigation(btnSelector, activeSelector, filterCallback, storagePrefix, navigationName) {

        const buttons = document.querySelectorAll(btnSelector);

        if (buttons.length > 0) {

            const buttonsArray = Array.from(buttons);

            buttonsArray.forEach((button) => {
                button.addEventListener('click', () => {

                    const value = button.dataset.navigation;

                    localStorage.setItem(`${storagePrefix}_param_${navigationName}`, value);

                    this.markNavigation(btnSelector, activeSelector, storagePrefix, buttonsArray, navigationName);
                    filterCallback();

                });
            });
        }
    }

    markNavigation(btnSelector, activeSelector, storagePrefix, buttonsArray, navigationName) {

        buttonsArray.forEach((btn) => {
            btn.classList.remove(activeSelector);
        });

        const value = localStorage.getItem(`${storagePrefix}_param_${navigationName}`);

        const button = document.querySelector(`${btnSelector}[data-navigation="${value}"]`);

        if (button) {
            button.classList.add(activeSelector);
        }
    }

    getParams(storagePrefix, paramKeys) {

        const params = {};
        
        if (!Array.isArray(paramKeys)) {
            return {};
        }

        paramKeys.forEach((key) => {

            let value = localStorage.getItem(`${storagePrefix}_param_${key}`);

            if (value === null || value === 'null') {
                this.setLocalStroageParam(storagePrefix, key, 'null')
                params[key] = null;
            }else{
                params[key] = value;
            }

        });

        return params;
    }

    setLocalStroageParam(storagePrefix, paramKey, value){
        localStorage.setItem(`${storagePrefix}_param_${paramKey}`, value);
    }
}

export default Utils