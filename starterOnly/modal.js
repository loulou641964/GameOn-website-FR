// Fonction pour modifier la navigation
function editNav() {
	const x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// Éléments DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelector(".close");
const form = document.forms.reserve;

// Événement de lancement du modal
modalBtn.forEach((btn) => btn.addEventListener("click", () => {
	modalbg.style.display = "block";
}));

// Fonction pour fermer le modal
function closeModal() {
	modalbg.style.display = "none";
	resetForm(form);
}

// Réinitialiser le formulaire lors de la fermeture du modal
function resetForm(form) {
	form.reset();
	document.querySelectorAll('.error').forEach(errorElement => errorElement.remove());
	document.querySelector(".modal-body").style.display = "block";
	document.querySelector(".formConfirmation").style.display = "none";
}

// Événement de fermeture du modal
modalCloseBtn.addEventListener("click", closeModal);

// Empêcher l'envoi du formulaire
form.addEventListener('submit', (e) => {
	e.preventDefault();
});

// Valider le formulaire après soumission
function validate(form) {
	const firstNameValid = checkCondition(form["first"].value) && form["first"].value.length >= 2;
	firstNameValid ? hideErrorMessage('error-firstName', form["first"]) : getErrorMessage('error-firstName', "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", form["first"]);

	const lastNameValid = checkCondition(form["last"].value) && form["last"].value.length >= 2;
	lastNameValid ? hideErrorMessage('error-lastName', form["last"]) : getErrorMessage('error-lastName', "Veuillez entrer 2 caractères ou plus pour le champ du nom.", form["last"]);

	// Validation de l'email
	const emailValid = checkCondition(form["email"].value) && /[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(form["email"].value);
	emailValid ? hideErrorMessage('error-email', form["email"]) : getErrorMessage('error-email', "Veuillez entrer une adresse e-mail valide.", form["email"]);

	// Validation de la date de naissance
	const birthdateValid = checkCondition(form["birthdate"].value) && /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(form["birthdate"].value);
	birthdateValid ? hideErrorMessage('error-birthdate', form["birthdate"]) : getErrorMessage('error-birthdate', "Veuillez entrer une date de naissance valide.", form["birthdate"]);

	// Validation de la quantité de tournois
	const qteTournamentValid = checkCondition(form["quantity"].value) && /^[0-9]+$/.test(form["quantity"].value);
	qteTournamentValid ? hideErrorMessage('error-tournament', form["quantity"]) : getErrorMessage('error-tournament', "Veuillez entrer une valeur numérique pour la quantité de tournois.", form["quantity"]);

	// Validation de la localisation
	const locationValid = checkCondition(form.location.value);
	locationValid ? hideErrorMessage('error-location') : getErrorMessage('error-location', "Veuillez sélectionner une ville.");

	// Validation des conditions générales
	const termsValid = checkCondition(form.terms.checked);
	termsValid ? hideErrorMessage('error-terms') : getErrorMessage('error-terms', "Veuillez indiquer que vous acceptez les conditions générales.");

	// Vérifier si toutes les conditions sont valides pour afficher un message de confirmation
	if (firstNameValid && lastNameValid && emailValid && birthdateValid && qteTournamentValid && locationValid && termsValid) {
		document.querySelector(".modal-body").style.display = "none";
		document.querySelector(".formConfirmation").style.display = "block";
	}
}

// Ajoutez un gestionnaire d'événements au bouton "Fermer"
document.getElementById('btnCloseConfirmation').addEventListener('click', closeModal);

// Simplifie la vérification de la condition
function checkCondition(condition) {
	return !!condition;
}

// Afficher un message d'erreur spécifique
function getErrorMessage(elementId, message, inputAssociate) {
	if (elementId && message) {
		const errorElement = document.getElementById(elementId);
		if (errorElement) {
			errorElement.style.display = "block";
			errorElement.innerText = message;
		}
		if (inputAssociate) inputAssociate.setAttribute("aria-invalid", "true");
	} else {
		throw new Error('Paramètre manquant pour le message d\'erreur du gestionnaire');
	}
}

// Masquer un champ valide précédemment invalide
function hideErrorMessage(elementId, inputAssociate) {
	if (elementId) {
		const errorElement = document.getElementById(elementId);
		if (errorElement) {
			errorElement.style.display = "none";
		}
	}
	if (inputAssociate) inputAssociate.setAttribute("aria-invalid", "false");
}

// Met à jour la classe active du lien cliqué
const navLinks = document.querySelectorAll('.topnav a');
navLinks.forEach(link => {
	link.addEventListener('click', function() {
		navLinks.forEach(link => link.classList.remove('active'));
		this.classList.add('active');
	});
});
