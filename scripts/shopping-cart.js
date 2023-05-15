const dropdownMenuContainer = document.getElementById("dropdown-menu-container");
const productsContainer = document.getElementById("container-products");
let paintButtons = false;
let cart = [];
assignValueToArray();
paintCartButtonsProductsAndTotal();

const addProductToCart = e => {
    e.preventDefault();
    if(e.target.tagName === "BUTTON"){
        const selectedProduct = products.find(product => (
            product.id === e.target.id
        )); 
        if(isContainedInTheCart(selectedProduct.id) !== undefined){
            if(isStockAvailable(selectedProduct)){
                assignAmount(selectedProduct.id);
                /* alert(`Se agrego una unidad de ${selectedProduct.title} con éxito al carrito.`); */
                Swal.fire({
                    title: 'Éxito',
                    text: `¡Agregaste una unidad de ${selectedProduct.title}!`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 3000,
                })
            }    
        }else{
            cart.push(selectedProduct);
            /* alert(`Se agrego una unidad de ${selectedProduct.title} con éxito al carrito.`); */
            Swal.fire({
                title: 'Éxito',
                text: `¡Agregaste una unidad de ${selectedProduct.title}!`,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000,
            })
        }
        localStorage.setItem("productsCart",JSON.stringify(cart));
        paintCartButtonsProductsAndTotal();
        createProductsCards(products);
    }
};

productsContainer.addEventListener("click", addProductToCart);

function assignValueToArray (){
    if(!(JSON.parse(localStorage.getItem("productsCart")) === null)){
        cart = JSON.parse(localStorage.getItem("productsCart"));
    };
}

function paintCartButtonsProductsAndTotal(){
    if(cart.length != 0){        
        paintCartPreview();

        if(!paintButtons){
            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("d-flex");
            buttonContainer.classList.add("justify-content-end");
            buttonContainer.innerHTML = `
                <button class="p-1 m-1 btn btn-danger border border-dark border-2" id = "empty-cart">Vaciar carrito</button>
                <button class="p-1 m-1 btn btn-danger border border-dark border-2" id = "finish-buy">Continuar con la compra</button>`
            dropdownMenuContainer.appendChild(buttonContainer);
            paintButtons = true;
        }

        const emptyCartButton = document.getElementById("empty-cart");
        emptyCartButton.addEventListener("click", emptyCart);

        const totalContainer = document.getElementById("total-container");
        totalContainer.classList.add("d-flex");
        totalContainer.classList.add("justify-content-end");
        totalContainer.classList.add("mt-2")
        totalContainer.innerHTML = `
            <div class = "fs-4">
                <p>
                    Total:
                </p>
            </div>
            <div class = "mx-2 fs-4 fw-bold">
                <p>
                    $ ${totalValueOfCart(cart).toFixed(2)}
                </p>  
            </div>
            ` 
        dropdownMenuContainer.insertBefore(totalContainer, dropdownMenuContainer.children[dropdownMenuContainer.childElementCount - 1]);
    }
}

function paintCartPreview(){
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ``;
    productContainer.classList.add("modified-list");
    cart.forEach(product => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("d-flex");
        cartItem.classList.add("justify-content-between");
        cartItem.classList.add("align-items-center");
        cartItem.innerHTML = `
            <img src=${product.image} class="items" alt="${product.title}">
            <p class="items">${product.title}</p>
            <div class="items d-flex justify-content-evenly">
                <p class="border border-dark border-2 h-25 w-25 bg-danger text-white cursor" id="less-amount-${product.id}">-</p>
                <p>${product.amount} u</p>
                <p class="border border-dark border-2 h-25 w-25 bg-danger text-white cursor" id="more-amount-${product.id}">+</p>
            </div>                                    
            <p class="items">$ ${(product.amount * product.price).toFixed(2)}</p>`;
        productContainer.appendChild(cartItem);
        const lessAmount = document.getElementById(`less-amount-${product.id}`);
        lessAmount.addEventListener("click", lessAmountOfProduct);
        const moreAmount = document.getElementById(`more-amount-${product.id}`);
        moreAmount.addEventListener("click", moreAmountOfProduct);
    });
};

function lessAmountOfProduct(e){
    cart.forEach(product => {if(product.id === e.target.id.slice(12)){
        if(product.amount > 1){
            product.amount--;
            /* alert(`Se quitó una unidad de ${product.title} con éxito del carrito.`); */
            Swal.fire({
                title: 'Éxito',
                text: `¡Quitaste una unidad de ${product.title}!`,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000,
            })
            createProductsCards(products);
        }else{
            /* alert(`No se puede quitar mas unidades de ${product.title}.`); */
            Swal.fire({
                title: 'Error',
                text: `¡No puedes quitar la última unidad de ${product.title}!`,
                icon: 'error',
                showConfirmButton: false,
                timer: 3000,
            })
        }
    }});
    localStorage.setItem("productsCart",JSON.stringify(cart));
    paintCartButtonsProductsAndTotal();
}

function moreAmountOfProduct(e){
    cart.forEach(product => {if(product.id === e.target.id.slice(12)){
        if(product.amount != product.stock){
            product.amount++;
            /* alert(`Se agregó una unidad de ${product.title}con éxito del carrito.`); */
            Swal.fire({
                title: 'Éxito',
                text: `¡Agregaste una unidad de ${product.title}!`,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000,
            })
            createProductsCards(products);
        }else{
            /* alert(`Por el momento no contamos con mas unidades de ${product.title}.`); */
            Swal.fire({
                title: 'Advertencia',
                text: `¡Por el momento no contamos con mas unidades de ${product.title}!`,
                icon: 'warning',
                showConfirmButton: false,
                timer: 3000,
            })
        }
    }});
    localStorage.setItem("productsCart",JSON.stringify(cart));
    paintCartButtonsProductsAndTotal();
}

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
        /*  alert(`Por el momento no contamos con stock disponible para agregar mas unidades de ${object.title}`); */
        Swal.fire({
            title: 'Advertencia',
            text: `¡Por el momento no contamos con mas unidades de ${object.title}!`,
            icon: 'warning',
            showConfirmButton: false,
            timer: 3000,
        })
        return false;
    }

    return true;
}

function totalValueOfCart(cart){
    let total = 0;
    cart.forEach(product => {
        total += product.amount * product.price;
    })

    return total;
}

function emptyCart(e){
    localStorage.removeItem("productsCart");
    location.reload();
}