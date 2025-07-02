const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

const listaProductos = document.querySelector("#listaProductos");

let productsArray = [];

document.addEventListener('DOMContentLoaded', function (){
    eventListeners();
})

function eventListeners(){
    listaProductos.addEventListener("click", getDataElements);
}

function getDataElements(evento){
    if(evento.target.classList.contains("agregar-producto")){
       const elementHtml = evento.target.parentElement.parentElement;
       // console.log(elementHtml);
       selectData(elementHtml);
    }
}

function selectData(producto){
    const productoObjeto = {
        img: producto.querySelector("img").src,
        title: producto.querySelector("h3").textContent,
        price: parseFloat(producto.querySelector("span").textContent.replace("$","")),
        id: parseInt(producto.querySelector('button[type="button"]').dataset.id, 10),
        quantity: 1
    }

    // console.log(productoObjeto)
    productsArray = [...productsArray, productoObjeto];
    //showAlert
    console.log(productsArray);
    // productsHtml();
}