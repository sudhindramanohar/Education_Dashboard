class FilterData{
	constructor(){

	}

	/*
 	* Function to get All values for particular category
 	*/
	getAllValuesForCategory(categoryName) {
		let categoryValueSet = new Set();

		let datasetObj = new Dataset();
		var json = datasetObj.getParsedJson();	
		for(var i = 0 ; i < json.length; i++){
			for (var key in json[i]) {
				var columnName = key;
				var columnValue = json[i][key];
				if(categoryName == columnName) {
					categoryValueSet.add(columnValue);
				}
			}
		}	
		return categoryValueSet;
	}

	/*
	 * Function to get All Categorised Value based on selection of columns
	 */
	getAllCategorisedColumnSet() {
		let categorisedColumnsSet = new Set();

		let datasetObj = new Dataset();
		var json = datasetObj.getParsedJson();
		for(var i = 0 ; i < json.length; i++){
			for (var key in json[i]) {
				var columnName = key;
				var columnValue = json[i][key];
				if((columnName != null && columnName != '') && isNaN(columnValue)){
					categorisedColumnsSet.add(columnName);
				} else if(categorisedColumnsSet.size == json[i].length){
					return categorisedColumnsSet;
				}
			}	
		}		
		return categorisedColumnsSet;
	}

	filterRow(dataSet, columnName, columnValue, operand, isCategorical, isNumerical){
		let result;
		if(isCategorical){
			result = dataSet.filter(fil => fil[columnName] === columnValue );		
		}

		if(isNumerical){
			if(operand == '='){
				result = dataSet.filter(fil => fil[columnName] === Number.parseInt(columnValue) );
			}
			else if(operand == '>='){
				result = dataSet.filter(fil => fil[columnName] >= Number.parseInt(columnValue) );
			}
			else{
				result = dataSet.filter(fil => fil[columnName] <= Number.parseInt(columnValue) );
			}
		}
		return result.length;
	}

	/*
	 * Function to get Checked Categorised Column name
	 */
	getCheckedCategorisedColumns() {
		let checkedCategorisedColumnSet = new Set();

		let viewUtility = new ViewUtility();
		var categorisedColumnsSet = this.getAllCategorisedColumnSet();
		for (const value of categorisedColumnsSet) {		
			if(viewUtility.isColumnSelected(value)){
				checkedCategorisedColumnSet.add(value);
			}
		}	
		return checkedCategorisedColumnSet;
	}
	
	/*
	 * Function to get Checked Numerical Column name
	 */
	getCheckedNumericalColumns() {
		let checkedNumericalColumnSet = new Set();
		let viewUtility = new ViewUtility();
		var numericalColumnsSet = this.getAllNumericalColumns();
		for (const value of numericalColumnsSet) {		
			if(viewUtility.isColumnSelected(value)){
				checkedNumericalColumnSet.add(value);
			}
		}	
		return checkedNumericalColumnSet;
	}

	/*
	 * Function to get All Numerical Columns
	 */
	getAllNumericalColumns() {
		var numericalFilterColumnsSet = new Set();
		let datasetObj = new Dataset();
		var allColumns = datasetObj.getAllColumns();
		var categorisedColumnsSet = this.getAllCategorisedColumnSet();
		for (const value of allColumns) {	
			if(!categorisedColumnsSet.has(value)){
				numericalFilterColumnsSet.add(value);
			}
		}
		return numericalFilterColumnsSet;
	}

	/*
	 * Function to convert string To a Camel Case
	 */
	convertToCamelCase(string,seperator){
	    var out = "";
		if(seperator != null){
	    string.split(seperator).forEach(function (el, idx) {
	        var add = el.toLowerCase();
	        out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
	    });
		}else {
			return string;
		}	
	    return out;
	}

	/*
	 * Function to get all Filtered Conditions
	 */
	getAllFilteredConditions() {
		let filteredItem = [];
		let selectedCatColumnValueMap = new Map();
		let selectedNumColumnValueMap = new Map();
		let selectedStatisticsMap = new Map();
		let numericalCheckBox = new Set();
		
		//logic for categorical filter map
		var filter = document.getElementById('categorical-filter-checkbox');
		for(var i = 0; i < filter.children.length ; i++){
			var childElement = filter.children[i].firstElementChild.childNodes;
			var columnName = this.convertToCamelCase(childElement[0].data," "); //label field
			var multiSelectDropDowns = childElement[2].options; // multi select dropdown field
			let selectedCatValueSet = new Set();
			for(var j = 0 ; j< multiSelectDropDowns.length; j++){
				if(multiSelectDropDowns[j].selected){
					selectedCatValueSet.add(multiSelectDropDowns[j].value);
				}
			}
			if(selectedCatValueSet.size > 0){
				selectedCatColumnValueMap.set(columnName,selectedCatValueSet);
			}	
		}
		filteredItem.push(selectedCatColumnValueMap); //push categorical value map to first element in array
		
		let checkedStatistics = this.getAllCheckedStatistics();
		//logic for numerical Values
		var numericalFilters = this.getAllNumericalColumns();
		let viewUtility = new ViewUtility();
		for (const value of numericalFilters) {
			if(viewUtility.isColumnSelected(value)){
				numericalCheckBox.add(this.convertToCamelCase(value," "));
			}
		}
		if(numericalCheckBox.size > 0){
			selectedNumColumnValueMap.set('selectedNumericalValues',numericalCheckBox);
			if(checkedStatistics.size == 0){
				selectedNumColumnValueMap.set('numericalFilterCondition',document.querySelector('input[name="numericalFilter"]:checked').value);
				selectedNumColumnValueMap.set('numericalFilterValue',document.getElementById('numericalFilter').value);
			}
		}
		filteredItem.push(selectedNumColumnValueMap); //push numerical related values to second element in array;
		
		// statistics related logic
		selectedStatisticsMap.set('statistics',checkedStatistics);
		filteredItem.push(selectedStatisticsMap);
		
		return filteredItem;
	}

	/*
	 * Function to get all checked Statistics 
	 */
	getAllCheckedStatistics(){
		let statisticsDiv = document.getElementById("plot-statistics");
		let formDiv = statisticsDiv.children[1];
		let checkedStatsSet = new Set();	
		for(let i = 0;i < formDiv.children.length; i++){
			let childDiv = formDiv.children[i];
			if(childDiv.nodeName == 'INPUT' && childDiv.checked){
				checkedStatsSet.add(childDiv.name);
			}
		}
		return checkedStatsSet;
	}
	
	
	preProcessFilter(filterCondition,isStackedChart)
	{
		let datasetObj = new Dataset();
		let isCategorical = 0;
		let isNumerical = 0;
		let columnName;
		let categoryValues;
		let columnValue;
		let operand;
		let colNames = [];
		
		
		let resultDataMap = new Map();
		for (let categoryKey of filterCondition[0].keys()){
			isCategorical = 1;
			isNumerical = 0;
			columnName = categoryKey;
			categoryValues = filterCondition[0].get(categoryKey);
			let stackedDataMap = new Map();

			for(let columnVal of categoryValues){

				let count = this.filterDataValues(columnName, columnVal, isCategorical, isNumerical);
				if(isStackedChart)
				{
					stackedDataMap.set(columnVal, count);
				}
				else{
					resultDataMap.set(columnVal, count);				
				}

			}

			if(isStackedChart){
				resultDataMap.set(categoryKey, stackedDataMap);
			}
		}

		for(let numericalKey of filterCondition[1].keys())
		{
			isNumerical = 1;
			isCategorical = 0;		
			if(numericalKey == "selectedNumericalValues"){
				let numericalVals = filterCondition[1].get(numericalKey);
				
				for(let val of numericalVals.keys())
				{
					colNames.push(val);
				}
			}
			else if(numericalKey == "numericalFilterCondition")
			{
				let operandName = filterCondition[1].get(numericalKey);
				if(operandName == "greaterThanEqualTo"){
					operand = ">=";
				}
				else if(operandName == "lessThanEqualTo"){
					operand = "<=";
				}
				else if(operandName == "equalTo"){
					operand = "=";
				}
			}
			else if(numericalKey == "numericalFilterValue"){
				columnValue = filterCondition[1].get(numericalKey);
			}
			
		}
		let statSet = filterCondition[2].get('statistics');
		if(isNumerical){
			for(let col of colNames){
				if(statSet == null || statSet.size == 0){ 
					let count = this.filterDataValues(col,columnValue, isCategorical, isNumerical, operand);
					resultDataMap.set(datasetObj.getLabel(col), count);
				}else{
					col = datasetObj.getLabel(col);
					for (const value of statSet) {	
						if(value == 'min'){
							resultDataMap.set('Min', df.stat.min(col));
						}else if(value == 'max'){
							 resultDataMap.set('Max', df.stat.max(col));
						}else if(value == 'average'){
							resultDataMap.set('Average', df.stat.average(col));
						}else if(value == 'mean'){
							resultDataMap.set('Mean', df.stat.mean(col));
						}else if(value == 'standardDeviation'){
							resultDataMap.set('Standard Deviation', df.stat.sd(col));
						}		 
					}
				}
			}
		}
		
		return resultDataMap;
	}

	filterDataValues(columnName,columnValue,isCategorical, isNumerical, operand = '=')
	{
		let result = this.filterRow(objArr, columnName, columnValue, operand, isCategorical, isNumerical);
		return result;
	}

	
}