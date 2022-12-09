const vaciarcarrito=document.getElementById('vaciarCarrito')
const modalbody=document.querySelector('.modal .modal-body')
const precioTotal = document.querySelector("#precioTotal");
const Terminar=document.querySelector('#Terminar')
let carrito=[]
let carritobuy=[]
document.addEventListener("DOMContentLoaded", () => {
    mostrartodosproductos()
})
//trae los arhivos json
async function mostrartodosproductos(){
    /* Trae el archivo json con todos los productos y los muestra */
    const productosFetch = await fetch("stockProduct.json")
    const productosJson = await productosFetch.json()
    mostrarproducto(productosJson)
}
mostrartodosproductos()
//muestra productos en el index
const mostrarproducto= productos=>{
    carrito.length=0
    productos.forEach(productos=>{
    carrito.push(productos)
    const{id,nombre,desc,precio,cantidad,img}=productos//desestructuracion
    const row=document.querySelector('.row')
    row.innerHTML +=`  
    <div class="col"> 
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">Precio: ${precio}</p>
    <p class="card-text">Descripcion: ${desc}</p>
    <p class="card-text">Cantidad: ${cantidad}</p>
        <button onclick="agregarProductos(${id})" type="button" id="btn">agregar al carrito</button>
    </div>
    </div>`    
}
)}
const agregarProductos=(id)=>{//suma cantidad y no permite q sume la card total
    const existe=carrito.some(prod=> prod.id===id)//.some verifica si existe 
    if (existe) {//si existe el Id suma cantidad++
        const prod=carrito.map(prod =>{//.map recorre el arreglo y suma
            if (prod.id===id) {
                prod.cantidad++;
                carritobuy.push(prod);
            }
        })
    }else{// si el producto no esta suma al arreglo carrito
        const item= carrito.find((prod)=>prod.id===id) //si dentro de stockproduct el id es igual al Id lo agrega al carrito
    }
        Swal.fire({
            icon: 'success',
            title: `compra exitosa `,
            showConfirmButton: false,
            timer: 1000
        })
    
mostrarCarrito()
}
function mostrarCarrito(){//crea la card
    const modalbody=document.querySelector('.modal .modal-body')
    modalbody.innerHTML=' ';//evita q se repita
    carrito.forEach(producto => {
        const{id,nombre,desc,precio,cantidad,img}=producto
        modalbody.innerHTML +=`<div class="card">
        <img src="${img} " class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">${desc}</p>
            <p class="card-text">${precio}</p>
            <p class="card-text">${cantidad}</p>
            <button id="btn" onclick="eliminarProducto(${id})">Eliminar producto</button>`
    });
    precioTotal.textContent = carrito.reduce((acc, prod) =>  acc + prod.cantidad * prod.precio,0);
}        
function eliminarProducto(id) {//elimina los card del mobal
    carrito.forEach(producto=>{
        const burguerid = id;
        carrito = carrito.filter((burguer) => burguer.id !== burguerid);
        Swal.fire({
            icon: 'success',
            title: `Eliminaste producto `,
            showConfirmButton: false,
            timer: 1000
        })})
    mostrarCarrito();
    
}
vaciarcarrito.addEventListener('click',()=>{
    vaciarCarrito()

})
function vaciarCarrito(){//vacia el carrito
    modalbody.innerHTML=' ';
    precioTotal.innerHTML=0;
}

let carritolenth= carrito.length===0  ?  modalbody.innerHTML=`<p>Aun no compraste nada</p>`:'';

Terminar.addEventListener('click',()=>{
    if(carritobuy.length>=2){
        let descuento=(precioTotal.innerHTML*20/100)
        console.log(`el precio Total es de  ${precioTotal.innerHTML}, se desconto un 20%.. en Total te pagas ${descuento}`)
        Swal.fire({
            icon: 'success',
            title: `Compra Exitosa!`,
            text: `Tenes un Descuento del 20% por comprar más de 3 juegos` ,
            showConfirmButton: false,
            timer: 3000
        })
    }else if(carritobuy.length>=1){
        Swal.fire({
            icon: 'success',
            title: `Compra Exitosa!`,
            text: `Tu compra total es de ${precioTotal.innerHTML} ` ,
            showConfirmButton: false,
            timer: 3000
        })
    }else if(carritobuy){
        Swal.fire({
            icon: 'error',
            title: 'Tenes que añadir un juego para terminar de comprar',
            showConfirmButton: false,
            timer: 3000
        })
    }
    })



