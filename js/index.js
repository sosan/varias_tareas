//variables
const botonZombie = document.getElementById("boton-lanzar-zombie");
const botonDivisa = document.getElementById("boton-lanzar-divisa");
const botonCalculator = document.getElementById("boton-lanzar-calculator");
const botonAutonomo = document.getElementById("boton-lanzar-autonomo");


// clicks para el menu
botonZombie.addEventListener("click", () =>
{
    window.location.href = "../zombie.html";
});

botonDivisa.addEventListener("click", () => 
{
    window.location.href = "../divisa.html";
});

botonCalculator.addEventListener("click", () => 
{
    window.location.href = "../calculator.html";
});

botonAutonomo.addEventListener("click", () => 
{
    window.location.href = "../autonomo.html";
});



