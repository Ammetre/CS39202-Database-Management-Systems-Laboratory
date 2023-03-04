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


function addUser(){
	const EID = document.forms['add-user'].EID.value;
	const name = document.forms['add-user'].name.value;
	const role = document.forms['add-user'].role.value;

	// use database insertion here
	alert("EID : " + EID + "\nName : " + name + "\nRole: " + role);


}
