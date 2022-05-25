 /** URL à appeler lors de l'utilisation de fetch */
 const url = "http://localhost:3000/api/products";

 // récupération de l'élément html 'section'
 let sectionItems = document.querySelector('section');
 


// affichages de tous les canapés
function showCanapes(canape){
     // créé un element lien 
     let elemA = document.createElement('a');

     // récupere dans l'object la propriété href
     // on associe avec data qui comporte les résultats de la requête fetch
     // i vaut i++, concaténer avec _id de data.
     elemA.href = `./product.html?id=${canape._id}`;
 
     // créé un élément html 'article'
     let articleElm = document.createElement('article');

     // créé un element img
     // associe la source de l'image au tableau data qui est incrémenté par i et dont la valeur est imageUrl
     let imgElm = document.createElement('img');
     imgElm.src = `${canape.imageUrl}`;

     // créé l'attribut alt avec ${data[i].altTxt}
     imgElm.alt = `${canape.altTxt}`;

     // application de l'attribut et de sa valeur à imgElm.
     let altTxt = imgElm.alt;

     // créé un élement html h3
     let titleElm = document.createElement('h3');
     
     // application de la class productName à l'élément HTML h3.
     titleElm.className = 'productName';

     // créé du texte pour chaque data[i]name retourné
     let txtTitleElm = document.createTextNode(`${canape.name}`);

     // créé le descriptif, élément html p
     let para = document.createElement('p');

     // application de la class produproductDescriptionctName à l'élément HTML p.
     para.className = 'productDescription';

     // créé du texte pour chaque data[i]description retourné
     let paraDescElm = document.createTextNode(`${canape.description}`);
 

     // associe un lien dans article
     elemA.appendChild(articleElm);
     
     // associe image data[i].imageUrl au p
     articleElm.appendChild(imgElm);
     
     // associe un titre data[i].name au h3
     articleElm.appendChild(titleElm);
     titleElm.appendChild(txtTitleElm);

     // associe un titre data[i].description au p
     articleElm.appendChild(para);
     para.appendChild(paraDescElm);
     
     

     // associe l'html section .tems a l'élélement a
     sectionItems.appendChild(elemA);
     
}


// Lancement direct appel tous les produits
(function(){
   fetch(url)
   .then((resp) => resp.json())
   .then(function(data){
    for(let i = 0; i < data.length; i++){
     // On appel pour afficher chaque article (chaque canapé) et on itère avec [i].    
     showCanapes(data[i]);  
    }
 });
}())