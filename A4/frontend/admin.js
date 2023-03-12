// Subham Ghosh, Aritra Mitra, Anubhav Dhar

let EID = -1;

// function getName(EID){
// 	// do database query here
// 	return "Name(" + EID + ")";
// }

function formatRole(string){
	if(string == "doctor"){
		return "Doctor";
	}
	if(string == "admin"){
		return "Database Administrator";
	}
	if(string == "front_desk"){
		return "Front Desk Operator";
	}
	if(string == "data_entry"){
		return "Data Entry Operator";
	}
	return string;
}

function printTable(usersData){
	// console.log(usersData);
	if(usersData == "-1"){
		alert("Error in loading users!");
		return;
	}
	const userTable = document.getElementById('users-table-interior');
	userTable.innerHTML = "";
	for(let i = 0; i < usersData.length; ++i){
		let buttonColor = "#076307";
		if(usersData[i].EID == 1){
			buttonColor = "#033203";
		}
		let printEmail = "<span>&#x1F6AB;</span>";
		if(usersData[i].email != null){
			printEmail = usersData[i].email;
		}
		userTable.innerHTML += `
			<tr id = ` + usersData[i].EID + `>\n` +
				`<td valign=\"center\" align=\"center\" style= \"font-family: Inter; font-size: 22px\">` + usersData[i].EID + `</td>\n` +
				`<td valign=\"center\" align=\"center\" style= \"font-family: Inter; font-size: 22px\">` + usersData[i].name + `</td>\n` +
				`<td valign=\"center\" align=\"center\" style= \"font-family: Inter; font-size: 22px\">` + printEmail + `</td>\n` +
				`<td valign=\"center\" align=\"center\" style= \"font-family: Inter; font-size: 22px\">` + formatRole(usersData[i].role) + `</td>\n` +
				`<td valign=\"center\" align=\"center\" style= \"font-family: Inter; font-size: 22px\">` + `<div class = "buttonFF" style = "background: ` + buttonColor + `; font-family: 'Inter'; color: white; font-size:17px; margin-top: 5px; height: 20px; padding: 10px; width:60px; " onclick="DeleteUser(` + usersData[i].EID + `,` + (usersData[i].role === 'doctor') + `)"><span>&#x1F5D1;</span></div></td>\n` +
			`</tr>`;
	}
}

window.onload = async function(){
	// var url = document.location.href,
	// 	params = url.split('?')[1].split('&'),
	// 	data = {}, tmp;
	// for (var i = 0, l = params.length; i < l; i++) {
	// 	tmp = params[i].split('=');
	// 	data[tmp[0]] = tmp[1];
	// 	console.log(tmp[0]);
	// 	console.log(tmp[1]);
	// }
	document.getElementById('admin-name').innerHTML += " Database Administrator";// + getName(data.eid);

	let usersData = await getUsersList();
	printTable(usersData);

	EID = 1;
	for(let i = 0; i < usersData.length; ++i){
		if(EID <= usersData[i].EID){
			EID = usersData[i].EID + 1;
		}
	}
	document.getElementById('EID').innerHTML = "<b>" + EID + "</b>";

}

function getUsersList(){
	// do database query to get distinct Patient ID
	return new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/users/";
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

async function deleteAppointmentsOfThisDoctor(eid){
	const appointments = await getAppointmentsList();
	for(let i = 0; i < appointments.length; ++i){
		if(appointments[i].EID == eid){
			new Promise((resolve, reject) => {
				url = "http://127.0.0.1:9000/appointments/" + appointments[i].aid +"/";
				const xhr = new XMLHttpRequest();
				xhr.open('DELETE', url);
				xhr.onload = () => {
					resolve(xhr.status);
				};
				xhr.onerror = () => {
					reject(new Error('Request failed'));
				};
				xhr.send();
			});
		}
	}
}

async function deleteTreatmentssOfThisDoctor(eid){
	const treatments = await getTreatmentsList();
	for(let i = 0; i < treatments.length; ++i){
		if(treatments[i].EID == eid){
			new Promise((resolve, reject) => {
				url = "http://127.0.0.1:9000/treatments/" + treatments[i].aid +"/";
				const xhr = new XMLHttpRequest();
				xhr.open('DELETE', url);
				xhr.onload = () => {
					resolve(xhr.status);
				};
				xhr.onerror = () => {
					reject(new Error('Request failed'));
				};
				xhr.send();
			});
		}
	}
}

function DeleteUser(eid, isDoctor){
	// write database deletion
	if(eid == 1){
		alert("Cannot Delete Admin");
		return;
	}
	// alert("Deleting user " + eid + ", " + isDoctor);

	new Promise((resolve, reject) => {
		url = "http://127.0.0.1:9000/users/" + eid +"/";
		const xhr = new XMLHttpRequest();
		xhr.open('DELETE', url);
		xhr.onload = () => {
			resolve(xhr.status);
		};
		xhr.onerror = () => {
			reject(new Error('Request failed'));
		};
		xhr.send();
	});
	if(isDoctor){
		new Promise((resolve, reject) => {
			url = "http://127.0.0.1:9000/doctors/" + eid +"/";
			const xhr = new XMLHttpRequest();
			xhr.open('DELETE', url);
			xhr.onload = () => {
				resolve(xhr.status);
			};
			xhr.onerror = () => {
				reject(new Error('Request failed'));
			};
			xhr.send();
		});
		// deleteAppointmentsOfThisDoctor(eid);
		// deleteTreatmentsOfThisDoctor(eid);
	}
	window.location.href = document.location.href;

}

async function addUser(){
	var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

	if(EID == -1){
		alert("Error!");
		return;
	}
	const name = document.forms['add-user'].name.value;
	const role = document.forms['add-user'].role.value;
	const passwordHash = MD5(document.forms['add-user'].password.value);
	const passwordHash2 = MD5(document.forms['add-user'].password2.value);
	let email = document.forms['add-user'].email.value;
	if(passwordHash != passwordHash2){
		alert("Passwords do not match!");
		return;
	}
	let availability = 0;
	let stringDays = '';
	let spz = '';
	let chamber = -1;
	if(role === 'doctor'){
		for (const item of document.forms['add-user'].availability) {
			availability = availability * 2;
			if(item.checked) {
				availability = availability + 1;
				stringDays += ' ' + item.id.split('-')[1];
			}
		}
		spz = document.forms['add-user'].spz.value;
		chamber = document.forms['add-user'].chamber.value;
	}
	if(email == ""){
		email = null;
	}
	new Promise((resolve, reject) => {
		if(EID == 0){
			return "-1";
		}
		url = "http://127.0.0.1:9000/users/";
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		const userDetails = {
			"EID": EID,
			"Password_hash": passwordHash,
			"name": name,
			"role": role,
			"email": email
		}

		xhr.ononreadystatechange = function() {
			alert("Status: " + status);
			if (this.readyState === 4 && this.status === 200) {
				var response = JSON.parse(this.responseText);
				// alert(response);
				// do something with the response
			}
		};
		xhr.send(JSON.stringify(userDetails));
	});

	if(role === "doctor"){
		new Promise((resolve, reject) => {
			if(EID == 0){
				return "-1";
			}
			url = "http://127.0.0.1:9000/doctors/";
			const xhr = new XMLHttpRequest();
			xhr.open('POST', url, true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			const userDetails = {
				"EID": EID,
				"Name": name,
				"Day_Availability": availability,
				"Chamber_Number": chamber,
				"Specialization": spz
			}

			xhr.ononreadystatechange = function() {
				alert("Status: " + status);
				if (this.readyState === 4 && this.status === 200) {
					var response = JSON.parse(this.responseText);
					// alert(response);
					// do something with the response
				}
			};
			xhr.send(JSON.stringify(userDetails));
		});
	}

	let printEmail = "<span>&#x1F6AB;</span>";
	if(email != null){
		printEmail = email;
	}
	document.getElementById('users-table-interior').innerHTML += `
	<tr id = ` + EID + `>\n` +
		`<td valign=\"center\" align=\"center\" style= \"font-family: Inter; font-size: 22px\">` + EID + `</td>\n` +
		`<td valign=\"center\" align=\"center\" style= \"font-family: Inter; font-size: 22px\">` + name + `</td>\n` +
		`<td valign=\"center\" align=\"center\" style= \"font-family: Inter; font-size: 22px\">` + printEmail + `</td>\n` +
		`<td valign=\"center\" align=\"center\" style= \"font-family: Inter; font-size: 22px\">` + formatRole(role) + `</td>\n` +
		`<td valign=\"center\" align=\"center\" style= \"font-family: Inter; font-size: 22px\">` + `<div class = "buttonFF" style = "background: #076307; font-family: 'Inter'; color: white; font-size:17px; margin-top: 5px; height: 20px; padding: 10px; width:60px; " onclick="DeleteUser(` + EID + `)"><span>&#x1F5D1;</span></div></td>\n` +
	`</tr>`;
	alert("EID : " + EID + "\nName : " + name +  "\nEmail: " + email + "\nRole: " + role + "\nHash: " + passwordHash + "\nAvailable on Days:" + stringDays + ' # ' + availability);


	EID += 1;
	document.getElementById('EID').innerHTML = EID;
	window.location.href = document.location.href;

}
