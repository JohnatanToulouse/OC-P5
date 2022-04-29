let panierBasket = localStorage.getItem("basket");



// form (submit)
let submitOrder = document.forms.contact;
// console.log(submitOrder)

var firstname = document.forms["contact"]["firstName"];
var lastname = document.forms["contact"]["lastName"];
var address = document.forms["contact"]["address"];
var city = document.forms["contact"]["city"];
var email = document.forms["contact"]["email"];

// error html div attributions
var firstnameErrorMsg = document.getElementById("firstNameErrorMsg");
var lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
var addressErrorMsg = document.getElementById("addressErrorMsg");
var cityErrorMsg = document.getElementById("cityErrorMsg");
var emailErrorMsg = document.getElementById("emailErrorMsg");



/* - - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - - - 
/* - - - - - - - - - - - - - -- - - - - - - - - - - -  reportValidity - - - - - - - - - - - - - -
/* - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - - -  */


submitOrder.addEventListener("submit", function (e) {
  e.preventDefault();


 

/*
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  //  var valid = true;
  //  for (let input of document.querySelectorAll('.cart__order__form input')) {
  //    valid = valid && input.reportValidity();
  //  if (!valid) {
  //    break;
  //  }
  //  }
  //  if (valid) {



    /* - - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - - 
    /* - -- - - - -- - - - - - - - - - - - - - - - - - -  RegEx - -- - - - - - - - - - - -
    /* - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - - */




    // Object contact à envoyer
    const contact = {
      firstName: firstname.value,
      lastName: lastname.value,
      address: address.value,
      city: city.value,
      email: email.value,


    }


    // Initialisation d'un tableau vide
    let products = [];
 
    // Parse le panierBasket
    panierBasket = JSON.parse(panierBasket);

    // Boucle pour récupérer l'id du resultat parse de panierBasket
    for(const idVoulu of panierBasket){
      // Ajout de la clé/valeur dans tableau
       products.push(idVoulu.id);
    }
  
    

    // Object dataP contenant l'object contact et le tableau products

    const dataP = {
      contact, products
    }

 

    try {
      const prom1 = fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(dataP),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      prom1.then(async (response) => {
        try {
          console.log(response);
          const contenu = await response.json();
          console.log(contenu);
        } catch (e) {
          console.log(e);
        }
      })


    } catch (err) {
      alert(err);
    }




  //  }
});


/** >>> Poursuivre ici
console.log(firstname);
firstname = firstname.value;
console.log(firstname);

 */