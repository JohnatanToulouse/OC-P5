class Cart{
    constructor(){
        this.produits = this.getBasket()
    }

    getBasket(){
        let basket = localStorage.getItem("basket");
        // Si panier est vide alors on renvoie un tableau vide []
        if(basket == null){
            basket = [];
        }else{
            // Sinon on parse (txt) le panier
            basket = JSON.parse(basket);
        
        }
        return basket;
    }

    showElementsInLocalStorage(){
        
    }

}


let realBasket = new Cart();
console.log(realBasket)



/*  HTML:
    -----------
    Déclaration des elements html
    ci-dessous:
*/

// BUTTON: Supprimer  
let btnDeleteRealBasket = document.querySelector(".cart__item__content__settings__delete .deleteItem");
 

// INPUT: Quantité  
let qtyRealBasket = document.querySelector(".cart__item__content__settings .cart__item__content__settings__quantity .itemQuantity");
 



/*  FUNCTIONS:
    -----------
    Toutes les fonctions se trouvent 
    ci-dessous:
*/

// Appel aux fonctions:
// Supprimer
btnDeleteRealBasket.addEventListener("click", (e) => {
    console.log("j'ai cliqué");
});

// Changement de la quantité du produit
 qtyRealBasket.addEventListener("change", (e) => {
    qtyRealBasket.textContent = `${e}`;
 });