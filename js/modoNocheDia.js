let modoNoche = document.querySelector("#modoNoche");
let modoDia = document.querySelector("#modoDia");

modoDia.style.display = 'none';

modoNoche.addEventListener("click",()=>{
    modoNoche.style.display = "none";
    modoDia.style.display = "inline-block";
    document.querySelector("body").style.backgroundColor = ("#fff");

})
modoDia.addEventListener("click",()=>{
    modoDia.style.display = "none";
    modoNoche.style.display = "inline-block";
    document.querySelector("body").style.backgroundColor = ("#ccc");

})

