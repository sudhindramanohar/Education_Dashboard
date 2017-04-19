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
	
    CreateTableFromJSON();
	CreateFilterElements();
	
	//testing chart for dummy values
	var labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
	var data = [12, 19, 3, 5, 2, 3];
	let pieChart = new PieChart();
	pieChart.plot(labels,data);
	let barChart = new BarChart();
	barChart.plot(labels,data);
	let lineChart = new LineChart();
	lineChart.plot(labels,data);
}
 
function CreateTableFromJSON() {
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
function CreateFilterElements() {
	var filter = document.createElement('div');
	filter.id = 'select-column';

	var divContainer = document.getElementById("filter");
    divContainer.innerHTML = "";
    divContainer.appendChild(filter);
	
	CreateFilter();
}	

/*
 * Function added to create filter functionality
 */
function CreateFilter() {
	var table = document.getElementById("dataset_table");
	if(table) {
		var th = table.getElementsByTagName("th");
		var select_column_div = document.getElementById("select-column");
		CreateHeader(select_column_div,"Please Select The Data Labels(Columns)");	
		
		let view = new ViewableColumnConstant();
		let schoolProfileInfoCols = view.schoolProfileInfo;
		var concatVal = schoolProfileInfoCols.Categorical + "," + schoolProfileInfoCols.Numerical;
		var schoolProfileInfoColsArr = concatVal.split(",");
		
		for(i = 0; i < th.length; i++) {
			var innerText = th[i].innerText.replace(/ /g,"");
			for(var j=0;j<schoolProfileInfoColsArr.length;j++){
				if(innerText.indexOf(schoolProfileInfoColsArr[j]) == 0){
					CreateCheckbox(th[i].innerText,"select-column");
				}
			}	
		}		
		CreateAddFilterButton(select_column_div);
		var categoricalCols = schoolProfileInfoCols.Categorical;
		
	}
}

/*
 * Function added to create "Add Filter" for filter
 */
function CreateAddFilterButton(select_column_div) {
	var addFilterButton= document.createElement('input');
	addFilterButton.setAttribute('type','button');
	addFilterButton.setAttribute('name','addFilterButton');
	addFilterButton.setAttribute('value','Add Filter');
	addFilterButton.addEventListener('click',function(event){CreateRowFilters()});
	select_column_div.appendChild(document.createElement("br"));
	select_column_div.appendChild(addFilterButton);
}

/*
 * Function added to create checkbox for Column selection
 */
function CreateCheckbox(columnName,parentDivId) {
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = columnName;
	checkbox.value = columnName;
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
function CreateHeader(divId,headerLabel) {
	var heading = document.createElement('label');
	heading.style.fontWeight = 'bold';
	heading.innerHTML=headerLabel;
	divId.appendChild(heading);
	divId.appendChild(document.createElement('br'));
}

function CreateRowFilters() {
	//show filter div
	document.getElementById("filter-row").hidden=false;
	
	var categorisedColumnsSet = new Set();
	for(var i = 0; i < schoolProfileInfoObjArr.length; i++){
		var currentObject = schoolProfileInfoObjArr[i];
	
		for (var key in currentObject) {
		  if (currentObject.hasOwnProperty(key)) {
			if(isNaN(currentObject[key])){
				categorisedColumnsSet.add(currentObject[key]);
			}
		  }
		}
	}
	
	//for each categorical value in set build checkbox
	for (const value of categorisedColumnsSet) {
		//CreateCheckbox(value,"categorical-filter");
	}
	
	//build categorical filter div
	var categoricalFilterDiv = document.getElementById('categorical-filter');
		
	
	//build numerical condition div
	var numericalConditionDiv = document.getElementById('numerical-condition');
	
	//build numerical value div
	var numericalValueDiv = document.getElementById('numerical-value');
	document.getElementById('numericalFilter').classList.remove("input");
	
}