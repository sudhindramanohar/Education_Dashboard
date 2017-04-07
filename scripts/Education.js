let DataFrame = dfjs.DataFrame;
let ctx = document.getElementById("myChart");
let c = document.getElementById("newChart");
var dataframeSet = 0;

function import_data()
{
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
}

let myChart = new Chart(ctx, {
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
	var tr = table.insertRow(-1);                   // TABLE ROW.

	for (var i = 0; i < col.length; i++) {
		var th = document.createElement("th");      // TABLE HEADER.
		th.innerHTML = col[i];
		tr.appendChild(th);
	}

	// ADD JSON DATA TO THE TABLE AS ROWS.
	for (var i = 0; i < data.length; i++) {

		tr = table.insertRow(-1);

		for (var j = 0; j < col.length; j++) {
			var tabCell = tr.insertCell(-1);
			tabCell.innerHTML = data[i][col[j]];
		}
	}

	// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
	var divContainer = document.getElementById("showData");
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
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
		CreateAddFilterHeader(select_column_div);	
		
		for(var i = 0; i < th.length; i++) {
			CreateCheckbox(th[i].innerText);
		}
			
		CreateAddFilterButton(select_column_div);
	}
}

/*
 * Function added to create header for filter
 */ 
function CreateAddFilterHeader(select_column_div) {
	var heading = document.createElement('h3');
	heading.innerHTML="Please Select The Data Labels(Columns)";
	select_column_div.appendChild(heading);
}

/*
 * Function added to create "Add Filter" for filter
 */
function CreateAddFilterButton(select_column_div) {
	var addFilterButton= document.createElement('input');
	addFilterButton.setAttribute('type','button');
	addFilterButton.setAttribute('name','addFilterButton');
	addFilterButton.setAttribute('value','Add Filter');
	//addFilterButton.attachEvent('OnClick',Hi());
	select_column_div.appendChild(document.createElement("br"));
	select_column_div.appendChild(document.createElement("br"));
	select_column_div.appendChild(addFilterButton);
}

/*
 * Function added to create checkbox for Column selection
 */
function CreateCheckbox(columnName) {
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
	
	var divContainer = document.getElementById("select-column");
	if(divContainer){
		divContainer.appendChild(label);
		divContainer.appendChild(checkbox);
	}	
}