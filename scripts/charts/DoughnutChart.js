class DoughnutChart extends ChartConfig{
  constructor() {
    super({
      name: 'Doughnut Chart',
      type: 'doughnut',
      ctx: document.getElementById("doughnutchartcanvas"),
      labels: [],
	  chartData: [],
	  backgroundColor: '',
	  borderColor: '',
	  options:{
			title: {
				display: true,
				text: 'Doughnut Chart',
				position: 'bottom',
				fontSize: 20,
				fontStyle: 'bold'
			}
		}
    });
  }
}