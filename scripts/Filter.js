class Filter {
	constructor() {
		
	}
	
	/*
	 * Function added to create filter elements
	*/	
	createFilterElements() {
		let filter = document.createElement('div');
		
		// Creating object for RowFilter
		let secondRowFilter = new RowFilter();
		
		filter.id = 'select-column';

		let divContainer = document.getElementById("filter");
		divContainer.innerHTML = "";
		divContainer.appendChild(filter);
		
		secondRowFilter.createFilter();
	}
	
	/*
	 * Function to get all Filtered Conditions
	*/
	getAllFilteredConditions() {
		let filteredItem = [];
		let selectedCatColumnValueMap = new Map();
		let selectedNumColumnValueMap = new Map();
		let numericalCheckBox = new Set();
		
		//logic for categorical filter map
		let filter = document.getElementById('categorical-filter-checkbox');
		for(let i = 0; i < filter.children.length ; i++){
			let childElement = filter.children[i].firstElementChild.childNodes;
			let columnName = convertToCamelCase(childElement[0].data," "); //label field
			let multiSelectDropDowns = childElement[2].options; // multi select dropdown field
			let selectedCatValueSet = new Set();
			for(let j = 0 ; j< multiSelectDropDowns.length; j++){
				if(multiSelectDropDowns[j].selected){
					selectedCatValueSet.add(multiSelectDropDowns[j].value);
				}
			}
			if(selectedCatValueSet.size > 0){
				selectedCatColumnValueMap.set(columnName,selectedCatValueSet);
			}	
		}
		filteredItem.push(selectedCatColumnValueMap); //push categorical value map to first element in array
		
		//logic for numerical Values
		let numericalFilters = getAllNumericalColumns();
		
		// Creating an object for Class Filter
		let secondFilter = new Filter();
		
		for (const value of numericalFilters) {
			if(isColumnSelected(value)){
				numericalCheckBox.add(secondFilter.convertToCamelCase(value," "));
			}
		}
		if(numericalCheckBox.size > 0){
			selectedNumColumnValueMap.set('selectedNumericalValues',numericalCheckBox);
			selectedNumColumnValueMap.set('numericalFilterCondition',document.querySelector('input[name="numericalFilter"]:checked').value);
			selectedNumColumnValueMap.set('numericalFilterValue',document.getElementById('numericalFilter').value);
		}
		filteredItem.push(selectedNumColumnValueMap); //push numerical related values to second element in array;
		return filteredItem;
	}
	
	/*
	 * Function to get All Categorised Value based on selection of columns
	*/
	getAllCategorisedColumnSet() {
		let categorisedColumnsSet = new Set();
		
		// Creating object for class Dataset
		let firstDataset = new Dataset();
		
		let json = firstDataset.getParsedJson();
		for(let i = 0 ; i < json.length; i++){
			for (let key in json[i]) {
				let columnName = key;
				let columnValue = json[i][key];
				if((columnName != null && columnName != '') && isNaN(columnValue)){
					categorisedColumnsSet.add(columnName);
				} else if(categorisedColumnsSet.size == json[i].length){
					return categorisedColumnsSet;
				}
			}	
		}		
		return categorisedColumnsSet;
	}
	
}