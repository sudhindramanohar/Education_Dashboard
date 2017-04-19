let DataFrame = dfjs.DataFrame;
let ctx = document.getElementById("myChart");
let c = document.getElementById("newChart");
var dataframeSet = 0;
var schoolProfileInfoObjArr;

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
	createFilterElements();
}

/* let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
 */
 
function createTableFromJSON() {
	var col = [];
	var data = JSON.parse(dataframeSet);
	for (var i = 0; i < data.length; i++) {
		for (var key in data[i]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
			}
		}
	}

	// CREATE DYNAMIC TABLE.
	var table = document.createElement("table");
	table.id= "dataset_table";
	table.style.height='400px';
	table.style.overflowY='scroll';
	table.style.display='block';
	
	// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
	var tr = table.insertRow(-1);  	// TABLE ROW.
	
	var emptyTh = document.createElement("th");	//create an empty header for checkbox
	emptyTh.innerHTML = '&nbsp';
	tr.appendChild(emptyTh);
	
	for (var i = 0; i < col.length; i++) {
		var th = document.createElement("th");      // TABLE HEADER.
		th.innerHTML = col[i].replace(/_/g," ");
		tr.appendChild(th);
	}

	// ADD JSON DATA TO THE TABLE AS ROWS.
	for (var i = 0; i < data.length; i++) {
		var objectMap = new Map();
		//var objData = "";
		tr = table.insertRow(-1);
		
		// Create a checkbox for each row
		var cb = document.createElement("INPUT");
		cb.type = "checkbox";
		cb.id = i.toString();
		var checbBoxCell = tr.insertCell(-1);
		checbBoxCell.append(cb);
		tr.appendChild(checbBoxCell);
		
		for (var j = 0; j < col.length; j++) {
			var tabCell = tr.insertCell(-1);
			tabCell.innerHTML = data[i][col[j]];
			objectMap.set(col[j].replace(/_/g,""),data[i][col[j]])
			//objData += "," + data[i][col[j]];
		}
		
		//var objDataArr = objData.substring(1).split(",");
		createSchoolProfileInfoRecord(objectMap);
	}

	// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
	var divContainer = document.getElementById("showData");
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
}

/*
 * Function to create School Profile Info Record for every record in the dataset.
 */
function createSchoolProfileInfoRecord(objectMap) {
	//schoolId,schoolName,city,state,zip,studentCountTotal,dressCode,collegeEnrollmentRateSchool,graduationRateSchool,transportationEl
	let schoolProfileInfoObj = new SchoolProfileInfo(objectMap.get("SchoolID"),objectMap.get("SCHOOL NAME"),objectMap.get("City"),objectMap.get("State"),objectMap.get("Zip"),objectMap.get("StudentCountTotal"),objectMap.get("DressCode"),objectMap.get("CollegeEnrollmentRateSchool"),objectMap.get("GraduationRateSchool"),objectMap.get("TransportationEl"));
	schoolProfileInfoObjArr.push(schoolProfileInfoObj);
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
	var table = getDatasetTableDiv();
	if(table) {
		var th = table.getElementsByTagName("th");
		var select_column_div = document.getElementById("select-column");
		createHeader(select_column_div,"Please Select The Data Labels(Columns)");	
		
		for(i = 1; i < th.length; i++) {
			var innerText = th[i].innerText.replace(/ /g,"");
			createCheckbox(th[i].innerText,"select-column");
		}		
		createAddFilterButton(select_column_div);
	}
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
function createCheckbox(columnName,parentDivId) {
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = columnName;
	checkbox.value = "0"; 
	checkbox.id = columnName;
		
	var label = document.createElement('label')
	label.htmlFor = "id";
	label.appendChild(document.createTextNode(columnName));
	label.style.width = "180px";
	label.style.clear = "right";
	label.style.textAlign = "left";
	label.style.paddingLeft = "10px";
	
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
			var select = document.createElement("select");
			select.id = value;
			select.name=value;
			select.multiple = true;
			select.text = value;
			//createCheckbox(value,"categorical-filter-checkbox");
			var categoryValueSet = getAllValuesForCategory(value);
			for (const value of categoryValueSet) {
				var option = document.createElement("option");
				option.value = value;
				option.selected ="";
				option.innerHTML = value;
				select.add(option);
			}	
		}
		divContainer.append(select);		
	}
	
}

function getAllValuesForCategory(categoryName) {
	let categoryValueSet = new Set();
	var tableDiv = getDatasetTableDiv();
	//let columnNameFilterTypeMap = new Map();
	for(var i =1 ; i < tableDiv.rows.length; i++){
		for(var j=1; j < tableDiv.rows[i].cells.length; j++){
			var columnName = tableDiv.rows[0].cells[j].innerText
			var columnValue = tableDiv.rows[i].cells[j].innerText;
			if(categoryName == columnName) {
				categoryValueSet.add(columnValue);
			}
		}
	}	
	return categoryValueSet;
}

/*
 * FUnction added to get Dataset Table Div
 */ 
function getDatasetTableDiv() {
	return document.getElementById("dataset_table");
}

/*
 * Function to get All Categorised Value based on selection of columns
 */
function getAllCategorisedColumnSet() {
	let categorisedColumnsSet = new Set();
	var tableDiv = getDatasetTableDiv();
	//let columnNameFilterTypeMap = new Map();
	for(var i =1 ; i < tableDiv.rows.length; i++){
		for(var j=1; j < tableDiv.rows[i].cells.length; j++){
			var columnName = tableDiv.rows[0].cells[j].innerText
			var columnValue = tableDiv.rows[i].cells[j].innerText;
			if((columnName != null || columnName != '') && isNaN(columnValue)){
				categorisedColumnsSet.add(columnName);
			} else if(categorisedColumnsSet.length == tableDiv.rows[i].cells.length){
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
