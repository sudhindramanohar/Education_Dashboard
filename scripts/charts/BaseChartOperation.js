class BaseChartOperation{
	constructor(chart, name,type, ctx, labels = [], chartData = [], backgroundColor = '', borderColor = '', options = {}) {
		if(chart != undefined || chart != null){
			this.name = chart.name;
			this.type = chart.type;
			this.ctx = chart.ctx;
			this.labels = chart.labels;
			this.chartData = chart.chartData;
			this.backgroundColor = chart.backgroundColor;
			this.borderColor = chart.borderColor;
			this.options = chart.options;
		}
	}
	
	plot(){
		var ctx = this.ctx;
		if(ctx){
			ctx.innerHTML = "";
		}
		new Chart(ctx, {
			type: this.type,
			data: {
				labels: this.labels,
				datasets: [{
					label: this.labels,
					data: this.chartData,
					backgroundColor: this.backgroundColor,
					borderColor: this.borderColor,
					borderWidth: 1
				}]
			},
			options: this.options
		});
	}

	plotStackedChart(){
		let labels = this.labels;
        let data = this.chartData;
        let stackedValue;
        let max = 0;
        let matrixMap = new Map();
         //let isNumerical = false;
        let isCategorical = false;
        // let numericalValArray = [];
        let datasetArray = [];
        for(let i=0;i<data.length;i++){
            stackedValue = [];
            if(!isNaN(data[i])){
            // 	let tempArr = [];
            // 	tempArr.push(data[i])
            // 	numericalValArray.push(tempArr);
            //isNumerical = true;
            }else{
            isCategorical = true;
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
    }
    	if(isCategorical){
	        let eleMatrix = new Array(max);
	        let mapIndex =0;
	        for(let i=0; i<eleMatrix.length;i++){
	            if(matrixMap.get(i)){
	                eleMatrix[i] = new Array(labels.length);
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

	        for(let key of finalMap){
	            let dataObj = {
	                label: 'DataSet',
	                backgroundColor: this.getbgColor(10),
	                borderColor: this.getborderColor(10),
	                data: key[1],
	                borderWidth: 1
	            }
	            datasetArray.push(dataObj);
	        }
        }
        /*if(isNumerical){
        for(let i=0;i<numericalValArray.length;i++){
        	let dataObj = {
                label: 'DataSet',
                backgroundColor: this.getbgColor(10),
                borderColor: this.getborderColor(10),
                data: numericalValArray[i],
                borderWidth: 1
            }
            datasetArray.push(dataObj);
        }*/
    //}
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
	}
	
	getbgColor(noOfCols){
		var bgColor = colorCodes;
		var bgColors = [];
		for(var i=0;i<noOfCols;i++){
			var randomIndex = Math.floor((Math.random() * (bgColor.length-1)) + 0);
			bgColors.push(bgColor[randomIndex]);
		}
		return bgColors;
	}
	
	getborderColor(noOfCols){
		var borderColor = colorCodes;
		var borderColors = [];
		for(var i=0;i<noOfCols;i++){
			var randomIndex = Math.floor((Math.random() * (borderColor.length-1)) + 0);
			borderColors.push(borderColor[randomIndex]);
		}
		return borderColors;
	}
}