// Subham Ghosh, Aritra Mitra, Anubhav Dhar

let patientInfoReceived;
let doctorInfo;

function getDoctorInfo(EID){
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
				resolve(data);
			} else {
				resolve(-1);
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

function getTreatmentsList(){
	// do database query to get distinct Patient ID
	return new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/treatments/";
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

function getTestsList(){
	// do database query to get distinct Patient ID
	return new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/tests/";
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
	doctorInfo = await getDoctorInfo(data.eid);
	let doctorName = "[NOT FOUND]";
	if(doctorInfo != "-1"){
		doctorName = doctorInfo.Name;
	}
	document.getElementById('doctor-name').innerHTML += " Doctor " + doctorName;

	const treatedTable = document.getElementById('patients-treated-table-interior');
	const appointmentsTable = document.getElementById('doctor-appointments-table-interior');
	const treatedData = await getTreatmentsList();
	const appointmentsData = await getAppointmentsList();

	if(appointmentsData == "-1"){
		alert("Error in loading appointments!");
		return;
	}

	for(let i = 0; i < appointmentsData.length; ++i){
		if(EID == appointmentsData[i].EID && appointmentsData[i].Status == "Pending"){
			buttonColor = 'rgba(252, 226, 42, 0.7)';
			inFuture = false;
			if(new Date(appointmentsData[i].Date) > (new Date())){
				buttonColor = 'rgba(126, 113, 21, 0.7)';
				inFuture = true;
			}
			appointmentsTable.innerHTML += `
				<tr>
					<td valign="center" align="center" style= "font-family: Inter; font-size: 22px">` + appointmentsData[i].AID + `</td>
					<td valign="center" align="center" style= "font-family: Inter; font-size: 22px">` + appointmentsData[i].Patient + `</td>
					<td valign="center" align="center" style= "font-family: Inter; font-size: 22px">` + appointmentsData[i].PID + `</td>
					<td valign="center" align="center" style= "font-family: Inter; font-size: 22px">` + appointmentsData[i].Date + `</td>
					<td valign="center" align="center" style= "font-family: Inter; font-size: 22px"> <div class = "buttonFF" style = "background: `+ buttonColor + `; font-family: 'Inter'; color: white; font-size:17px; margin-top: 5px; height: 20px; padding: 10px; width:60px; " onclick="MarkDone(` + appointmentsData[i].AID + `,` + inFuture + `)"><span>&#x2705;</span></div></td>
				</tr>
			`;
		}
	}

	for(let i = 0; i < treatedData.length; ++i){
		if(EID == treatedData[i].EID){
			let buttonColor = "#076307";
			treatedTable.innerHTML += `
				<tr>
					<td valign="center" align="center" style= "font-family: Inter; font-size: 22px">` + treatedData[i].RID + `</td>
					<td valign="center" align="center" style= "font-family: Inter; font-size: 22px">` + treatedData[i].Patient + `</td>
					<td valign="center" align="center" style= "font-family: Inter; font-size: 22px">` + treatedData[i].PID + `</td>
					<td valign="center" align="center" style= "font-family: Inter; font-size: 22px">` + treatedData[i].Date + `</td>
				</tr>
			`;
		}
	}
}

function MarkDone(AID, inFuture){

	if(inFuture){
		alert("Cannot mark something in the future!");
		return;
	}

	new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/appointments/" + AID + "/";
		const xhr = new XMLHttpRequest();
		xhr.open('PUT', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		const appointmentDetials = {
			"AID": AID,
			"Status": "Done"
		}

		xhr.ononreadystatechange = function() {
			alert("Status: " + status);
			if (this.readyState === 4 && this.status === 200) {
				var response = JSON.parse(this.responseText);
				alert(response);
				// do something with the response
			}
		};
		xhr.send(JSON.stringify(appointmentDetials));
	});
	window.location.href = document.location.href;
}

function generateNewRID(){
	return new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/treatments/";
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = () => {
			if (xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				let newRID = 1;
				for(let i = 0; i < data.length; ++i){
					if(data[i].RID >= newRID){
						newRID = data[i].RID + 1;
					}
				}
				resolve(newRID);
			} else {
				resolve(-1);
			}
		};
		xhr.onerror = () => {
			reject(new Error('Request failed'));
		};
		xhr.send();
	});
	return 2;
}

function scrollToPatient(){
	document.getElementById('patient-form').scrollIntoView();
}

function scrollToAppointment(){
	document.getElementById('doctor-appointments-table').scrollIntoView();
}

function treatmentForm(RID){
		return `<hr color = #F94A29>
					<br>
					<div>
					<form style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\" id = \"treatment-form\">
						<p class = \"badge\" for = \"treatment-date\" style = \"margin-left: 8px; background-color: rgba(255, 255, 255, 0.8); margin-top: 8px; color: #db3e04;\">Remedy ID: <span style = \"color:black\">` + RID + `</span></p>
						<table>
						<tr><td><label class = \"badge\" for = \"treatment\" style = \"margin-right:5px; background-color: white; margin-top: 8px; color: #db3e04;\">Treatment:</label></tr></td>
						<tr><td><textarea rows = "4" cols = "30" type = \"text\" name = \"treatment\" id = \"treatment\" style = \"font-size: 25px; font-family: \'Inter\'; border-radius: 10px; margin-top: 5px\"></textarea></tr></td>
						</table>
						<br>`
						// <table width = 100%>
						// <tr>
						// <td><label class = \"badge\" for = \"treatment-date\" style = \"margin-right:5px; background-color: white; margin-top: 8px; color: #db3e04;\">Date:</label></td>
						// <td><label class = \"badge\" for = \"treatment-status\" style = \"margin-right:5px; background-color: white; margin-top: 8px; color: #db3e04;\">Status:</label></td>
						// </tr>
						// <tr>
						// <td><input type = \"date\" name = \"treatment-date\" id = \"treatment-date\" style = \"font-size: 25px; font-family: \'Inter\'; border-radius: 10px; margin-top: 5px;\"></td>
						// <td>
						// <select id = \"treatment-status\" name = \"treatment-status\" style = \"font-size: 25px; font-family: \'Inter\'; border-radius: 10px; margin-top: 5px;\">
						// 	<option value="Done">Done</option>
						// 	<option value="Pending">Pending</option>
						// </select>
						// </td>
						// </tr>
						// </table>
						// <br>
					+ `</form>
				</div>
				<div class = "buttonFF" style = \"margin-left: auto; margin-right: auto; background: #F94A29; font-family: \'Inter\'; color: white; font-size:23px; padding: 10px; width:270px; float: center;\" align = center onclick=\"issueTreatment(` + RID + `)\"><span>Issue Treatment</span></div>
				`;
}

function issueTreatment(RID){
	const treatmentPrescribed = document.forms['treatment-form'].treatment.value;
	new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/treatments/";
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		const treatmentDetails = {
			"PID": PID,
			"RID": RID,
			"EID": doctorInfo.EID,
			"Info": treatmentPrescribed
		}

		xhr.ononreadystatechange = function() {
			alert("Status: " + status);
			if (this.readyState === 4 && this.status === 200) {
				var response = JSON.parse(this.responseText);
				alert(response);
				// do something with the response
			}
		};
		xhr.send(JSON.stringify(treatmentDetails));
	});

	alert(patientInfoReceived.Name + ' is prescribed ' + treatmentPrescribed + ' with RID ' + RID);
	window.location.href = document.location.href;
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
							<br>
							<ul> <li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Treatments:\n<ul>\n`;


	const treatedData = await getTreatmentsList();
	for(let i = 0; i < treatedData.length; ++i){
		if(treatedData[i].PID == PID){
			patientInfoDiv.innerHTML += `
									<li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Treatment ID:` + treatedData[i].RID + `
									<ul>
									<li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Doctor:` + treatedData[i].Doctor + ` (EID = ` + treatedData[i].EID + `)
									<li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Date:` + treatedData[i].Date + `
									<li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Info:\n` + treatedData[i].Info + `
									</ul>
									`
		}
	}
	patientInfoDiv.innerHTML += `</ul></ul><br>
								<ul><li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Tests:\n<ul>\n`;

	const testsData = await getTestsList();
	for(let i = 0; i < testsData.length; ++i){
		if(testsData[i].PID == PID){
			patientInfoDiv.innerHTML += `
									<table>
									<tr><td>
									<li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Test ID: ` + testsData[i].TID + `
									<ul>
									<li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Doctor: ` + testsData[i].Doctor_name + ` (EID = ` + testsData[i].EID + `)
									<li style = \"font-size: 25px; font-family: \'Inter\'; padding-left: 20px;\"> Date: ` + testsData[i].Date + `
									</ul>
									<div onclick=\"window.open(\'http://127.0.0.1:9000/content/` + testsData[i].Report + `/\');\" class = \"buttonFF\" style = \"font-size: 20px; font-family: \'Inter\'; margin-left: 60px; width: 300px\ height: 40px"> <span>See Report: ` + testsData[i].Report + `</span></div>
									</td></tr>
									</table>
									`
		}
	}

	patientInfoDiv.innerHTML += `</ul></ul>`

	RID = await generateNewRID();
	patientInfoDiv.innerHTML += treatmentForm(RID);
	patientInfoDiv.scrollIntoView();
}
