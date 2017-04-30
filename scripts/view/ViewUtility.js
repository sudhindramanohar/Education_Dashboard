class ViewUtility {
	constructor() {
		
	}
		
	/*
	 * Function to check if Column is Selected
	 */
	isColumnSelected(columnName) {
		let isColumnSelected = false;
		let select_column_div = document.getElementById('select-column');
		for(let i = 0 ; i < select_column_div.children.length; i++ ){
			let childDiv = select_column_div.children[i];
			if(childDiv.type == 'checkbox' && childDiv.id == columnName && childDiv.checked) {
				isColumnSelected = true
				break;
			}
		}
		return isColumnSelected;
	}

	/*
	 * Function to apply chart
	 */
	applyChart() {

		if(this.validateOnApplyStatistics()){
			
			let filterObj = new FilterData();
			let viewObj = new EducationView();
			let cs = new ChartStore();
			viewObj.cleanUpSpace();
			let filteredConditiontionsMap = filterObj.getAllFilteredConditions();
			let chartsSelected = this.getChartSelections();
			// for(let i =0;i<chartsSelected.length;i++){
			// 	if(chartsSelected[i] == "Stacked Chart"){
			// 		isStackedChart = true;
			// 		break;
			// 	}
			// }
			let map = filterObj.preProcessFilter(filteredConditiontionsMap, false);
			let labels = [];
			let vals = [];

			for (let label of map.keys()){
				labels.push(label);
				vals.push(map.get(label));
			}
			
			for(let i =0;i<chartsSelected.length;i++){
				document.getElementById('parentChart').style.display = "block";
				let chart = null;
				let isBackgroundColorRequired = true;
				if(chartsSelected[i] == "Bar Chart"){
					viewObj.createCanvasElement("barchartcanvas");
					let barChartDecorator = new BarChartDecorator();
					chart = cs.orderChart("bar");
					chart.setLabelAndData(labels,vals);
					barChartDecorator.applyBackgroundColor(chart);
					barChartDecorator.applyBorderColor(chart);
				} else if(chartsSelected[i] == "Line Chart"){
					let lineChartDecorator = new LineChartDecorator();
					viewObj.createCanvasElement("linechartcanvas");
					chart = cs.orderChart("line");
					chart.setLabelAndData(labels,vals);
					lineChartDecorator.applyBorderColor(chart);
				} else if(chartsSelected[i] == "Pie Chart"){
					let pieChartDecorator = new PieChartDecorator();
					viewObj.createCanvasElement("piechartcanvas");
					chart = cs.orderChart("pie");
					chart.setLabelAndData(labels,vals); 
					pieChartDecorator.applyBackgroundColor(chart);
					pieChartDecorator.applyBorderColor(chart);
				}else if(chartsSelected[i] == "Doughnut Chart") {
					let doughnutChartDecorator = new DoughnutChartDecorator();
					viewObj.createCanvasElement("doughnutchartcanvas");
					chart = cs.orderChart("doughnut");
					chart.setLabelAndData(labels,vals); 
					doughnutChartDecorator.applyBackgroundColor(chart);
					doughnutChartDecorator.applyBorderColor(chart);					
				} else if(chartsSelected[i] == "Stacked Chart"){
					//let stackedChartDecorator = new StackedChartDecorator();
					viewObj.createCanvasElement("stackedchartcanvas");
					chart = cs.orderChart("stacked");
					let Smap = filterObj.preProcessFilter(filteredConditiontionsMap, true);
					let Slabels = [];
					let Svals = [];

					for (let label of Smap.keys()){
						Slabels.push(label);
						Svals.push(Smap.get(label));
					}
					chart.setLabelAndData(Slabels,Svals);

					//stackedChartDecorator.applyBackgroundColor(chart);
					//stackedChartDecorator.applyBorderColor(chart);		
				} else if(chartsSelected[i] == "Pivot Chart"){
					viewObj.createCanvasElement("pivotchartcanvas");
					let pivotChart = new PivotChart();
					pivotChart.plot(labels,vals);			
				}
				if(chartsSelected[i] != "Stacked Chart"){
					chart.plot();
				} else if(chartsSelected[i] == "Stacked Chart"){
					chart.plotStackedChart();
				}

			}
		} else {
			document.getElementById('invalid-msg').hidden = false;			
			
		}
	}
	
	/*
	 * Chart Selections 
	 */
	getChartSelections(){
		let chartsSelected = [];
		let select_column_div = document.getElementById('select-column');
		let parentEl = document.getElementById('plot-graph').children[0];
		for(let i = 0;i<parentEl.children.length;i++){
			let childEl = parentEl.children[i];
			if(childEl.type == 'checkbox' && childEl.checked){
				chartsSelected.push(childEl.value);
			}
		}
		return chartsSelected;
	}

	/*
	 * Function to validate On Apply Statistics
	 */
	validateOnApplyStatistics(){
		let isValid = true;
		if(document.getElementById("plot-statistics").hidden == false){
			let filterObj = new FilterData();
			if(filterObj.getCheckedCategorisedColumns().size > 0){
				isValid = false;
			}else if(filterObj.getCheckedNumericalColumns().size > 1){
				isValid = false;
			}
		}
		return isValid;
	}	
	
	/*
	 * Function to hide Error Box
	 */
	hideErrorBox(){
		document.getElementById('invalid-msg').hidden = true;
	}
}	

let viewUtilityInstance = new ViewUtility();
