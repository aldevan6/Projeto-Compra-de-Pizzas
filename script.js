let cart = [];
let modalqt = 1;
let modalKey = 0;

const c = (el)=> document.querySelector(el); //Retorna o item.
const cs = (el)=> document.querySelectorAll(el); //Retorna um array com todos os item encontrados.

//Listagem das pizzas
pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true); //Selecionou e clonou os elementos.
    
    //Preencher as informações em pizzaItem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        
        let key = e.target.closest('.pizza-item').getAttribute('data-key'); 
        modalqt = 1;
        modalKey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name ;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        c('.pizzaInfo--size.selected').classList.remove('selected');

        cs('.pizzaInfo--size ').forEach((size, sizeIndex) =>{
            //size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]; //Outro meio de fazer
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            
            size.querySelector('span').innerHTML = item.sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML = modalqt; //Quantidade de pizza no modal


        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display= "flex";
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    })


    c('.pizza-area').append(pizzaItem);
})
//Fim listagem

//Eventos do MODAL
//Fechar modal
function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 200);
}
//Uso da função fechar modal
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal );
});

//Aumentar a quantidade de itens
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if (modalqt > 1){
        c('.pizzaInfo--qt').innerHTML= modalqt -= 1;
    }
})
c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    c('.pizzaInfo--qt').innerHTML = modalqt += 1;
})

cs('.pizzaInfo--size ').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
});

//Adicionar ao carrinho

c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt( c('.pizzaInfo--size.selected').getAttribute('data-key'));
    
    let identifier = pizzaJson[modalKey].id + '@' + size;

    let key = cart.findIndex((item)=>item.identifier == identifier);
    
    if(key > -1){
        cart[key].qt += modalqt;
    }else{
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalqt
        });
    }
    updateCart();
    closeModal();
} );

function updateCart(){
    if(cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML= '';

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            let carItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = "P";
                    break;
                case 1:
                    pizzaSizeName = "M";
                    break;
                case 2:
                    pizzaSizeName = "G";
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            carItem.querySelector('img').src = pizzaItem.img;
            carItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            carItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            c('.cart').append(carItem);
        }

    }else{
        c('aside').classList.remove('show');
    }
}