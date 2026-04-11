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

    parseMarkdown(text) {
        return text
        // Headings
        .replace(/^#### (.+)$/gm,  '<h4>$1</h4>')
        .replace(/^### (.+)$/gm,   '<h3>$1</h3>')
        .replace(/^## (.+)$/gm,    '<h2>$1</h2>')
        // Bold e italic
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g,     '<em>$1</em>')
        // Listas não-ordenadas (* item)
        .replace(/^\* (.+)$/gm,    '<li>$1</li>')
        // Listas ordenadas (1. item)
        .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
        // Agrupa <li> consecutivos em <ul>/<ol>
        .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
        // Parágrafos (linhas soltas)
        .replace(/^(?!<[hlu]|<\/[hlu])(.+)$/gm, '<p>$1</p>')
        // Quebras duplas desnecessárias
        .replace(/\n{2,}/g, '');
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

            if (!field.name) return;

            if (field.type === 'file') {

                if (field.files[0]) {
                    data[field.name] = field.files[0];
                }

            } else if (field.type === 'radio') {

                if (field.checked) {
                    data[field.name] = field.value;
                }

            } else {
                if (field.value.trim() !== "") {
                    data[field.name] = field.value.trim();
                }
            }
        });

        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
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

    formatToBRLCurrency(number) {
        if (typeof number !== "number") {
            number = Number(number);
        }

        if (isNaN(number)) {
            number = 0;
        }

        return number.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    reaisToCents(valueInReais) {
        return Math.round(Number(valueInReais) * 100);
    }

    centsToReais(valueInCents) {
        return (Number(valueInCents) / 100).toFixed(2);
    }

    parseDate(dateString) {
        if (!dateString) return null;

        let cleaned = dateString.split('.')[0].replace('Z', '');
        const [datePart, timePart] = cleaned.split('T');

        if (!timePart) return null;

        const [year, month, day] = datePart.split('-').map(Number);
        const [hour, min, sec = 0] = timePart.split(':').map(Number);

        return new Date(year, month - 1, day, hour, min, sec);
    }

    formatTimeDifference(diffMs) {
        if (diffMs < 0) diffMs = 0;

        const totalSeconds = Math.floor(diffMs / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    calculateTimeDifference(startDate, endDate = null) {
        if (!startDate){
            return '00:00:00';
        };

        const start = this.parseDate(startDate);
        const end = endDate ? this.parseDate(endDate) : this.parseDate(this.localDateTimeGenerator());

        if (!start || !end){
            return '00:00:00';
        };

        return this.formatTimeDifference(end - start);
    }

    calculateTotalTime(dataArray) {
        if (!Array.isArray(dataArray) || dataArray.length === 0) {
            return '00:00:00';
        }

        let totalMs = 0;

        dataArray.forEach(item => {
            const start = this.parseDate(item.started_at);
            const end = item.stopped_at ? this.parseDate(item.stopped_at) : new Date();

            if (!start || isNaN(end.getTime())) {
                console.error('Data inválida:', item.started_at, item.stopped_at);
                return;
            }

            const diffMs = Math.max(0, end - start);
            totalMs += diffMs;
        });

        return this.formatTimeDifference(totalMs);
    }

    formatForDatetime(dateString) {
        if (!dateString || typeof dateString !== "string") return "";

        let cleaned = dateString.split('.')[0].replace('Z', '');
        const [datePart, timePart] = cleaned.split('T');

        if (!timePart) return "";

        const [hh, min, sec] = timePart.split(':');
        return `${datePart}T${hh}:${min}:${sec || '00'}`;
    }

    localDateTimeGenerator() {
        const now = new Date();
        const pad = (num) => num.toString().padStart(2, '0');

        return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
            `T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }

    printPdf(data) {
        const pdfUrl = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
        window.open(pdfUrl, '_blank');
        window.URL.revokeObjectURL(pdfUrl);
    }

    toggleVisibility(selector, type = "show"){
        const selectedElement = document.querySelector(selector);

        if(selectedElement){
            if(type == "show"){
                selectedElement.classList.add("d-flex");
                selectedElement.classList.remove("none");
            }else if(type == "hide"){
                selectedElement.classList.remove("d-flex");
                selectedElement.classList.add("none");
            }
        }
    }

    getOptions(data = [], defaultOption, config = {}) {

        let options = [];

        if (Array.isArray(data) && data.length > 0) {
            options = data.map((item) => ({
                value: item[config.valueKey],
                label: item[config.labelKey]
            }));

            options.unshift({
                value: defaultOption.value,
                label: defaultOption.label
            });
        }

        return options;
    }

    getCsrfTokenValue(){
        const input = document.querySelector('input[name="_token"]');
        let value = "";

        if(input){
            value = input.value;
        }

        return value;
    }
}

export default Utils
