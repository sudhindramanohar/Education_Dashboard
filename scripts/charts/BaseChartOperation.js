class BaseChartOperation{
	constructor(chart, name,type, ctx, labels = [], chartData = [], backgroundColor = '', borderColor = '', options = {}) {
		if(chart != undefined || chart != null){
			this.name = chart.name;
			this.type = chart.type;
			this.ctx = chart.ctx;
			this.labels = chart.labels;
			this.chartData = chart.chartData;
			this.backgroundColor = chart.backgroundColor;
			this.borderColor = chart.borderColor;
			this.options = chart.options;
		}
	}
	
	plot(){
		var ctx = this.ctx;
		if(ctx){
			ctx.innerHTML = "";
		}
		new Chart(ctx, {
			type: this.type,
			data: {
				labels: this.labels,
				datasets: [{
					label: this.labels,
					data: this.chartData,
					backgroundColor: this.backgroundColor,
					borderColor: this.borderColor,
					borderWidth: 1
				}]
			},
			options: this.options
		});
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