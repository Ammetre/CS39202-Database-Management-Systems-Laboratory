// Subham Ghosh, Aritra Mitra, Anubhav Dhar

function hashPassword(string) {
	const utf8 = new TextEncoder().encode(string);
	return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray
			.map((bytes) => bytes.toString(16).padStart(2, '0'))
			.join('');
		return hashHex;
	});
}

function notFound(eid, pass){
	// enter database check here
	if(eid === ''){
		return true;
	}
	return false;
}

function getUserType(eid){
	// query database to get entity
	entities = ['doctor', 'admin', 'data_entry', 'front_desk'];
	return entities[eid%4];
}

function SignIn(){
	const signInForm = document.forms['signin'];
	let incorrectLogin = false;
	const EID = signInForm.EID.value;
	const password = signInForm.password.value;
	hashPassword(password).then((hex) => {
		const passwordHash = hex;

		// after this line EID, password and passwordHash have inputs of the form
		alert("Clicked Next!\nUsername: " + EID + "\nPassword: " + password + "\nHash: " + passwordHash);
		const notFoundVariable = notFound(EID, passwordHash);
		if(notFoundVariable){
			if(!incorrectLogin){
				incorrectLogin = true;
				signInForm.innerHTML += '<p style = "color: red; font-size :15px; font-family : \'Inter\'" align = "center">INCORRECT CREDENTIALS!</p> <br>';
			}
			return;
		}

		// enter handling code
		const userType = getUserType(EID);
		window.location.href = userType + ".html?eid=" + EID;
		return;
		// window.location.href = "https://youtu.be/a3Z7zEc7AXQ";

	});

}
