class SchoolProfileInfo{
	constructor(schoolId,schoolName,city,state,zip,phone,studentCountTotal,studentCountLowIncome,studentCountEnglishLearners,dressCode,collegeEnrollmentRateSchool,graduationRateSchool,overallRating){
		this.schoolId = schoolId;
		this.schoolName = schoolName;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.phone = phone;
		this.studentCountTotal = studentCountTotal;
		this.studentCountLowIncome = studentCountLowIncome;
		this.studentCountEnglishLearners = studentCountEnglishLearners;
		this.dressCode = dressCode;
		this.collegeEnrollmentRateSchool = collegeEnrollmentRateSchool;
		this.graduationRateSchool = graduationRateSchool;
		this.overallRating = overallRating;
	}
}

class CChart{
	constructor(){}
	plot(labels, data){};
}