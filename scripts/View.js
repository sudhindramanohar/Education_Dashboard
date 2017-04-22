class View {
	constructor() {
		
	}
	
	/*
	 * Function added to create "Add Filter" for filter
	*/
	createAddFilterButton(select_column_div) {
		let rowFilter = new RowFilter();
		let addFilterButton= document.createElement('input');
		addFilterButton.setAttribute('type','button');
		addFilterButton.setAttribute('id', 'addFilter');
		addFilterButton.setAttribute('name','addFilterButton');
		addFilterButton.setAttribute('value','Add Filter');
		addFilterButton.addEventListener('click', function(event){createDivAnimation()});
		addFilterButton.addEventListener('click',function(event){rowFilter.createRowFilters()});
		select_column_div.appendChild(document.createElement("br"));
		select_column_div.appendChild(addFilterButton);
	}
	
	/*
	* Function added to create checkbox for Column selection
	*/
	createCheckbox(columnName, parentDivId) {
		let checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = columnName;
		checkbox.value = "0"; 
		checkbox.id = columnName;
		
		// Styles for Checkbox
		createCheckboxStyles(checkbox);
		
		let label = document.createElement('label')
		label.htmlFor = "id";
		label.appendChild(document.createTextNode(columnName));
		
		let divContainer = document.getElementById(parentDivId);
		if(divContainer){
			divContainer.appendChild(label);
			divContainer.appendChild(checkbox);
		}	
	}
	
	// Checkbox Style

	createCheckboxStyles(chbk) {
		chbk.style.marginRight = "45px";
		chbk.style.marginLeft = "10px";
	}
	
	// Div Style

	createDivAnimation() {
		let secondDivId = document.getElementById('filter-row');
		secondDivId.style.fontFamily = "Century Gothic";
		secondDivId.style.fontWeight = "bold";	
	}
	
	/*
	 * Function to get all column names
	*/ 
	getAllColumns() {
		let columnSet = new Set();
		let json = getParsedJson();
		for (let key in json[0]) {
			columnSet.add(key);
		}
		return columnSet;
	}
	
	preProcessFilter(filterCondition)
	{
		let isCategorical = 0;
		let isNumerical = 0;
		let columnName;
		let categoryValues;
		let columnValue;
		let operand;
		let colNames = [];
		let resultDataMap = new Map();
		
		// Creating object for class RowFilter
		let firstRowFilter = new RowFilter();;
		
		for (let categoryKey of filterCondition[0].keys()){
			isCategorical = 1;
			isNumerical = 0;
			columnName = categoryKey;
			categoryValues = filterCondition[0].get(categoryKey);
			for(let columnVal of categoryValues){
				
				let count = firstRowFilter.filterData(columnName, columnVal, isCategorical, isNumerical);
				resultDataMap.set(columnVal, count);
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
		
		// Re-initialising the object for RowFilter
		firstRowFilter = new RowFilter();
		
		if(isNumerical){
			for(let col of colNames)
			{				
				let count = firstRowFilter.filterData(col,columnValue, isCategorical, isNumerical, operand);
				resultDataMap.set(col, count);
			}
		}
		return resultDataMap;
	}
	
	/*
	 * Function to get All values for particular category
	*/
	getAllValuesForCategory(categoryName) {
		let categoryValueSet = new Set();
		
		// Creating an object for the class Dataset
		let secondDataset = new Dataset();
		
		let json = secondDataset.getParsedJson();	
		for(let i = 0 ; i < json.length; i++){
			for (let key in json[i]) {
				let columnName = key;
				let columnValue = json[i][key];
				if(categoryName == columnName) {
					categoryValueSet.add(columnValue);
				}
			}
		}	
		return categoryValueSet;
	}
}