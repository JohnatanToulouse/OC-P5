// récupération de l'url
let urlLocation = window.location.href;

// récupération de l'orderId envoyé précédément 
let orderIdUrl = new URL(location.href).searchParams.get("orderId");

// récupération html de la balise .confirmation span
let confirmationHtml = document.querySelector('.confirmation span');

// intégration dans l'html de la value de orderIdUrl
confirmationHtml.textContent = orderIdUrl;