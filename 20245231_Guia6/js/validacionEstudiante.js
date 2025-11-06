//Accediendo a los elementos del formulario
const inputCarnet = document.getElementById("idCarnet");
const inputNombreCompleto = document.getElementById("idNombreCompleto");
const inputDUI = document.getElementById("idDUI");
const inputNIT = document.getElementById("idNIT");
const inputFechaNacimiento = document.getElementById("idFechaNacimiento");
const inputCorreo = document.getElementById("idCorreo");
const inputEdad = document.getElementById("idEdad");

const btnValidar = document.getElementById("idBtnValidar");
const btnLimpiar = document.getElementById("idBtnLimpiar");
const btnMostrar = document.getElementById("idBtnMostrar");

const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Arreglo para almacenar estudiantes
let arrayEstudiantes = [];

//Expresiones regulares para validación
const regexCarnet = /^\d{8}$/;
const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const regexDUI = /^\d{8}-\d{1}$/;
const regexNIT = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
const regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const regexEdad = /^\d+$/;

//Función para validar un campo
const validarCampo = (input, regex) => {
    if (regex.test(input.value)) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
};

//Agregar validación en tiempo real
inputCarnet.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
});

inputCarnet.addEventListener("blur", () => validarCampo(inputCarnet, regexCarnet));
inputNombreCompleto.addEventListener("blur", () => validarCampo(inputNombreCompleto, regexNombre));
inputDUI.addEventListener("blur", () => validarCampo(inputDUI, regexDUI));
inputNIT.addEventListener("blur", () => validarCampo(inputNIT, regexNIT));
inputFechaNacimiento.addEventListener("blur", () => validarCampo(inputFechaNacimiento, regexFecha));
inputCorreo.addEventListener("blur", () => validarCampo(inputCorreo, regexCorreo));
inputEdad.addEventListener("blur", () => validarCampo(inputEdad, regexEdad));

//Formateo automático para DUI
inputDUI.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) {
        value = value.substring(0, 8) + "-" + value.substring(8, 9);
    }
    e.target.value = value;
});

//Formateo automático para NIT
inputNIT.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) {
        value = value.substring(0, 4) + "-" + value.substring(4);
    }
    if (value.length > 11) {
        value = value.substring(0, 11) + "-" + value.substring(11);
    }
    if (value.length > 15) {
        value = value.substring(0, 15) + "-" + value.substring(15, 16);
    }
    e.target.value = value;
});

//Formateo automático para fecha
inputFechaNacimiento.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2);
    }
    if (value.length > 5) {
        value = value.substring(0, 5) + "/" + value.substring(5, 9);
    }
    e.target.value = value;
});

//Solo números para edad
inputEdad.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
});

//Función para limpiar el formulario
const limpiarFormulario = () => {
    inputCarnet.value = "";
    inputNombreCompleto.value = "";
    inputDUI.value = "";
    inputNIT.value = "";
    inputFechaNacimiento.value = "";
    inputCorreo.value = "";
    inputEdad.value = "";
    
    //Remover clases de validación
    document.querySelectorAll(".form-control").forEach(input => {
        input.classList.remove("is-valid", "is-invalid");
    });
    
    inputCarnet.focus();
};

//Función para validar y guardar estudiante
const validarYGuardar = () => {
    const esCarnetValido = validarCampo(inputCarnet, regexCarnet);
    const esNombreValido = validarCampo(inputNombreCompleto, regexNombre);
    const esDUIValido = validarCampo(inputDUI, regexDUI);
    const esNITValido = validarCampo(inputNIT, regexNIT);
    const esFechaValida = validarCampo(inputFechaNacimiento, regexFecha);
    const esCorreoValido = validarCampo(inputCorreo, regexCorreo);
    const esEdadValida = validarCampo(inputEdad, regexEdad);
    
    if (esCarnetValido && esNombreValido && esDUIValido && esNITValido && 
        esFechaValida && esCorreoValido && esEdadValida) {
        
        //Guardar estudiante
        arrayEstudiantes.push({
            carnet: inputCarnet.value,
            nombre: inputNombreCompleto.value,
            dui: inputDUI.value,
            nit: inputNIT.value,
            fechaNacimiento: inputFechaNacimiento.value,
            correo: inputCorreo.value,
            edad: inputEdad.value
        });
        
        notificacion.classList.remove("text-bg-danger");
        notificacion.classList.add("text-bg-success");
        mensaje.innerHTML = "Estudiante registrado correctamente";
        toast.show();
        
        limpiarFormulario();
    } else {
        notificacion.classList.remove("text-bg-success");
        notificacion.classList.add("text-bg-danger");
        mensaje.innerHTML = "Por favor corrija los campos marcados en rojo";
        toast.show();
    }
};

//Función para mostrar estudiantes
const mostrarEstudiantes = () => {
    if (arrayEstudiantes.length === 0) {
        document.getElementById("idListaEstudiantes").innerHTML = "Ninguno";
        return;
    }
    
    let tabla = `<div class="table-responsive">
                    <table class="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">#</th>
                                <th scope="col" class="text-center">Carnet</th>
                                <th scope="col" class="text-center">Nombre</th>
                                <th scope="col" class="text-center">DUI</th>
                                <th scope="col" class="text-center">NIT</th>
                                <th scope="col" class="text-center">Fecha Nac.</th>
                                <th scope="col" class="text-center">Correo</th>
                                <th scope="col" class="text-center">Edad</th>
                            </tr>
                        </thead>
                        <tbody>`;
    
    arrayEstudiantes.forEach((estudiante, index) => {
        tabla += `<tr>
                    <td class="text-center fw-bold">${index + 1}</td>
                    <td class="text-center">${estudiante.carnet}</td>
                    <td>${estudiante.nombre}</td>
                    <td class="text-center">${estudiante.dui}</td>
                    <td class="text-center">${estudiante.nit}</td>
                    <td class="text-center">${estudiante.fechaNacimiento}</td>
                    <td>${estudiante.correo}</td>
                    <td class="text-center">${estudiante.edad}</td>
                  </tr>`;
    });
    
    tabla += `</tbody></table></div>`;
    document.getElementById("idListaEstudiantes").innerHTML = tabla;
};

//Eventos de los botones
btnValidar.addEventListener("click", validarYGuardar);
btnLimpiar.addEventListener("click", limpiarFormulario);
btnMostrar.addEventListener("click", mostrarEstudiantes);

//Inicializar
limpiarFormulario();