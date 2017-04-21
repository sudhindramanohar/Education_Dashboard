class CChart{
	constructor(){}
	plot(labels, chartData){};
	
	getbgColor(noOfCols){
		var bgColor = ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'];
		var bgColors = [];
		for(var i=0;i<noOfCols;i++){
			var randomIndex = Math.floor((Math.random() * (noOfCols-1)) + 0);
			bgColors.push(bgColor[randomIndex]);
		}
		return bgColors;
	}
	
	getborderColor(noOfCols){
		var borderColor = ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'];
		var borderColors = [];
		for(var i=0;i<noOfCols;i++){
			var randomIndex = Math.floor((Math.random() * (noOfCols-1)) + 0);
			borderColors.push(borderColor[randomIndex]);
		}
		return borderColors;
	}
	
	randomScalingFactor() {
		return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
	}
}

class PieChart extends CChart{
	constructor(){
		super();
	}
	
	plot(labels, chartData){
		var ctx = document.getElementById("piechartcanvas");
		if(ctx){
			ctx.innerHTML = "";
		}
		new Chart(ctx, {
			type: 'pie',
			data: {
				labels: labels,
				datasets: [{
					label: labels,
					data: chartData,
					backgroundColor: this.getbgColor(chartData.length),
					borderColor: this.getborderColor(chartData.length),
					borderWidth: 1
				}]
			}
		});
	}
}

class BarChart extends CChart{
	
	plot(labels, chartData){
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
	}
}

class LineChart extends CChart{
	
	plot(labels, chartData){
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
	}
}

class StackedChart extends CChart{
	
	plot(labels, data){	
		var barChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: 'Dataset 1',
                backgroundColor: ['rgb(255, 99, 132)'],
                data: [this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor()]
            }, {
                label: 'Dataset 2',
                backgroundColor: ['rgb(255, 205, 86)'],
                data: [this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor()]
            }, {
                label: 'Dataset 3',
                backgroundColor: ['rgb(54, 162, 235)'],
                data: [this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor(), 
                    this.randomScalingFactor()]
            }]

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

/*class PivotChart extends CChart{
	
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