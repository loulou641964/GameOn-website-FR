// Fonction pour modifier la navigation
function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}
// Éléments DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".close");
const form = document.getElementsByName('reserve');
// Événement de lancement du modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Fonction pour lancer le modal
function launchModal() {
	modalbg.style.display = "block";
}
// Fonction pour fermer le modal
function closeModal() {
	modalbg.style.display = "none";
	// Réinitialiser le formulaire lors de la fermeture du modal
	resetForm(form[0]);
}
// Réinitialiser le formulaire lors de la fermeture du modal
function resetForm(form) {
	form.reset(); // Réinitialiser le formulaire aux valeurs par défaut
	// Réinitialiser les messages d'erreur
	document.querySelectorAll('.error').forEach(errorElement => errorElement.remove());
	// Afficher à nouveau le formulaire principal et cacher le message de confirmation
	document.querySelector(".modal-body").style.display = "block";
	document.querySelector(".formConfirmation").style.display = "none";
}
// Événement de fermeture du modal
modalCloseBtn[0].addEventListener("click", closeModal);
// Empêcher l'envoi du formulaire
form[0].addEventListener('submit', (e) => {
	e.preventDefault();
});
// Vérification de la condition fournie
function checkCondition(condition) {
	if (!condition) return false;
	else return true;
}
// Afficher un message d'erreur spécifique plutôt que l'identifiant d'élément fourni
// Ajouter aria invalid pour utiliser CSS
function getErrorMessage(elementId, message, inputAssociate) {
	if (elementId && message) {
		document.getElementById(elementId).style.display = "block";
		document.getElementById(elementId).innerText = message;
		if (inputAssociate) inputAssociate.setAttribute("aria-invalid", "true");
	} else throw new Error('Paramètre manquant pour le message d\'erreur du gestionnaire');
}
// Masquer un champ valide précédemment invalide
// Changer aria invalid en faux pour utiliser CSS
function hideErrorMessage(elementId, inputAssociate) {
	if (elementId) document.getElementById(elementId).style.display = "none";
	if (inputAssociate) inputAssociate.setAttribute("aria-invalid", "false");
}
// Valider le formulaire après soumission
function validate(form) {
	let firstNameValid = checkCondition(form["first"].value) && checkCondition(form["first"].value.length >= 2);
	firstNameValid ? hideErrorMessage('error-firstName', form["first"]) : getErrorMessage('error-firstName', "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", form["first"]);
	let lastNameValid = checkCondition(form["last"].value) && checkCondition(form["last"].value.length >= 2);
	lastNameValid ? hideErrorMessage('error-lastName', form["last"]) : getErrorMessage('error-lastName', "Veuillez entrer 2 caractères ou plus pour le champ du nom.", form["last"]);
	// Validation de l'email
	let emailValid = checkCondition(form["email"].value) && checkCondition(/[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(form["email"].value));
	emailValid ? hideErrorMessage('error-email', form["email"]) : getErrorMessage('error-email', "Veuillez entrer une adresse e-mail valide.", form["email"]);
	// Validation de la date de naissance
	let birthdateValid = checkCondition(form["birthdate"].value) && checkCondition(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(form["birthdate"].value));
	birthdateValid ? hideErrorMessage('error-birthdate', form["birthdate"]) : getErrorMessage('error-birthdate', "Veuillez entrer une date de naissance valide au format jour-mois-année.", form["birthdate"]);
	// Validation de la quantité de tournois
	let qteTournamentValid = checkCondition(form["quantity"].value) && checkCondition(/^[0-9]+$/.test(form["quantity"].value));
	qteTournamentValid ? hideErrorMessage('error-tournament', form["quantity"]) : getErrorMessage('error-tournament', "Veuillez entrer une valeur numérique pour la quantité de tournois.", form["quantity"]);
	// Validation de la localisation
	let locationValid = checkCondition(form.location.value);
	locationValid ? hideErrorMessage('error-location') : getErrorMessage('error-location', "Veuillez sélectionner une ville.");
	// Validation des conditions générales
	let termsValid = checkCondition(form.terms.checked);
	termsValid ? hideErrorMessage('error-terms') : getErrorMessage('error-terms', "Veuillez indiquer que vous acceptez les conditions générales.");
	// Vérifier si toutes les conditions sont valides pour afficher un message de confirmation
	if (firstNameValid && lastNameValid && emailValid && birthdateValid && qteTournamentValid && locationValid && termsValid) {
		document.querySelector(".modal-body").style.display = "none";
		document.querySelector(".formConfirmation").style.display = "block";
	}
}
// Ajoutez un gestionnaire d'événements au bouton "Fermer"
document.getElementById('btnCloseConfirmation').addEventListener('click', function() {
	closeModal(); // Appel de la fonction pour fermer le modal
});