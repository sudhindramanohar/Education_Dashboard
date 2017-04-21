let DataFrame = dfjs.DataFrame;
let ctx = document.getElementById("myChart");
let c = document.getElementById("newChart");
var dataframeSet = 0;
var objArr = [];
var currentDataSet = "";

function import_data(){
	schoolProfileInfoObjArr = new Array();
    var vals = document.getElementById("datasets");
    currentDataSet = vals.options[vals.selectedIndex].value;
    DataFrame.fromCSV(currentDataSet).then(df => 
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
		
		var categoryValueSet = getAllValuesForCategory(value);
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
 * Function to get all column names
 */ 
function getAllColumns() {
	let columnSet = new Set();
	var json = getParsedJson();
	for (var key in json[0]) {
		columnSet.add(key);
	}
	return columnSet;
}

/*
 * Function to get Checked Categorised Column name
 */
function getCheckedCategorisedColumns() {
	let checkedCategorisedColumnSet = new Set();
	var categorisedColumnsSet = getAllCategorisedColumnSet();
	for (const value of categorisedColumnsSet) {		
		if(isColumnSelected(value)){
			checkedCategorisedColumnSet.add(value);
		}
	}	
	return checkedCategorisedColumnSet;
}

/*
 * Function to get All Numerical Columns
 */
function getAllNumericalColumns() {
	var numericalFilterColumnsSet = new Set();
	var allColumns = getAllColumns();
	var categorisedColumnsSet = getAllCategorisedColumnSet();
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
function convertToCamelCase(string,seperator){
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
function getAllFilteredConditions() {
	let filteredItem = [];
	let selectedCatColumnValueMap = new Map();
	let selectedNumColumnValueMap = new Map();
	let numericalCheckBox = new Set();
	
	//logic for categorical filter map
	var filter = document.getElementById('categorical-filter-checkbox');
	for(var i = 0; i < filter.children.length ; i++){
		var childElement = filter.children[i].firstElementChild.childNodes;
		var columnName = convertToCamelCase(childElement[0].data," "); //label field
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
	
	//logic for numerical Values
	var numericalFilters = getAllNumericalColumns();
	for (const value of numericalFilters) {
		if(isColumnSelected(value)){
			numericalCheckBox.add(convertToCamelCase(value," "));
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
 * Function to reset the canvas element.
 */
function cleanUpSpace(){
	var bc = document.getElementById('barchartcanvas');
	var lc = document.getElementById('linechartcanvas');
	var pc = document.getElementById('piechartcanvas');
	var sc = document.getElementById('stackedchartcanvas');
	var pic = document.getElementById('pivotchartcanvas');
	if(bc != undefined){
		bc.remove();
	}
	if(lc != undefined){
		lc.remove();
	}
	if(pc != undefined){
		pc.remove();
	}
	if(sc != undefined){
		sc.remove();
	}
	if(pic != undefined){
		pic.remove();
	}
}
/*
 * Function to create a canvas chart element and append to the parent div.
 */
function createCanvasElement(chartType){
	var canvas = document.createElement('canvas');
	canvas.id=chartType;
	canvas.class="chartCanvas";
	document.getElementById('childChart').appendChild(canvas);
}

/*
 * Function to apply chart
 */ 
function applyChart() {
	cleanUpSpace();
	var filteredConditiontionsMap = getAllFilteredConditions();
	var map = preProcessFilter(filteredConditiontionsMap);
	var chartsSelected = getChartSelections();
	var labels = [];
	var vals = [];
	for (let label of map.keys()){
		labels.push(label);
		vals.push(map.get(label));
	}
	
	for(var i =0;i<chartsSelected.length;i++){
		document.getElementById('parentChart').style.display = "block";
		if(chartsSelected[i] == "Bar Chart"){
			createCanvasElement("barchartcanvas");
			let barChart = new BarChart();
			barChart.plot(labels,vals);
		} else if(chartsSelected[i] == "Line Chart"){
			createCanvasElement("linechartcanvas");
			let lineChart = new LineChart();
			lineChart.plot(labels,vals);			
		} else if(chartsSelected[i] == "Pie Chart"){
			createCanvasElement("piechartcanvas");
			let pieChart = new PieChart();
			pieChart.plot(labels,vals);			
		} else if(chartsSelected[i] == "Stacked Chart"){
			createCanvasElement("stackedchartcanvas");
			var stackedChartCanvasEl = document.getElementById('stackedchartcanvas');
			var brEl = document.createElement('br');
			document.getElementById('childChart').insertBefore(brEl,stackedChartCanvasEl);
			let stackedChart = new StackedChart();
			stackedChart.plot(labels,vals);			
		} else if(chartsSelected[i] == "Pivot Chart"){
			createCanvasElement("pivotchartcanvas");
			let pivotChart = new PivotChart();
			pivotChart.plot(labels,vals);			
		}
	}
}

function getChartSelections(){
	var chartsSelected = [];
	var select_column_div = document.getElementById('select-column');
	var parentEl = document.getElementById('plot-graph').children[0];
	for(var i = 0;i<parentEl.children.length;i++){
		var childEl = parentEl.children[i];
		if(childEl.type == 'checkbox' && childEl.checked){
			chartsSelected.push(childEl.value);
		}
	}
	return chartsSelected;
}

class Filter{
	constructor(){}
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
}

function preProcessFilter(filterCondition)
{
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
		for(let columnVal of categoryValues){
			let count = filterData(columnName, columnVal, isCategorical, isNumerical);
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
	
	if(isNumerical){
		for(let col of colNames)
		{
			let count = filterData(col,columnValue, isCategorical, isNumerical, operand);
			resultDataMap.set(col, count);
		}
	}
	return resultDataMap;
}

function filterData(columnName,columnValue,isCategorical, isNumerical, operand = '=')
{
	let filterdata = new Filter();
	let result = filterdata.filterRow(objArr, columnName, columnValue, operand, isCategorical, isNumerical);
	return result;
}