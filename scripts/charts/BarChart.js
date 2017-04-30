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
			},
			scales: {
	            yAxes: [{
	                ticks: {
	                    min: 0	                   
	                }
	            }]
			},
			tooltips: {
					mode: 'label',
		          callbacks: {
			          label: function(tooltipItem, some) { 
			          	return tooltipItem.xLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			          }
		          }
         }
		}
    });
  }
}
