import Utils from './Utils.js';
import Master from './Master.js';
import Input from './components/Input.js';
import MyChart from './components/MyChart.js';
import ContainerEmpty  from './components/ContainerEmpty.js';

class Report extends Master {

    constructor(endpoint, cardsData = []) {
        super();

        this.baseUrl = '/api/';
        this.endpoint = endpoint;
        this.url = this.baseUrl + endpoint;
        this.utils = new Utils();
        this.renderedGraphic = undefined;

        this.components = {
            'chart': new MyChart(),
            'input': new Input(),
            'containerEmpty': new ContainerEmpty()
        };

        this.cardsData = cardsData;
    }

    init() {
        this.createCards();
        this.utils.addScrollY('#cards-section', false);
        this.utils.addScrollY('#report-section', false);
    }

    async getTimeAllocationCategory(params, button){

        button.disabled = true;

        try {

            const response = await axios.get(`${this.url}/time-allocation-category/`, {
                params: params,
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {

                setTimeout(() => {
                    button.disabled = false;
                }, 2000);

                return response.data.data;

            }

        } catch (error) {
            console.error(error);

            setTimeout(() => {
                button.disabled = false;
            }, 2000);
        }
    }

    async exportTimeAllocationCategory(params, button) {
        button.disabled = true;

        try {
            const response = await axios.get(`${this.url}/time-allocation-category/export`, {
                params: params,
                responseType: 'blob',
                timeout: 10000
            });

            this.utils.printPdf(response.data);

            setTimeout(() => {
                button.disabled = false;
            }, 2000);

        } catch (error) {
            console.error(error);
            setTimeout(() => {
                button.disabled = false;
            }, 2000);
        }
    }

    async exportIncomesCategory(params, button) {
        button.disabled = true;

        try {
            const response = await axios.get(`${this.url}/incomes-category/export`, {
                params: params,
                responseType: 'blob',
                timeout: 10000
            });

            this.utils.printPdf(response.data);

            setTimeout(() => {
                button.disabled = false;
            }, 2000);

        } catch (error) {
            console.error(error);
            setTimeout(() => {
                button.disabled = false;
            }, 2000);
        }
    }

    async exportExpensesCategory(params, button) {
        button.disabled = true;

        try {
            const response = await axios.get(`${this.url}/expenses-category/export`, {
                params: params,
                responseType: 'blob',
                timeout: 10000
            });

            this.utils.printPdf(response.data);

            setTimeout(() => {
                button.disabled = false;
            }, 2000);

        } catch (error) {
            console.error(error);
            setTimeout(() => {
                button.disabled = false;
            }, 2000);
        }
    }

    async exportIncomeAndExpenses(params, button) {
        button.disabled = true;

        try {
            const response = await axios.get(`${this.url}/income-and-expenses/export`, {
                params: params,
                responseType: 'blob',
                timeout: 10000
            });

            this.utils.printPdf(response.data);

            setTimeout(() => {
                button.disabled = false;
            }, 2000);

        } catch (error) {
            console.error(error);
            setTimeout(() => {
                button.disabled = false;
            }, 2000);
        }
    }

    async getIncomesCategory(params, button){

        button.disabled = true;

        try {

            const response = await axios.get(`${this.url}/incomes-category/`, {
                params: params,
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {

                setTimeout(() => {
                    button.disabled = false;
                }, 2000);

                return response.data.data;

            }

        } catch (error) {
            console.error(error);

            setTimeout(() => {
                button.disabled = false;
            }, 2000);
        }
    }

    async getExpensesCategory(params, button){

        button.disabled = true;

        try {

            const response = await axios.get(`${this.url}/expenses-category/`, {
                params: params,
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {

                setTimeout(() => {
                    button.disabled = false;
                }, 2000);

                return response.data.data;

            }

        } catch (error) {
            console.error(error);

            setTimeout(() => {
                button.disabled = false;
            }, 2000);
        }
    }

    async getIncomeAndExpenses(params, button){

        button.disabled = true;

        try {

            const response = await axios.get(`${this.url}/income-and-expenses/`, {
                params: params,
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {

                setTimeout(() => {
                    button.disabled = false;
                }, 2000);

                return response.data.data;

            }

        } catch (error) {
            console.error(error);

            setTimeout(() => {
                button.disabled = false;
            }, 2000);
        }
    }

    createCards(){

        const cardsSection = document.querySelector("#cards-section");
        cardsSection.replaceChildren();

        if(cardsSection.classList.contains("none")){
            cardsSection.classList.add("d-grid");
            cardsSection.classList.remove("none");

            const sectionReport = document.querySelector("#report-section");

            if(sectionReport.classList.contains("d-flex")){
                sectionReport.classList.add("none");
                sectionReport.classList.remove("d-flex");
            }
        }

        if(this.cardsData.length > 0) {
            this.cardsData.forEach((cardData) => {

                const card = document.createElement('div');
                const divImg = document.createElement('div');
                const img = document.createElement('img');
                const divContent = document.createElement('div');
                const divText = document.createElement('div');
                const h2 = document.createElement('h2');
                const p = document.createElement('p');
                const button = document.createElement('button');
                const span = document.createElement('span');
                const btnImg = document.createElement('img');

                card.classList.add(
                    'overflow-hidden', 'w-full', 'd-flex', 'flex-column', 'report-card',
                    'items-start', 'justify-start', 'bg-secondary',
                    'radius-lg', 'bd-shadow-primary'
                );

                divImg.classList.add('w-full', 'd-flex', 'items-center', 'justify-center', 'pt-md', 'h-200');
                img.classList.add('img-size-100');
                divContent.classList.add('w-full', 'd-flex', 'items-start', 'justify-start', 'gap-md', 'flex-column', 'bd-top', 'pt-md');
                divText.classList.add('d-flex', 'items-start', 'justify-start', 'flex-column', 'gap-sm');
                h2.classList.add('text-base', 'fw-sb', 'color-light');
                p.classList.add('color-primary', 'text-sm');
                button.classList.add('hover-scale', 'color-light', 'text-sm', 'd-flex', 'items-center', 'justify-center');
                btnImg.classList.add('img-size-15');

                h2.textContent = cardData.title;
                p.textContent = cardData.description;
                span.textContent = cardData.buttonText;

                span.title = cardData.buttonText;

                img.src = cardData.imgSrc;
                btnImg.src = "imgs/chevron-right-light.svg";
                btnImg.alt = "icon";
                img.alt = "icon";

                button.addEventListener("click", ()=>{
                    cardsSection.replaceChildren();
                    this.createReportSection(cardData.title, cardData.settings, cardData.chartRenderFunction, cardData.reportExportFunction, cardData.filterInputs);

                    this.utils.addScrollY('#cards-section', false);
                    this.utils.addScrollY('#report-section', false);
                })

                divImg.append(img);
                card.append(divImg);
                divText.append(h2);
                divText.append(p);
                button.append(span);
                button.append(btnImg);
                divContent.appendChild(divText);
                divContent.append(button);
                card.append(divContent);
                cardsSection.append(card);
            });
        }
    }

    createReportSection(titleReport, setting, chartRenderFunction, reportExportFunction, inputs){
        const sectionReport = document.querySelector("#report-section");

        if(sectionReport.classList.contains("none")){
            sectionReport.classList.add("d-flex");
            sectionReport.classList.remove("none");

            const cardsSection = document.querySelector("#cards-section");

            if(cardsSection.classList.contains("d-grid")){
                cardsSection.classList.add("none");
                cardsSection.classList.remove("d-grid");
            }

        }

        const buttonBack = document.createElement("button");
        const imgBack = document.createElement("img");
        const textBack = document.createElement("span");

        buttonBack.classList.add('soft-shake', 'd-flex','justify-start','items-center','gap-sm', 'color-light','text-sm','fw-sb','h-36');
        imgBack.classList.add("img-size-15");
        imgBack.src = "imgs/back-arrow-light.svg";

        textBack.innerText = "Voltar";

        buttonBack.addEventListener("click", ()=>{
            sectionReport.replaceChildren();

            this.createCards();

            this.utils.addScrollY('#cards-section', false);
            this.utils.addScrollY('#report-section', false);
        })

        buttonBack.append(imgBack, textBack);

        const containerChart = document.createElement("div");
        containerChart.classList.add("w-full", "h-full", "d-flex", "items-center", "justify-center");
        containerChart.id = "chart-section";

        const containerFilter = this.createContainerFilter(titleReport, chartRenderFunction, reportExportFunction, inputs, setting);

        sectionReport.append(buttonBack, containerFilter, containerChart);
        this.components.containerEmpty.createContainerEmpty('#chart-section', 'Nenhum dado encontrado', 'Não há dados para o filtro aplicado ou você ainda não gerou nenhum relatório. Tente ajustar o filtro e gerar novamente.', false);

    }

    createContainerFilter(titleReport, chartRenderFunction, reportExportFunction, inputs, setting){

        const containerFilter = document.createElement("div");
        const labelFilter = document.createElement("h2");
        const buttonGenerateReport = document.createElement("button");
        const imgGenerateReport = document.createElement("img");
        const textGenerateReport = document.createElement("span");
        const containerLabelFilter = document.createElement("div");
        const imgFilter = document.createElement("img");
        const containerInputs = document.createElement("div");
        const containerPrimary = document.createElement("div");
        const containerSecondary = document.createElement("div");

        imgFilter.classList.add("img-size-15");
        imgGenerateReport.classList.add("img-size-15");
        containerFilter.classList.add("bg-secondary", "bd-shadow-primary", "radius-lg", "pt-md", "w-full", "d-flex", "items-start", "justify-start", "gap-lg", "flex-column");
        labelFilter.classList.add("text-base", "fw-sb", "color-light");
        buttonGenerateReport.classList.add('hover-scale','bg-tertiary','bd-shadow-secondary','d-flex','justify-start','items-center','gap-sm','pt-btn-primary','radius-lg','color-light','text-sm','fw-sb','h-36');
        containerLabelFilter.classList.add('d-flex','justify-start','items-center','gap-sm');
        containerInputs.classList.add('d-flex','justify-start','items-center','gap-md', 'flex-direction-mobile', "w-full-mobile");
        containerPrimary.classList.add("w-full", "d-flex", "items-start", "justify-start", "gap-lg", "flex-column");
        containerSecondary.classList.add("w-full", "d-flex", "items-start", "justify-end");

        imgFilter.src = "imgs/filter-light.svg";
        imgGenerateReport.src = "imgs/chart-simple-light.svg";

        textGenerateReport.innerText = "Gerar Relátorio";
        labelFilter.innerText = "Filtros";

        inputs.forEach((input)=>{
            const inputDate = this.components.input.createInputDate(input.labelText, input.inputClass, input.inputName, input.inputValue, input.functionCallback = null);

            containerInputs.append(inputDate);
        })

        buttonGenerateReport.addEventListener("click", async () => {
            if (typeof this[chartRenderFunction] === "function") {
                const params = {};

                inputs.forEach((input) => {
                    const el = document.querySelector(`input[name="${input.inputName}"]`);
                    const value = el ? el.value : '';
                    params[input.inputName] = value;
                });

                const data = await this[chartRenderFunction](params, buttonGenerateReport);
                this.createContainerChart(titleReport, data, setting, reportExportFunction, inputs);

            } else {
                console.error(`Função "${chartRenderFunction}" não encontrada em "this"`);
            }
        });

        buttonGenerateReport.append(imgGenerateReport, textGenerateReport);
        containerLabelFilter.append(imgFilter, labelFilter)
        containerPrimary.append(containerLabelFilter, containerInputs);
        containerSecondary.append(buttonGenerateReport);
        containerFilter.append(containerPrimary, containerSecondary);

        return containerFilter;
    }

    createContainerChart(title, data = [], setting, reportExportFunction, inputs){

        const containerChart = document.querySelector("#chart-section");

        if(data.length > 0){

            containerChart.replaceChildren();

            const container = document.createElement("div");
            const titleChart = document.createElement("h2");
            const containerPrimary = document.createElement("div");
            const containerSecondary = document.createElement("div");
            const containerTitle = document.createElement("div");
            const buttonPrint = document.createElement("button");
            const imgPrint = document.createElement("img");
            const textPrint = document.createElement("span");
            const canvas = document.createElement("canvas");

            canvas.id = "canvas-chart";

            container.classList.add("w-full", "bg-secondary", "bd-shadow-primary", "radius-lg", "pt-md");
            imgPrint.classList.add("img-size-15");
            containerPrimary.classList.add("w-full", "d-flex", "items-center", "justify-between", "gap-lg");
            containerSecondary.classList.add("w-full", "d-flex", "items-start", "justify-start", "h-300");
            titleChart.classList.add("text-base", "fw-sb", "color-light");
            containerTitle.classList.add("d-flex", "items-center", "justify-start", "gap-sm");
            buttonPrint.classList.add('hover-scale','bg-btn-create','bd-shadow-secondary','d-flex','justify-start','items-center','gap-sm','pt-btn-primary','radius-lg','color-light','text-sm','fw-sb','h-36');

            imgPrint.src = "imgs/print-light.svg";

            textPrint.innerText = "Imprimir"
            titleChart.innerText = title;

            buttonPrint.addEventListener("click", async () => {
                if (typeof this[reportExportFunction] === "function") {
                    const params = {};

                    inputs.forEach((input) => {
                        const el = document.querySelector(`input[name="${input.inputName}"]`);
                        const value = el ? el.value : '';
                        params[input.inputName] = value;
                    });

                    await this[reportExportFunction](params, buttonPrint);

                } else {
                    console.error(`Função "${reportExportFunction}" não encontrada em "this"`);
                }
            });

            buttonPrint.append(imgPrint, textPrint);
            containerTitle.append(titleChart);
            containerPrimary.append(containerTitle, buttonPrint);
            containerSecondary.append(canvas);
            container.append(containerPrimary, containerSecondary);
            containerChart.append(container);

            const newSetting = this.updateChartSetting(data, setting);
            this.renderedGraphic = this.components.chart.createChart(newSetting);
        }else{
            this.components.containerEmpty.createContainerEmpty('#chart-section', 'Nenhum dado encontrado', 'Não há dados para o filtro aplicado ou você ainda não gerou nenhum relatório. Tente ajustar o filtro e gerar novamente.', false);
        }

        this.utils.addScrollY('#cards-section', false);
        this.utils.addScrollY('#report-section', false);

    }

    updateChartSetting(data, setting){

        const newSetting = setting;

        if(setting.chartName == "timeAllocationCategory"){
            const labels = data.map(item => item.category_name);
            const durations = data.map(item => item.seconds);

            newSetting.labels = labels;
            newSetting.datasets[0].data = durations;

        }else if(setting.chartName == "expensesCategory"){
            const labels = data.map(item => item.category_name);
            const expenses = data.map(item => this.utils.centsToReais(item.total_amount));

            newSetting.labels = labels;
            newSetting.data = expenses;

        }else if(setting.chartName == "incomesCategory"){
            const labels = data.map(item => item.category_name);
            const amounts = data.map(item => this.utils.centsToReais(item.total_amount));

            newSetting.labels = labels;
            newSetting.data = amounts;
        }else if(setting.chartName == "incomeAndExpenses"){
            const totalAmounts = data.map(item => this.utils.centsToReais(item.amount));
            const incomes = data.filter(item => item.type == "income").map(item => this.utils.centsToReais(item.amount));
            const expenses = data.filter(item => item.type == "expense").map(item => this.utils.centsToReais(item.amount));

            newSetting.labels = totalAmounts;
            newSetting.datasets[0].data = incomes;
            newSetting.datasets[1].data = expenses;
        }

        return newSetting;
    }

}

export default Report;
