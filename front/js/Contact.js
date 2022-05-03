/* - - - - - - - - - - - -- - - - - - -  Affichage du localStorage  - - - - - -- - - - - - - - - - - - -  */
/* - - - - - - - - - - - -- - - - - - -- - -  Afficher dans .cart  -- - - - - - - -- - - - - - - - - - -  */
 // Initialisation d'un tableau vide
 let products = [];

let panierBasket = localStorage.getItem("basket");
 panierBasket = JSON.parse(panierBasket);

 for (let itemProduct of panierBasket) {

  let idUrl = itemProduct.id;

  

  const url = "http://localhost:3000/api/products/" + idUrl;


   fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        document.querySelector(".cart").innerHTML += `<article class="cart__item" data-id="${data._id}" data-color="${data.colors}">
        <div class="cart__item__img">
          <img src="${data.imageUrl}" alt="${data.name}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${itemProduct.colors}</p>
            <p>${data.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemProduct.qty}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
      });
      
      
       
  }
 
/* - - - - - - - - - - - -- - - - - - -  Formulaire de contact  - - - - - -- - - - - - - - - - - - -  */  
let submitOrder = document.forms.contact;
 





submitOrder.addEventListener("submit", function (e) {
  e.preventDefault();
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

 

  let firstnameF = firstname.value;
  let lastnameF = lastname.value; 
  let addressF = address.value;
  let cityF = city.value;
  let emailF = email.value;
   

    email.addEventListener("change", function(){
      validEmail(this);
    })
 

   const validEmail = function(email)
   {
     /* A jusqu'a min maj + 0 à 9, ._- (plusieurs fois) */
      let emailRegEx = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
      );

      let testEmail = emailRegEx.test(emailF);
      console.log(testEmail)

        
        if(testEmail){
          emailErrorMsg.innerHTML = `Merci de saisir un format d'email correct`;
        }else{
          emailErrorMsg.innerHTML = `OK`;
        }

         
   };

/*
  if(firstname.value  == ""){
    e.preventDefault();
  }

  console.log(firstname);
  return false;
 /*
 firstName
lastName
address
city
email
*/






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
           window.location.href = `confirmation.html?orderId=${contenu.orderId}`;
        } catch (e) {
          console.log(e);
        }
      })


    } catch (err) {
      alert(err);
    }




  //  }
});

 




/* - - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - - - 
/* - - - - - - - - - - - - - -- - - - - - - - - - - -  .deleteItem - - - - - - - - - - - - - -
/* - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - - -  */

const btnDeletes = document.querySelectorAll('.deleteItem');
      
      for( let i = 0;i < btnDeletes.length; i++){
        console.log("Hello dear")
      }
      