// const products
// const found = products.find ( producto => {
//     console.log (producto);
//     return producto === Teclado;
// });

// console.log('Found', found);

document.getElementById("inputSearch").addEventListener("keyup", searchProduct);

function searchProduct(){
    filter = inputSearch.value.toLowerCase();
    li = box_search.getElementsByTagName("li");
    //Recorrer los li
    for ( i = 0; i < li.length; i++){
        products = li[i].getElementsByTagName("products")[0];
        textValue = a.textContent || products.innerText;

        if(textValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        }
        else{
            li[i].style.display = "none";
        }
    }

    };
