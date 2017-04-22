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

class SchoolProgressReport{
	constructor(schoolCode,schoolName,address,city,stateCode,zipCode,studentGrowthRating, growthReadingGradesTestedPctEs,growthMathGratesTestedPctES, studentAttainmentRating, creativeSchoolCertification, schoolSurveyAmbitiousInstruction, schoolSurveyEffectiveLeaders, schoolSurveyCollaborativeTeachers, schoolSurveySafety, schoolSurveyParentTeacherPartnership, schoolSurveyQualityOfFacilities, studentAttendance, teacherAttendance){
		this.schoolCode = schoolCode;
		this.schoolName = schoolName;
		this.address = address;
		this.city = city;
		this.stateCode = stateCode;
		this.zipCode = zipCode;
		this.studentGrowthRating = studentGrowthRating;
		this.growthReadingGradesTestedPctEs = growthReadingGradesTestedPctEs;
		this.growthMathGratesTestedPctES = growthMathGratesTestedPctES;
		this.studentAttainmentRating = studentAttainmentRating;
		this.creativeSchoolCertification = creativeSchoolCertification;
		this.schoolSurveyAmbitiousInstruction = schoolSurveyAmbitiousInstruction;
		this.schoolSurveyEffectiveLeaders = schoolSurveyEffectiveLeaders;
		this.schoolSurveyCollaborativeTeachers = schoolSurveyCollaborativeTeachers;
		this.schoolSurveySafety = schoolSurveySafety;
		this.schoolSurveyParentTeacherPartnership = schoolSurveyParentTeacherPartnership;
		this.schoolSurveyQualityOfFacilities = schoolSurveyQualityOfFacilities;
		this.studentAttendance = studentAttendance;
		this.teacherAttendance = teacherAttendance;
	}	      
}

class SATScore{
	Constructor(schoolID, schoolName, city,	state,	zip, 	phone, numOfSATTestTakers,	sATCriticalReadingAvgScore, sATMathAvgScore, sATWritingAvgScore, graduationRateSchool, collegeEnrollmentRateSchool)
	{
		this.schoolID = schoolID;
		this.schoolName = schoolName;
		this.city = city;
		this.state = state;
		this.zip = state;
		this.phone = phone;
		this.numOfSATTestTakers = numOfSATTestTakers;
		this.sATCriticalReadingAvgScore = sATCriticalReadingAvgScore;
		this.sATMathAvgScore = sATMathAvgScore;
		this.sATWritingAvgScore = sATWritingAvgScore;
		this.graduationRateSchool = graduationRateSchool;
		this.collegeEnrollmentRateSchool = collegeEnrollmentRateSchool;
	}

}

class CampusArrest{
	constructor(
	schoolCode, schoolName, address, city, stateCode, zipCode, menArrested, womenArrested, total, peopleArrestedUsingWeapons, peopleArrestedUsingDrugs, peopleArrestedUsingLiquor, suspensionsPer100StudentsYear1Pct, suspensionsPer100StudentsYear2Pct, suspensionsPer100StudentsAvgPct, misconductsToSuspensionsYear1Pct, misconductsToSuspensionsYear2Pct, misconductsToSuspensionsAvgPct)
	{
		this.schoolCode = schoolCode;
		this.schoolName = schoolName;
		this.address = address;
		this.city = city;
		this.stateCode = stateCode;
		this.zipCode = zipCode;
		this.menArrested = menArrested;
		this.womenArrested = womenArrested;
		this.total = total;
		this.peopleArrestedUsingWeapons = peopleArrestedUsingWeapons;
		this.peopleArrestedUsingDrugs = peopleArrestedUsingDrugs;
		this.peopleArrestedUsingLiquor = peopleArrestedUsingLiquor;
		this.suspensionsPer100StudentsYear1Pct = suspensionsPer100StudentsYear1Pct;
		this.suspensionsPer100StudentsYear2Pct = suspensionsPer100StudentsYear2Pct;
		this.suspensionsPer100StudentsAvgPct = suspensionsPer100StudentsAvgPct;
		this.misconductsToSuspensionsYear1Pct = misconductsToSuspensionsYear1Pct;
		this.misconductsToSuspensionsYear2Pct = misconductsToSuspensionsYear2Pct;
		this.misconductsToSuspensionsAvgPct = misconductsToSuspensionsAvgPct;
	}
}

class Demographic{
	constructor(schoolCode,schoolName, city, stateCode, zipCode, studentCountBlack, studentCountHispanic,studentCountWhite,studentCountAsian, studentCountNativeAmerican, mentotal, womentotal, total){
		this.schoolCode = schoolCode;
		this.schoolName = schoolName;
		this.city = city;
		this.stateCode = stateCode;
		this.zipCode = zipCode;
		this.studentCountBlack = studentCountBlack;
		this.studentCountHispanic = studentCountHispanic;
		this.studentCountWhite = studentCountWhite;
		this.studentCountAsian = studentCountAsian;
		this.studentCountNativeAmerican = studentCountNativeAmerican;
		this.mentotal = mentotal;
		this.womentotal = womentotal;
		this.total = total;
	}
}