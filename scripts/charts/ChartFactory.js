class ChartFactory{
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
		} else if(chartType == "doughnut"){
			chart = new DoughnutChart();
		}
		return chart;
	}
}