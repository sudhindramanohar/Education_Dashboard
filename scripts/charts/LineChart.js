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
}