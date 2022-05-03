class Basket {
    constructor() {
        this.produits = this.getBasket()
    }

    getBasket() {
        let basket = localStorage.getItem("basket");
        // Si panier est vide alors on renvoie un tableau vide []
        if (basket == null) {
            basket = [];

        } else {
            // Sinon on parse (txt) le panier
            basket = JSON.parse(basket);
        }
        return basket;
    }

    /* TEST **/
    save() {
        localStorage.setItem("basket", JSON.stringify(this.produits));
        console.log("Produit ajouté à votre basket.");
    }
    /* **/

    add(produitCanape) {


        // verification(s)
        if (produitCanape.qty == 0 && produitCanape.colors == "") {
            console.log("Veuillez sélectionnez une quantité et une couleur.");
        } else {
            // verification(s) ID - même article
            // Recherche le meme ID sur le produitCanape qui vient d'être soumis à l'ajout du panier
            let foundProduct =
                this.produits.find
                    (p => p.id == produitCanape.id && p.colors == produitCanape.colors);
            if (foundProduct !== undefined) {
                // Si different de undefined alors on ajoute la quantity ++
                foundProduct.qty = parseInt(produitCanape.qty) + parseInt(foundProduct.qty);
                // this.produits.push(produitCanape);
            } else {
                // Sinon on l'ajour normalement au panier
                this.produits.push(produitCanape)
            }
            // ajoute avec .push le produit

            //console.log(this.produits)

            // sauvegarde dans le panier avec la methode "saveBasket"
            this.save();
            window.location.href = 'cart.html';
        }

    }


    saveProduit(produit) {
        let produits = JSON.parse(localStorage.getItem("basket")) || [];
        produits = [...produits, produit];
        localStorage.setItem("basket", JSON.stringify(produits));
    }


    remove(produitCanape) {

        this.produits = this.produits.filter(p => p.id != produitCanape.id && p.colors != produitCanape.colors);
        this.save();



    }

    changeQuantity(produitCanape, quantity) {

        // Recherche le meme ID sur le produitCanape qui vient d'être soumis à l'ajout du panier
        let foundProduct = this.produits.find(p => p.id == produitCanape.id);
        if (foundProduct != undefined) {
            foundProduct.quantity += quantity;
            if (foundProduct.quantity <= 0) {
                remove(foundProduct);
            } else {
                this.save()
            }
        }

        qtyBtn = document.getElementsByClassName("itemQuantity");
        
        qtyBtn.addEventListener("change", function(){
            console.log("hello")
        }); 

    }

    getNumberProduct() {

        let number = 0;
        for (let product of this.basket) {
            number += product.quantity
        }
        return number
    }

    async getTotalPrice() {

        let total = 0;
        for (let product of this.produits) {
            var price = await this.getPriceByApi(product.id);
            var totalProduit = parseInt(product.qty) * parseInt(price);
            total = total + totalProduit;
        }
        document.getElementById('totalPrice').textContent = total;
    }

    getPriceByApi(id) {
        return fetch('http://localhost:3000/api/products/' + id)
            .then((resp) => resp.json())
            .then(function (data) {
                return data.price;
            })
    }



    /** Mais ou l'appeler */
    /**
    putItem(basket){
        for (let itemProduct of basket) {

            let idUrl = itemProduct.id;
            const url = "http://localhost:3000/api/products/" + idUrl;


             fetch(url)
                .then((resp) => resp.json())
                .then(function (data) {
                    document.querySelector(".cart").innerHTML += document.querySelector(".cart").innerHTML += `<article class="cart__item" data-id="${data._id}" data-color="${data.colors}">
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
                        <p class="deleteItem" onclick="deleteToBasket(${itemProduct.id},${itemProduct.colors});">Supprimer</p>
                        </div>
                    </div>
                    </div>
                </article>`;
                })
            }
    }


    async getCallApiInformation() {
        return fetch('http://localhost:3000/api/products/' + id)
        .then((resp) => resp.json())
        .then(function (data) {
            putItem(data);
      
        });
    };
     */


    



}





// Récupération du click de larticle pour recuperer data-id

// avec data-id de click (supprimer)

// appel la fonction remove();