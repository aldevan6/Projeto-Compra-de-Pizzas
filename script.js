const c = (el)=> document.querySelector(el); //Retorna o item.
const cs = (el)=> document.querySelectorAll(el); //Retorna um array com todos os item encontrados.

pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true); //Selecionou e clonou os elementos.
    //Preencher as informações em pizzaItem

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;


    c('.pizza-area').append(pizzaItem);
})

