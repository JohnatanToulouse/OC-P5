console.log('coucou');

let realBasket = JSON.parse(localStorage.getItem('basket'));
console.log(realBasket);
if(realBasket === null){
    realBasket = [];
    let panierVide = `<article class="cart__item">Panier est vide</div>`;
    let htmlPanierVide = document.getElementById('cart__items').insertAdjacentHTML('afterbegin', panierVide);
     
}else{

    containerBasket = [];
    console.log(realBasket);
    console.log("panier nest pas vide");
    
    for( k = 0; k < realBasket.length; k++){
        //console.log(realBasket.length);
        containerBasket = containerBasket + `
        <article class="cart__item" data-id="${realBasket[k].id}" data-color="${realBasket[k].colors}">
                <div class="cart__item__img">
                  <!--<img src="../images/product01.jpg" alt="Photographie d'un canapé">-->
                  <img src="${realBasket}" alt="${realBasket[k].name}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${realBasket[k].name}</h2>
                    <p>${realBasket[k].colors}</p>
                    <p>${} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
              if(k === realBasket.length)
    }

}