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
	}
	document.getElementById('doctor-name').innerHTML += " Doctor " + getName(data.eid);
}

function getPatientInfo(){
	// do database query here
	return `<b>Patient Information</b><br>
				<ul style = \"color: #db3e04; font-size: 25px; font-family: \'Inter\';\">
					<li> Patient ID : ` + PID +
				`</ul>`;
}

function geneterateNewRID(){
	// do database query to get distinct remedy ID
	return 0;
}

function treatmentForm(){
		return `<hr color = #F94A29>
					<br>
					<div>
					<form style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\" id = \"treatment-form\">
						<p style = \"margin-right:5px; margin-top: 8px; color: #db3e04;\">Remedy ID: <span style = \"color:black\">` + geneterateNewRID() + `</span></label>
						<br><br>
						<table>
						<tr><td><label class = \"badge\" for = \"treatment\" style = \"margin-right:5px; background-color: white; margin-top: 8px; color: #db3e04;\">Treatment:</label></tr></td>
						<tr><td><textarea rows = "4" cols = "30" type = \"text\" name = \"treatment\" id = \"treatment\" style = \"font-size: 25px; font-family: \'Inter\'; border-radius: 10px; margin-top: 5px\"></textarea></tr></td>
						</table>
						<br>
						<table width = 100%>
						<tr>
						<td><label class = \"badge\" for = \"treatment-date\" style = \"margin-right:5px; background-color: white; margin-top: 8px; color: #db3e04;\">Date:</label></td>
						<td><label class = \"badge\" for = \"treatment-status\" style = \"margin-right:5px; background-color: white; margin-top: 8px; color: #db3e04;\">Status:</label></td>
						</tr>
						<tr>
						<td><input type = \"date\" name = \"treatment-date\" id = \"treatment-date\" style = \"font-size: 25px; font-family: \'Inter\'; border-radius: 10px; margin-top: 5px;\"></td>
						<td>
						<select id = \"treatment-status\" name = \"treatment-status\" style = \"font-size: 25px; font-family: \'Inter\'; border-radius: 10px; margin-top: 5px;\">
							<option value="Done">Done</option>
							<option value="Pending">Pending</option>
						</select>
						</td>
						</tr>
						</table>
						<br>
					</form>
				</div>
				<div class = "buttonFF" style = \"margin-left: auto; margin-right: auto; background: #F94A29; font-family: \'Inter\'; color: white; font-size:23px; padding: 10px; width:270px; float: center;\" align = center onclick=\"issueTreatment()\"><span>Schedule Treatment</span></div>
				`;
}

function issueTreatment(){
	const treatmentPrescribed = document.forms['treatment-form'].treatment.value;
	const treatmentDate = document.forms['treatment-form']['treatment-date'].value;
	const treatmentStatus = document.forms['treatment-form']['treatment-status'].value;
	alert(getName(PID) + ' is prescribed ' + treatmentPrescribed + " on " + treatmentDate + ' with status ' + treatmentStatus);
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
	window.scrollTo(0, document.body.scrollHeight);
}
