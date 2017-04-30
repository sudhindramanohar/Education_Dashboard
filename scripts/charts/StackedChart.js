
class StackedChart extends BarChart{

    constructor() {
    super({
      name: 'Stacked Chart',
      type: 'bar',
      ctx: document.getElementById("stackedchartcanvas").getContext('2d'),
      labels: [],
      chartData: [],
      backgroundColor: '',
      borderColor: '',
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

	/*plot(labels, data){	
        let stackedLabel = [];
        let stackedValue;
        let max = 0;
        let matrixMap = new Map();
        for(let i=0;i<data.length;i++){
            stackedValue = [];
            let keySet = data[i].keys();
            let valSet = data[i].values();
            for(let s of valSet){
                stackedValue.push(s);
            }
            if(stackedValue.length > max){
                max = stackedValue.length;
            }
            matrixMap.set(i,stackedValue)
        }
        let eleMatrix = new Array(max);
        let mapIndex =0;
        for(let i=0; i<eleMatrix.length;i++){
            if(matrixMap.get(i)){
                eleMatrix[i] = new Array(max);
                for(let j=0;j<eleMatrix[i].length;){
                    for(let index=0;index<matrixMap.get(i).length;index++){
                        eleMatrix[i][j] = matrixMap.get(i)[index];
                        j++;
                    }
                }
            }
        }

        let finalMap = new Map();
        for(let i=0;i<eleMatrix.length;i++){
            let stackedValue = [];
            for(let j=0; j<eleMatrix.length;j++){
                if(eleMatrix[j]){
                    stackedValue.push(eleMatrix[j][i]);
                }
            }
            finalMap.set(i,stackedValue);
        }
        let baseChartObj = new BaseChartOperation();
        let datasetArray = [];
        for(let key of finalMap){
            let dataObj = {
                label: 'DataSet1',
                backgroundColor: baseChartObj.getbgColor(1),
                data: key[1]
            }
            datasetArray.push(dataObj);
        }

		var barChartData = {
            labels: labels,
            datasets: datasetArray
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
	}*/
}