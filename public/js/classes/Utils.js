class Utils {

   addScrollY(selector, main = false) {

        const container = document.querySelector(selector);
        if (!container) return;

        let scrollHeight = container.scrollHeight;
        let clientHeight = container.clientHeight;

        if (main) {
            const mainElement = document.querySelector("main");
            if (!mainElement) return;
            scrollHeight = mainElement.scrollHeight;
            clientHeight = mainElement.clientHeight;
        }

        const isOverflowing = scrollHeight >= clientHeight;

        if (isOverflowing) {
            if (!container.classList.contains("scroll-auto")) {
                container.classList.add("scroll-auto");
            }
        } else {
            if (container.classList.contains("scroll-auto")) {
                container.classList.remove("scroll-auto");
            }
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

    formatToBRLCurrency(number){
        return number.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
    }

    reaisToCents(valueInReais) {
        return Math.round(Number(valueInReais) * 100);
    }

    centsToReais(valueInCents) {
        return (Number(valueInCents) / 100);
    }

    calculateTimeDifference(startDate, endDate = null) {
        if (!startDate) return '00:00:00';

        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();

        let diffMs = end - start;

        if (diffMs < 0) diffMs = 0;

        const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    calculateTotalTime(dataArray) {
        let totalSeconds = 0;

        dataArray.forEach(item => {
            const start = new Date(item.started_at);
            const end = item.stopped_at ? new Date(item.stopped_at) : new Date();

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                console.error('Data inválida:', item.started_at, item.stopped_at);
                return;
            }

            let diffMs = end - start;
            if (diffMs < 0) diffMs = 0;

            totalSeconds += Math.floor(diffMs / 1000);
        });

        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    formatForDatetimeLocal(dateString) {

        if (dateString){
            const date = new Date(dateString);
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            const hh = String(date.getHours()).padStart(2, '0');
            const min = String(date.getMinutes()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
        }else{
            return "";
        }

    }

}

export default Utils
