const c = (el)=> document.querySelector(el); //Retorna o item.
const cs = (el)=> document.querySelectorAll(el); //Retorna um array com todos os item encontrados.

pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true); //Selecionou e clonou os elementos.
    //Preencher as informações em pizzaItem

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    
    //pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();

        //let key = e.target.closest('.pizza-item').getAttribute('data-key'); //Outro meio de fazer
        //c('.pizzaInfo h1').innerHTML = pizzaJson[key].name ; //Outro meio de fazer

        c('.pizzaBig img').src = item.img;
        c('.pizzaInfo h1').innerHTML = item.name ;
        c('.pizzaInfo--desc').innerHTML = item.description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`;

        cs('.pizzaInfo--size ').forEach((size, sizeIndex) =>{

            //size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]; //Outro meio de fazer

            size.querySelector('span').innerHTML = item.sizes[sizeIndex];
        });


        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display= "flex";
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    })


    c('.pizza-area').append(pizzaItem);
})

