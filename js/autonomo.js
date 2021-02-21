//variables

const botonEmpezar = document.getElementById("boton-start");
const botonTerminarSesion = document.getElementById("boton-terminar");
const tiempoTotal = document.getElementById("tiempo-total");
const tiempoActual = document.getElementById("tiempo-actual");
const tablaEstadisticas = document.getElementById("tabla-estadisticas");

let isRunning = false;
let cuentaAdelanteEmpezada = false;

let tiempoAcumulado = new Date(2021, 4, 4, 0, 0, 0);
let timer = undefined;

const estados = {
    empezar: "empezar",
    pausado: "pausado",
    continuar: "continuar",
    terminado: "terminado"
};

let botonEmpezarEstado = estados.empezar;
let tiempoSessionTemporal = "";


//funcion generica para animaar botones
//recibe como parametros el elemento y la duracion
//el elemnto tiene que tener la propiedad opacity
//mas abajo esta la funcion de desaparecer
//se podrian juntar las dos con un if dentro del setinterval (aparecer o no)
const animacionAparecer = (elemento, duracion) =>
{
    let intervalo = undefined;
    
    const tiempoDefecto = 100; //animamos cada 100ms
    const opacidadSuma = (tiempoDefecto / duracion);
    let sumatorioOpacidad = 0;

    intervalo = setInterval(() => 
    {

        duracion -= tiempoDefecto;
        //aqui se podria poner un if si suma o resta
        sumatorioOpacidad += opacidadSuma;
        elemento.style.opacity = sumatorioOpacidad;

        if (duracion <= 0)
        {
            clearInterval(intervalo);
        }

    }, tiempoDefecto);

};


const animacionDesaparecer = (elemento, duracion) => 
{
    let intervalo = undefined;


    const tiempoDefecto = 100; //animamos cada 100ms
    const opacidadSuma = (tiempoDefecto / duracion);
    let sumatorioOpacidad = 1;

    intervalo = setInterval(() => {

        duracion -= tiempoDefecto;
        sumatorioOpacidad -= opacidadSuma;
        elemento.style.opacity = sumatorioOpacidad;

        if (duracion <= 0) {
            clearInterval(intervalo);
        }

    }, tiempoDefecto);

};



/// funciones

//funcion donde el botonTerminar se muestra
//lama a la funcion de animacion para sumarle opacidad
//pasamos como parametros tambien el tiempo de duracion
const mostrarBotonTerminarSesion = () =>
{
    if (botonTerminarSesion.disabled === false) return;

    animacionAparecer(botonTerminarSesion, 500);
    botonTerminarSesion.disabled = false;

};


//funcion donde el botonTerminar se oculta
//lama a la funcion de animacion para quitarle opacidad
//pasamos como parametros tambien el tiempo de duracion
const ocultarBotonTerminarSesion = () => 
{

    if (botonTerminarSesion.disabled === true) return;

    animacionDesaparecer(botonTerminarSesion, 300);
    botonTerminarSesion.disabled = true;

};



const empezarCuentaAdelante = () =>
{

    let tiempo = new Date(2021, 4, 4, 0, 0, 0);
    let segundos = 0;

    timer = setInterval( () => 
    {
        if (isRunning === true)
        {
            segundos++;
            tiempo.setSeconds(segundos);
            tiempoActual.textContent = tiempo.getHours().toString().padStart(2, "00") + ":" + tiempo.getMinutes().toString().padStart(2, "00") + ":" + tiempo.getSeconds().toString().padStart(2, "00") ;
            tiempoSessionTemporal = tiempoActual.textContent;

            tiempoAcumulado.setSeconds(segundos);
            tiempoTotal.textContent = tiempoAcumulado.getHours().toString().padStart(2, "00") + ":" + tiempoAcumulado.getMinutes().toString().padStart(2, "00") + ":" + tiempoAcumulado.getSeconds().toString().padStart(2, "00");

        }

    }, 1000);

};

const anadirElementoEstadistica = () =>
{
    
    let nuevoelemento = document.createElement("li");
    nuevoelemento.className = "elemento-estadisticas";
    let subelementop = document.createElement("p");
    subelementop.className = "texto-estadisticas";

    let ahora = Date().split(" ");

    subelementop.textContent = ahora[2] + " " + ahora[1] + " " + " " + ahora[3] +  " " + tiempoSessionTemporal;
    subelementop.textContent = `${ahora[2]} ${ahora[1]} ${ahora[3]} ${ahora[4]} = TIEMPO ${tiempoSessionTemporal}`;
    nuevoelemento.appendChild(subelementop);


    tablaEstadisticas.insertBefore(nuevoelemento, tablaEstadisticas.childNodes[0]);

};


/////evnetos


botonEmpezar.addEventListener('click', () => 
{

    //pasamos de parado a movimiento
    if (botonEmpezarEstado === estados.empezar || 
        botonEmpezarEstado === estados.pausado
        )
    {

        //arrancamos de 0 el reloj
        //comprabamos para que no arranque 2 o mas veces
        //solo arranque en el estado inicial
        isRunning = true;
        if (botonEmpezarEstado === estados.empezar)
        {
            empezarCuentaAdelante();
        }

        botonEmpezarEstado = estados.continuar;
        botonEmpezar.textContent = "PAUSAR";
        
        ocultarBotonTerminarSesion();

        return;

    }

    //pasamos movimiento a parado
    if (botonEmpezarEstado === estados.continuar)
    {
        botonEmpezarEstado = estados.pausado;
        botonEmpezar.textContent = "CONTINUAR";
        isRunning = false;
        mostrarBotonTerminarSesion();

        return;
    }


});



botonTerminarSesion.addEventListener('click', () => 
{


    isRunning = false;
    tiempoActual.textContent = "00:00:00";
    botonEmpezarEstado = estados.empezar;
    botonEmpezar.textContent = "EMPEZAR";

    clearInterval(timer);
    ocultarBotonTerminarSesion();

    anadirElementoEstadistica();

});