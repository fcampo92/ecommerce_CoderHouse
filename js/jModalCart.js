//nodo en DOM

//boton para abrir el modal que contiene el carrito
const btnModalCart = document.querySelector("#spanCart");
//boton 'seguir comprando' que cierra el modal para volver a los productos
const btnModalCartClose = document.querySelector('#cerrarModal');
//boton para pasar a finalizar la compra con productos en el carrito
const btnBuy = document.querySelector("#modalFinalizarCompra");
//boton para pagar
const btnPayment = document.querySelector("#submitButton");
const deleteBuy = document.querySelector("#deleteBuy");


//logica del modal para mostrar el carrito de compras
btnModalCart.addEventListener(('click'),() => {
  if (cart == "") {
    swal.fire({
      title: "Carrito vacío",
      icon: "warning",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    document.querySelector(".modalCarrito").style.display = "block";
  }
});

//logica del close del modal
btnModalCartClose.addEventListener(('click'),() => {
  document.querySelector(".modalCarrito").style.display = "none";
})

//logica para pasar a pagar la compra
btnBuy.addEventListener(('click'),()=>{
  if (cart == ''){

    swal.fire({
        title: "Carrito vacío",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500
    })
} else{
    document.querySelector(".modalCheckout").style.display="block";
    document.querySelector(".modalCarrito").style.display="none";
}
})

deleteBuy.addEventListener(('click'),(e)=>{
  e.preventDefault();
  
  swal.fire({
    icon: 'warning',
    title:"Desea cancelar la compra?",
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar'
    
  }).then((result)=>{
    if (result.isConfirmed){
      Swal.fire(
        'Compra Cancelada',
        'Su compra no ha sido efectuada',
        'success'
      )
      document.querySelector(".modalCheckout").style.display="none";
    }
    
  })
  
})

//logica para realizar el pago
btnPayment.addEventListener(('click'),(e)=>{
  e.preventDefault();
  cart = [];
  productsCart.innerHTML = '';
  swal.fire({
    "icon" : "success",
    "title" : "Compra Pagada con éxito",
    "text" : "Muchas gracias por su compra, esperamos que lo disfrute"
    
})

document.querySelector(".modalCheckout").style.display="none";

actualizarCarrito();
})
