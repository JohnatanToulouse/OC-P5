
/* ****************** Récupération des différents éléments pour l'HTML  ****************** */
// récupération de l'élément html 'section'
let cartMaster = document.getElementsByClassName('cart');

let articleCartItems = document.createElement("div");
articleCartItems.setAttribute("class", "cart__items");



let basketClass = new Basket();

/* ****************** Récupération du panier dans le localStorage ****************** */
let basket = localStorage.getItem("basket");
basket = JSON.parse(basket);

cartMaster[0].appendChild(articleCartItems);



/* ****************** Fonction qui affiche le panier vide avec message(s) personnalisés ****************** */
function afficherPanierVide() {
  let panierVide = document.createElement("article");
  panierVide.classList.add("cart__item");
  panierVide.insertAdjacentText("afterbegin", "Le panier est vide");

  // let containerHtmlPanierVide = document.querySelector('section #cart__items');
  articleCartItems.appendChild(panierVide);

  // Affiche 0 € > p .totalPrice;
  let totalPrice = document.getElementById("totalPrice");
  totalPrice.insertAdjacentText("afterbegin", "0");
}

/* ********* Fonction pour afficher un article du panier du localStorage - Ancien - Ne Pas Effacer ********* **/
function createArticleHtmlById(basket) {

  let cartClass = document.getElementsByClassName('cart');

  let cardHtml = `
  <article class="cart__item" data-id="${basket.id}" data-color="${basket.colors}">
                  <div class="cart__item__img">
                    <img src="${basket.imageUrl}" alt="${basket.name}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${basket.name}</h2>
                      <p>${basket.colors}</p>
                      <p>${basket.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket.qty}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>`;
  cartClass[0].innerHTML = cardHtml;

}

/* ********* Fonction qui charge les articles du panier du localStorage ********* **/
function getLocalStorage() {
  if (basket === null) {
    afficherPanierVide();
  } else {
    for (let itemProduct of basket) {

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


      let p__total__price = document.getElementById('totalPrice');
      p__total__price.textContent = basketClass.getTotalPrice();
   



      

    }
  }
}



getLocalStorage();



