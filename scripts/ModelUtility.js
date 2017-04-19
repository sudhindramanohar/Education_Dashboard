class ViewableColumnConstant {
	constructor(){
		this.schoolProfileInfo = {"Categorical":"DressCode,TransportationEl",
								   "Numerical":"CollegeEnrollmentRateSchool,GraduationRateSchool,StudentCountTotal"};
	}
}

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

class PieChart extends CChart{
	constructor(){
		super();
	}
	
	plot(labels, data){
		var ctx = document.getElementById("piechart");
		new Chart(ctx, {
			type: 'pie',
			data: {
				labels: labels,
				datasets: [{
					label: '# of Votes',
					data: data,
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
	}
}

class BarChart{
	
	plot(labels, data){
		var ctx = document.getElementById("barchart");
		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					label: '# of Votes',
					data: data,
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
	}
}

class LineChart{
	
	plot(labels, data){
		var ctx = document.getElementById("linechart");
		new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [{
					label: '# of Votes',
					data: data,
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
	}
}