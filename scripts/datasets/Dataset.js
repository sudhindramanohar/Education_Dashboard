class Dataset{
	constructor(){
		this.dataFrame = dfjs.DataFrame;
	}
	
	getDataFrame(){
		return this.dataFrame;
	}
	
	import_data(){
		var vals = document.getElementById("datasets");
		currentDataSet = vals.options[vals.selectedIndex].value;
		this.dataFrame.fromCSV(currentDataSet).then(data => {df=data});

		this.dataFrame.fromCSV(currentDataSet).then(dataframe => 
		{
		var data = dataframe.toJSON('SAT.json');        
		this.export_data(data);
		});
	}


	export_data(dataset){
		var blob= new Blob([dataset],{ type:"text/ApplicationJson;charset:utf-8" });
			//saveAs(blob,"sat.json");
		
		dataframeSet = dataset;
		let view = new EducationView();
		view.createTableFromJSON();
	}
	
	createObjects(colHeaderValues){
		if(currentDataSet == "School_Profile_Info.csv"){
			this.createSchoolProfileObjects(colHeaderValues);
		} else if(currentDataSet == "SAT_Score.csv"){
			this.createSatScoreObjects(colHeaderValues);
		} else if(currentDataSet == "Demographics.csv"){
			this.createDemographicObjects(colHeaderValues);
		} else if(currentDataSet == "Campus_Arrests.csv"){
			this.createCampusArrestObjects(colHeaderValues);
		} else if(currentDataSet == "School_Progress_Report.csv"){
			this.createSchoolProgressReportObjects(colHeaderValues);
		}
	}
	
	createSchoolProfileObjects(colHeaderValues){
		var json = this.getParsedJson();
		for(var i = 0 ; i < json.length; i++){
			var record = json[i];
			let schoolProfileInfoObj = new SchoolProfileInfo(record[colHeaderValues[0]],record[colHeaderValues[1]],record[colHeaderValues[2]],record[colHeaderValues[3]],record[colHeaderValues[4]],record[colHeaderValues[5]],record[colHeaderValues[6]],record[colHeaderValues[7]],record[colHeaderValues[8]],record[colHeaderValues[9]],record[colHeaderValues[10]],record[colHeaderValues[11]],record[colHeaderValues[12]]);
			
			objArr.push(schoolProfileInfoObj);
		}
	}
	
	createSchoolProgressReportObjects(colHeaderValues){
		var json = this.getParsedJson();
		for(var i = 0 ; i < json.length; i++){
			var record = json[i];
			let schoolProgressReportObj = new SchoolProgressReport(record[colHeaderValues[0]],record[colHeaderValues[1]],record[colHeaderValues[2]],record[colHeaderValues[3]],record[colHeaderValues[4]],record[colHeaderValues[5]],record[colHeaderValues[6]],record[colHeaderValues[7]],record[colHeaderValues[8]],record[colHeaderValues[9]],record[colHeaderValues[10]],record[colHeaderValues[11]],record[colHeaderValues[12]], record[colHeaderValues[13]], record[colHeaderValues[14]], record[colHeaderValues[15]], record[colHeaderValues[16]], record[colHeaderValues[17]], record[colHeaderValues[18]]);
			
			objArr.push(schoolProgressReportObj);
		}
	}
	
	createDemographicObjects(colHeaderValues){
		var json = this.getParsedJson();
		for(var i = 0 ; i < json.length; i++){
			var record = json[i];
			let demographicObj = new Demographic(record[colHeaderValues[0]],record[colHeaderValues[1]],record[colHeaderValues[2]],record[colHeaderValues[3]],record[colHeaderValues[4]],record[colHeaderValues[5]],record[colHeaderValues[6]],record[colHeaderValues[7]],record[colHeaderValues[8]],record[colHeaderValues[9]],record[colHeaderValues[10]],record[colHeaderValues[11]],record[colHeaderValues[12]]);
			
			objArr.push(demographicObj);
		}
	}
	
	createCampusArrestObjects(colHeaderValues){
		var json = this.getParsedJson();
		for(var i = 0 ; i < json.length; i++){
			var record = json[i];
			let campusArrestObj = new CampusArrest(record[colHeaderValues[0]],record[colHeaderValues[1]],record[colHeaderValues[2]],record[colHeaderValues[3]],record[colHeaderValues[4]],record[colHeaderValues[5]],record[colHeaderValues[6]],record[colHeaderValues[7]],record[colHeaderValues[8]],record[colHeaderValues[9]],record[colHeaderValues[10]],record[colHeaderValues[11]],record[colHeaderValues[12]], record[colHeaderValues[13]], record[colHeaderValues[14]], record[colHeaderValues[15]], record[colHeaderValues[16]], record[colHeaderValues[17]]);
			
			objArr.push(campusArrestObj);
		}
	}
	
	createSatScoreObjects(colHeaderValues){
		var json = this.getParsedJson();
		for(var i = 0 ; i < json.length; i++){
			var record = json[i];
			let satScoreObj = new SATScore(record[colHeaderValues[0]],record[colHeaderValues[1]],record[colHeaderValues[2]],record[colHeaderValues[3]],record[colHeaderValues[4]],record[colHeaderValues[5]],record[colHeaderValues[6]],record[colHeaderValues[7]],record[colHeaderValues[8]],record[colHeaderValues[9]],record[colHeaderValues[10]],record[colHeaderValues[11]]);
			
			objArr.push(satScoreObj);
		}
	}

	/*
	 * Function to get parsed json value of current dataset
	 */ 
	 getParsedJson() {
		return JSON.parse(dataframeSet);
	}

	/*
	 * Function to get all column names
	 */ 
	 getAllColumns() {
		let columnSet = new Set();
		var json = this.getParsedJson();
		for (var key in json[0]) {
			columnSet.add(key);
		}
		return columnSet;
	}
	
	/*
	 * Function added to get Label based on parameterName
     */	
	getLabel(parameterName){
		let allColumnsSet = this.getAllColumns();
		let filterObj = new FilterData();
		for (const key of allColumnsSet) {
			if(parameterName == filterObj.convertToCamelCase(key," ")){
				return key;
			}
		}
		return parameterName;
	}
}

let datasetInstance = new Dataset();