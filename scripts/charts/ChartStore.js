class ChartStore{
	constructor(chartFactory){
		this.chartFactory = new ChartFactory();
	}
	
	orderChart(chartType){
		var chart = this.chartFactory.createChart(chartType);
		return chart;
	}
}