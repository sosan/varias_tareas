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

let isSumatorio1Completed = false;
let isSumatorio2Completed = false;

// let borrarVisor = false;



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
    "*": "*",
    "-": "-",
    "+": "+",
    "+/-": "+/-",
    
    "=": "=",
    "enter": "=",
    "ninguna": "ninguna",
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
    ",": "."
};


//variable donde guardamos la ultima operacion que deberemos realizar
let operacionAnterior = operadores.ninguna;

//variable con el tiempo para el timeout al cambio de colores
const TIMEOUT_CAMBIO_COLORES = 40;

let pulsadoIgual = false;

//pulsado sobre el =
const clickIgual = (idTexto) =>
{
    if (isSumatorio1Completed === false)
    {
        return;
    }

    sumatorio2 = asignarSumatario(digitosTexto.join(""));
    if (sumatorio2 === 0)
    {
        return;
    }
    isSumatorio2Completed = true;


    let resultado = calcularResultado(operacionAnterior);
    verResulado(resultado, sumatorio1, sumatorio2, operadores[idTexto]);

    pulsadoIgual = true;
    operacionAnterior = operadores.ninguna;
    sumatorio1 = resultado;
    sumatorio2 = 0;

    isSumatorio1Completed = false;
    isSumatorio2Completed = false;

    digitosTexto = [];

    insertarDigitos(sumatorio1.toString());

};

//borramos un digito
const clickBackspace = () =>
{
    if (digitosTexto.length <= 0) {
        return;
    }

    digitosTexto.pop();
    verDigitos(digitosTexto.join(""));

};

//borramos los digitos
const clickCE = () =>
{
    digitosTexto = [];
    if (isSumatorio1Completed === false)
    {
        sumatorio1 = 0;
    }

    if (isSumatorio2Completed === false)
    {
        sumatorio2 = 0;
    }

    verDigitos(digitosTexto.join(""));
};

//funcion donde hemos clickeado en C
//desaparece historial y operacion
const clickC = () =>
{
    sumatorio1 = 0;
    sumatorio2 = 0;
    isSumatorio1Completed = false;
    isSumatorio2Completed = false;
    digitosTexto = [];
    operacionAnterior = operadores.ninguna;
    elementosHistorial.textContent = "";
    verDigitos(digitosTexto.join(""));

};

//funcion donde controlamos si es un digito o un operador
const procesarEventos = (idTexto ) => 
{

    //lo puslado es una operador
    if (idTexto in operadores === true) 
    {

        //segun que operador hayan hecho click
        switch(idTexto)
        {
            case operadores["="]:
                clickIgual(idTexto);
            return;
            case operadores["<"]:
            case operadores["backspace"]:
                clickBackspace();
            return;
            case operadores["ce"]:
                clickCE();
            return;
            case operadores["c"]:
                clickC();
            return;
            

        }

        if (pulsadoIgual === true) 
        {
            pulsadoIgual = false;
        }

        if (isSumatorio1Completed === true)
        {

            sumatorio2 = asignarSumatario(digitosTexto.join(""));
            if (sumatorio2 === 0)
            {
                isSumatorio2Completed = false;
                let resultado = 0;
                resultado = sumatorio1;
                verResulado(resultado, sumatorio1, sumatorio2, operadores[idTexto], true);

                operacionAnterior = operadores[idTexto];
                return;
            }
            isSumatorio2Completed = true;

        }
        
        if (isSumatorio1Completed === false)
        {
            sumatorio1 = asignarSumatario(digitosTexto.join(""));
            isSumatorio1Completed = true;
        }
        
        let resultado = 0;
        if (isSumatorio2Completed === false)
        {
            resultado = sumatorio1;
            
        }
        else
        {
            resultado = calcularResultado(operacionAnterior);
        }
        
        verResulado(resultado, sumatorio1, sumatorio2, operadores[idTexto]);

        operacionAnterior = operadores[idTexto];
        sumatorio1 = resultado;
        sumatorio2 = 0;
        
        digitosTexto = [];
    }
    else 
    {

        //se ha pulsado el igual y luego un digito
        if (pulsadoIgual === true)
        {
            clickC();
            pulsadoIgual = false;
        }

        //insertamos digitos al array con los digitos introducidos
        insertarDigitos(listadoDigitos[idTexto]);

    }

};


// añadismos cada digito que ha pulsado el usario
// a una lista de elementos en formato string ["1", "2", "3"]
// al mostrarlo por el visor realizamos un join al array
// al haber un decimal, mostramos por el visor el decimal
const insertarDigitos = (idTexto) =>
{

    if (digitosTexto.length < NUMERO_MAXIMO_ELEMENTOS)
    {
        digitosTexto.push(idTexto);

        //en caso de que que haya un decimal, le añadimos al visor una coma
        if (idTexto === listadoDigitos[","])
        {
            elementoResultados.textContent += ",";
        }
        else
        {
            verDigitos(digitosTexto.join(""));
        }

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
const visorCero = () => 
{
    elementoResultados.textContent = "0";
    elementosHistorial.textContent = "";
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
            //comprobacion que no se puede dividir por 0
            //podriamos lanzar un mensaje de error pero mostramos
            //intencionadamente un 0
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
        case operadores["*"]:
            total = sumatorio1 * sumatorio2;
        break;
    
        case operadores["%"]:
            total = sumatorio1 % sumatorio2;
        break;
        

        default:

        break;
    
    }

    return total;


};

//mostramos el resultado de la operacion por el visor
// controlamos que puedan cambiarnos el operador
// controlamos que si pulsan varias veces el mismo operador no realice nada
// mostramos el resultado por el visor
// mostramos el historial de operaciones con un limite de tamaño
const verResulado = (totalNumero, numero1, numero2, operacion, cambiadoOperacion) =>
{

    if (operacion === operadores.ninguna)
    {
        return;
    }

    elementoResultados.textContent = totalNumero.toLocaleString();
    let historial = elementosHistorial.textContent;
    
    if (isSumatorio2Completed === true)
    {
        historial += " " + (numero2 - 0).toLocaleString() + " " + operacion;
    }
    else
    {
        //si el usuario ha realizado un cambio de operador
        //modificamos el historial
        if (cambiadoOperacion === true)
        {
            historial = historial.substring(0, historial.length - 1) + " " + operacion;
        }
        else
        {
            historial += totalNumero.toLocaleString() + " " + operacion;

        }
        
    }

    //control de tamaño al historial
    if (historial.length > 43)
    {
        historial = historial.replace("  ", "");
        historial = "..." + historial.substring(historial.length - 43, historial.length);
        
    }

    //mostramos el historial de operaciones
    elementosHistorial.textContent = historial;
};



//funcion que cambia el color de los botones al pulsar en el teclado
//tiene cierto retraso al pulsar para que quede un poco mas visible el cambio
const cambiarColorBoton = (key) => 
{

    let elemento = undefined;
    if (key === operadores["*"])
    {
        elemento = document.getElementById("X");
    }
    else
    {
        elemento = document.getElementById(key);
    }


    if (elemento.classList.contains("boton-cambiado") === false) 
    {
        elemento.classList.add("boton-cambiado");
    }
    else {
        //para hacerlo un poco mas visual, se para un poco al cambiar el color
        //animacion
        const timeout = setTimeout(() => 
        {
            
            elemento.classList.remove("boton-cambiado");
            clearTimeout(timeout);

        }, TIMEOUT_CAMBIO_COLORES);
    }

};

//funcion que devuelve si esta o no esta dentro
//del objeto operadores posibles
const comprobaridTexto = (idTexto) =>
{
    return (idTexto in operadores) || (idTexto in listadoDigitos);
};

//////////////////////////////////////////
////////////// EVENTOS
///////////////////////////////////

//funcion donde controla donde hemos hecho click
calculadora.addEventListener("click", (evento) => 
{

    evento.preventDefault();

    
    const idTexto = evento.target.id
    
    //comprobamos que no sea de alguna excepcion
    if (comprobaridTexto(idTexto) === false)
    {
        return;
    }    
    
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
    console.log(evento);

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
        if (evento.key.toLowerCase() === operadores["*"])
        {
            procesarEventos(operadores.X);
        }
        else
        {
            procesarEventos(operadores[evento.key.toLowerCase()]);

        }
    }

});

