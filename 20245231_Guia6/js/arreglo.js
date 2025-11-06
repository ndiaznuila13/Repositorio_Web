// Accedemos al contenedor donde se mostrará los estudiantes
const containerArreglo = document.querySelector("#idContainerArreglo");
const containerArregloOrdenado = document.querySelector(
    "#idContainerArregloOrdenado"
);

// Accedemos a cada boton por medio de la API DOM
const btnAgregar = document.querySelector("#idBtnAgregar");
const btnOrdenar = document.querySelector("#idBtnOrdenar");

// Agregamos los event listeners a los botones
btnAgregar.addEventListener("click", agregarElementos);
btnOrdenar.addEventListener("click", ordenarElementos);

let arreglo = new Array();

function agregarElementos(){
    const numero = parseInt(document.querySelector("#inputNumero").value);
    // verificando que sea un numero
    if (isNaN(numero)) {
        alert("Debe ingresar un numero válido");
    } else {
        // agregamos un nuevo elemento al arreglo
        arreglo.push(numero);

        // Utilizaremos la API DOM para crear un elemento html
        let caja = document.createElement("div"); //Creamos un elemento <div></div>
        caja.className = "col-md-1 colum"; //Agregamos una clase al elemento <div></div>
        let valor = document.createElement("h3"); //Creamos un elemento <h3></h3>
        valor.textContent = numero; //Agregamos texto al elemento <h3></h3>
        caja.appendChild(valor); // Le pasamos como hijo la etiqueta <h3></h3> a nuestro <div></div>

        // Insertamos los nuevos elementos en el contenedor
        // Se utiliza beforeend para insertar el nuevo
        // elemento dentro del idcontainerArreglo y despues de su ultimo hijo
        containerArreglo.insertAdjacentElement("beforeend", caja);
        
        // Limpiamos el input
        document.querySelector("#inputNumero").value = "";
        document.querySelector("#inputNumero").focus();
    }
}

function ordenarElementos(){
    // Verificamos que haya elementos en el arreglo
    if (arreglo.length === 0) {
        alert("Primero debe agregar números al arreglo");
        return;
    }
    
    // Eliminamos solo los divs anteriores, manteniendo el h3
    const cajasAnteriores = containerArregloOrdenado.querySelectorAll(".colum-green");
    cajasAnteriores.forEach(caja => caja.remove());
    
    // utilizaremos un for... of para recorrer el arreglo
    // a su vez se utilizara .sort() para ordenarlo
    for (let i of arreglo.sort((a, b) => a - b)){
        let caja = document.createElement("div");
        caja.className = "col-md-1 colum-green";
        let valor = document.createElement("h3");
        valor.textContent = i;
        caja.appendChild(valor);
        containerArregloOrdenado.insertAdjacentElement("beforeend", caja);
    }
}