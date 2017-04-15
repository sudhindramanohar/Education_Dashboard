class ViewableColumnConstant {
	constructor(){
		this.schoolProfileInfo = {"Categorical":"DressCode,TransportationEl",
								   "Numerical":"CollegeEnrollmentRateSchool,GraduationRateSchool,StudentCountTotal"};
	}
}

class SchoolProfileInfo{
	constructor(schoolId,schoolName,city,state,zip,studentCountTotal,dressCode,collegeEnrollmentRateSchool,graduationRateSchool,transportationEl){
		this.schoolId = schoolId;
		this.schoolName = schoolName;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.studentCountTotal = studentCountTotal;
		this.dressCode = dressCode;
		this.collegeEnrollmentRateSchool = collegeEnrollmentRateSchool;
		this.graduationRateSchool = graduationRateSchool;
		this.transportationEl = transportationEl;
	}
}