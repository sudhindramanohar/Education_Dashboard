class StackedChart{
	
	plot(labels, data){	
		var barChartData = {
            labels: labels,
            datasets: [{
                label: 'Dataset 1',
                backgroundColor: 'rgb(255, 99, 132)',
                data: data
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