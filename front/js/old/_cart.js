// Récupère le contenu du localStorage
let basket = localStorage.getItem("basket");
console.log(basket)


// Cette fonction créer:
        // Un bloc "article", de classe: .cart__item
        // Ajoutant des attributs data-id & data-color
        let article = document.createElement("article");
        article.classList.add("cart__item");
        article.setAttribute("data-id", "canape-ID");
        console.log(article)

            // Un div classé cart__item__img
            let imageProduit = document.createElement("img");

            // Avec l'image du produit (canapé) concerné, et un attribut "alt"
             imageProduit.src = `../../back/images/kanap01.jpeg`;
             imageProduit.alt = `Produit test`;
             let altTxt = imageProduit.alt;

            // Div classé cart__item__content__description 
            let div1 = document.createElement("div");
            div1.classList.add("cart__item__content__description");
            
                // h2 avec le nom du produit (canapé)
                let h2Div1 =  document.createElement("h2");
                let textH2Div1 = document.createTextNode('produit en test');
                h2Div1.appendChild(textH2Div1);
                console.log(h2Div1)
                // p avec la couleur enregistré dans le localStorage (basket)
                let pDiv1 =  document.createElement("p");
                let textpDiv1 = document.createTextNode('Black/Yellow');
                pDiv1.appendChild(textpDiv1)
                console.log(pDiv1)
                // p avec le prix du produit enregistré
                let prixDiv1 =  document.createElement("p");
                let textPrixDiv1 = basket.qty * basket.price;
                console.log(textpDiv1)
                /*
                // J'ai pas le prix dans le basket



                    // Div classé cart__item__content__settings         
                    // Div classé cart__item__content__settings__quantity
                    // p avec la quantité enregistrée dans le localStorage
                    // input de type number classé .itemQuantity avec d'autres attributs (name + min + max + value)   
                           // Div classé cart__item__content__settings__delete
                           // p classé deleteItem pour delete le produit += 1 du localStorage