class RowFilter {
	constructor() {
		
	}
	
	/*
	 * Function added to create filter functionality
	*/
	createFilter() {
		let select_column_div = document.getElementById("select-column");	
		createHeader(select_column_div,"Please Select The Data Labels(Columns)");	
		let br = document.createElement('br');
		select_column_div.appendChild(br);
		
		// Creating object for class Dataset
		let fourthDataset = new Dataset();
		
		let json = fourthDataset.getParsedJson();

		// Creating object for class View
		let firstView = new View();
		
		for(let i = 0 ; i < json.length; i++){
			for (let key in json[i]) {
				firstView.createCheckbox(key,"select-column");
			}
			break;
		}
		
		// Styles for the filter
		createFilterStyles(select_column_div);
		
		// Reusing View Object
		firstView = new View();
		firstView.createAddFilterButton(select_column_div);
	}
	
	// Div animations

	createDivAnimation() {
		let secondDivId = document.getElementById('filter-row');
		secondDivId.style.fontFamily = "Century Gothic";
		secondDivId.style.fontWeight = "bold";	
	}
	
	function filterData(columnName,columnValue,isCategorical, isNumerical, operand = '=')
	{
		// Creating object for the class Filter
		let filterdata = new Filter();
		
		let result = filterdata.filterRow(objArr, columnName, columnValue, operand, isCategorical, isNumerical);
		return result;
	}
	
	/*
	 * FUnction added to Create Row Filters
	*/
	createRowFilters() {
		
		//clear previous checkbox div
		var divContainer = document.getElementById('categorical-filter-checkbox');
		divContainer.innerHTML = "";
		//show filter div
		document.getElementById("filter-row").hidden=false;
		var checkedCategorisedColumnsSet = getCheckedCategorisedColumns();
		
		//for each categorical value in set build multiselect dropdown
		for (const value of checkedCategorisedColumnsSet) {		
			var selectDiv = document.createElement("div");
			selectDiv.style.marginTop = "14px";
			selectDiv.style.marginRight = "24px";
			
			var select = document.createElement("select");
			select.id = value;
			select.multiple = true;
			select.style.width = "180px";
			select.style.overflowX = "auto";		
			
			var selectLabel = document.createElement('label')
			selectLabel.htmlFor = "id";
			selectLabel.appendChild(document.createTextNode(value));
			
			// Creating object for the class Filter
			let sevethFilter = new Filter();
			
			var categoryValueSet = sevethFilter.getAllValuesForCategory(value);
			for (const value of categoryValueSet) {
				var option = document.createElement("option");
				option.value = value;
				option.selected ="";
				option.innerHTML = value;
				select.add(option);
			}
			selectLabel.append(document.createElement("br"));
			selectLabel.append(select);
			selectDiv.appendChild(selectLabel);
			divContainer.append(selectDiv);				
		}
	}
}