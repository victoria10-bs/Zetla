"use strict"
let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}

/*CARRITO*/
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML =
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Añadir al carrito</button>
                <button class="ver"><li><a href="${product.a}">Ver producto</a></li></button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }


    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 13
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();


   /*FIN CARRITO */

  /*USUARIO*/

function mostrar(){
  document.getElementById('logout').style.display = 'block' ;
}

function ocultar(){
  document.getElementById('logout').style.display = 'none' ;
}

mostrar()
ocultar()

listProduct.addEventListener('click' , onProductClick =>{
  window.location.reload();
})



  /*USUARIO FIN*/



  /*INICIO FAVORITOS */
  // const btnsFavorite = document.querySelectorAll('.favorite');
  // const product = document.querySelectorAll('.listProduct');
  // const counterFavorites = document.querySelector('.counter-favorite');
  
  // const containerListFavorites = document.querySelector(
  //   '.container-list-favorites'
  // );
  // const listFavorites = document.querySelector('.list-favorites');
  
  // let favorites = [];
  
  // const updateFavoritesInLocalStorage = () => {
  //   localStorage.setItem('favorites', JSON.stringify(favorites));
  // };
  
  // const loadFavoritesFromLocalStorage = () => {
  //   const storedFavorites = localStorage.getItem('favorites');
  
  //   if (storedFavorites) {
  //     favorites = JSON.parse(storedFavorites);
  //     showHTML();
  //   }
  // };
  
  // const toggleFavorite = product => {
  //   const index = favorites.findIndex(
  //     element => element.id === product.id
  //   );
  
  //   if (index > -1) {
  //     favorites.splice(index, 1);
  //     updateFavoritesInLocalStorage();
  //   } else {
  //     favorites.push(product);
  //     updateFavoritesInLocalStorage();
  //   }
  // };
  
  // const updateFavoriteMenu = () => {
  //   listFavorites.innerHTML = '';
  
  //   favorites.forEach(fav => {
  //     // Crear un nuevo elemento 'div' para el producto favorito
  //     const favoriteCard = document.createElement('div');
  //     favoriteCard.classList.add('card-favorite');
  
  //     // Crear y añadir el título del producto
  //     const nameElement = document.createElement('h2');
  //     nameElement.classList.add('name');
  //     nameElement.textContent = fav.name;
  //     favoriteCard.appendChild(nameElement);
  
  //     // Crear y añadir el precio del producto
  //     const priceElement = document.createElement('price');
  //     priceElement.textContent = fav.price;
  //     favoriteCard.appendChild(priceElement);
  
  //     // Añadir el producto favorito a la lista
  //     listFavorites.appendChild(favoriteCard);
  //   });
  // };
  
  // const showHTML = () => {
  //   products.forEach(product => {
  //     const contentProduct = product.querySelector(
  //       '.content-card-product'
  //     );
  //     const productId = contentProduct.dataset.productId;
  //     const isFavorite = favorites.some(
  //       favorite => favorite.id === productId
  //     );
  
  //     const favoriteButton = product.querySelector('.favorite');
  //     const favoriteActiveButton =
  //       product.querySelector('#added-favorite');
  //     const favoriteRegularIcon = product.querySelector(
  //       '#favorite-regular'
  //     );
  //     favoriteButton.classList.toggle('favorite-active', isFavorite);
  //     favoriteRegularIcon.classList.toggle('active', isFavorite);
  //     favoriteActiveButton.classList.toggle('active', isFavorite);
  //   });
  
  //   counterFavorites.textContent = favorites.length;
  //   updateFavoriteMenu();
  // };
  
  // btnsFavorite.forEach(button => {
  //   button.addEventListener('click', e => {
  //     const card = e.target.closest('.content-card-product');
  
  //     const product = {
  //       id: card.dataset.productId,
  //       name: card.querySelector('h3').textContent,
  //       price: card.querySelector('.price').textContent,
  //     };
  
  //     toggleFavorite(product);
  
  //     showHTML();
  //   });
  // });
  
  // const btnClose = document.querySelector('#btn-close');
  // const buttonHeaderFavorite = document.querySelector(
  //   '#button-header-favorite'
  // );
  
  // buttonHeaderFavorite.addEventListener('click', () => {
  //   containerListFavorites.classList.toggle('show');
  // });
  
  // btnClose.addEventListener('click', () => {
  //   containerListFavorites.classList.remove('show');
  // });
  
  // loadFavoritesFromLocalStorage();
  // updateFavoriteMenu();
  

  // /*FIN FAVORITOS */


  /*PRUDUCTOS INICIO */

    // function saludar(){
    //   alert (`hola`);

      //  window.location.href = 'zapatos.html';
// }saludar()
  /*PRODUCTOS FIN */


  /**FILTRAR INICIO */
  let list = document.getElementById('list');
  let filter = document.querySelector('.filter');
  let count = document.getElementById('count');
  let listProducts = [

    
    {
      id: 1,
      name: 'Zapatillas convers | negras',
      button:'añadir al carrito',
      price: 20000,
      quantity: 20,
      image: 'img/13.png',
      nature: {
          color: ['white' , 'black'],
          size: ['S', 'M', 'L'],
          type: ['T-shir']
      }
  },
  {
      id: 2,
      name:'Zapatillas convers | rojas',
      button:'añadir al carrito',
      price: 20000,
      quantity:37,
      image: 'img/14.png',
      nature: {
        color: ['white' , 'black'],
        size: ['S', 'M', 'L'],
        type: ['T-shir']
    }
  },
  {
      id: 3,
      name: 'Zapatillas deportivas | mujer',
      button:'añadir al carrito',
      price: 30000,
      quantity: 17,
      image: 'img/9.png',
      nature: {
        color: ['white' , 'black'],
        size: ['S', 'M', 'L'],
        type: ['T-shir']
    }
  },
  {
      id: 4,
      name:' Zapatillas deportivas | hombre',
      button:'añadir al carrito',
      price: 40000,
      quantity:16,
      image: 'img/12.png',
      nature: {
        color: ['white' , 'black'],
        size: ['S', 'M', 'L'],
        type: ['T-shir']
    }
  },
  {
      id: 5,
      name:' Remera deportiva | hombre',
      button:'añadir al carrito',
      price: 17000,
      quantity: 23,
      image: 'img/50.png',
      nature: {
        color: ['white' , 'black'],
        size: ['S', 'M', 'L'],
        type: ['T-shir']
    }
  },
  {
      id: 6,
      name:' Pantalones cortos | hombre',
      button:'añadir al carrito',
      price: 14000,
      quantity: 49,
      image: 'img/32.png',
      nature: {
        color: ['white' , 'black'],
        size: ['S', 'M', 'L'],
        type: ['T-shir']
    }
  },
  {
      id: 7,
      name:'Remera deportiva | hombre',
      button:'añadir al carrito',
      price: 14500,
      quantity: 30,
      image: 'img/53.png',
      nature: {
        color: ['white' , 'black'],
        size: ['S', 'M', 'L'],
        type: ['T-shir']
    }
  },
  {
      id: 8,
      name:' Pantalon | hombre',
      button:'añadir al carrito',
      price: 20000,
      quantity: 40,
      image: 'img/31.png',
      nature: {
        color: ['white' , 'black'],
        size: ['S', 'M', 'L'],
        type: ['T-shir']
    }
  },
  {
      id: 9,
      name:' Pantalon | hombre',
      button:'añadir al carrito',
      price: 40000,
      quantity: 30,
      image: 'img/35.png',
      nature: {
          color: ['white' , 'black'],
          size: ['S', 'M', 'L'],
          type: ['T-shir']
      }
  },
  {
      id: 10,
      name : ' Pantalon cargo azul | hombre',
      button:'añadir al carrito',
      price: 20000,
      quantity: 30,
      image: 'img/36.png',
      nature: {
          color: ['white' , 'black'],
          size: ['S', 'M', 'L'],
          type: ['T-shir']
      }
  },
  {
      id: 11,
      name: 'Vestido animal print | mujer',
      button:'añadir al carrito',
      price: 50000,
      quantity:28,
      image: 'img/46.png',
      nature: {
          color: ['white' , 'black'],
          size: ['S', 'M', 'L'],
          type: ['T-shir']
      }
  },
  {
      id: 12,
      name:'Pollera negra | mujer',
      button:'añadir al carrito',
      price: 40000,
      quanity: 10,
      image: 'img/45.png',
      nature: {
          color: ['white' , 'black'],
          size: ['S', 'M', 'L'],
          type: ['T-shir']
      }
  },
  {
      id: 13,
      name:' Vestido negro corto | mujer',
      button:'añadir al carrito',
      price: 45000,
      quantity: 30,
      image: 'img/43.png',
      nature: {
          color: ['white' , 'black'],
          size: ['S', 'M', 'L'],
          type: ['T-shir']
      }
  },
  {
      id: 14,
      name:'Vestido verde | mujer',
      button:'añadir al carrito',
      price: 50000,
      quantity: 50,
      image:' img/44.png',
      nature: {
          color: ['white' , 'black'],
          size: ['S', 'M', 'L'],
          type: ['T-shir']
      }
  },
  {
      id: 15,
      name:' Buzo celeste | hombre',
      button:'añadir al carrito',
      price: 20000,
      quantity: 45,
      image:' img/38.png',
      nature: {
          color: ['white' , 'black'],
          size: ['S', 'M', 'L'],
          type: ['T-shir']
      }
  },
  {
      i: 16,
      name:' Top deportivo | mujer',
      button:'añadir al carrito',
      price: 20000,
      quantity: 15,
      image:' img/55.png',
      nature: {
          color: ['white' , 'black'],
          size: ['S', 'M', 'L'],
          type: ['T-shir']
      }
  },
  {
      id: 17,
      name:' Body blanco | bebe',
      button:'añadir al carrito',
      price: 15000,
      quantity: 10,
      image: 'img/bebe3.png',
      nature: {
          color: ['white' , 'black'],
          size: ['S', 'M', 'L'],
          type: ['T-shir']
      }
  },
  {
      id: 18,
      name:' Body celeste | bebe',
      button:'añadir al carrito',
      price: 15000,
      quantity: 5,
      image:' img/bebe4.png',
      nature: {
          color: ['white' , 'black'],
          size: ['S', 'M', 'L'],
          type: ['T-shir']
      }
  },
  {
      id: 19,
      name: 'Vestido | bebe',
      button:'añadir al carrito',
      price: 10000,
      quantity: 6,
      image:' img/bebe5.png',
      nature: {
          color: ['white' , 'black'],
          size: ['S', 'M', 'L'],
          type: ['T-shir']
      }
  },
  {
    id: 20,
      name: 'Vestido | bebe',
      button:'añadir al carrito',
      price: 10000,
      quantity: 20,
      image: 'img/bebe6.png',
      nature: {
          color: ['white' , 'black'],
          size: ['S', 'M', 'L'],
          type: ['T-shir']
      }
  },

];

  let productFilter = listProducts;
  showProduct(productFilter);
  function showProduct(productFilter){
      count.innerText = productFilter.length;
      list.innerHTML = '';
      productFilter.forEach(item2 => {
          let newItem2 = document.createElement('div');
          newItem2.classList.add('item2');
  
          // create image
          let newImage = new Image();
          newImage.src = item2.image;
          newItem2.appendChild(newImage);
          // create name product
          let newTitle = document.createElement('div');
          newTitle.classList.add('title');
          newTitle.innerText = item2.name;
          newItem2.appendChild(newTitle);
          // create price
          let newPrice = document.createElement('div');
          newPrice.classList.add('price');
          newPrice.innerText = item2.price.toLocaleString() + ' đ';
          newItem2.appendChild(newPrice);
          // create button add to cart
          let newButton = document.createElement('button');
          newButton.classList.add('addCart');
          newButton.innerText = item2.button;
          newItem2.appendChild(newButton);
  
          // create filter
  
          list.appendChild(newItem2);
      });
  }
  filter.addEventListener('submit', function(event){
      event.preventDefault();
      let valueFilter = event.target.elements;
      productFilter = listProducts.filter(item2 => {
          // check category
          if(valueFilter.category.value != ''){
              if(item2.nature.type != valueFilter.category.value){
                  return false;
              }
          }
          // check color
          if(valueFilter.color.value != ''){
              if(!item.nature.color.includes(valueFilter.color.value)){
                  return false;
              }
          }
          // check name
          if(valueFilter.name.value != ''){
              if(!item2.name.includes(valueFilter.name.value)){
                  return false;
              }
          }
          // check min price
          if(valueFilter.minPrice.value != ''){
              if(item2.price < valueFilter.minPrice.value){
                  return false;
              }
          }
          //  check max price
          if(valueFilter.maxPrice.value != ''){
              if(item2.price > valueFilter.maxPrice.value){
                  return false;
              }
          }
  
  
          return true;
      })
      showProduct(productFilter);

})

      const botonc = document.createElement('button');
      botonc.classList.add('addCart');
      const textBoton = document.createTextNode('Añadir al carrito');
      const lalista = document.querySelector(listProducts);
      
      lalista.appendChild(botonc);
      botonc.appendChild(textBoton);
      






  /**FILTRAR FIN */


