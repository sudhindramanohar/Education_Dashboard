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
			borderWidth: 10,
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
                    callback: function(value) {
                        if(value.length > 10) {
                            console.log("Entered if");
                            var x = value.substr(0, 15)+"...";
                            return x;
                        }else {
                            console.log("Entered else");
                            return value;
                        }                        
                    },
					fontSize: 15,
					fontStyle: 'bold'
					}
				}],
	            yAxes: [{
	                ticks: {
						fontSize: 17,
						fontStyle:'bold',
	                    min: 0	                   
	                }
	            }]
			}
		}
    });
  }
}
