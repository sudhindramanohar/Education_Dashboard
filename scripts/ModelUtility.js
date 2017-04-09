class ViewableColumnConstant {
	constructor(){
		this.schoolProfileInfo = {"Categorical":"Dress_Code,Transportation_El",
								   "Numerical":"College_Enrollment_Rate_School,Graduation_Rate_School,Student_Count_Total"};
	}
}

class SchoolProfileInfo{
	constructor(schoolId,schoolName,city,state,zip,phone){
		this.schoolId = schoolId;
		this.schoolName = schoolName;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.phone = phone;
	}
}