//inicializacion de array de carrito de compras
let cart = [];

//inicializacion de nodos en DOM
const productsList = document.querySelector(".productsContainer");
const productsCart = document.querySelector("#cartContainer");

const countCart = document.querySelector("#contCarrito");

//llamada a mostrarProductos
mostrarProductos();

//logica de function mostrar productos
function mostrarProductos() {
  productsList.innerHTML = "";

  async function fetchProductosJSON() {
    const response = await fetch("./json/dbProductos.json");
    const dbProductos = await response.json();
    return dbProductos;
  }

  fetchProductosJSON().then((productos) => {
    //recorre array y genera etiquetas con clases y estilos para ser mostrados en el DOM

    productos.forEach((item) => {
      let div = document.createElement("div");
      div.innerHTML += `
        <div class="card">
        <div class="topCard">
          <img src=${item.img} alt="">
        </div>
        <div class="botCard">
          <h5>${item.nombre}</h5>
          <span>$${item.precio}</span>
          <p id="agregar${item.id}">Agregar al carrito</p>
        </div>
      </div>

          `;
      productsList.appendChild(div);
      //guarda en la variable btnAgregar cual es el boton que hizo clic en +
      let btnAgregar = document.getElementById(`agregar${item.id}`);
      btnAgregar.addEventListener("click", () => {
        agregarAlCarrito(item.id, productos);
      });
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
                      <span id="eliminar${productoAgregar.id}" class="material-symbols-outlined">delete</span>
                      <span>$${productoAgregar.precio}</span>
                      </div>       
    `;

  productsCart.appendChild(div);

  //define la var btnEliminar escucha cual boton hace clic y elimina al nodo padre para eliminar el producto del carrito
  let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`);
  console.log("hola");
  btnEliminar.addEventListener("click", () => {
    if (productoAgregar.cantidad == 1) {
      btnEliminar.parentElement.parentElement.remove();
      cart = cart.filter((item) => item.id != productoAgregar.id);
      btnEliminar.parentElement.remove();
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
    countCart.innerText = cart.reduce(
    (acc, el) => acc + el.cantidad,
    0
  );
  precioTotal.innerText = cart.reduce(
    (acc, el) => acc + el.precio * el.cantidad,
    0
  );
  precioTotal1.innerText = cart.reduce(
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
