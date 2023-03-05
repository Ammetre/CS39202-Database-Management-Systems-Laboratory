// Subham Ghosh, Aritra Mitra, Anubhav Dhar

function getName(EID){
	// do database query here
	return "Name(" + EID + ")";
}
function getPatientName(PID){
	//do database query
	if(PID == 0){
		return "-1";
	}
	url = "http://127.0.0.1:9000/patients/" + PID + "/";
	let patientName = "-2";
	fetch(url, {
		method: "GET",
		// headers: {
		// 	"Content-type": "application/json", 
		// 	// "Access-Control-Allow-Origin": "*",
		// },
		mode: "no-cors"
	})	
	.then((response) => {
		response.text();
		console.log(response);
	}).catch((error) => {
		console.log(error);
	});
	// .then((myJson) => {
	// 	myImage.src = URL.createObjectURL(myJson);
	// });

	// .then(response => {
	// 	response.json();
	// 	alert(response.json());
	// });
	// .then((data) => {
	// 	alert(data.status);
	// 	// if(data.status != 200){ // add patient not found logic
	// 	// 	return "-1";
	// 	// }else{
	// 	// 	return data.Name; // add patient name
	// 	// }
	// });

	return patientName;

}

window.onload = function(){
	var url = document.location.href,
		params = url.split('?')[1].split('&'),
		data = {}, tmp;
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split('=');
		data[tmp[0]] = tmp[1];
	}
	document.getElementById('operator-name').innerHTML += " Front-Desk Operator " + getName(data.eid);
}

function scrollToDischarge(){
	document.getElementById('discharge').scrollIntoView();
}

function scrollToAdmit(){
	document.getElementById('admit').scrollIntoView();
}

function scrollToRegister(){
	document.getElementById('reg').scrollIntoView();
}


function generateNewPID(){
	// do database query to get distinct remedy ID
	return 0;
}

function RegisterPatient(){
	const PID = generateNewPID();
	const name = document.forms['reg-form'].name.value;
	const gov_id = document.forms['reg-form'].gov_id.value;
	const gov_id_type = document.forms['reg-form'].gov_id_type.value;
	const blood_group = document.forms['reg-form'].blood_group.value;
	const curr_health = document.forms['reg-form'].curr_health.value;
	// add database insertion here
	alert(`PID = ` + PID + `\nName = ` + name + `\ngov_id = ` + gov_id + `\ngov_id_type = ` + gov_id_type + `\nblood_group = ` + blood_group + `\ncurr_health = ` + curr_health + `\n`);
}

function AdmitPatient(){
	const PID = document.forms['admit-form'].PID.value;
	const patientName = getPatientName(PID);

	if(patientName === "-1"){
		alert('Patient Not Found!');
		return;
	}

	// add database insertion here
	alert(`PID = ` + PID + `\nName = ` + patientName + `\nADMITTED`);
}


function DischargePatient(){
	const PID = document.forms['discharge-form'].PID.value;
	const patientName = getPatientName(PID);

	if(patientName === "-1"){
		alert('Patient Not Found!');
		return;
	}

	// add database insertion here
	alert(`PID = ` + PID + `\nName = ` + patientName + `\nDISCHARGED`);
}
