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
	document.getElementById('data_entry-name').innerHTML += " Data Entry Operator " + getName(data.eid);
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
	alert(	"Added Following Details:\n\n" +
			"TID (assigned): " + TID + "\n" +
			"Patient PID: " + PID + "\n" +
			"Dcotor EID: " + EID + "\n" +
			"Date: " + date + "\n" +
			"Type of test: " + type + "\n\n" +
			"Report: {\n" + report + "\n}"
			);

}
