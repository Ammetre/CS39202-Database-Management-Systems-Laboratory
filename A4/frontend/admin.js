// Subham Ghosh, Aritra Mitra, Anubhav Dhar

let PID = -1;

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
		console.log(tmp[0]);
		console.log(tmp[1]);
	}
		document.getElementById('admin-name').innerHTML += " Database Administrator " + getName(data.eid);
}

function getPatientInfo(){
	// do database query here
	return `<b>Patient Information</b><br>
				<ul style = \"color: #D61355; font-size: 23px; font-family: \'Old Standard TT\';\">
					<li> Patient ID : ` + PID +
				`</ul>`;
}

function geneterateNewRID(){
	// do database query to get distinct remedy ID
	return 0;
}

function treatmentForm(){
		return `<div>
					<form style = \"font-size: 23px; font-family: \'Old Standard TT\'; padding-left: 20px;\" id = \"treatment-form\">
						<br>
						<p style = \"margin-right:5px; margin-top: 8px; color: #D61355;\">Remedy ID: <span style = \"color:black\">` + geneterateNewRID() + `</span></label>
						<br>
						<label for = \"treatment\" style = \"display: block; margin-right:5px; margin-top: 8px; color: #D61355;\">Treatment:</label>
						<textarea rows = "4" cols = "50" type = \"text\" name = \"treatment\" id = \"treatment\" style = \"font-size: 23px; font-family: \'Noto Serif\'; border-radius: 10px; margin-top: 5px\"></textarea>
						<br>
						<label for = \"treatment-date\" style = \"margin-right:5px; margin-top: 8px; color: #D61355;\">Date:</label>
						<input type = \"date\" name = \"treatment-date\" id = \"treatment-date\" style = \"font-size: 23px; font-family: \'Noto Serif\'; border-radius: 10px; margin-top: 5px\">
						<br><br>
					</form>
				</div>
				<br>
				<div style = \"border: 2px solid white; margin: 10px; background: #F94A29; font-family: \'Old Standard TT\'; color: white; font-size:23px; width:250px; padding: 10px; border-radius: 10px;\" align = center onclick=\"issueTreatment()\">Schedule Treamtment</div>
				`;
}

function issueTreatment(){
	const treatmentPrescribed = document.forms['treatment-form'].treatment.value;
	const treatmentDate = document.forms['treatment-form']['treatment-date'].value;
	alert(getName(PID) + ' is prescribed ' + treatmentPrescribed + " on " + treatmentDate);
}

function notFound(PID){
	// do database query here
	return false;
}

function FetchPatient(){
	PID = document.forms['patient-form'].PID.value;
	const patientInfo = document.getElementById('patient-info');
	if(notFound(PID) == true){
		patientInfo.innerHTML = "Patient Not Found!";
		return;
	}
	patientInfo.innerHTML = getPatientInfo(PID) + treatmentForm();
}
