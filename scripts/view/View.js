class EducationView {
	constructor() {
		
	}
	
	/*
	 * Creating Headers for Columns
	*/
	
	createColumnHeaderForTable(col){
	  let columnSet = {};
	  let columns = [];
	  columnSet.columns = columns;


	  for(let i=0; i <col.length; i++)
	  {
		let column = {
		  "index": col[i],
			"title": col[i]
		}
		columnSet.columns.push(column);
	  }

	  return columnSet;
	}
	
	/* 
	 * Table Creation from JSON data
	*/
	createTableFromJSON() {
		let colData = [];
		let div = document.getElementById('table');
		let dataObj = new Dataset();
			
		if(div)
		{
			div.innerHTML = "";
		}
		let data = JSON.parse(dataframeSet);
		for (let i = 0; i < data.length; i++) {
			for (let key in data[i]) {
				if (colData.indexOf(key) === -1) {
					colData.push(key);
				}
			}
		}

		let Columns = this.createColumnHeaderForTable(colData);

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
			  sortable: false,
			  filter: {
				header: true,
				emptyText: ''
			  }
			},
			clicksToEdit: 1,
			columns: Columns.columns,
			events: [{
				init: function(){
				let view = new EducationView();
				view.createFilterElements();
				
				// Dataset.js object created
				
				dataObj.createObjects(colData);
				}
			}]
		});
	}
	
	/*
	 * Function added to create filter elements
	 */	
	createFilterElements() {
	let filter = document.createElement('div');
	filter.id = 'select-column';

	let divContainer = document.getElementById("filter");
    divContainer.innerHTML = "";
    divContainer.appendChild(filter);
	
	this.createFilter();
	}

	
	/*
	 * Function added to create filter functionality
	 */
	createFilter() {
		let select_column_div = document.getElementById("select-column");	
		this.createHeader(select_column_div,"Please Select The Data Labels(Columns)");	
		let br = document.createElement('br');
		let dataObj = new Dataset();
		select_column_div.appendChild(br);
		
		// Dataset.js object created
		
		let json = dataObj.getParsedJson();	
		for(let i = 0 ; i < json.length; i++){
			for (let key in json[i]) {
				this.createCheckbox(key,"select-column");
			}
			break;
		}
		
		// Styles for the filter
		this.createFilterStyles(select_column_div);
		this.createAddFilterButton(select_column_div);
		this.createApplyStatisticsButton(select_column_div);
	}

	/*
	 * Function added to create "Add Filter" for filter
	 */
	createAddFilterButton(select_column_div) {
		let addFilterButton= document.createElement('input');
		addFilterButton.setAttribute('type','button');
		addFilterButton.setAttribute('id', 'addFilter');
		addFilterButton.setAttribute('name','addFilterButton');
		addFilterButton.setAttribute('value','Add Filter');
		addFilterButton.addEventListener('click', function(event){viewInstance.createDivAnimation()});
		addFilterButton.addEventListener('click',function(event){viewInstance.createRowFilters()});
		//select_column_div.appendChild(document.createElement("br"));
		select_column_div.appendChild(addFilterButton);
	}

	/*
	 * Function added to create "Apply Statistics" for filter
	 */
	createApplyStatisticsButton(select_column_div){
		let addFilterButton= document.createElement('input');
		addFilterButton.setAttribute('type','button');
		addFilterButton.setAttribute('id', 'applyStatistics');
		addFilterButton.setAttribute('name','applyStatistics');
		addFilterButton.setAttribute('value','Apply Statistics');
		addFilterButton.addEventListener('click', function(event){viewInstance.createDivAnimation()});
		addFilterButton.addEventListener('click',function(event){viewInstance.applyStatistics()});
		//select_column_div.appendChild(document.createElement("br"));
		select_column_div.appendChild(addFilterButton);
	}
	
	/*
	 * Function to handle on click of "Apply Statistics" button
	 */
	applyStatistics(){
		this.hideOrShowComponents(false);
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
		this.createCheckboxStyles(checkbox);
		
		let label = document.createElement('label')
		label.htmlFor = "id";
		label.appendChild(document.createTextNode(columnName));
		
		let divContainer = document.getElementById(parentDivId);
		if(divContainer){
			divContainer.appendChild(label);
			divContainer.appendChild(checkbox);
		}	
	}

	/*
	 * Function added to create header
	 */
	createHeader(divId,headerLabel) {
		let heading = document.createElement('label');
		heading.style.fontWeight = 'bold';
		heading.innerHTML=headerLabel;
		divId.appendChild(heading);
		divId.appendChild(document.createElement('br'));
	}

	/*
	 * Function added to Create Row Filters
	 */
	createRowFilters() {
		
		//clear previous checkbox div
		let divContainer = document.getElementById('categorical-filter-checkbox');
		divContainer.innerHTML = "";
        this.hideOrShowComponents(true);						
		// Filter.js Object created
		let filterObj = new FilterData();
		
		let checkedCategorisedColumnsSet = filterObj.getCheckedCategorisedColumns();
		
		//for each categorical value in set build multiselect dropdown
		for (const value of checkedCategorisedColumnsSet) {		
			let selectDiv = document.createElement("div");
			selectDiv.style.marginTop = "14px";
			selectDiv.style.marginRight = "24px";
			
			let select = document.createElement("select");
			select.id = value;
			select.multiple = true;
			select.style.width = "180px";
			select.style.overflowX = "auto";		
			
			let selectLabel = document.createElement('label')
			selectLabel.htmlFor = "id";
			selectLabel.appendChild(document.createTextNode(value));
			
			let categoryValueSet = filterObj.getAllValuesForCategory(value);
			for (const value of categoryValueSet) {
				let option = document.createElement("option");
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
	 * Function to hide or show div's based on 'apply filter' and 'apply statistics'
	 */
	 hideOrShowComponents(isFilterButtonClicked){
		if(isFilterButtonClicked){
			this.cleanUpSpace();
			this.uncheckStatsticsCheckbox();
			document.getElementById("filter-row").hidden=false;//show filter div
			document.getElementById("plot-statistics").hidden=true; //hide Statistics section
			document.getElementById("plot-graph").hidden=false; //show Plot CHart section
		}else{
			this.cleanUpSpace();
			this.uncheckNumericalConditionsCheckbox();
			document.getElementById('categorical-filter-checkbox').innerHTML = "";
			document.getElementById('numericalFilter').value = "";
			document.getElementById("filter-row").hidden=true; //first hide existing row filter section
			document.getElementById("plot-statistics").hidden=false; //show Statistics section
			document.getElementById("plot-graph").hidden=false; //show Plot Chart section		
		}
	 }
	
	/*
	 * Function un-check Statstics Checkbox
	 */
	uncheckStatsticsCheckbox(){
		let statisticsDiv = document.getElementById("plot-statistics");
		let formDiv = statisticsDiv.children[1];
		let checkedStatsSet = new Set();	
		for(let i = 0;i < formDiv.children.length; i++){
			let childDiv = formDiv.children[i];
			if(childDiv.nodeName == 'INPUT' && childDiv.checked){
				childDiv.checked = false;
			}
		}	
	}
	
	/*
	 * Function to un-check Numerical Conditions Checkbox
	 */
	uncheckNumericalConditionsCheckbox(){
		let numericalConditionsDiv = document.getElementById("numerical-condition");
		for(let i = 0;i < numericalConditionsDiv.children.length; i++){
			let childDiv = numericalConditionsDiv.children[i];
			if(childDiv.nodeName == 'INPUT' && childDiv.checked){
				childDiv.checked = false;
			}
		}	
	}
	
	/*
	 * Function to reset the canvas element.
	 */
	cleanUpSpace(){
		let bc = document.getElementById('barchartcanvas');
		let lc = document.getElementById('linechartcanvas');
		let pc = document.getElementById('piechartcanvas');
		let sc = document.getElementById('stackedchartcanvas');
		let pic = document.getElementById('pivotchartcanvas');
		let dc = document.getElementById('doughnutchartcanvas');
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
		if(dc != undefined){
			dc.remove();
		}
	}

	/*
	 * Function to create a canvas chart element and append to the parent div.
	 */
	createCanvasElement(chartType){
		let canvas = document.createElement('canvas');
		canvas.id=chartType;
		canvas.class="chartCanvas";
		document.getElementById('childChart').appendChild(canvas);
	}
	
	// Filter Styles
	createFilterStyles(col_div) {
		let br = document.createElement('br');
		col_div.style.fontFamily = "Century Gothic";
		col_div.style.fontWeight = "bold";
		col_div.appendChild(br);
	}
	
	// Div animations
	createDivAnimation() {
		let secondDivId = document.getElementById('filter-row');
		secondDivId.style.fontFamily = "Century Gothic";
		secondDivId.style.fontWeight = "bold";	
	}
	
	// Checkbox Styles
	createCheckboxStyles(chbk) {
		chbk.style.marginRight = "45px";
		chbk.style.marginLeft = "10px";
	} 
}
let viewInstance = new EducationView();