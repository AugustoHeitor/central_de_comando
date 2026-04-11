import Utils from '../Utils.js';
import Master from '../Master.js';
import Dropdown from '../components/Dropdown.js';
import MyChart from '../components/MyChart.js';

class Dashboard extends Master {

    constructor(endpoint, tasks, transactions, timeDistribution, chartSettings = []) {

        super();
        this.tasks = tasks;
        this.transactions = transactions;
        this.timeDistribution = timeDistribution;
        this.chartTimeDistribution = undefined;
        this.baseUrl = '/api/';
        this.endpoint = endpoint;
        this.url = this.baseUrl + endpoint;
        this.utils = new Utils();
        this.localStorageName = "dashboard";

        this.paramKeysFilter = [
            'start_date',
            'end_date',
        ];

        this.components = {
            'dropdown': new Dropdown(this.localStorageName, this.paramKeysFilter, this.filterDashboard.bind(this)),
            'chart': new MyChart(),
        };

        this.dropdownFields = [
            {
                "type": "inputDate",
                "label": "Data Inicial",
                "class": "input-start-date",
                "storageKey": "start_date",
                "render": {
                    "desktop": true,
                    "mobile": true
                }
            },
            {
                "type": "inputDate",
                "label": "Data Final",
                "class": "input-end-date",
                "storageKey": "end_date",
                "render": {
                    "desktop": true,
                    "mobile": true
                }
            }
        ];

        this.chartSettings = chartSettings;
    }

    init() {

        this.chartSettings.forEach((chartSetting)=>{

            if(chartSetting.type == "bar"){
                this.chartTimeDistribution = this.components.chart.createChart(chartSetting);
            }
        })

        this.filterDashboard();

        this.utils.addScrollY('#dashboard-section', false);
    }

    async getAllTasks(params){
        try {

            const response = await axios.get(`${this.url}/tasks/`, {
                params: params,
                timeout: 30000
            });

            if (response.status === 200 && response.data.status === 'success') {

                return response.data.data;

            }

        } catch (error) {
            console.error(error);
        }
    }

    async getAllTransactions(params){
        try {

            const response = await axios.get(`${this.url}/financial-transactions/`, {
                params: params,
                timeout: 30000
            });

            if (response.status === 200 && response.data.status === 'success') {

                return response.data.data;

            }

        } catch (error) {
            console.error(error);
        }
    }

    async getAllTimeDistribution(params){
        try {

            const response = await axios.get(`${this.url}/time-distribution/`, {
                params: params,
                timeout: 30000
            });

            if (response.status === 200 && response.data.status === 'success') {
                console.log(response.data.data);
                return response.data.data;

            }

        } catch (error) {
            console.error(error);
        }
    }

    async filterDashboard() {

        const params = this.utils.getParams(this.localStorageName, this.paramKeysFilter);

        const dataTransactions = await this.getAllTransactions(params);
        const dataTasks = await this.getAllTasks(params);
        const dataTimeDistribution = await this.getAllTimeDistribution(params);

        this.transactions = dataTransactions;
        this.tasks = dataTasks;
        this.timeDistribution = dataTimeDistribution;

        this.updateValueTransaction();
        this.updateValueTask();
        this.updateTimeDistribution();

    }

    updateValueTask(){
        const textToDo = document.querySelector('#value-to-do');
        const textInProgress = document.querySelector('#value-in-progress');
        const textDone = document.querySelector('#value-done');

        textToDo.innerText = this.tasks.to_do || 0;
        textInProgress.innerText = this.tasks.in_progress || 0;
        textDone.innerText = this.tasks.done || 0;
    }

    updateValueTransaction() {

        const textTotal = document.querySelector('#value-total');
        const textExpense = document.querySelector('#value-expense');
        const textIncome = document.querySelector('#value-income');

        const valueTotal = this.utils.centsToReais(this.transactions.total) || 0;
        const valueExpense = this.utils.centsToReais(this.transactions.expense) || 0;
        const valueIncome = this.utils.centsToReais(this.transactions.income) || 0;

        textTotal.innerText = this.utils.formatToBRLCurrency(valueTotal);
        textExpense.innerText = this.utils.formatToBRLCurrency(valueExpense);
        textIncome.innerText = this.utils.formatToBRLCurrency(valueIncome);

    }

    updateTimeDistribution(){
        const labels = this.timeDistribution.map(item => item.date);
        const durations = this.timeDistribution.map(item => item.seconds);

        this.chartTimeDistribution.data.labels = labels;
        this.chartTimeDistribution.data.datasets[0].data = durations;
        this.chartTimeDistribution.update();
    }
}

export default Dashboard;
