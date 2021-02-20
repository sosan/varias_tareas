//variables
const elementoFormulario = document.getElementById("formulario");
const elementoImporte = document.getElementById("importe");
const elementoDE = document.getElementById("de");
const elementoA = document.getElementById("a");
const elementoIntercambio = document.getElementById("intercambio");
const conversion = document.getElementById("conversion");

//boton atras
document.getElementById("boton-atras").addEventListener("click", () => {
    window.history.go(-1);

});

const divisasConversion = {
    "euros":
    {
        "euro": 1,
        "dolar": 1.2116823874653,
        "pesetas": 166.38599999998
    },
    "dolares":
    {
        "euro": 0.8252987832,
        "dolar": 1,
        "pesetas": 137.3181633415
    },
    "pesetas":
    {
        "euro": 0.0060101210438385,
        "dolar": 0.0072823578153538,
        "pesetas": 1
    }

};


const valores = {
    euros: "euros",
    pesetas: "pesetas",
    dolares: "dolares"
};


//colocamos foco en el importe
elementoImporte.focus();




elementoFormulario.addEventListener("submit", (evento) =>
{
    evento.preventDefault();

    calcularDivisas(valores[elementoDE.value], valores[elementoA.value]);
    
});


const calcularDivisas = (conversionDE, conversionA) =>
{
    let importe = elementoImporte.value - 0;

    if (importe === 0)
    {
        return;
    }
    console.log("calcular");
    let objeto = {};

    switch (conversionDE)
    {
        case valores.dolares:
            objeto = divisasConversion.dolares;
        break;

        case valores.euros:
            objeto = divisasConversion.euros;
        break;

        case valores.pesetas:
            objeto = divisasConversion.pesetas;
        break;

        default: return;
    }

    let fijo = 0;
    switch (conversionA) 
    {
        case valores.dolares:
            fijo = objeto.dolar;
            break;

        case valores.euros:
            fijo = objeto.euro;
            break;

        case valores.pesetas:
            fijo = objeto.pesetas;
            break;

        default: return;
    }

    const total = importe * fijo;
    conversion.textContent = "Conversion de " + importe.toLocaleString() + " " + valores[elementoDE.value] + " a " + valores[elementoA.value] + " es de: " + total.toLocaleString() + " " + valores[elementoA.value];


    elementoImporte.focus();

};


document.addEventListener("keydown", (evento) => {

    if (evento.key.toLowerCase() === "enter")
    {
        calcularDivisas();
    }


});
