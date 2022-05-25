//inicializacion de array de carrito de compras
let cart = [];

//inicializacion de nodos en DOM
const productsList = document.querySelector(".productsContainer");
const productsCart = document.querySelector("#cartContainer");

//nodo de contador de carrito
const countCart = document.querySelector("#contCarrito");

//nodos de filtros
const select = document.querySelector("#select");
const selectOrdenar = document.querySelector("#selectOrdenar");

mostrarProductos();

//evento de filtro de productos
select.addEventListener(('change'),()=>{
  mostrarProductos();
})

selectOrdenar.addEventListener(('change'),()=>{
  mostrarProductos();
})

async function mostrarProductos(){

  productsList.innerHTML = "";

  const response = await fetch("./json/dbProductos.json");
  let data = await response.json();

  //logica de filtro de productos
  if (select.value != 'Todos'){
    data = await data.filter(el=>el.tipo == select.value)
  }

  //logica de filtro de precios de productos
    if (selectOrdenar.value == 'menor')
    data.sort((a,b)=>a.precio-b.precio)
    if (selectOrdenar.value == 'mayor')
    data.sort((a,b)=>b.precio-a.precio)
    if (selectOrdenar.value == 'ascendente'){
      data.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    };
    if (selectOrdenar.value == 'descendente'){
      data.sort(function (a, b) {
        if (b.nombre > a.nombre) {
          return 1;
        }
        if (b.nombre < a.nombre) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    };
    

  data.forEach(item => {
    let div = document.createElement("div");
    div.className = 'card'
        div.innerHTML += `
          
          <div class="topCard">
            <img src=${item.img} alt="">
          </div>
          <div class="botCard">
            <h5>${item.nombre}</h5>
            <span>$${item.precio}</span>
            <p id="agregar${item.id}">Agregar al carrito</p>
          </div>
        
            `;
        productsList.appendChild(div);

         //guarda en la variable btnAgregar cual es el boton que hizo clic en +
         let btnAgregar = document.getElementById(`agregar${item.id}`);
         btnAgregar.addEventListener("click", () => {
           agregarAlCarrito(item.id, data);
         });   
  });
}

//logica para agregar productos al carrito
//agrega productos al carrito y verifica si tiene un mismo producto para agregar cantidad de unidades
function agregarAlCarrito(id, productos) {
  let yaEsta = cart.find((item) => item.id == id);
  //verifica si esta un producto en el carrito, si está suma 1 a cantidad sino lo agrega
  if (yaEsta) {
    yaEsta.cantidad = yaEsta.cantidad + 1;
    document.getElementById(
      `unidad${yaEsta.id}`
    ).innerHTML = `<span id="unidad${yaEsta.id}">Cantidad:${yaEsta.cantidad}</span>`;
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(cart));
  } else {
    let productoAgregar = productos.find((element) => element.id == id);
    productoAgregar.cantidad = 1;
    cart.push(productoAgregar);
    mostrarCarrito(productoAgregar);
    actualizarCarrito();
  }

  Swal.fire({
    title: "Producto agregado al carrito",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });

  //localstorage para almacenar el carrito de compras
  localStorage.setItem("carrito", JSON.stringify(cart));
}

//muestra el carrito en el modal, se genera el div y se agrega al DOM
function mostrarCarrito(productoAgregar) {
  actualizarCarrito();
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
                      <span id="eliminar${productoAgregar.id}" class="delete material-symbols-outlined">delete</span>
                      <span>$${productoAgregar.precio}</span>
                      </div>       
    `;

  productsCart.appendChild(div);

  //define la var btnEliminar escucha cual boton hace clic y elimina al nodo padre para eliminar el producto del carrito
  let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`);
  btnEliminar.addEventListener("click", () => {
    if (productoAgregar.cantidad == 1) {
      btnEliminar.parentElement.parentElement.remove();
      cart = cart.filter((item) => item.id != productoAgregar.id);
      /* btnEliminar.parentElement.parentElement.remove(); */
      actualizarCarrito();
      localStorage.setItem("carrito", JSON.stringify(cart));
    } else {
      productoAgregar.cantidad = productoAgregar.cantidad - 1;
      document.getElementById(
        `unidad${productoAgregar.id}`
      ).innerHTML = `<span class="cantItem" id="unidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</span>`;
      actualizarCarrito();
      localStorage.setItem("carrito", JSON.stringify(cart));
    }
  });
}

//actualiza la cantidad de productos en el boton del carrito
function actualizarCarrito() {
  countCart.innerText = cart.reduce((acc, el) => acc + el.cantidad, 0);
  precioTotal.innerText = cart.reduce(
    (acc, el) => acc + el.precio * el.cantidad,
    0
  );
  precioTotalaPagar.innerText = cart.reduce(
    (acc, el) => acc + el.precio * el.cantidad,
    0
  );
}

//trae la infor del localstorage mediante un JSON parse para recordar el carrito
function recuperar() {
  let recuperarLS = JSON.parse(localStorage.getItem("carrito"));

  if (recuperarLS) {
    recuperarLS.forEach((el) => {
      mostrarCarrito(el);
      cart.push(el);
      actualizarCarrito();
    });
  }
}

//llama a recuperar carrito para recordar el carrito luego de cerrar la pagina
recuperar();
