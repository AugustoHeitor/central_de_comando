import Utils from './Utils.js';
import Master from './Master.js';
import Dropdown from './components/Dropdown.js';

class Dashboard extends Master {

    constructor(endpoint, tasks, transactions) {
        super();
        this.tasks = tasks;
        this.transactions = transactions;
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
        };
    }

    init() {
        this.filterDashboard();
    }

    async getAllTasks(params){
        try {

            const response = await axios.get(`${this.url}/tasks/`, {
                params: params,
                timeout: 5000
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
                timeout: 5000
            });

            if (response.status === 200 && response.data.status === 'success') {

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

        this.transactions = dataTransactions;
        this.tasks = dataTasks;

        this.updateValueTransaction();
        this.updateValueTask();

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

        const valueTotal = this.transactions.total || 0;
        const valueExpense = this.transactions.expense || 0;
        const valueIncome = this.transactions.income || 0;

        textTotal.innerText = this.utils.formatToBRLCurrency(valueTotal);
        textExpense.innerText = this.utils.formatToBRLCurrency(valueExpense);
        textIncome.innerText = this.utils.formatToBRLCurrency(valueIncome);

    }
}

export default Dashboard;
