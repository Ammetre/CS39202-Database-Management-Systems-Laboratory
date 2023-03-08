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

function getPatientInfo(){
	// do database query here
	return `<b>Patient Information</b><br>
				<ul style = \"color: #D61355; font-size: 23px; font-family: \'Inter\';\">
					<li> Patient ID : ` + PID +
				`</ul>`;
}

function generateNewTID(){
	// do database query to get distinct remedy ID
	return 0;
}

function treatmentForm(){
		return `<div>
					<form style = \"font-size: 23px; font-family: \'Inter\'; padding-left: 20px;\" id = \"treatment-form\">
						<br>
						<p style = \"margin-right:5px; margin-top: 8px; color: #D61355;\">Remedy ID: <span style = \"color:black\">` + geneterateNewRID() + `</span></label>
						<br>
						<label for = \"treatment\" style = \"display: block; margin-right:5px; margin-top: 8px; color: #D61355;\">Treatment:</label>
						<textarea rows = "4" cols = "50" type = \"text\" name = \"treatment\" id = \"treatment\" style = \"font-size: 23px; font-family: \'Inter\'; border-radius: 10px; margin-top: 5px\"></textarea>
						<br>
						<label for = \"treatment-date\" style = \"margin-right:5px; margin-top: 8px; color: #D61355;\">Date:</label>
						<input type = \"date\" name = \"treatment-date\" id = \"treatment-date\" style = \"font-size: 23px; font-family: \'Inter\'; border-radius: 10px; margin-top: 5px\">
						<br><br>
					</form>
				</div>
				<br>
				<div style = \"border: 2px solid white; margin: 10px; background: #F94A29; font-family: \'Inter\'; color: white; font-size:23px; width:250px; padding: 10px; border-radius: 10px;\" align = center onclick=\"issueTreatment()\">Schedule Treamtment</div>
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

function addTest(){

	// test :
	// 		pending test rakhar dorkar nei
	//		report file na rekhe text e rakhi na! "COVID: negative", "blood-sugar: 100; blood-pressure: 100; blood-group: 222"
	//		nahole abar file upload er jhamela korte hobe
	//		test e remedy id rekhe labh nei. Kono patient test koreo remedy nite nao chaite pare

	const TID = generateNewTID();
	const EID = document.forms['test-form'].EID.value;
	const PID = document.forms['test-form'].PID.value;
	const date = document.forms['test-form'].date.value;
	const type = document.forms['test-form'].type.value;
	const report = document.forms['test-form'].report.value;

	//add database insertions with checks:
	const failedInsert = (EID == -1);
	if(failedInsert){
		alert("Failed To Insert!");
		return;
	}

	new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/patients/";
		let patientName = "-2";
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		const testDetails = {
			"PID": PID,
			"Name": name,
			"Blood_Group": blood_group,
			"Gov_ID": gov_id,
			"Gov_ID_Type": gov_id_type,
			"Current_Health": curr_health
		}

		xhr.ononreadystatechange = function() {
			alert("Status: " + status);
			if (this.readyState === 4 && this.status === 200) {
				var response = JSON.parse(this.responseText);
				alert(response);
				// do something with the response
			}
		};
		xhr.send(JSON.stringify(patientDetails));
	});

	alert(`Added the following patient: \n\n PID = ` + PID + `\nName = ` + name + `\ngov_id = ` + gov_id + `\ngov_id_type = ` + gov_id_type + `\nblood_group = ` + blood_group + `\ncurr_health = ` + curr_health + `\n`);


	alert(	"Added Following Details:\n\n" +
			"TID (assigned): " + TID + "\n" +
			"Patient PID: " + PID + "\n" +
			"Dcotor EID: " + EID + "\n" +
			"Date: " + date + "\n" +
			"Type of test: " + type + "\n\n" +
			"Report: {\n" + report + "\n}"
			);

}
