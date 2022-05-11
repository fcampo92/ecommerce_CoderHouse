let login = document.querySelector("#login");

  login.addEventListener("click",()=>{
  

    Swal.fire({
      title: '<strong>Bienvenido</strong>',
      input: 'text',
      icon: 'info',
      html:
        'Ingrese Usuario',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText:'Cancelar',
      preConfirm : (user)=>{
          login.innerText = `Hi,${user}`
      }
    })
  });


  Toastify({

    text: "Bienvenido",
    duration: 3000,
    gravity : "bottom",
    position: "left",
    
    }).showToast();