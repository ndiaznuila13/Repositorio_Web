// inicializando referencia de botones con metodos actuales
const buttonAgregarPagina = document.querySelector("#idAgregarPagina");
const buttonMenu = document.querySelector("#idAgregarMenu");
const buttonTitulo = document.querySelector("#idAgregarTitulo");
const buttonParrafo = document.querySelector("#idAgregarParrafo");

const pagina = document.querySelector("#idPagina");

buttonAgregarPagina.onclick = function() {
    const contenedorVerificando = document.querySelector("idDivPage");

    if (!contenedorVerificando) {
        // Creando el contenedorde la pagina
        const contenedor = document.createElement("div");
        contenedor.setAttribute("id", "idDivPage");
        contenedor.setAttribute("class", "container");
        contenedor.setAttribute(
            "style",
            "border: solid 1px black; height: 500px; overflow: scroll; overflow-x: hidden;"
        );

        pagina.appendChild(contenedor);
    } else{
        alert("Ya se agrego el contenedor de la pagina")
    }
};

buttonMenu.onclick = function() {
    // verificando que exista el contenedor de la pagina
    const contenedor = document.querySelector("#idDivPage");

    if (contenedor) {
        // Verificando que exista el menu
        const menuVerificar = document.querySelectorAll("#idDivPage > header");

        if (menuVerificar.length ==0){
            // Clonando el menu principal de nuestra pagina
            // Para luego crearlo en la nueva pagina
            const menu = document.querySelector("header").cloneNode(true);
            contenedor.appendChild(menu);
        }else {
            alert("Ya ha sido agregado el menu");
        }
    } else{
        alert("Primero debe agregar un contenedor de la pagina")
    }
};

// Aqui seguir paso 4 de pagina 27