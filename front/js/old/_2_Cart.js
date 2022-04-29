class Cart{
    constructor(){
        this.produits = this.getRealBasket()
        console.log(this.produits)
    }


/*  FUNCTIONS:
    -----------
    Toutes les fonctions se trouvent 
    ci-dessous:
*/

     getRealBasket(){
        let basket = localStorage.getItem("basket");
        // Si panier est vide alors on renvoie un tableau vide []
        if(basket == null){
            basket = [];
            let panierVide = `<article class="cart__item">Panier est vide</div>`;
            let encadrementPanierVide = document.getElementById('cart__items').insertAdjacentHTML('afterbegin', panierVide);
             
        }else{
           // Sinon on parse (txt) le panier
           // console.log(basket)
          
            let articleItemRealBasket = document.querySelector('article .cart__item');
            let articleHtml = basket;
            basket = JSON.parse(basket);
            for (let i = 0; i < basket.length; i++) {
             //console.log(this.createRenderProduct(basket))
            console.log(basket);
            articleItemRealBasket.insertAdjacentHTML('afterbegin', articleHtml); 
          }
        }
        return basket;
    }


   
    mapingApiVsLocalStorage(articles){
        console.log(articles)
        const url = "http://localhost:3000/api/products/";
    }


     

    /**
     * Permet de créer l'élément <article> avec l'object itéré.
     * @returns 
     */
    createRenderProduct(){
        return `<article class="cart__item" data-id="${this.id}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src=" " alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2> </h2>
            <p> </p>
            <p> €</p>
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
    }
    

}





let realBasket = new Cart();
//console.log(realBasket)



/*  HTML:
    -----------
    Déclaration des elements html
    ci-dessous:
*/

// BUTTON: Supprimer  
let btnDeleteRealBasket = document.querySelector(".cart__item__content__settings__delete .deleteItem");
 

// INPUT: Quantité  
let qtyRealBasket = document.querySelector(".cart__item__content__settings .cart__item__content__settings__quantity .itemQuantity");
 





// Appel aux fonctions:
// Supprimer
btnDeleteRealBasket.addEventListener("click", (e) => {
    console.log("j'ai cliqué");
});

// Changement de la quantité du produit
 qtyRealBasket.addEventListener("change", (e) => {
    qtyRealBasket.textContent = `${e}`;
 });