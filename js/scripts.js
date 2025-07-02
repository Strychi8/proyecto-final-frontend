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
const contenidoProductos = document.querySelector("#contentProducts");

let productsArray = [];

document.addEventListener('DOMContentLoaded', function (){
    eventListeners();
})

function eventListeners(){
    listaProductos.addEventListener("click", getDataElements);
}

function actualizacionContadorCarrito(){
    const contadorCarrito = document.querySelector("#cartCount");
    contadorCarrito.textContent = productsArray.length;

}

function actualizarTotal(){
    const total = document.querySelector("#total");
    let totalProductos = productsArray.reduce((total, producto) => total + producto.price * producto.quantity, 0);
    total.textContent = `$${totalProductos.toFixed(3)}`;
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

    const exists = productsArray.some(producto => producto.id === productoObjeto.id);

    if (exists){
        showAlert("El producto ya existe en el carrito", "error");
        return;
    }

    // console.log(productoObjeto)
    productsArray = [...productsArray, productoObjeto];
    showAlert("El producto fue agregado a su carrito", "success");
    //console.log(productsArray);
    productsHtml();
    actualizacionContadorCarrito();
    actualizarTotal()
}

function productsHtml(){
    cleanHtml();
    productsArray.forEach(producto => {
        const { img, title, price, quantity, id } = producto;

        const tr = document.createElement("tr");

        const tdImg = document.createElement("td");
        const prodImg = document.createElement("img");
        prodImg.src = img;
        prodImg.alt = "Imagen del producto";
        tdImg.appendChild(prodImg);

        const tdTitle = document.createElement("td");
        const prodTitle = document.createElement("p");
        prodTitle.textContent = title;
        tdTitle.appendChild(prodTitle);

        const tdPrice = document.createElement("td");
        const prodPrice = document.createElement("p");
        const nuevoPrecio = price * quantity;
        prodPrice.textContent = `$${nuevoPrecio.toFixed(3)}`;
        tdPrice.appendChild(prodPrice);

        const tdQuantity = document.createElement("td");
        const prodQuantity = document.createElement("input");
        prodQuantity.type = "number";
        prodQuantity.min = "1";
        prodQuantity.value = quantity;
        prodQuantity.dataset.id = id;
        prodQuantity.oninput = actualizarCantidad;
        tdQuantity.appendChild(prodQuantity);

        const tdDelete = document.createElement("td");
        const prodDelete = document.createElement("button");
        prodDelete.type = "button";
        prodDelete.textContent = "X";
        prodDelete.onclick = () => destroyProduct(id)
        tdDelete.appendChild(prodDelete);
        
        tr.append(tdImg, tdTitle, tdPrice, tdQuantity, tdDelete);

        //console.log(tr);
        contenidoProductos.appendChild(tr);

    });
}

function actualizarCantidad (evento){
    // console.log(evento.target);
    const nuevaCantidad = parseInt(evento.target.value, 10);
    // console.log(nuevaCantidad);
    const idProducto = parseInt(evento.target.dataset.id, 10);
    // console.log(idProducto);
    const producto = productsArray.find(prod => prod.id === idProducto);

    if (producto && nuevaCantidad > 0){
        producto.quantity = nuevaCantidad;
    }
    productsHtml();
    actualizarTotal();
}

function destroyProduct(idProducto){
    // console.log("Delete...", idProducto)
    productsArray = productsArray.filter(prod => prod.id !== idProducto);
    // console.log(productsArray);
    showAlert("El producto fue removido de su carrito", "success");
    productsHtml()
    actualizacionContadorCarrito();
    actualizarTotal();
}

function cleanHtml(){
    contenidoProductos.innerHTML = "";
}

function showAlert(message, type){
    const nonRepeatAlert = document.querySelector(".alert");
    if (nonRepeatAlert) nonRepeatAlert.remove();
    const div = document.createElement("div");
    div.classList.add("alert", type);
    div.textContent = message;

    document.body.appendChild(div);

    setTimeout (() => div.remove(), 5000);
}