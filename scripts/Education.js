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
		th.innerHTML = col[i];
		tr.appendChild(th);
	}

	// ADD JSON DATA TO THE TABLE AS ROWS.
	for (var i = 0; i < data.length; i++) {
		var objData = "";
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
			objData += "," + data[i][col[j]];
		}
		
		var objDataArr = objData.substring(1).split(",");
		createSchoolProfileInfoRecord(objDataArr);
	}

	// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
	var divContainer = document.getElementById("showData");
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
}

/*
 * Function to create School Profile Info Record for every record in the dataset.
 */
function createSchoolProfileInfoRecord(objDataArr) {
	let schoolProfileInfoObj = new SchoolProfileInfo(objDataArr[0],objDataArr[1],objDataArr[2],objDataArr[3],objDataArr[4],objDataArr[5]);
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
		
		let view = new ViewableColumnConstant();
		let schoolProfileInfoCols = view.schoolProfileInfo;
		var concatVal = schoolProfileInfoCols.Categorical + "," + schoolProfileInfoCols.Numerical;
		var schoolProfileInfoColsArr = concatVal.split(",");
		
		for(i = 0; i < th.length; i++) {
			var innerText = th[i].innerText;
			for(var j=0;j<schoolProfileInfoColsArr.length;j++){
				if(innerText.indexOf(schoolProfileInfoColsArr[j]) == 0){
					createCheckbox(th[i].innerText,"select-column");
				}
			}	
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
	//show filter div
	document.getElementById("filter-row").hidden=false;
	
	var selectedRecords = getSelectedRecords();
	var categorisedColumnsSet = getAllCategorisedValue();
	
	//for each categorical value in set build checkbox
	for (const value of categorisedColumnsSet) {
		createCheckbox(value,"categorical-filter");
	}
	
	//build categorical filter div
	var categoricalFilterDiv = document.getElementById('categorical-filter');
		
	
	//build numerical condition div
	var numericalConditionDiv = document.getElementById('numerical-condition');
	
	//build numerical value div
	var numericalValueDiv = document.getElementById('numerical-value');
	document.getElementById('numericalFilter').classList.remove("input");
	
}

/*
 * FUnction added to get selected records
 */ 
function getSelectedRecords(){
	var selectedRecordsSet = new Set();
	var table = getDatasetTableDiv();
	for(var i =1 ; i < table.rows.length; i++){
		var currentCell = table.rows[i].cells[0].firstElementChild;
		if(currentCell.checked){
			selectedRecordsSet.add(schoolProfileInfoObjArr[i-1]); // since i start from 1, decrement array indexi.e., i by 1
		}
	}
	return selectedRecordsSet;
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
function getAllCategorisedValue() {
	var categorisedColumnsSet = new Set();
	
	for(var i = 0; i < schoolProfileInfoObjArr.length; i++){
		var currentObject = schoolProfileInfoObjArr[i];
		
		for (var key in currentObject) {
			if (isColumnSelected(key) && currentObject.hasOwnProperty(key) && isNaN(currentObject[key])) {
				categorisedColumnsSet.add(currentObject[key]);
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
		if(childDiv.nodeName == 'checkbox' && childDiv.id == columnName) {
			isColumnSelected = true
			break;
		}
	}
	return isColumnSelected;
}
