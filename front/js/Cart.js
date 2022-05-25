let cartHtml = document.getElementsByClassName('cart');


/* Affichage du produit  en créant element HTML */
function displayItemProduct(data, itemProduct){
 
  // article
  let containerCard = document.createElement("article");
  containerCard.setAttribute("data-id", `${data._id}`)
  containerCard.classList.add("cart__item");
  containerCard.setAttribute("data-color", `${itemProduct.colors}`);

  // .cart__item__img
  let cardImg = document.createElement("div");
  cardImg.classList.add("cart__item__img");
  
  // création image, avec l'image du produit par l'API + alt au nom du produit.
  let imgCardItemProduct = document.createElement("img");
  imgCardItemProduct.setAttribute("alt", `${data.name}`);
  imgCardItemProduct.src = `${data.imageUrl}`;


  // .cart__item__img récupère l'image du produit et la met dedans.
  cardImg.appendChild(imgCardItemProduct);

  // article récupère .cart__item__img (l'image) et la met dedans. 
  containerCard.appendChild(cardImg);

  // creation div .cart__item__content 
  let cardItemContent = document.createElement("div");
  cardItemContent.classList.add("cart__item__content");

  // creation div .cart__item__content__description 
  let cardItemContentDescription = document.createElement("div");
  cardItemContentDescription.classList.add("cart__item__content__description");

  // .cart__item__content récupère .cart__item__content__description et la met dedans.
  cardItemContent.appendChild(cardItemContentDescription);

  // article récupère .cart__item__content qui contient .cart__item__content__description (titre, couleur, prix) et l'intègre
  containerCard.appendChild(cardItemContent);

  let h2CardItem = document.createElement("h2");
  let h2CardItemContent = document.createTextNode(`${data.name}`);

 

  // h2 créée intégre le nom du produit via l'API
  h2CardItem.appendChild(h2CardItemContent);
  cardItemContentDescription.appendChild(h2CardItem);

  // p contenant la couleur du produit
  let pCardItem = document.createElement("p");
  let pCardItemContent = document.createTextNode(`${itemProduct.colors}`);

  // p contenant la valeur de la couleur du produit
  pCardItem.appendChild(pCardItemContent);
  cardItemContentDescription.appendChild(pCardItem);

  // p créée et contenant le prix du produit
  let pPrice = document.createElement("p");

  // p contenant la valeur du prix du produit
  let pPriceContent = document.createTextNode(`${data.price}  €`);
  
  // Liaison  P contient la valeur du prix;
  pPrice.appendChild(pPriceContent);

  // Liaison article contient la div du prix
  cardItemContentDescription.appendChild(pPrice);



  /**
   * div class="cart__item__content__settings";
   */

  let cartItemContentSettings = document.createElement("div");
  cartItemContentSettings.classList.add("cart__item__content__settings");

  //cardItemContent.appendChild(cartItemContentSettings);
  /**
   * div class="cart__item__content__settings__quantity";
   */
 
  let cartItemContentSettingsQuantity = document.createElement("div");
  cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");


  let pCardItemContentSettingsQty = document.createElement("p");
  let pCardItemContentSettingsQtyContent = document.createTextNode(`Qté :`);
 
  pCardItemContentSettingsQty.appendChild(pCardItemContentSettingsQtyContent);

    cartItemContentSettings.appendChild(pCardItemContentSettingsQty);

  // Liaison .cart__item__content__settings__quantity avec p 
  cartItemContentSettingsQuantity.appendChild(pCardItemContentSettingsQty);

// Liaison article contient la div.cart__item__content__settings
cardItemContentDescription.appendChild(cartItemContentSettings);

 // Liaison .cart__item__content avec .cart__item__content__settings__quantity 
 cardItemContent.appendChild(cartItemContentSettingsQuantity);






 


 let inputCardItemContentSettings = document.createElement("input");
 inputCardItemContentSettings.setAttribute("type", "number");
 inputCardItemContentSettings.setAttribute("name", "itemQuantity");
 inputCardItemContentSettings.setAttribute("min", "1");
 inputCardItemContentSettings.setAttribute("max", "100");
 inputCardItemContentSettings.setAttribute("value", `${itemProduct.qty}`);
 inputCardItemContentSettings.classList.add("itemQuantity");
 inputCardItemContentSettings.setAttribute("onchange", `updateItemQty("${data._id}","${itemProduct.colors}")`);



 cartItemContentSettingsQuantity.appendChild(inputCardItemContentSettings);




    let cardItemContentSettingsDelete = document.createElement("div");
    cardItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");

 cardItemContent.appendChild(cardItemContentSettingsDelete);


    cartItemContentSettings.appendChild(cardItemContentSettingsDelete);




























 /*
 cardItemContentSettingsDelete.appendChild(pCardItemContentSettingsDelete);
 
   
 cartItemContentSettings.appendChild(cardItemContentSettingsDelete);






















// --------------------------------------------------------------------------------------------

 

  /*

  cardItemContent.appendChild(cardItemContentDescription);

  
console.log(h2CardItemContent)

  
  /*
  h2CardItem.appendChild(h2CardItemContent);

  cardItemContentDescription.appendChild(h2CardItem);

// --------------------------------------------------------------------------------------------
/*

  

  h2CardItem.appendChild(h2CardItemContent);

  


  

/*

  pCardItem.appendChild(pCardItemContent);



  cardItemContentDescription.appendChild(h2CardItem);
  cardItemContentDescription.appendChild(pCardItemContent);


  cardItemContent.appendChild(cardItemContentDescription);

  containerCard.appendChild(cardItemContent)

  let cardItemContentSettings = document.createElement("div");
  let cardItemContentSettingsQty = document.createElement("div");

  

  //---

  


  



  
*/















  cartHtml[0].appendChild(containerCard); 

}



/* - - - - - - - - - - - -- - - - - - -  Affichage du localStorage  - - - - - -- - - - - - - - - - - - -  */
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
        displayItemProduct(data, itemProduct)  

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

// Récupère le formualire "contact"
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

  var okToSend = true;


  /* --------------------- Prenom --------------------- */ 
  let msgFirstnameErr = "";
  let firstnameRegEx = new RegExp(
   `^[a-z]([-']?[a-z]+)*([a-z]([-']?[a-z]+)*)+$`
  );
  if(firstnameRegEx.test(firstnameF)){
    firstname.style.border = "3px solid green";
    firstnameErrorMsg.innerText = "";
  }else{
    okToSend = false;
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
    okToSend = false;
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
      okToSend = false;
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
        okToSend = false;
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
        okToSend = false;
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

    /* okToSend: Permet de vérifié si un champ est false, si false, l'envoie du formulaire est annulé */
    if(okToSend){
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
  }else{
    alert("Problème lors de la validation du formulaire");
  }
});

 



 
      