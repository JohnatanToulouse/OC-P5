let urlLocation = window.location.href;

const url = new URL(urlLocation);

const urlToBasket = '';

let search_articleId = new URL(location.href).searchParams.get("id");

let btnBasket = document.getElementById('addToCart');


var panier = new Basket();


// En arrivant 
// affichage d'un produit par id
fetch("http://localhost:3000/api/products/" + search_articleId)
  .then((resp) => resp.json())
  .then(function (data) {
   showCanapeById(data);
  });


// Afiche les détails d'un canapé clické
function showCanapeById(canapeId) {
 
// Name
let nameTitle = `${canapeId.name}`;
 

// récupérer HTML #title
let titleHtml = document.getElementById('title');
 

// récupérer HTML #colors
let colorsHtml = document.getElementById('colors');

// récuère les couleurs
let nbColors = canapeId.colors;

for (const color of nbColors) {
   // créé element html <option>
   let opt = document.createElement("option");
   
   // assigne le nom de la variable a l'element
   opt.appendChild(document.createTextNode(color));

   // assigne la value de l'élement <option>
   opt.value = color;
   
   // application de l'obj opt dans l'élément HTML colors.
   colorsHtml.appendChild(opt);
 }


// récupérerimg et l'affecter a une balise html .items__img
   let imgHtml = document.getElementsByClassName('item__img');
    
   // créée img
   let img = document.createElement('img');
      img.src  = `${canapeId.imageUrl}`;
      img.alt = `${canapeId.altTxt}`;


 
 

// récuperer la description et l'affecter a une balise html p#description
   let descriptionHtml = document.getElementById('description');
   
   // intégration description dans HTML #description
   let description = document.createTextNode(`${canapeId['description']}`);
      

  // récuperer le prix et l'affecter a une balise html #price
      let priceHtml = document.getElementById('price');
     
      // intégration du prix dans HTML #price
      let price = document.createTextNode(`${canapeId['price']}`);
         

      // affichages:
      titleHtml.append(nameTitle); 
      priceHtml.append(price);
      descriptionHtml.append(description);

      
      imgHtml[0].appendChild(img)

}

 
 

 /* Récuperer le button */
 btnAddToBasket = document.getElementById('addToCart');
 

 // Click sur le button "ajouter au panier", la fonction saveBasket est appelé pour l'ajour au panier.
 btnAddToBasket.addEventListener('click', function(){
// verification qty

     const canapeCommander = {
        "id": search_articleId,
        "qty" : document.getElementById('quantity').value,
        "colors" : document.getElementById('colors').value
     }
     // saveBasket(canapeCommander)
     panier.add(canapeCommander)
 });
 
 
  