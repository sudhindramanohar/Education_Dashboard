let DataFrame = dfjs.DataFrame;
let ctx = document.getElementById("myChart");
let c = document.getElementById("newChart");
var dataframeSet = 0;
var objArr = [];
var currentDataSet = "";

function import_data()
{
	schoolProfileInfoObjArr = new Array();
    var vals = document.getElementById("datasets");
    var val = vals.options[vals.selectedIndex].value;
    DataFrame.fromCSV(val).then(df => 
    {
        data = df.toJSON('SAT.json');        
        export_data(data);
    });
}


function export_data(dataset)
{
    var blob= new Blob([data],{ type:"text/ApplicationJson;charset:utf-8" });
        //saveAs(blob,"sat.json");
    
    dataframeSet = dataset;
    createTableFromJSON();
	//createFilterElements();
}
 
function createColumnHeaderForTable(col){
  var columnSet = {};
  var columns = [];
  columnSet.columns = columns;


  for(var i=0; i <col.length; i++)
  {
    var column = {
      "index": col[i],
        "title": col[i]
    }
    columnSet.columns.push(column);
  }

  return columnSet;
}

function createTableFromJSON() {
	var colData = [];
	var div = document.getElementById('table');
	if(div)
	{
		div.innerHTML = "";
	}
	var data = JSON.parse(dataframeSet);
	for (var i = 0; i < data.length; i++) {
		for (var key in data[i]) {
			if (colData.indexOf(key) === -1) {
				colData.push(key);
			}
		}
	}

	var Columns = createColumnHeaderForTable(colData);

	// CREATE DYNAMIC TABLE.
	  new FancyGrid({
	    title: 'Dataset',
	    renderTo: 'table',
	    width: 1300,
	    height: 400,
	    data: data,
	    defaults: {
	      type: 'string',
	      width: 100,
	      sortable: true,
	      filter: {
	        header: true,
	        emptyText: ''
	      }
	    },
	    clicksToEdit: 1,
	    columns: Columns.columns,
	    events: [{
	    	init: function(){
	      	createFilterElements();
			createObjects(colData);
	    	}
 	 	}]
	});
}

/*
 *	Function to create objects for the number of records in the dataset.
 */
function createObjects(colHeaderValues){
	if(currentDataSet == "School_Profile_Info.csv"){
		createSchoolProfileObjects(colHeaderValues);
	} else if(currentDataSet == "SAT_Score.csv"){
		
	} else if(currentDataSet == "Demographics.csv"){
		
	} else if(currentDataSet == "Campus_Arrests.csv"){
		
	} else if(currentDataSet == "School_Progress_Report.csv"){
		
	}
}

/*
 *	Function to create objects for the number of records in the dataset.
 */
function createSchoolProfileObjects(colHeaderValues){
	var json = getParsedJson();
	for(var i = 0 ; i < json.length; i++){
		var record = json[i];
		let schoolProfileInfoObj = new SchoolProfileInfo(record[colHeaderValues[0]],record[colHeaderValues[1]],record[colHeaderValues[2]],record[colHeaderValues[3]],record[colHeaderValues[4]],record[colHeaderValues[5]],record[colHeaderValues[6]],record[colHeaderValues[7]],record[colHeaderValues[8]],record[colHeaderValues[9]],record[colHeaderValues[10]],record[colHeaderValues[11]],record[colHeaderValues[12]]);
		
		objArr.push(schoolProfileInfoObj);
	}
}	

/*
 * Function added to create filter elements
 */	
function createFilterElements() {
	var filter = document.createElement('div');
	filter.id = 'select-column';

	var divContainer = document.getElementById("filter");
    divContainer.innerHTML = "";
    divContainer.appendChild(filter);
	
	createFilter();
}	

/*
 * Function added to create filter functionality
 */
function createFilter() {
	var select_column_div = document.getElementById("select-column");	
	createHeader(select_column_div,"Please Select The Data Labels(Columns)");	
	
	var json = getParsedJson();	
	for(var i = 0 ; i < json.length; i++){
		for (var key in json[i]) {
			createCheckbox(key,"select-column");
		}
		break;
	}	
	createAddFilterButton(select_column_div);
}

/*
 * Function added to create "Add Filter" for filter
 */
function createAddFilterButton(select_column_div) {
	var addFilterButton= document.createElement('input');
	addFilterButton.setAttribute('type','button');
	addFilterButton.setAttribute('name','addFilterButton');
	addFilterButton.setAttribute('value','Add Filter');
	addFilterButton.addEventListener('click',function(event){createRowFilters()});
	select_column_div.appendChild(document.createElement("br"));
	select_column_div.appendChild(addFilterButton);
}

/*
 * Function added to create checkbox for Column selection
 */
function createCheckbox(columnName, parentDivId) {
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = columnName;
	checkbox.value = "0"; 
	checkbox.id = columnName;
	checkbox.style.marginRight = "30px";

	var label = document.createElement('label')
	label.htmlFor = "id";
	label.appendChild(document.createTextNode(columnName));
	
	var divContainer = document.getElementById(parentDivId);
	if(divContainer){
		divContainer.appendChild(label);
		divContainer.appendChild(checkbox);
	}	
}

/*
 * Function added to create header
 */ 
function createHeader(divId,headerLabel) {
	var heading = document.createElement('label');
	heading.style.fontWeight = 'bold';
	heading.innerHTML=headerLabel;
	divId.appendChild(heading);
	divId.appendChild(document.createElement('br'));
}

/*
 * FUnction added to Create Row Filters
 */
function createRowFilters() {
	
	//clear previous checkbox div
	var divContainer = document.getElementById('categorical-filter-checkbox');
	divContainer.innerHTML = "";
	//show filter div
	document.getElementById("filter-row").hidden=false;
	var categorisedColumnsSet = getAllCategorisedColumnSet();
	
	//for each categorical value in set build multiselect dropdown
	for (const value of categorisedColumnsSet) {		
		if(isColumnSelected(value)){
			var selectDiv = document.createElement("div");
			selectDiv.style.marginTop = "14px";
			selectDiv.style.marginRight = "24px";
			
			var select = document.createElement("select");
			select.id = value;
			select.multiple = true; 
			
			var selectLabel = document.createElement('label')
			selectLabel.htmlFor = "id";
			selectLabel.appendChild(document.createTextNode(value));
			
			var categoryValueSet = getAllValuesForCategory(value);
			for (const value of categoryValueSet) {
				var option = document.createElement("option");
				option.value = value;
				option.selected ="";
				option.innerHTML = value;
				select.add(option);
			}
			select.style.width = "180px";
			select.style.overflowX = "auto";
			selectLabel.append(document.createElement("br"));
			selectLabel.append(select);
			selectDiv.appendChild(selectLabel);
			divContainer.append(selectDiv);				
		}
	}
}

/*
 * Function to get All values for particular category
 */
function getAllValuesForCategory(categoryName) {
	let categoryValueSet = new Set();
	var json = getParsedJson();	
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
function getAllCategorisedColumnSet() {
	let categorisedColumnsSet = new Set();
	var json = getParsedJson();
	//let columnNameFilterTypeMap = new Map();
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

/*
 * Function to check if Column is Selected
 */
function isColumnSelected(columnName) {
	var isColumnSelected = false;
	var select_column_div = document.getElementById('select-column');
	for(var i = 0 ; i < select_column_div.children.length; i++ ){
		var childDiv = select_column_div.children[i];
		if(childDiv.type == 'checkbox' && childDiv.id == columnName && childDiv.checked) {
			isColumnSelected = true
			break;
		}
	}
	return isColumnSelected;
}

/*
 * Function to get parsed json value of current dataset
 */ 
function getParsedJson() {
	return JSON.parse(dataframeSet);
}

/*
 * Function to apply chart
 */ 
function applyChart() {
  	 
}
