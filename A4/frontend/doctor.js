// Subham Ghosh, Aritra Mitra, Anubhav Dhar

let patientInfoReceived;
let doctorName;

function getDoctorName(EID){
	// do database query here
	return new Promise((resolve, reject) => {
		if(EID == 0){
			return "-1";
		}
		url = "http://127.0.0.1:9000/doctors/" + EID + "/";
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = () => {
			if (xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				resolve(data.Name);
			} else {
				resolve("[Not Found]");
			}
		};
		xhr.onerror = () => {
			reject(new Error('Request failed'));
		};
		xhr.send();
	});
}

function getAppointmentsList(){
	// do database query to get distinct Patient ID	
	return new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/appointments/";
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = () => {
			if (xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				resolve(data);
			} else {
				resolve("-1");
			}
		};
		xhr.onerror = () => {
			reject(new Error('Request failed'));
		};
		xhr.send();
	});
}

window.onload = async function(){
	var url = document.location.href,
		params = url.split('?')[1].split('&'),
		data = {}, tmp;
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split('=');
		data[tmp[0]] = tmp[1];
	}
	const EID = data.eid;
	doctorName = await getDoctorName(data.eid);
	document.getElementById('doctor-name').innerHTML += " Doctor " + doctorName;

	const patientsTable = document.getElementById('patients-treated-table-interior');
	const appointmentsData = await getAppointmentsList();
	if(appointmentsData == "-1"){
		alert("Error in loading appointments!");
		return;
	}

	for(let i = 0; i < appointmentsData.length; ++i){
		if(EID == appointmentsData[i].EID){
			let buttonColor = "#076307";
			patientsTable.innerHTML += `
				<tr>
					<td valign="center" align="center" style= "font-family: Inter; font-size: 22px">` + appointmentsData[i].PID + `</td>
					<td valign="center" align="center" style= "font-family: Inter; font-size: 22px">` + appointmentsData[i].Patient + `</td>
					<td valign="center" align="center" style= "font-family: Inter; font-size: 22px">` + appointmentsData[i].AID + `</td>
					<td valign="center" align="center" style= "font-family: Inter; font-size: 22px">` + appointmentsData[i].Date + `</td>
				</tr>
			`;
		}
	}
}

function generateNewRID(){
	// do database query to get distinct remedy ID
	return 0;
}

function treatmentForm(){
		return `<hr color = #F94A29>
					<br>
					<div>
					<form style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\" id = \"treatment-form\">
						<p class = \"badge\" for = \"treatment-date\" style = \"margin-left: 8px; background-color: rgba(255, 255, 255, 0.8); margin-top: 8px; color: #db3e04;\">Remedy ID: <span style = \"color:black\">` + generateNewRID() + `</span></p>
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
	alert(doctorName + ' is prescribed ' + treatmentPrescribed + " on " + treatmentDate + ' with status ' + treatmentStatus);
}

function getPatientInfo(PID){
	// do database query here
	return new Promise((resolve, reject) => {
		if(PID == 0){
			return "-1";
		}
		url = "http://127.0.0.1:9000/patients/" + PID + "/";
		let patientName = "-2";
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = () => {
			if (xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				resolve(data);
			} else {
				resolve("-1");
			}
		};
		xhr.onerror = () => {
			reject(new Error('Request failed'));
		};
		xhr.send();
	});
	return false;
}

async function FetchPatient(){
	PID = document.forms['patient-form'].PID.value;
	const patientInfoDiv = document.getElementById('patient-info');
	patientInfoReceived = await getPatientInfo(PID);
	if(patientInfoReceived === "-1"){
		patientInfoDiv.innerHTML = "Patient Not Found!";
		patientInfoDiv.scrollIntoView();
		return;
	}

	patientInfoDiv.innerHTML = 	`
							<ul>
							<li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Patient ID: ` + patientInfoReceived.PID + ` 
							<li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Patient Name: ` + patientInfoReceived.Name + ` 
							<li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Blood Group: ` + patientInfoReceived.Blood_Group + ` 
							<li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Govt. ID (number): ` + patientInfoReceived.Gov_ID + ` 
							<li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Govt. ID (type): ` + patientInfoReceived.Gov_ID_Type + ` 
							<li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Current Health: ` + patientInfoReceived.Current_Health + ` 
							</ul>
						`
	patientInfoDiv.innerHTML += treatmentForm();
	patientInfoDiv.scrollIntoView();
}
