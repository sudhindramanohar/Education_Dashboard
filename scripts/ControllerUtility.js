const colorCodes = ['rgba(255, 99, 132, 1)',
				   'rgba(54, 162, 235, 1)',
				   'rgba(255, 206, 86, 1)',
				   'rgba(75, 192, 192, 1)',
				   'rgba(153, 102, 255, 1)',
				   'rgba(255, 159, 64, 1)',
				   'rgb(255,140,0)',
				   'rgba(54, 162, 235, 1)',
				   'rgb(184,134,11)',
				   'rgb(240,230,140)',
				   'rgb(255,255,0)',
				   'rgb(85,107,47)',
				   'rgb(107,142,35)',
				   'rgb(127,255,0)',
				   'rgb(0,128,0)',
				   'rgb(144,238,144)',
				   'rgb(0,255,127)',
				   'rgb(32,178,170)',
				   'rgb(47,79,79)',
				   'rgb(0,139,139)',
				   'rgb(0,255,255)',
				   'rgb(70,130,180)',
				   'rgb(135,206,235)',
				   'rgb(0,0,128)',
				   'rgb(65,105,225)',
				   'rgb(128,0,128)',
				   'rgb(255,0,255)',
				   'rgb(139,69,19)',
				   'rgb(210,105,30)',
				   'rgb(244,164,96)',
]

class ChartOperation{
	plot(chart){
		var ctx = chart.ctx;
		if(ctx){
			ctx.innerHTML = "";
		}
		new Chart(ctx, {
			type: chart.type,
			data: {
				labels: chart.labels,
				datasets: [{
					label: chart.labels,
					data: chart.chartData,
					backgroundColor: chart.backgroundColor,
					borderColor: chart.borderColor,
					borderWidth: 1
				}]
			},
			options: chart.options
		});
	}
}

class ChartStore extends ChartOperation{
	createChart(chartType){
		let chart = null;
		if(chartType == "pie"){
			chart = new PieChart();
		} else if(chartType == "bar"){
			chart = new BarChart();
		} else if(chartType == "line"){
			chart = new LineChart();
		} else if(chartType == "stacked"){
			chart = new StackedChart();
		} else if(chartType == "pivot"){
			chart = new PivotChart();
		}
		return chart;
	}
}

class BaseChartOperation{
	constructor({ name = '', type = '', ctx ='', labels = [], chartData = [], backgroundColor = '', borderColor = '', options = {}}) {
		this.name = name;
		this.type = type;
		this.ctx = ctx;
		this.labels = labels;
		this.chartData = chartData;
		this.backgroundColor = backgroundColor;
		this.borderColor = borderColor;
		this.options = options;
	}
	getbgColor(noOfCols){
		var bgColor = colorCodes;
		var bgColors = [];
		for(var i=0;i<noOfCols;i++){
			var randomIndex = Math.floor((Math.random() * (bgColor.length-1)) + 0);
			bgColors.push(bgColor[randomIndex]);
		}
		return bgColors;
	}
	
	getborderColor(noOfCols){
		var borderColor = colorCodes;
		var borderColors = [];
		for(var i=0;i<noOfCols;i++){
			var randomIndex = Math.floor((Math.random() * (borderColor.length-1)) + 0);
			borderColors.push(borderColor[randomIndex]);
		}
		return borderColors;
	}
}

class ChartConfig extends BaseChartOperation{
	
	setLabelAndData(labels, data){
	  this.labels = labels;
	  this.chartData = data;
	}
	
	setColor(){
	  if(this.chartData){
		  this.backgroundColor = this.getbgColor(this.chartData.length);
		  this.borderColor = this.getborderColor(this.chartData.length);
	  }
	}
	
	randomScalingFactor() {
		return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
	}
}

class PieChart extends ChartConfig{
  constructor() {
    super({
      name: 'Pie Chart',
      type: 'pie',
      ctx: document.getElementById("piechartcanvas"),
      labels: [],
	  chartData: [],
	  backgroundColor: '',
	  borderColor: '',
	  options:{
			title: {
				display: true,
				text: 'Pie Chart',
				position: 'bottom',
				fontSize: 20,
				fontStyle: 'bold'
			}
		}
    });
  }
}

class BarChart extends ChartConfig{
	
  constructor() {
    super({
      name: 'Bar Chart',
      type: 'bar',
      ctx: document.getElementById("barchartcanvas"),
      labels: [],
	  chartData: [],
	  backgroundColor: '',
	  borderColor: '',
	  options:{
			title: {
				display: true,
				text: 'Bar Chart',
				position: 'bottom',
				fontSize: 20,
				fontStyle: 'bold'
			}
		}
    });
  }
	/* plot(labels, chartData){
		var ctx = document.getElementById("barchartcanvas");
		if(ctx){
			ctx.innerHTML = "";
		}
		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					label: '',
					data: chartData,
					backgroundColor:this.getbgColor(chartData.length),
					borderColor: this.getborderColor(chartData.length),
					borderWidth: 1
				}]
			},
			options: {
				title: {
					display: true,
					text: 'Bar Chart',
					position: 'bottom',
					fontSize: 20,
					fontStyle: 'bold'
				},
				scales: {
					xAxes: [{
						ticks: {
							beginAtZero:true
						}
					}],
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
	} */
}

class LineChart extends ChartConfig{

  constructor() {
    super({
      name: 'Line Chart',
      type: 'line',
      ctx: document.getElementById("linechartcanvas"),
      labels: [],
	  chartData: [],
	  backgroundColor: '',
	  borderColor: '',
	  options:{
			title: {
				display: true,
				text: 'Line Chart',
				position: 'bottom',
				fontSize: 20,
				fontStyle: 'bold'
			}
		}
    });
  }	
	/* plot(labels, chartData){
		var ctx = document.getElementById("linechartcanvas");
		if(ctx){
			ctx.innerHTML = "";
		}
		new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [{
					label: '',
					data: chartData,
					backgroundColor: this.getbgColor(chartData.length),
					borderColor: this.getborderColor(chartData.length),
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					xAxes: [{
						ticks: {
							beginAtZero:true
						}
					}],
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
	} */
}

class StackedChart{
	
	plot(labels, data){	
		var barChartData = {
            labels: labels,
            datasets: [{
                label: 'Dataset 1',
                backgroundColor: 'rgb(255, 99, 132)',
                data: data
            }/* , {
                label: 'Dataset 2',
                backgroundColor: 'rgb(255, 205, 86)',
                data: [this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor()]
            }, {
                label: 'Dataset 3',
                backgroundColor: 'rgb(54, 162, 235)',
                data: [this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor()]
            } */
			]

        };	
		var ctx = document.getElementById("stackedchartcanvas").getContext('2d');
		new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    title:{
                        display:true,
                        text:"Stacked Chart"
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    responsive: true,
                    scales: {
                        xAxes: [{
                            stacked: true,
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            });
	}
}

/*class PivotChart extends ChartConfig{
	
	plot(labels, data){
		var ctx = document.getElementById("pivotchart");
		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{s
					label: '# of Votes',
					data: data,
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
						'rgba(255,99,132,1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					xAxes: [{
						ticks: {
							beginAtZero:true
						}
					}],
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
	}
}*/