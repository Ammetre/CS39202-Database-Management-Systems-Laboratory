// Subham Ghosh, Aritra Mitra, Anubhav Dhar

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

function getPatientInfo(PID) {
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
	document.getElementById('operator-name').innerHTML += " Front-Desk Operator " + loggedInUserName;
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
				let newPID = 1;
				for(let i = 0; i < data.length; ++i){
					if(data[i].PID >= newPID){
						newPID = data[i].PID + 1;
					}
				}
				resolve(newPID);
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

function getAdmissionsList(){
	return new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/admissions/";
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

function isAlreadyAdmitted(pid, admissionsList){
	for(let i = 0; i < admissionsList.length; ++i){
		if(admissions[i].PID == pid && admissions[i].Date_of_discharge == null){
			return true;
		}
	}
	return false;
}

function getIID(admissionsList){
	let IID = 1;
	for(let i = 0; i < admissionsList.length; ++i){
		if(IID <= admissionsList[i].IID){
			IID = admissionsList[i].IID + 1;
		}
	}
	alert("IID got = " + IID);
	return IID;
}

function getRoom(admissionsList){
	let Room = 100;
	for(let i = 0; i < admissionsList.length; ++i){
		if(Room <= admissionsList[i].Room){
			Room = admissionsList[i].Room + 1;
		}
	}
	alert("Room got = " + Room);
	return Room;
}


async function AdmitPatient(){
	const PID = document.forms['admit-form'].PID.value;
	const patientInfo = await getPatientInfo(PID);

	if(patientInfo === "-1"){
		alert('Patient Not Found!');
		return;
	}


	const admissionsList = await getAdmissionsList();
	const alreadyAdmitted = isAlreadyAdmitted(PID, admissionsList);
	if(alreadyAdmitted){
		alert(patientInfo.Name + " is already admitted!!");

	}
	const IID = getIID(admissionsList);
	const Room = getRoom(admissionsList);

	// add database insertion here
	new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/admissions/";
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		const admissionDetails = {
			"IID": IID,
			"Patient": patientInfo.Name,
			"Room_Number": Room,
			"Current_Health": patientInfo.Current_Health,
			"PID": PID
		}

		xhr.ononreadystatechange = function() {
			alert("Status: " + status);
			if (this.readyState === 4 && this.status === 200) {
				var response = JSON.parse(this.responseText);
				alert(response);
				// do something with the response
			}
		};
		xhr.send(JSON.stringify(admissionDetails));
	});
	alert(`PID = ` + PID + `\nName = ` + patientInfo.Name + `\nADMITTED`);
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
