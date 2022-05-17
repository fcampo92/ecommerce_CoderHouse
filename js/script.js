//array carrito
let carritoDeCompras = [];

//nodos guardados
const contenedorProductos = document.getElementById("contenedorProductos");
const contenedorCarrito = document.getElementById("contenedorCarrito");

const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
const precioTotal1 = document.getElementById("precioTotal1");

const selectProductos = document.getElementById('selectProductos');

//filtro
selectProductos.addEventListener('change',()=>{
  if (selectProductos.value == "all"){
    mostrarProductos(dbProductos);
  }else{
    mostrarProductos(dbProductos.filter(el => el.tipo == selectProductos.value))
  }
})

//llamada a mostrar productos cuando carga la pagina
mostrarProductos(dbProductos);

//logica de ecommerce
/* function mostrarProductos(array) {
  //limpia el mostrar productos antes de aplicar el filtro
  contenedorProductos.innerHTML ="";
  //recorre array y genera etiquetas con clases y estilos para ser mostrados en el DOM
  array.forEach((item) => {
    let div = document.createElement("div");
    div.className = "card shadow";
    div.style = "margin: .5rem";
    div.innerHTML += `
                <img src=${item.img} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${item.nombre}</h5>
                        <p class="m-0 card-text">Precio: ${item.precio} $ARS</p>
                        <div class="p-0 m-0" style="text-align: center">
                        <hr>
                        <p id="agregar${item.id}" class="btn btn-success m-0">Agregar al carrito</p>
                        </div>
                    </div>
    `;
    contenedorProductos.appendChild(div);
    //guarda en la variable btnAgregar cual es el boton que hizo clic en +
    let btnAgregar = document.getElementById(`agregar${item.id}`);
    btnAgregar.addEventListener("click", () => {
      agregarAlCarrito(item.id);
    });
  });
} */

function mostrarProductos(array) {
  //limpia el mostrar productos antes de aplicar el filtro
  contenedorProductos.innerHTML ="";
  
  //funcion async trae los datos desde un archivo JSON
  async function fetchProductosJSON() {
    const response = await fetch('./json/dbProductos.json');
    const dbProductos = await response.json();
    return dbProductos;
  
  }

  fetchProductosJSON().then(() =>{
    //recorre array y genera etiquetas con clases y estilos para ser mostrados en el DOM
    array.forEach((item) => {
      let div = document.createElement("div");
      div.className = "card shadow";
      div.style = "margin: .5rem";
      div.innerHTML += `
                  <img src=${item.img} class="card-img-top" alt="...">
                      <div class="card-body">
                          <h5 class="card-title">${item.nombre}</h5>
                          <p class="m-0 card-text">Precio: ${item.precio} $ARS</p>
                          <div class="p-0 m-0" style="text-align: center">
                          <hr>
                          <p id="agregar${item.id}" class="btn btn-success m-0">Agregar al carrito</p>
                          </div>
                      </div>
      `;
      contenedorProductos.appendChild(div);
      //guarda en la variable btnAgregar cual es el boton que hizo clic en +
      let btnAgregar = document.getElementById(`agregar${item.id}`);
      btnAgregar.addEventListener("click", () => {
        agregarAlCarrito(item.id);
      });
    });
    
  });

}




//agrega productos al carrito y verifica si tiene un mismo producto para agregar cantidad de unidades
function agregarAlCarrito(id) {
  let yaEsta = carritoDeCompras.find((item) => item.id == id);
  //verifica si esta un producto en el carrito, si está suma 1 a cantidad sino lo agrega
  if (yaEsta) {
    yaEsta.cantidad = yaEsta.cantidad + 1;
    document.getElementById(`unidad${yaEsta.id}`).innerHTML = `<span id="unidad${yaEsta.id}">Cantidad:${yaEsta.cantidad}</span>`;
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
  } else {
    let productoAgregar = dbProductos.find((element) => element.id == id);
    productoAgregar.cantidad = 1;
    carritoDeCompras.push(productoAgregar);
    mostrarCarrito(productoAgregar);
    actualizarCarrito();
  }

  Swal.fire({
    title: "Producto agregado al carrito",
    icon: 'success',
    showConfirmButton: false,
    timer: 1500

  });

  //localstorage para almacenar el carrito de compras
  localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
}

//muestra el carrito en el modal, se genera el div y se agrega al DOM
function mostrarCarrito(productoAgregar) {
  let div = document.createElement("div");
  div.className = "productoEnCarrito";
  div.innerHTML = `
                    <div class="left">
                    <img src="${productoAgregar.img}" alt="">
                  </div>
                  <div class="center">
                    <h5>${productoAgregar.nombre}</h5>
                    <span class="cantItem" id="unidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</span>
                  </div>
                  <div class="right">
                  <button id="eliminar${productoAgregar.id}" class="material-icons">delete</button>
                    <span>$${productoAgregar.precio}</span>
                  </div>
                  </div>           
  `;

  /* <span>Producto: ${productoAgregar.nombre}</span>
                <span>Precio: ${productoAgregar.precio} $ARS</span>
                <p id="unidad${productoAgregar.id}">Unidades: ${productoAgregar.cantidad}</p>
                <button id="eliminar${productoAgregar.id}" class="material-icons">delete</button> */

  contenedorCarrito.appendChild(div);
  //define la var btnEliminar escucha cual boton hace clic y elimina al nodo padre para eliminar el producto del carrito
  let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`);
  btnEliminar.addEventListener("click", () => {
    if (productoAgregar.cantidad == 1) {
      btnEliminar.parentElement.parentElement.remove();
      carritoDeCompras = carritoDeCompras.filter(
        (item) => item.id != productoAgregar.id
      );
      btnEliminar.parentElement.remove();
      actualizarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
    } else {
      productoAgregar.cantidad = productoAgregar.cantidad - 1;
      document.getElementById(`unidad${productoAgregar.id}`).innerHTML = `<span class="cantItem" id="unidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</span>`;
      actualizarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
    }
    
  });
}
  /* function mostrarCarrito(productoAgregar) {
    let div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
                  <span>Producto: ${productoAgregar.nombre}</span>
                  <span>Precio: ${productoAgregar.precio} $ARS</span>
                  <p id="unidad${productoAgregar.id}">Unidades: ${productoAgregar.cantidad}</p>
                  <button id="eliminar${productoAgregar.id}" class="material-icons">delete</button>
    `;
    contenedorCarrito.appendChild(div);
    //define la var btnEliminar escucha cual boton hace clic y elimina al nodo padre para eliminar el producto del carrito
    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`);
    btnEliminar.addEventListener("click", () => {
      if (productoAgregar.cantidad == 1) {
        btnEliminar.parentElement.remove();
        carritoDeCompras = carritoDeCompras.filter(
          (item) => item.id != productoAgregar.id
        );
        btnEliminar.parentElement.remove();
        actualizarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
      } else {
        productoAgregar.cantidad = productoAgregar.cantidad - 1;
        document.getElementById(
          `unidad${productoAgregar.id}`
        ).innerHTML = `<pid="unidad${productoAgregar.id}">Unidades: ${productoAgregar.cantidad}</p>`;
        actualizarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
      }
      
    });
  } */
//actualiza la cantidad de productos en el boton del carrito 
function actualizarCarrito() {
  contadorCarrito.innerText = carritoDeCompras.reduce(
    (acc, el) => acc + el.cantidad,
    0
  );
  precioTotal.innerText = carritoDeCompras.reduce(
    (acc, el) => acc + el.precio * el.cantidad,
    0
  );
  precioTotal1.innerText = carritoDeCompras.reduce(
    (acc, el) => acc + el.precio * el.cantidad,
    0
  );
}
//trae la infor del localstorage mediante un JSON parse para recordar el carrito 
function recuperar() {
  let recuperarLS = JSON.parse(localStorage.getItem('carrito'));

  if (recuperarLS) {
    recuperarLS.forEach((el) => {
      mostrarCarrito(el);
      carritoDeCompras.push(el);
      actualizarCarrito();
    });
  }
}
//llama a recuperar carrito para recordar el carrito luego de cerrar la pagina
recuperar();
