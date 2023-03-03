// Subham Ghosh, Aritra Mitra, Anubhav Dhar
const signInForm = document.forms['signin'];	
let incorrectLogin = false;

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

function notFound(int, string){ 
	// enter database check here
	return false;
}

function SignIn(){
	const EID = signInForm.EID.value;
	const password = signInForm.password.value;
	let passwordHash;
	hashPassword(password).then((hex) => {
		passwordHash = hex;

		// after this line EID, password and passwordHash have inputs of the form
		alert("Clicked Next!\nUsername: " + EID + "\nPassword: " + password + "\nHash: " + passwordHash);
		const notFoundVariable = notFound(EID, passwordHash);
		if(notFoundVariable){
			if(!incorrectLogin){
				incorrectLogin = true;
				signInForm.innerHTML += '<p style = "color: red; font-size :15px; font-family : \'Noto Serif\'" align = "center">INCORRECT CREDENTIALS!</p> <br>';
			}
			return;
		}

		// enter handling code
		window.location.href = "https://youtu.be/a3Z7zEc7AXQ";

	});

}