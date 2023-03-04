// Subham Ghosh, Aritra Mitra, Anubhav Dhar

function getName(EID){
	// do database query here
	return "Name(" + EID + ")";
}

window.onload = function(){
	var url = document.location.href,
		params = url.split('?')[1].split('&'),
		data = {}, tmp;
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split('=');
		data[tmp[0]] = tmp[1];
	}
	document.getElementById('doctor-name').innerHTML += " " + getName(data.eid);
}

function getPatientInfo(PID){
	// do database query here
	return "<b>Patient Information</b><br> <ul style = \"color: #D61355; font-size: 23px; font-family: \'Old Standard TT\';\"> <li> Patient ID : " + PID + "</ul>";
}

function FetchPatient(){
	const PID = document.forms['patient-form'].PID.value;
	const patientInfo = document.getElementById('patient-info');
	patientInfo.innerHTML = getPatientInfo(PID);
}