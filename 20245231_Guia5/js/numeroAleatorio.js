//Generamos un numero aleatorio que se encuentre en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random()*25) +1;
// Creamos una constante que permite identificar el maximo de intentos 
const numeroIntentos = 3;
// Guardara el numero de intentos que realiza el usuario
let intentos = 1;
function generarNumeroAleatorio(){
    //Dfinimos una variable para impresion de mensajes
    let mensaje;
    // Utilizamos el dom para acceder al parrafo creado 
    const parrafo = document.querySelector("#idParrafo");

    //Verificamos en que intento esta el usuario
    if (intentos <= numeroIntentos){
        let numero = prompt(
            "¿Qué número se ha generado (Intento " + intentos + ")?"
        );

        if (Number(numero) == numeroAleatorio){
            mensaje = `¡Es sorprendente!, pudiste adivinar el número oculto (${numeroAleatorio}).
            Refresque la página para volver a jugar.`;
        } else if (intentos == numeroIntentos){
            mensaje = `Su número de intentos ha terminado.
            El número oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
        }else{
            if (numero < numeroAleatorio) {
                mensaje = `El número oculto es mayor que ${numero}. Vuelve a intentar. Quedan ${numeroIntentos - intentos} intentos`;
            } else if (numero > numeroAleatorio) {
                mensaje = `El número oculto es menor que ${numero}. Vuelve a intentar. Quedan ${numeroIntentos - intentos} intentos`;
            } else {
                mensaje = `Vuelve a intentar. Quedan ${numeroIntentos - intentos} intentos`;
            }
        }
        //aumetamos el valor de los intentos
        intentos++;
    }else{
        mensaje = `Su número de intentos ha terminado.
        El número oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    }
    
    parrafo.innerHTML = mensaje;
}

