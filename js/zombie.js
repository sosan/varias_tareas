//variables
const botonAtras = document.getElementById("boton-atras-zombie");
const jugadorImagen = document.getElementById("jugador");
const finalbien = document.getElementById("finalbien");
const finalmal = document.getElementById("finalmal");

//tiempo
const tiempoTexto = document.getElementById("tiempo");

//variables para los enmigos
const zonaEnemigos = document.getElementById("zonaenemigos");
const uri_imagen_enemigo = "../images/zombie/enemigo.svg";
const nombre_clase_enemigo = "enemigo";


let matrizPosicionEnemigos = [
    [1, 1],

];

let offsetEnemigo = 15;

//tiempo que se para el tiempo
let segundosTiempoFinal = 100000; //100000 ms 1:37

//posicion global del jugador
let xPosPlayer = 114;
let yPosPlayer = 60;

let puntuajePlayer = 0;

const desplazamientoPlayerConstante = 15;

let terminadaPartida = false;

//variable con los movimeintos del jugador
const teclasDireccion =
{
    Arriba: ["arrowup", "w"],
    Abajo: ["arrowdown", "s"],
    Izquierda: ["arrowleft", "a"],
    Derecha: ["arrowright", "d"],
    Disparo: []
}

//necesario para realizar cierto movimiento en diagonal
let pulsadoArriba = false;
let pulsadoAbajo = false;
let pulsadoIzquierda = false;
let pulsadoDerecha = false;

//variables para los margenes
const margenSuperior = 60;
const margenInferior = 70;
const margenDerecha = 60;
const margenIzquierda = 20;


let rayosArea = document.getElementById("rayos");
rayosArea.width = window.innerWidth;
rayosArea.height = window.innerHeight;





//////////////////// EVENTOS
//////////////////////////////////////////////////

zonaEnemigos.addEventListener("click", (evento) =>
{
    
    
    const idenemigo = evento.target.id;

    if (idenemigo)
    {
        evento.clientX
        evento.clientY

        let rayos = rayosArea.getContext("2d");


        

        if (rayos)
        {
            rayos.lineWidth = 2;
            rayos.strokeStyle = "#fff";
            rayos.beginPath();
    
            rayos.moveTo(xPosPlayer + 15, yPosPlayer + 10);
            rayos.lineTo(evento.clientX, evento.clientY);
            rayos.stroke();

            console.log("posicionx" + rayos);

            puntuajePlayer += 10;

            setTimeout(() => {
                rayos.clearRect(0, 0, window.innerWidth, window.innerHeight);
                
            }, 150);
            

        }
        const enemigoclickeado = document.getElementById(idenemigo);
        enemigoclickeado.remove();
        


    }




});

//boton atras
botonAtras.addEventListener("click", () =>
{
    window.history.go(-1);
});


document.addEventListener("keyup", (evento) => {
    evento.preventDefault();

    //si hemos terminado la partida, ya no es necesario avanzar mas
    if (terminadaPartida === true) return;

    switch (evento.key.toLowerCase()) {
        case teclasDireccion.Arriba[0]:
        case teclasDireccion.Arriba[1]:
            pulsadoArriba = false;
            break;

        case teclasDireccion.Abajo[0]:
        case teclasDireccion.Abajo[1]:
            pulsadoAbajo = false;
            break;

        case teclasDireccion.Izquierda[0]:
        case teclasDireccion.Izquierda[1]:
            pulsadoIzquierda = false;
            break;

        case teclasDireccion.Derecha[0]:
        case teclasDireccion.Derecha[1]:
            pulsadoDerecha = false;
            break;

        default:

            break;
    }


});

document.addEventListener("keydown", (evento) => {
    evento.preventDefault();


    //si hemos terminado la partida, ya no es necesario avanzar mas
    if (terminadaPartida === true) return;

    switch (evento.key.toLowerCase()) {
        case teclasDireccion.Arriba[0]:
        case teclasDireccion.Arriba[1]:
            pulsadoArriba = true;
            break;

        case teclasDireccion.Abajo[0]:
        case teclasDireccion.Abajo[1]:
            pulsadoAbajo = true;
            break;

        case teclasDireccion.Izquierda[0]:
        case teclasDireccion.Izquierda[1]:
            pulsadoIzquierda = true;
            break;

        case teclasDireccion.Derecha[0]:
        case teclasDireccion.Derecha[1]:
            pulsadoDerecha = true;
            break;

        default:

            break;
    }

});
//////////////////////////////////////
///////////////////////////////////////////// INTERVALOS
///////////////////////////////////////



const intervaloMostrarPlayer = setInterval(() => 
{
    if (terminadaPartida === true) return;

    mostrarPlayer();

}, 100);


//mostrar tiempo y puntuaje del player
const intervaloDibujarTiempo = setInterval(() => 
{
    if (terminadaPartida === true) return;

    mostrarTiempoPuntuaje();

}, 100);

// //mostrar tiempo y puntuaje del player
// const intervaloMostrarPuntuaje = setInterval(() =>
// {
//     if (terminadaPartida === true) return;

//     mostrarPuntuaje();

// }, 200);


//instanciar enemigos en pantalla
const intervaloInstanciarEnemigos = setInterval(() => {
    if (terminadaPartida === true) return;

    instanciarEnemigos();

}, 1000);


//--- funciones de los intervalos
const instanciarEnemigos = () =>
{

    let imagenEnemigo = document.createElement("img");
    imagenEnemigo.src = uri_imagen_enemigo;
    imagenEnemigo.classList.add(nombre_clase_enemigo);
    
    let posicionYRand = Math.random() * window.innerHeight;
    let posicionXRand = Math.random() * window.innerWidth;
    
    if (posicionYRand <= offsetEnemigo)
    {
        posicionYRand = offsetEnemigo;
    }

    if (posicionYRand >= window.innerHeight - (margenSuperior + margenInferior))
    {
        posicionYRand = window.innerHeight - (margenSuperior + margenInferior) + offsetEnemigo;
    }

    
    if (posicionXRand <= margenIzquierda) {
        posicionXRand = margenIzquierda;
    }

    
    if (posicionXRand >= window.innerWidth - margenDerecha) 
    {
        posicionXRand = window.innerWidth - margenDerecha;
    }
    
    
    imagenEnemigo.id = `${Math.round(posicionXRand)} - ${Math.round(posicionYRand)}`

    imagenEnemigo.style.transform = `translate(${posicionXRand}px, ${posicionYRand}px )`;

    zonaEnemigos.appendChild(imagenEnemigo);


};


const mostrarPlayer = () => {

    //si pulsas arriaba y abajo se queda en 0
    if (pulsadoArriba === true) {

        //comprobamos que no hemos sobrepasado el limite
        if (yPosPlayer <= (window.innerHeight - (window.innerHeight - margenSuperior))) {
            return;
        }

        //comprobamos el siguiente moviemiento que no se quede a medias dentro de la pared
        if ((yPosPlayer - desplazamientoPlayerConstante) <= (window.innerHeight - (window.innerHeight - margenSuperior))) {
            yPosPlayer = window.innerHeight - (window.innerHeight - margenSuperior);
        }
        else {
            yPosPlayer -= desplazamientoPlayerConstante;

        }


    }

    if (pulsadoAbajo === true && pulsadoArriba === false) {
        if (yPosPlayer >= (window.innerHeight - margenInferior)) {
            return;
        }

        if ((yPosPlayer + desplazamientoPlayerConstante) >= (window.innerHeight - margenInferior)) {
            yPosPlayer = window.innerHeight - margenInferior;
        }
        else {
            yPosPlayer += desplazamientoPlayerConstante;

        }

    }

    if (pulsadoDerecha === true && pulsadoIzquierda === false) {

        if (xPosPlayer >= window.innerWidth) {
            return;
        }

        if ((xPosPlayer + desplazamientoPlayerConstante) >= (window.innerWidth - margenDerecha)) {
            xPosPlayer = window.innerWidth - margenDerecha;
        }
        else {
            xPosPlayer += desplazamientoPlayerConstante;

        }

    }

    if (pulsadoIzquierda === true) {

        if (xPosPlayer <= 20) {
            return;
        }

        if ((xPosPlayer - desplazamientoPlayerConstante) <= window.innerWidth - (window.innerWidth - margenIzquierda)) {
            xPosPlayer = window.innerWidth - (window.innerWidth - margenIzquierda);
        }
        else {
            xPosPlayer -= desplazamientoPlayerConstante;

        }

    }


    jugadorImagen.style.transform = `translate(${xPosPlayer}px, ${yPosPlayer}px)`;

};



const mostrarMensajeFinal = () => {

    if (finalmal.classList.contains("nover") === false || finalbien.classList.contains("nover") === false) {
        return;
    }

    if (puntuajePlayer >= 0) {
        finalbien.classList.remove("nover");
        finalbien.classList.add("ver");

    }
    else {

        finalmal.classList.remove("nover");
        finalmal.classList.add("ver");
    }

};

const mostrarTiempoPuntuaje = () => {

    const fechaDestino = new Date(2021, 4, 23, 12, 0, 0, segundosTiempoFinal);

    let segundos = fechaDestino.getSeconds().toString().padStart(2, "00");
    let minutos = fechaDestino.getMinutes().toString().padStart(2, "00");

    // let segundos = ("0" + fechaDestino.getSeconds()).slice(-2);
    // let minutos = ("0" + fechaDestino.getMinutes()).slice(-2);

    tiempoTexto.textContent = "Tiempo: " + minutos + ":" + segundos + " Puntuaje: " + puntuajePlayer;

    segundosTiempoFinal -= 100;

    if (segundosTiempoFinal < 0) {
        terminadaPartida = true;
        segundosTiempoFinal = 0;

        //paramos los intervalos
        clearInterval(intervaloDibujarTiempo);
        clearInterval(intervaloMostrarPlayer);

        //mostramos mensaje de enorabuena o vuelva a intentarlo
        mostrarMensajeFinal();
    }

};


// const mostrarPuntuaje = () => 
// {
    
//     const texto = tiempoTexto.textContent.slice(0, 13) + " Puntuaje: " + puntuajePlayer;
//     tiempoTexto.textContent = texto;

// };






