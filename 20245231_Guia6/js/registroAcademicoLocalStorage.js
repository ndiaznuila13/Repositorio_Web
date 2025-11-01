
//Leyendo elementos del DOM

const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes")
const inputCarnet = document.querySelector("#inputCarnet")
const inputNombre = document.querySelector("#inputNombre")
const inputApellidos = document.querySelector("#inputApellidos");

btnAddEstudiante.addEventListener("click",guardarEstudiante)

function guardarEstudiante(){
    const nombre= inputNombre.value.trim();
    const carnet= inputCarnet.value.trim();
    const apellidos= inputApellidos.value.trim();
    const errores= validarDatos(carnet,nombre,apellidos);
    if(errores.lenth>0){
        alert("Errores \n "+ errores.join("\n"));
        return;
    }
    
    const alumnos=[];
    alumnos.push({carnet,nombre,apellidos});

}

function guardarEsudiantes(estudiantes){
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

function recuperarEstudiantes(){
    const data = localStorage.getItem("estudiantes");
    return data? JSON.parse():[];
}

function validarDatos(carnet, nombre, apellido){
    const errores = [];

    if(carnet.trim().length == 0){
        errores.push("El carnet es requerido");
    }
    if(nombre.trim().length == 0){
        errores.push("Los nombres son requeridos");
    }
    if(apellido.trim().length == 0){
        errores.push("Los apellidos son requeridos");
    }

    return errores;
}