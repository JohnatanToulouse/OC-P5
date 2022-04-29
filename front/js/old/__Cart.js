class Cart{

    constructor(){
        this.basket = this.getBasket()
    }

    


}

function getBasket(){
    let basket = localStorage.getItem("basket");
    // Si panier est vide alors on renvoie un tableau vide []
    if(basket == null){
        basket = [];
    }else{
        // Sinon on parse (txt) le panier
        basket = JSON.parse(basket);
        //console.log(basket)
        for (const item of basket){
            // console.log(item)
            fetch("http://localhost:3000/api/products/" +item.id)
            .then((resp) => resp.json())
            .then(function(data){
               for(let i = 0; i < data.length; i++){
                // On appel pour afficher chaque article (chaque canapé) et on itère avec [i].    
                // console.log(data)
                synchronisationApiEtBasket(data);
               }
           
            });
        
        }
       
    }
    
}
 