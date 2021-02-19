//varaibles
const calculadora = document.getElementById("calculadora");

//visor de los resultados
const elementoResultados = document.getElementById("visor");

//pequeño historial
const elementosHistorial = document.getElementById("ultimasoperaciones");

//boton atras
document.getElementById("boton-atras").addEventListener("click", () =>
{
    window.history.go(-1);

});


let sumatorio1 = 0;
let sumatorio2 = 0;

//listado de numeros donde los guardamos en formato string, 
let digitosTexto = [];

const NUMERO_MAXIMO_ELEMENTOS = 13;
const operadores = 
{
    "%": "%",
    "ce": "ce", 
    "c": "c", 
    "<": "<", 
    "1/x": "1/x", 
    "x2": "x2", 
    "2Vx": "2Vx", 
    "/": "/", 
    "X": "X", 
    "-": "-",
    "+": "+",
    "+/-": "+/-",
    ",": ",",
    "=": "=",
    "ninguna": "ninguna",
    "calculadora": "calculadora",
    "backspace": "<"
};

//variable donde fijamos los digitos aceptados
//para comprobacion
const listadoDigitos =
{
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
};


//variable donde guardamos la ultima operacion que deberemos realizar
let operacion = operadores.ninguna;

//variable con el tiempo para el timeout al cambio de colores
const TIMEOUT_CAMBIO_COLORES = 40;


const procesarEventos = (idTexto ) => 
{

    //lo puslado es una operador
    if (idTexto in operadores === true) 
    {

        // operacion
        //nos pide el resultado
        if (idTexto === operadores["="]) 
        {

            if (sumatorio2 === undefined) 
            {
                sumatorio2 = asignarSumatario(digitosTexto.join(""));
                console.log("sumatorio2" + sumatorio2);
            }

            const resultado = calcularResultado();
            verResulado(resultado);

            return;
        }

        if (idTexto === operadores["<"] || idTexto === operadores["backspace"]) 
        {
            if (digitosTexto.length <= 0)
            {
                return;
            }

            digitosTexto.pop();
            verDigitos(digitosTexto.join(""));
            return;

        }

        if (idTexto === operadores["ce"])
        {

            digitosTexto = [];
            verDigitos(digitosTexto.join(""));
            return;

        }

        if (idTexto === operadores["c"])
        {
            sumatorio1 = 0;
            sumatorio2 = 0;
            digitosTexto = [];
            operacion = operadores.ninguna;
            elementosHistorial.textContent = "";
            verDigitos(digitosTexto.join(""));
            return;
        }

    

//------------------------- //rehacer--------------------------
        //demas operaciones
        if (sumatorio1 === 0) 
        {
            //pasamos de texto a numero
            sumatorio1 = asignarSumatario(digitosTexto.join(""));
            console.log("sumatorio1" + sumatorio1);
        }

        if (sumatorio1 !== 0 && operacion !== "ninguna")
        {
            sumatorio2 = asignarSumatario(digitosTexto.join(""));
            console.log("sumatorio2" + sumatorio2);

        }



        operacion = operadores[idTexto];
        const resultado = calcularResultado(operadores[idTexto]);
        verResulado(resultado);

        // if (sumatorio1 !== 0 && sumatorio2 !== 0) 
        // {
        //     const resultado = calcularResultado();
        //     verResulado(resultado);

        //     return;
        // }
        // else 
        // {
        //     operacion = operadores[idTexto];


        //     digitosTexto = [];
        //     // borrarDigitos();
            

        // }


    }
    else {
        insertarDigitos(idTexto);
    }

};

const insertarDigitos = (idTexto) =>
{

    if (digitosTexto.length < NUMERO_MAXIMO_ELEMENTOS)
    {
        digitosTexto.push(idTexto);
        verDigitos(digitosTexto.join(""));

    }

};


//funcion donde pasamaos por parametro el numero en formato string
//lo convertimos a numero 
//esa numero fijo lo convertimos a string con separacion de miles
const verDigitos = (numeroTexto) =>
{

    const numeroLocal = (numeroTexto - 0).toLocaleString();
    elementoResultados.textContent = numeroLocal;

    

    
};


//funcion donde sencillamente el input lo ponemos a 0
const borrarDigitos = () => 
{
    elementoResultados.textContent = "0";

};


//funcion donde convertimos el texto a numero en caso de que no sea un numero
//lanzamos un error
const asignarSumatario = (numeroTexto) =>
{

    let numero = numeroTexto - 0;
    if (numero !== Number.NaN) 
    {
        return numero;
    }

    //error
    throw new Error("no posible la conversion " + numeroTexto);

};



//funcion donde realizamos la operacion que nos ha indicado el usuario
//devolvemos el total
const calcularResultado = (currentOperacion) =>
{

    let total = 0;
    
    switch (currentOperacion)
    {
        case operadores["+"]: 
            total = sumatorio1 + sumatorio2;
        break;

        case operadores["-"]:
            total = sumatorio1 - sumatorio2;
        break;
        
        case operadores["/"]:
            if (sumatorio2 === 0)
            {
                total = 0;
            }
            else
            {
                total = sumatorio1 / sumatorio2;

            }
        break;

        case operadores["X"]:
            total = sumatorio1 * sumatorio2;
        break;
    
        case operadores["%"]:
            total = sumatorio1 % sumatorio2;
        break;
        

        default:

        break;
    
    }

    sumatorio1 = total;
    sumatorio2 = undefined;

    return total;


};

//mostramos el resultado
const verResulado = (totalNumero) =>
{


    // const numeroLocal = (numeroTexto - 0).toLocaleString();
    // elementoResultados.textContent = numeroLocal;

    elementoResultados.textContent = totalNumero.toLocaleString();

    if (operacion !== operadores.ninguna) 
    {
        elementosHistorial.textContent += totalNumero.toLocaleString() + " " + operacion;

    }
    else 
    {
        elementosHistorial.textContent = totalNumero.toLocaleString();
    }

};



//funcion que cambia el color de los botones al pulsar en el teclado
//tiene cierto retraso al pulsar para que quede un poco mas visible el cambio
const cambiarColorBoton = (key) => 
{


    const elemento = document.getElementById(key);
    if (elemento.classList.contains("boton-cambiado") === false) 
    {
        elemento.classList.add("boton-cambiado");
    }
    else {
        //para hacerlo un poco mas visual, se para un poco al cambiar el color
        const timeout = setTimeout(() => {
            
            elemento.classList.remove("boton-cambiado");
            clearTimeout(timeout);

        }, TIMEOUT_CAMBIO_COLORES);
    }

};


//////////////////////////////////////////
////////////// EVENTOS
///////////////////////////////////

//funcion donde controla donde hemos hecho click
calculadora.addEventListener("click", (evento) => 
{

    evento.preventDefault();

    const idTexto = evento.target.id;
    procesarEventos(idTexto);

});

//funcion que controla al soltar la tecla, volver a colocar la clase original
document.addEventListener("keyup", (evento) =>
{

    if (evento.key.toLowerCase() in listadoDigitos === true)
    {
        //funcion que comprueba que no tiene el color del boton cambiado
        //cambia de color
        cambiarColorBoton(listadoDigitos[evento.key.toLowerCase()]);
    }

    if (evento.key.toLowerCase() in operadores === true)
    {
        cambiarColorBoton(operadores[evento.key.toLowerCase()]);
    }

});

//controlamos los eventos pulsados por teclado
//tanto digitos como operadores
document.addEventListener("keydown", (evento) =>
{

    if (evento.key.toLowerCase() in listadoDigitos === true)
    {

        //funcion que comprueba que no tiene el color del boton cambiado
        //cambia de color
        cambiarColorBoton(listadoDigitos[evento.key.toLowerCase()]);
        
        // insertarDigitos(listadoDigitos[evento.key.toLowerCase()]);
        procesarEventos(listadoDigitos[evento.key.toLowerCase()]);
    }

    if (evento.key.toLowerCase() in operadores === true)
    {
        procesarEventos(operadores[evento.key.toLowerCase()]);
    }

});

