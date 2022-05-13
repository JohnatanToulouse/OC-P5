let cartHtml = document.getElementsByClassName('cart');



function displayItemProduct(data){
  console.log(data)
 

  // boucle ? 

  let containerCard = document.createElement("article");
  containerCard.setAttribute("data-id", `${data._id}`)
  containerCard.classList.add("cart__item");
  containerCard.setAttribute("data-color", `${data.colors}`);

  let cardImg = document.createElement("div");
  cardImg.classList.add("cart__item__img");
  
  let imgCardItemProduct = document.createElement("img");
  imgCardItemProduct.setAttribute("alt", `${data.name}`);
  imgCardItemProduct.src = `${data.imageUrl}`;

  cardImg.appendChild(imgCardItemProduct);

  containerCard.appendChild(cardImg);

  let cardItemContent = document.createElement("div");
  cardItemContent.classList.add("cart__item__content");

  let cardItemContentDescription = document.createElement("div");
  cardItemContentDescription.classList.add("cart__item__content__description");

  let h2CardItem = document.createElement("h2");
  let h2CardItemContent = document.createTextNode(`${data.name}`);

  h2CardItem.appendChild(h2CardItemContent);

  let pCardItem = document.createElement("p");
  let pCardItemContent = document.createTextNode(`${data.colors}`);


  let pPrice = document.createElement("p");
  let pPriceContent = document.createTextNode(`${data.price}  €`);

  pCardItem.appendChild(pCardItemContent);


  cardItemContentDescription.appendChild(h2CardItem);
  cardItemContentDescription.appendChild(pCardItemContent);


  cardItemContent.appendChild(cardItemContentDescription);

  containerCard.appendChild(cardItemContent)

  let cardItemContentSettings = document.createElement("div");
  let cardItemContentSettingsQty = document.createElement("div");

  let pCardItemContentSettingsQty = document.createElement("p");
  let pCardItemContentSettingsQtyContent = document.createTextNode(`Qté :`);

  let inputCardItemContentSettings = document.createElement("input");
  inputCardItemContentSettings.setAttribute("type", "number");
  inputCardItemContentSettings.setAttribute("name", "itemQuantity");
  inputCardItemContentSettings.setAttribute("min", "1");
  inputCardItemContentSettings.setAttribute("max", "100");
  inputCardItemContentSettings.setAttribute("value", `${data.qty}`);
  inputCardItemContentSettings.classList.add("itemQuantity");


  let cardItemContentSettingsDelete = document.createElement("div");
  cardItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");


  let pCardItemContentSettingsDelete = document.createElement("p");
  pCardItemContentSettingsDelete.classList.add("deleteItem");
  pCardItemContentSettingsDeleteContent = document.createTextNode("Supprimer");
  

  pCardItemContentSettingsDelete.appendChild(pCardItemContentSettingsDeleteContent);

  cardItemContentSettingsDelete.appendChild(pCardItemContentSettingsDelete);

  cardItemContentSettings.appendChild(cardItemContentSettingsQty);
  cardItemContentSettings.appendChild(inputCardItemContentSettings);

  containerCard.appendChild(cardItemContentSettings)
  containerCard.appendChild(cardItemContentSettingsDelete)

 

 /*
        document.querySelector(".cart").innerHTML += `<article class="cart__item" data-id="${data._id}" data-color="${itemProduct.colors}">
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
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" onclick=updateItemQty('${data._id}','${itemProduct.colors}') value="${itemProduct.qty}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem" onclick=deleteItemToBasket('${data._id}','${itemProduct.colors}')>Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
*/

  
  cartHtml[0].appendChild(containerCard); 

}












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
        displayItemProduct(data)  

      });
      var classBasket = new Basket();
      classBasket.getTotalPrice();
      classBasket.getTotalProduct();
       
  }

/* - - - - - - - - - - - -- - - - - - - Delete - - - - - - - - - - - -- - - - - - - */
  function deleteItemToBasket(id, color) {
    console.log(id, color);
    var classBasket = new Basket();
    classBasket.remove({ id, color });
   
    document.querySelector('article[data-id="' + id + '"]').remove();
    classBasket.getTotalPrice();
  }



/* - - - - - - - - - - - -- - - - - - - Update Qty  - - - - - - - - - - - -- - - - - - - */


function updateItemQty(id, color){
  var baliseArticle = document.querySelectorAll('article');

  for (const article of baliseArticle) {
    if(article.attributes.getNamedItem('data-id').value == id && article.attributes.getNamedItem('data-color').value == color){
     var quantityInput = article.querySelector('input').value;
     
    }
  }
 
 

  
  var basketQty = new Basket();
  basketQty.changeQuantity(id, quantityInput, color);
  


}
 
 
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
   
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    /* - - - - - - - - - - - - - - - - - - - - - - - - - -  RegEx - - - - - - - - - - - - - - - - - - - 
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

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
          
          const contenu = await response.json();
          
          // redirection url avec orderId passé en valeur dans l'url
           window.location.href = `confirmation.html?orderId=${contenu.orderId}`;
        } catch (e) {
          console.log(e);
        }
      })
    } catch (err) {
      alert(err);
    }

});

 




/* - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - - - - - - - - - - - -
/* - - - - - - - - - - - - - - - - - - .deleteItem - - - - - - - - - - - - - - - - - - - - - - - - - 
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

const btnDeletes = document.querySelectorAll('.deleteItem');
  for( let i = 0;i < btnDeletes.length; i++){
        console.log("Hello dear")
  }
      