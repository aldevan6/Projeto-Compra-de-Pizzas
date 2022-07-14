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
    
    //pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        modalqt = 1;
        modalKey = item.id;
        //modalKey = index;
        let key = e.target.closest('.pizza-item').getAttribute('data-key'); //Outro meio de fazer
        //c('.pizzaInfo h1').innerHTML = pizzaJson[key].name ; //Outro meio de fazer

        c('.pizzaBig img').src = item.img;
        c('.pizzaInfo h1').innerHTML = item.name ;
        c('.pizzaInfo--desc').innerHTML = item.description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`;

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

    let identifier = modalKey + '@' + size;

    let key = cart.findIndex((item)=>item.identifier == identifier);
    
    if(key > -1){
        cart[key].qt += modalqt;
    }else{
        cart.push({
            identifier,
            id: modalKey,
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
    }else{
        c('aside').classList.remove('show');
    }
}