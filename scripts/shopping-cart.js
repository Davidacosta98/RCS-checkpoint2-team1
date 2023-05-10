let cart = [];
assignValueToArray();

const addProductToCart = e => {
    e.preventDefault(); //Previene la recarga automática al presionar el botón, por lo general se usa en botones de formularios.
    if(e.target.tagName === "BUTTON"){
        /*console.log("Estoy presionando el boton de la card",e.target.id); */
        const selectedProduct = products.find(product => (
            product.id === e.target.id
        )); // Busca y retorna el primer producto que tenga el Id del botón presionado en la card correspondiente.
        //Agrega un nuevo producto al final del array y guarda ese array en localStorage.
        if(isContainedInTheCart(selectedProduct.id) !== undefined){
            if(isStockAvailable(selectedProduct)){
                assignAmount(selectedProduct.id);
                alert(`Se agrego una unidad de ${selectedProduct.title} con éxito al carrito.`);
            }    
        }else{
            cart.push(selectedProduct);
            alert(`Se agrego una unidad de ${selectedProduct.title} con éxito al carrito.`);
        }
        localStorage.setItem("productsCart",JSON.stringify(cart));
        paintCartPreview();
    }
};

containerProducts.addEventListener("click", addProductToCart);

function assignValueToArray (){
    if(!(JSON.parse(localStorage.getItem("productsCart")) === null)){
        cart = JSON.parse(localStorage.getItem("productsCart"));
    };
}

const dropdownMenuContainer = document.getElementById("dropdown-menu-container");

if(cart.length != 0){
    paintCartPreview();
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("d-flex");
    buttonContainer.classList.add("justify-content-end");
    buttonContainer.innerHTML = `
        <button class="p-1 m-1 btn btn-danger border border-dark border-2">Vaciar carrito</button>
        <button class="p-1 m-1 btn btn-danger border border-dark border-2">Continuar con la compra</button>`
    dropdownMenuContainer.appendChild(buttonContainer);
} 

function paintCartPreview(){
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ``;
    cart.forEach(product => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("d-flex");
        cartItem.classList.add("justify-content-between");
        cartItem.innerHTML = `
            <img src=${product.image} class="items" alt="${product.title}">
            <p class="items">${product.title}</p>
            <div class="items d-flex justify-content-evenly">
                <p>-</p>
                <p>${product.amount} u</p>
                <p>+</p>
            </div>                                    
            <p class="items">$ ${(product.amount * product.price).toFixed(2)}</p>`;
        productContainer.appendChild(cartItem);
    });
};

function assignAmount(id){
    cart.forEach(product => {if(product.id === id){product.amount++}});
};

function isContainedInTheCart(id){
   const itemFound = cart.find(product => (product.id === id));
   return itemFound; 
}

function isStockAvailable(object){
    const cartProduct = cart.find(product => (product.id === object.id));
    const apiProduct = products.find(product => (product.id === object.id));
    
    if(parseInt(cartProduct.amount) === parseInt(apiProduct.stock)){
        alert(`Por el momento no contamos con stock disponible para agregar mas unidades de ${object.title}`);
        return false;
    }

    return true;
}

