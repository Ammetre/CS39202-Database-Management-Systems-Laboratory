// Subham Ghosh, Aritra Mitra, Anubhav Dhar

function getName(EID){
	// do database query here
	return "Name(" + EID + ")";
}

function getPatientName(PID) {
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
        resolve(data.Name);
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
	// do database query to get distinct Patient ID	
	return new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/patients/";
		let patientName = "-2";
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = () => {
			if (xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				resolve(data.length + 1);
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

async function RegisterPatient(){
	const PID = await generateNewPID();
	if(PID == -1){
		alert("error in some part");
		return;
	}
	const name = document.forms['reg-form'].name.value;
	const gov_id = document.forms['reg-form'].gov_id.value;
	const gov_id_type = document.forms['reg-form'].gov_id_type.value;
	const blood_group = document.forms['reg-form'].blood_group.value;
	const curr_health = document.forms['reg-form'].curr_health.value;
	// add database insertion here

	new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/patients/";
		let patientName = "-2";
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		const patientDetails = {
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
}

async function AdmitPatient(){
	const PID = document.forms['admit-form'].PID.value;
	const patientName = await getPatientName(PID);

	if(patientName === "-1"){
		alert('Patient Not Found!');
		return;
	}

	// add database insertion here
	alert(`PID = ` + PID + `\nName = ` + patientName + `\nADMITTED`);
}


async function DischargePatient(){
	const PID = document.forms['discharge-form'].PID.value;
	const patientName = await getPatientName(PID);

	if(patientName === "-1"){
		alert('Patient Not Found!');
		return;
	}

	// add database insertion here
	alert(`PID = ` + PID + `\nName = ` + patientName + `\nDISCHARGED`);
}
