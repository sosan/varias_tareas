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
        "euros": 1,
        "dolares": 1.2116823874653,
        "pesetas": 166.38599999998
    },
    "dolares":
    {
        "euros": 0.8252987832,
        "dolares": 1,
        "pesetas": 137.3181633415
    },
    "pesetas":
    {
        "euros": 0.0060101210438385,
        "dolares": 0.0072823578153538,
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

const calcularDivisas = (conversionDE, conversionA) =>
{
    let importe = elementoImporte.value - 0;

    if (importe === 0)
    {
        return;
    }

    const fijo = divisasConversion[conversionDE][conversionA];

    if (fijo === undefined)
    {
        console.log("errror conversion" + fijo);
        return;
    }

    const total = importe * fijo;
    conversion.textContent = "Conversion de " + importe.toLocaleString() + " " + valores[elementoDE.value] + " a " + valores[elementoA.value] + " es de: " + total.toLocaleString() + " " + valores[elementoA.value];


    elementoImporte.focus();

};



elementoFormulario.addEventListener("submit", (evento) =>
{
    evento.preventDefault();

    calcularDivisas(valores[elementoDE.value], valores[elementoA.value]);
    
});


document.addEventListener("keydown", (evento) => {

    if (evento.key.toLowerCase() === "enter")
    {
        calcularDivisas(valores[elementoDE.value], valores[elementoA.value]);
    }


});
