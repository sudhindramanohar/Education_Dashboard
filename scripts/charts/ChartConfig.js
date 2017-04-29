class ChartConfig extends BaseChartOperation{
	/*constructor({ name = '', type = '', ctx ='', labels = [], chartData = [], backgroundColor = '', borderColor = '', options = {}}) {
		super(name,type,ctx,labels,chartData,backgroundColor,borderColor, options);
	}
*/
	setLabelAndData(labels, data){
	  this.labels = labels;
	  this.chartData = data;
	}
	
	setColor(bgcolor){
	  if(this.chartData){
	  	if(bgcolor){
		  	this.backgroundColor = this.getbgColor(this.chartData.length);
		}
		  this.borderColor = this.getborderColor(this.chartData.length);
	  }
	}
}