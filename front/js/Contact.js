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
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" onclick=updateItemQty('${data._id}','${itemProduct.qty}') value="${itemProduct.qty}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem" onclick=deleteItemToBasket('${data._id}','${itemProduct.colors}')>Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
      });
      var classBasket = new Basket();
    classBasket.getTotalPrice();
      
       
  }

/* - - - - - - - - - - - -- - - - - - - Delete - - - - - - - - - - - -- - - - - - - */
  function deleteItemToBasket(id, color) {
    console.log(id, color);
    var classBasket = new Basket();
    //classBasket.remove({ id, color });
    classBasket.remove({ id});
    document.querySelector("article[data-id=" + id + "]").remove();
  }



/* - - - - - - - - - - - -- - - - - - - Update Qty  - - - - - - - - - - - -- - - - - - - */

function updateItemQty(id, qty = 1){
  console.log(id);
  var classBasket = new Basket();
  classBasket.changeQuantity({id,qty});
  


}
/*var ok = document.querySelector('input[name="itemQuantity"]' + id + ']');
console.log(ok)*/
 
/* - - - - - - - - - - - -- - - - - - -  Formulaire de contact  - - - - - -- - - - - - - - - - - - -  */  
let submitOrder = document.forms.contact;
 
submitOrder.addEventListener("submit", function (e) {
  e.preventDefault();

  // recuperation des inputs du formulaire contact
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
   
  // récupérer la value des inputs
  let firstnameF = firstname.value;
  let lastnameF = lastname.value; 
  let addressF = address.value;
  let cityF = city.value;
  let emailF = email.value;
   
    /* - - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - - 
    /* - -- - - - -- - - - - - - - - - - - - - - - - - -  RegEx - -- - - - - - - - - - - -
    /* - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - - */

  /* --------------------- Prenom --------------------- */ 
  let msgFirstnameErr = "";
  let firstnameRegEx = new RegExp(
   `^[a-z]([-']?[a-z]+)*([a-z]([-']?[a-z]+)*)+$`
  );
  if(firstnameRegEx.test(firstnameF)){
    firstname.style.border = "3px solid green";
    firstnameErrorMsg.innerText = "";
  }else{
    firstname.style.border = "3px solid red";
    msgFirstnameErr = "Merci de renseigner prénom valide.";
    firstnameErrorMsg.innerHTML = msgFirstnameErr;
  }  

  /* ----------------------- Nom ----------------------- */ 
    let msgLastNameErr = "";

  let lastnameRegEx = new RegExp(
   `^[a-z]([-']?[a-z]+)*([a-z]([-']?[a-z]+)*)+$`
  );
  if(lastnameRegEx.test(lastnameF)){
    lastname.style.border = "3px solid green";
    lastNameErrorMsg.innerText = "";
  }else{
    lastname.style.border = "3px solid red";
    msgLastNameErr = "Merci de renseigner prénom valide.";
    lastNameErrorMsg.innerHTML = msgLastNameErr;
  } 
    

  /* ----------------------- Adresse ----------------------- */ 
    let msgAddressErr = "";
    let addressRegEx = new RegExp(
     `[A-Za-z0-9'\.\-\s\,]`
    );
    if(addressRegEx.test(addressF)){
      address.style.border = "3px solid green";
      addressErrorMsg.innerText = "";
       
    }else{
      address.style.border = "3px solid red";
      msgAddressErr = "Merci de renseigner un format d'adresse valide.";
      addressErrorMsg.innerHTML = msgAddressErr;
    }  

    /* --------------------- Ville --------------------- */   
    let msgCityErr = "";
     let villeRegEx = new RegExp(
       '^[a-zA-Z]+$', 'g'
     );
      if(villeRegEx.test(cityF)){
       city.style.border = "3px solid green";
       cityErrorMsg.innerText = "";
      }else{
        city.style.border = "3px solid red";
        msgCityErr = "Merci d'indiquer une ville correctement.";
        cityErrorMsg.innerHTML = msgCityErr;
      }


    /* --------------------- Email --------------------- */   

      /* A jusqu'a Z min maj + 0 à 9, ._- (plusieurs fois) */
      let emailRegEx = new RegExp(
        '^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
      );
      if(emailRegEx.test(emailF)){
        // Quoi mettre ici ? 
        email.style.border = "3px solid green";
        emailErrorMsg.innerText = "";
      }else{
        email.style.border = "3px solid red";
        let msgEmailErr = "Merci d'indiquer un format d'email valide."; 
        emailErrorMsg.innerHTML = msgEmailErr;
        e.preventDefault();
      }    


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
          // redirection url avec orderId passé en valeur dans l'url
          // window.location.href = `confirmation.html?orderId=${contenu.orderId}`;
        } catch (e) {
          console.log(e);
        }
      })
    } catch (err) {
      alert(err);
    }

});

 




/* - - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - - - 
/* - - - - - - - - - - - - - -- - - - - - - - - - - -  .deleteItem - - - - - - - - - - - - - -
/* - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - -- - - - - - - - - - - - -  */

const btnDeletes = document.querySelectorAll('.deleteItem');
      
      for( let i = 0;i < btnDeletes.length; i++){
        console.log("Hello dear")
      }
      