const products = [
    {
        "amount": "1",
        "id": "1",
        "title": "Draconic K530 60%",
        "category": "Teclado",
        "description": "Es un teclado mecánico, con iluminación RGB, inalámbrico y es de tamaño reducido (60%). Su peso ligero, dimensiones reducidas y conectividad wireless lo hacen el teclado ideal para el gamming. ",
        "price": "21499",
        "stock": "4",
        "image": "https://redragon.es/content/uploads/2021/05/DRACONIC.png"
    },
    {
        "amount": "1",
        "id": "2",
        "title": "Dyaus gamer K509",
        "category": "Teclado",
        "description": "El Dyaus es un teclado de membrana silencioso, robusto y muy confiable.\nLa banda luminosa que rodea y recorre toda la estructura le otorga un brillo incuestionablemente único.",
        "price": "11249.87",
        "stock": "10",
        "image": "https://redragon.es/content/uploads/2021/04/DYAUS-1.png"
    },
    {
        "amount": "1",
        "id": "3",
        "title": "Gainer M610",
        "category": "Mouse",
        "description": "El diseño del Gainer busca maximizar la precisión del movimiento. Los orificios laterales mejoran el agarre y su forma redondeada se adapta muy bien a todos los tamaños de mano. ",
        "price": "6100",
        "stock": "7",
        "image": "https://redragon.es/content/uploads/2021/04/GAINER.png"
    },
    {
        "amount": "1",
        "id": "4",
        "title": "Kunlun L P006",
        "category": "MousePad",
        "description": "Los 88 x 42 cm de la Kunlun L son más que suficientes para que goces de una libertad de movimiento plena, sin preocuparte por los límites.",
        "price": "7990.87",
        "stock": "5",
        "image": "https://www.venex.com.ar/products_images/1534178547_p00681.png"
    },
    {
        "amount": "1",
        "id": "5",
        "title": "Lamia 2 H320",
        "category": "Auricular",
        "description": "Los lamia realmente destacan por tres atributos de construcción: son muy cómodos, son muy bonitos y son muy robustos. ",
        "price": "19489.99",
        "stock": "3",
        "image": "https://redragon.es/content/uploads/2021/04/LAMIA.png"
    },
    {
        "amount": "1",
        "id": "6",
        "title": "Storm Elite M988",
        "category": "Mouse",
        "description": "Más ágil, más rápido y más preciso que los demás, el Storm Elite está concebido para ser el mejor y lo consigue. Su sensor 3389 Pixart es uno de los mejores sensores que podrás encontrar.",
        "price": "14299",
        "stock": "7",
        "image": "https://redragon.es/content/uploads/2021/04/STORM-ELITE.png"
    },
    {
        "amount": "1",
        "id": "7",
        "title": "Suzaku P003",
        "category": "MousePad",
        "description": "Su construcción en tela entrelazada y fibras de seda garantizan un máximo deslizamiento. Su fondo de caucho lo hace antideslizante y adaptable a cualquier superficie. ",
        "price": "7698",
        "stock": "9",
        "image": "https://www.venex.com.ar/products_images/1534178785_jkjhkl.png"
    },
    {
        "amount": "1",
        "id": "8",
        "title": "Zeus X RGB ",
        "category": "Auricular",
        "description": "Potentes, hermosos, totales. Con retroiluminación RGB, un micrófono excepcional, construcción cómoda y robusta, y, lo más importante, una calidad de sonido arrolladora.",
        "price": "27659.99",
        "stock": "2",
        "image": "https://static.wixstatic.com/media/71a6c2_759ee69e7e7c401d987a64ad8f19d8f0~mv2.png/v1/fill/w_1200,h_1200,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/H510RGB%201%20(1).png"
    }
];

const containerProducts = document.getElementById("container-products");

const createProductsCards = (products) => {
    let flag = 1;
    let counter = 0;
    const arrayfordefinevariable = [];

    containerProducts.innerHTML = "";

    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    carouselItem.classList.add("bg-color-black");
    carouselItem.classList.add("active");
    containerProducts.appendChild(carouselItem);

    arrayfordefinevariable[counter] = document.createElement("div");
    arrayfordefinevariable[counter].classList.add("d-flex");
    arrayfordefinevariable[counter].classList.add("justify-content-evenly");
    arrayfordefinevariable[counter].classList.add("flex-wrap");
    carouselItem.appendChild(arrayfordefinevariable[counter]);

    products.forEach(product => {

        const addProduct = () => {
            const containerCard = document.createElement("div");
            containerCard.classList.add("card");
            containerCard.classList.add("col-sm-12");
            containerCard.classList.add("card-modified");
            containerCard.classList.add("m-1");
            containerCard.classList.add("bg-dark");
    
            containerCard.innerHTML = `
                <div class="col-8 align-self-center container-image w-100 bg-light">
                    <img src=${product.image} class="card-img-top h-100 m-0" alt=${product.title}> 
                </div>     
                <div class="card-body d-flex flex-column justify-content-between text-white">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class = "d-flex justify-content-between align-items-center">
                        <p class="fs-2 h-100 m-0 p-0">$ ${parseFloat(product.price).toFixed(2)}</p>
                        <div class="h-100 fs-2 cursor">
                            ${soldUnits(product.id)} 
                            <i class="bi bi-cart4"></i>
                        </div>
                    </div>
                    <button class="btn btn-danger" id="${product.id}">¡Agregar al carrito!</button>
                </div>
            `;
    
            arrayfordefinevariable[counter].appendChild(containerCard);
        }

        if(arrayfordefinevariable[counter].childElementCount < 3){
            addProduct();
        }else{
            flag = 0;
        }

        if (flag == 0){
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            carouselItem.classList.add("bg-color-black");
            containerProducts.appendChild(carouselItem);
            
            counter++;

            arrayfordefinevariable[counter] = document.createElement("div");
            arrayfordefinevariable[counter].classList.add("d-flex");
            arrayfordefinevariable[counter].classList.add("justify-content-evenly");
            arrayfordefinevariable[counter].classList.add("flex-wrap");
            carouselItem.appendChild(arrayfordefinevariable[counter]);

            addProduct();

            flag = 1;
        }
    });
}

createProductsCards(products);

function soldUnits(productId){
    let amount;
    if(isContainedInTheCart(productId) != undefined){
        cart.forEach(productCart => {
            if(productCart.id === productId){
                amount = productCart.amount;
            }
        })
    }else{
        amount = 0;
    }
    return amount;
}

const developers = [
    {
        id : 1,
        devName : "Pablo Díaz",
        profileGithub : "#",
        profileLinkedin : "#"
    },
    {
        id : 2,
        devName : "Miguel Palomares",
        profileGithub : "#",
        profileLinkedin : "#"
    },
    {
        id : 3,
        devName : "Daniela Gonzalez",
        profileGithub : "#",
        profileLinkedin : "#"
    },
    {
        id : 4,
        devName : "David Acosta",
        profileGithub : "#",
        profileLinkedin : "#"
    }
];

const addDeveloper = (developers) => {
    const sectionFooter = document.getElementById ("section-footer-id");

    developers.forEach((developer) => {
        const developerSection = document.createElement("div");
        developerSection.classList.add("developer-section");
        
        developerSection.innerHTML = `
            <a href=${developer.profileGithub} class="github-link">
                <i class="bi bi-github"></i>
            </a>
            <a href=${developer.profileLinkedin} class="linkedin-link">
                <i class="bi bi-linkedin"></i>
            </a>
            <p class="name-developer">${developer.devName}</p>
        `;

        sectionFooter.appendChild(developerSection);
    });
}

addDeveloper(developers);