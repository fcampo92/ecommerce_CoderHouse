// DOM

//btn cerrar modal "seguir comprando"
var cerrarModal = document.querySelector("#cerrarModal");

//btn iniciar compra en modal "Finalizar compra"
var iniciarCompra = document.querySelector("#modalFinalizarCompra");

//evento clic sobre carrito para visualizarlo

myBtn.addEventListener("click",()=>{
    
    if (carritoDeCompras == ''){
        swal.fire({
            title: "Carrito vacío",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500
        })
    }else{
        document.querySelector(".modalCarrito").style.display="block"};
    })


//evento para cerrar modal y seguir comprando
cerrarModal.addEventListener("click", ()=>{document.querySelector(".modalCarrito").style.display="none"});



//evento abrir modal para pagar
iniciarCompra.addEventListener("click",()=>{
    if (carritoDeCompras == ''){

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
