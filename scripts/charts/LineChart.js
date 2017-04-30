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
			tooltips: {
				callbacks : {
					label: function(value) {
						return value;
					}
				}
			},
			fill: false,
			title: {
				display: true,
				text: 'Line Chart',
				position: 'bottom',
				fontSize: 20,
				fontStyle: 'bold'
			},
			scales: {
				xAxes: [{
					ticks: {
                    callback: function(value) {
                        if(value.length > 16) {
                            console.log("Entered if");
                            var x = value.substr(0, 16)+"...";
                            return x;
                        }else {
                            console.log("Entered else");
                            return value;
                        }
                        
                    },
					fontSize: 17,
					fontStyle: 'bold'
					}
				}],
				yAxes: [{
					ticks: {
						fontStyle: 'bold',
						fontSize: 17
					}
				}]				
			},
			hover: {
				mode: 'label'
			}
		}
    });
  }
}