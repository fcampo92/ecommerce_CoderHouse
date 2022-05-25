let login = document.querySelector("#login");
let user = document.querySelector("#user");

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
          login.classList = 'none'
          login.id = "user"
          login.innerText = `Hi, ${user}`
      }
    })
  });

