// Subham Ghosh, Aritra Mitra, Anubhav Dhar

let PID = -1;

function getName(EID){
	return new Promise((resolve, reject) => {
		if(EID == 0){
			return "-1";
		}
		url = "http://127.0.0.1:9000/users/" + EID + "/";
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = () => {
			if (xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				resolve(data.name);
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

function getEmail(EID){
	return new Promise((resolve, reject) => {
		if(EID == 0){
			return "-1";
		}
		url = "http://127.0.0.1:9000/users/" + EID + "/";
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = () => {
			if (xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				resolve(data.email);
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

window.onload = async function(){
	var url = document.location.href,
		params = url.split('?')[1].split('&'),
		data = {}, tmp;
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split('=');
		data[tmp[0]] = tmp[1];
	}
	const loggedInUserName = await getName(data.eid);
	document.getElementById('data_entry-name').innerHTML += " Data Entry Operator " + loggedInUserName;
}

// function getPatientInfo(){
// 	// do database query here
// 	return `<b>Patient Information</b><br>
// 				<ul style = \"color: #D61355; font-size: 23px; font-family: \'Inter\';\">
// 					<li> Patient ID : ` + PID +
// 				`</ul>`;
// }

function generateNewTID(){
	return new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/tests/";
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = () => {
			if (xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				let newTID = 1;
				for(let i = 0; i < data.length; ++i){
					if(data[i].TID >= newTID){
						newTID = data[i].TID + 1;
					}
				}
				resolve(newTID);
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

// function treatmentForm(){
// 		return `<div>
// 					<form style = \"font-size: 23px; font-family: \'Inter\'; padding-left: 20px;\" id = \"treatment-form\">
// 						<br>
// 						<p style = \"margin-right:5px; margin-top: 8px; color: #D61355;\">Remedy ID: <span style = \"color:black\">` + geneterateNewRID() + `</span></label>
// 						<br>
// 						<label for = \"treatment\" style = \"display: block; margin-right:5px; margin-top: 8px; color: #D61355;\">Treatment:</label>
// 						<textarea rows = "4" cols = "50" type = \"text\" name = \"treatment\" id = \"treatment\" style = \"font-size: 23px; font-family: \'Inter\'; border-radius: 10px; margin-top: 5px\"></textarea>
// 						<br>
// 						<label for = \"treatment-date\" style = \"margin-right:5px; margin-top: 8px; color: #D61355;\">Date:</label>
// 						<input type = \"date\" name = \"treatment-date\" id = \"treatment-date\" style = \"font-size: 23px; font-family: \'Inter\'; border-radius: 10px; margin-top: 5px\">
// 						<br><br>
// 					</form>
// 				</div>
// 				<br>
// 				<div style = \"border: 2px solid white; margin: 10px; background: #F94A29; font-family: \'Inter\'; color: white; font-size:23px; width:250px; padding: 10px; border-radius: 10px;\" align = center onclick=\"issueTreatment()\">Schedule Treamtment</div>
// 				`;
// }

function issueTreatment(){
	const treatmentPrescribed = document.forms['treatment-form'].treatment.value;
	const treatmentDate = document.forms['treatment-form']['treatment-date'].value;
	alert(getName(PID) + ' is prescribed ' + treatmentPrescribed + " on " + treatmentDate);
}

function notFound(PID){
	// do database query here
	return false;
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

function getdoctorInfo(PID){
	// do database query here
	return new Promise((resolve, reject) => {
		if(PID == 0){
			return "-1";
		}
		url = "http://127.0.0.1:9000/doctors/" + PID + "/";
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

let insTID = -1;
let insReport = '';
let sent = 0;

async function addTest(){

	// test :
	// 		pending test rakhar dorkar nei
	//		report file na rekhe text e rakhi na! "COVID: negative", "blood-sugar: 100; blood-pressure: 100; blood-group: 222"
	//		nahole abar file upload er jhamela korte hobe
	//		test e remedy id rekhe labh nei. Kono patient test koreo remedy nite nao chaite pare

	const EID = document.forms['test-form'].EID.value;
	const PID = document.forms['test-form'].PID.value;
	// const date = document.forms['test-form'].date.value;
	const type = document.forms['test-form'].type.value;
	const report_file = document.forms['test-form'].report.files[0];
	const buffer = await report_file.arrayBuffer();
	const report_data = new Uint8Array(buffer);

	const patientInfo = await getPatientInfo(PID);
	if(patientInfo == "-1"){
		alert("Patient Does not exist!");
		return;
	}

	const doctorInfo = await getdoctorInfo(EID);
	if(doctorInfo == "-1"){
		alert("Doctor Does not exist!");
		return;
	}

	const TID = await generateNewTID(PID);
	const report = TID + '.' + report_file.name.split('.')[1]

	new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/tests/";
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		const testDetails = {
			"TID": TID,
			"PID": PID,
			"EID": EID,
			"Test_Type": type,
			"Patient_name": patientInfo.Name,
			"Doctor_name": doctorInfo.Name,
			"Report": report,
			"Report_File": report_data
		}
		// var testDetails = new FormData();
		// testDetails.append('TID', TID);
		// testDetails.append('PID', PID);
		// testDetails.append('EID', EID);
		// testDetails.append('Test_Type', type);
		// testDetails.append('Patient_name', patientInfo.Name);
		// testDetails.append('Doctor_name', doctorInfo.Name);
		// testDetails.append('Report', report);
	  // testDetails.append('Report_File', report_file);

		xhr.ononreadystatechange = function() {
			alert("Status: " + status);
			if (this.readyState === 4 && this.status === 200) {
				var response = JSON.parse(this.responseText);
				alert(response);
				// do something with the response
			}
		};
		xhr.send(JSON.stringify(testDetails));
	});



	alert(	"Added Following Details:\n\n" +
			"TID (assigned): " + TID + "\n" +
			"Patient PID: " + PID + "\n" +
			"Dcotor EID: " + EID + "\n" +
			"Type of test: " + type + "\n\n" +
			"Report: {\n" + report + "\n}"
			);
	insTID = TID;
	insReport = report;
	sent = 0;

}

async function sendEmail(){

	if(insTID == -1) {
		alert("First Add the Test Information!");
		return;
	}

	if(sent == 1) {
		alert("Already sent!");
		return;
	}

	const EID = document.forms['test-form'].EID.value;
	const PID = document.forms['test-form'].PID.value;
	// const date = document.forms['test-form'].date.value;
	const type = document.forms['test-form'].type.value;
    const report = '-- Attached --';
	const doctorEmail = await getEmail(EID);

	const patientInfo = await getPatientInfo(PID);
	if(patientInfo == "-1"){
		alert("Patient Does not exist!");
		return;
	}
	const patName = patientInfo.Name;
	const subject_to_send = 'Test [' + insTID + '] of Patient [' + PID + '] ' + patName;
	const message_to_send_html = "<strong>Type: </strong>" + type + "<br>" +
							                 "<strong>Report</strong><br>" + report + "<br>";
	const message_to_send_text = "# Type: " + type + "\n" +
													     "# Report\n" + report + "\n";

	const msg = {
  	to: doctorEmail,
  	subject: subject_to_send,
  	text: message_to_send_text,
  	html: message_to_send_html,
  	attach: insReport,
	}


	new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/email/";
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.ononreadystatechange = function() {
			alert("Status: " + status);
			if (this.readyState === 4 && this.status === 200) {
				var response = JSON.parse(this.responseText);
				alert(response);
				// do something with the response
			}
		};
		xhr.send(JSON.stringify(msg));
	});
	sent = 1;
	alert('Sent Email Successfully!');

}
