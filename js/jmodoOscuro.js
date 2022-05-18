// nodos en DOM
const lightMode = document.querySelector("#lightMode");
const darkMode = document.querySelector("#darkMode");

//1er inicio
darkMode.style.display = "none";

//condicional que recuerda la seleccion del usuario en el local storage
if (localStorage.getItem('darkMode')=='true'){
    lightMode.style.display = "none";
    darkMode.style.display = "inline";
}

if(localStorage.getItem('darkMode')=='false'){
    lightMode.style.display = "inline";
    darkMode.style.display = "none";
}

//logica y eventos de clic
lightMode.addEventListener("click",()=>{
    lightMode.style.display = "none";
    darkMode.style.display = "inline";
    localStorage.setItem('darkMode','true');
});
darkMode.addEventListener("click",()=>{
    darkMode.style.display = "none";
    lightMode.style.display = "inline";
    localStorage.setItem('darkMode', 'false');
});
