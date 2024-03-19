function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// Close modal form
function closeModal() {
  modalbg.style.display = 'none';
};
function validate() {
  let isValid = true;

  // Champ Prénom
  
  const firstName = document.getElementById("first");
  const firstNameError = document.getElementById("first-error");
  if (firstName.value.trim().length < 2) {
    firstNameError.textContent = "Veuillez entrer 2 caractères ou plus pour le prénom.";
    isValid = false;
  } else {
    firstNameError.textContent = "";
  }

  // Champ Nom
 
  const lastName = document.getElementById("last");
  const lastNameError = document.getElementById("last-error");
  if (lastName.value.trim().length < 2) {
    lastNameError.textContent = "Veuillez entrer 2 caractères ou plus pour le nom.";
    isValid = false;
  } else {
    lastNameError.textContent = "";
  }

  // Champ Email
  
  const email = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    emailError.textContent = "Veuillez entrer une adresse email valide.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }
  
  //Champ date de naissance
  
  const birthdate = document.getElementById("birthdate");
  const birthdateError = document.getElementById("birthdate-error");
  const birthdateValue = birthdate.value.trim();
if (birthdateValue === "") {
  birthdateError.textContent = "Veuillez entrer votre date de naissance.";
  isValid = false;
} else {
  birthdateError.textContent = "";
}

  // Champ Nombre de tournois
  
  const quantity = document.getElementById("quantity");
  const quantityError = document.getElementById("quantity-error");
  if (isNaN(quantity.value.trim()) || quantity.value.trim() === "") {
    quantityError.textContent = "Veuillez entrer un nombre valide.";
    isValid = false;
  } else {
    quantityError.textContent = "";
  }

  // Bouton Radio
  
  const locationError = document.getElementById("location-error");
  const radioButtons = document.getElementsByName("location");
  let radioButtonChecked = false;
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      radioButtonChecked = true;
      break;
    }
  }
  if (!radioButtonChecked) {
    locationError.textContent = "Veuillez choisir une option.";
    isValid = false;
  } else {
    locationError.textContent = "";
  }

  // Case à cocher
  
  const checkbox1 = document.getElementById("checkbox1");
  const checkboxError = document.getElementById("checkbox-error");
  if (!checkbox1.checked) {
    checkboxError.textContent = "Veuillez accepter les termes et conditions.";
    isValid = false;
  } else {
    checkboxError.textContent = "";
  }

  return isValid;
}


