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