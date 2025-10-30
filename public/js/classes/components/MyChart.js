import Utils from '../Utils.js';

class MyChart{

    constructor(){
        this.utils = new Utils();
    }

    createChart(chartSetting){
        if(chartSetting.type == "bar"){
            return this.createBarChart(chartSetting.selector, chartSetting.labels, chartSetting.label, chartSetting.data, chartSetting.text, chartSetting.color, chartSetting.converter);
        }else if(chartSetting.type == "line"){
            return this.createLineChart(chartSetting.selector,  chartSetting.labels, chartSetting.datasets, chartSetting.converter);
        }else if(chartSetting.type == "pie"){
            return this.createPieChart(chartSetting.selector,  chartSetting.labels, chartSetting.datasets, chartSetting.converter);
        }
    }

    createBarChart(selector, labels, label, data, text, color, converter = null){
        const canvas = document.querySelector(selector);
        const self = this;

        const chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: color,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: text
                        },
                        ticks: {
                            callback: function(value) {

                                if(converter == "hours"){
                                    const hours = Math.floor(value / 3600);
                                    const minutes = Math.floor((value % 3600) / 60);
                                    const seconds = value % 60;

                                    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                                }else if(converter == "real"){
                                    return self.utils.formatToBRLCurrency(value);
                                }else{
                                    return value;
                                }
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {

                                const value = context.parsed.y;

                                if(converter == "hours"){
                                    const hours = Math.floor(value / 3600);
                                    const minutes = Math.floor((value % 3600) / 60);
                                    const seconds = value % 60;

                                    return `${context.dataset.label}: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                                }else if(converter == "real"){
                                    return self.utils.formatToBRLCurrency(value);
                                }else{
                                    return value;
                                }
                            }
                        }
                    }
                }
            }
        });

        return chart;
    }

    createLineChart(selector, labels, datasets, converter = null) {
        const canvas = document.querySelector(selector);
        const self = this;

        const chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'end'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                if (converter === "real") {
                                    return self.utils.formatToBRLCurrency(value);
                                } else {
                                    return `${context.dataset.label}: ${value}`;
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {

                                if (converter === "real") {
                                    return self.utils.formatToBRLCurrency(value);
                                } else {
                                    return value;
                                }
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value, index) {
                                const labelValue = labels[index];

                                if (converter === "real") {
                                    if (self?.utils?.formatToBRLCurrency) {
                                        return self.utils.formatToBRLCurrency(labelValue);
                                    }
                                    return labelValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                                }

                                if (converter === "hours") {
                                    const hours = Math.floor(labelValue / 3600);
                                    const minutes = Math.floor((labelValue % 3600) / 60);
                                    const seconds = Math.floor(labelValue % 60);
                                    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                                }

                                return labelValue;
                            }
                        }
                    }
                }
            }
        });

        return chart;
    }

    createPieChart(selector, labels, datasets, converter){
        const canvas = document.querySelector(selector);

        const chart = new Chart(canvas, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.label || '';
                                const value = context.raw;

                                if (converter == "hours") {
                                    const hours = Math.floor(value / 3600);
                                    const minutes = Math.floor((value % 3600) / 60);
                                    const seconds = value % 60;

                                    const timeFormatted = `${hours.toString().padStart(2, '0')}:${minutes
                                        .toString()
                                        .padStart(2, '0')}:${seconds
                                        .toString()
                                        .padStart(2, '0')}`;
                                            console.log(timeFormatted)
                                    return `${label}: ${timeFormatted}`;
                                } else {
                                    return value;
                                }
                            }
                        }
                    }
                },

            }
        });

        return chart;
    }
}

export default MyChart;
