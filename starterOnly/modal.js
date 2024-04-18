// Fonction pour modifier la navigation en mode responsive
function editNav() {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive"; // Si la classe est "topnav", ajoute la classe "responsive" pour rendre la navigation responsive
    } else {
        x.className = "topnav"; // Sinon, retire la classe "responsive" pour revenir à la navigation normale
    }
}

// Éléments DOM
const modalbg = document.querySelector(".bground"); // Sélectionne l'arrière-plan modal
const modalBtn = document.querySelectorAll(".modal-btn"); // Sélectionne tous les boutons qui ouvrent le modal
const modalCloseBtn = document.querySelector(".close"); // Sélectionne le bouton de fermeture du modal
const form = document.forms.reserve; // Sélectionne le formulaire

// Événement de lancement du modal
modalBtn.forEach((btn) => btn.addEventListener("click", () => {
    modalbg.style.display = "block"; // Affiche le modal lorsqu'un bouton est cliqué
}));

// Fonction pour fermer le modal
function closeModal() {
    modalbg.style.display = "none"; // Masque le modal
    document.querySelector(".modal-body").style.display = "block"; // Affiche le contenu du modal
    document.querySelector(".formConfirmation").style.display = "none"; // Masque le message de confirmation du modal
}

// Réinitialiser le formulaire lors de la fermeture du modal
function resetForm(form) {
    form.reset(); // Réinitialise le formulaire
    document.querySelectorAll('.error').forEach(errorElement => errorElement.remove()); // Supprime tous les messages d'erreur
}

// Événement de fermeture du modal
modalCloseBtn.addEventListener("click", closeModal); // Ajoute un écouteur d'événements pour fermer le modal lorsque le bouton de fermeture est cliqué

// Empêcher l'envoi du formulaire par défaut
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire par défaut
});

// Valider le formulaire après soumission
function validate(form) {
    // Validation du prénom
    const firstNameValid = checkCondition(form["first"].value) && form["first"].value.length >= 2;
    firstNameValid ? hideErrorMessage('error-firstName', form["first"]) : getErrorMessage('error-firstName', "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", form["first"]);

    // Validation du nom
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
        document.querySelector(".modal-body").style.display = "none"; // Masque le contenu du modal
        document.querySelector(".formConfirmation").style.display = "block"; // Affiche le message de confirmation du modal
        resetForm(form); // Réinitialise le formulaire
    }
}

// Ajoute un gestionnaire d'événements au bouton "Fermer" du message de confirmation
document.getElementById('btnCloseConfirmation').addEventListener('click', closeModal);

// Fonction utilitaire pour vérifier la condition
function checkCondition(condition) {
    return !!condition; // Convertit la condition en un booléen
}

// Afficher un message d'erreur spécifique
function getErrorMessage(elementId, message, inputAssociate) {
    if (elementId && message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.style.display = "block"; // Affiche l'élément d'erreur
            errorElement.innerText = message; // Affiche le message d'erreur
        }
        if (inputAssociate) inputAssociate.setAttribute("aria-invalid", "true"); // Ajoute un attribut aria-invalid
    } else {
        throw new Error('Paramètre manquant pour le message d\'erreur du gestionnaire');
    }
}

// Masquer un champ valide précédemment invalide
function hideErrorMessage(elementId, inputAssociate) {
    if (elementId) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.style.display = "none"; // Masque l'élément d'erreur
        }
    }
    if (inputAssociate) inputAssociate.setAttribute("aria-invalid", "false"); // Met à jour l'attribut aria-invalid
}

// Mettre à jour la classe active du lien cliqué dans la navigation
const navLinks = document.querySelectorAll('.topnav a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(link => link.classList.remove('active')); // Retire la classe active de tous les liens
        this.classList.add('active'); // Ajoute la classe active au lien cliqué
    });
});

// Ajoute un gestionnaire d'événements au clic sur l'icône de menu pour modifier la navigation
document.addEventListener("DOMContentLoaded", function() {
    const element = document.querySelector(".icon");
    element.addEventListener("click", editNav);
});

// Ajoute un gestionnaire d'événements de soumission au formulaire pour valider le formulaire
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form[name="reserve"]');
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche la soumission du formulaire par défaut

        const isValid = validate(this); // Appelle la fonction de validation
        if (isValid) {
            this.submit(); // Soumet le formulaire si la validation est réussie
        }
    });
});
