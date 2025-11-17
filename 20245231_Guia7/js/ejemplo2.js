// obetniendo la referencia de los elementos
// por medio de arreglos asociativos
// aqui se esta utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"),{});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

const validarFormulario = function() {
    let errores = [];
    
    const nombre = formulario.elements["idNombre"];
    const apellidos = formulario.elements["idApellidos"];
    const fechaNacimiento = formulario.elements["idFechaNac"];
    const correo = formulario.elements["idCorreo"];
    const password = formulario.elements["idPassword"];
    const passwordRepetir = formulario.elements["idPasswordRepetir"];
    const carrera = formulario.elements["idRdCarrera"];
    const pais = formulario.elements["idCmPais"];
    const intereses = document.querySelectorAll('input[type="checkbox"]:checked');
    
    if (nombre.value.trim() === "") {
        errores.push("El campo Nombre es obligatorio");
    }
    
    if (apellidos.value.trim() === "") {
        errores.push("El campo Apellidos es obligatorio");
    }
    
    if (fechaNacimiento.value === "") {
        errores.push("La Fecha de Nacimiento es obligatoria");
    } else {
        const fechaIngresada = new Date(fechaNacimiento.value);
        const fechaActual = new Date();
        if (fechaIngresada > fechaActual) {
            errores.push("La Fecha de Nacimiento no puede ser mayor a la fecha actual");
        }
    }
    
    if (correo.value.trim() === "") {
        errores.push("El campo Correo Electrónico es obligatorio");
    } else {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(correo.value)) {
            errores.push("El formato del Correo Electrónico no es válido");
        }
    }
    
    if (password.value === "") {
        errores.push("El campo Contraseña es obligatorio");
    }
    
    if (passwordRepetir.value === "") {
        errores.push("El campo Repetir Contraseña es obligatorio");
    }
    
    if (password.value !== "" && passwordRepetir.value !== "" && password.value !== passwordRepetir.value) {
        errores.push("Las contraseñas no coinciden");
    }
    
    let carreraSeleccionada = false;
    for (let i = 0; i < carrera.length; i++) {
        if (carrera[i].checked) {
            carreraSeleccionada = true;
            break;
        }
    }
    if (!carreraSeleccionada) {
        errores.push("Debe seleccionar una Carrera");
    }
    
    if (pais.selectedIndex === 0 || pais.value === "") {
        errores.push("Debe seleccionar un País de Origen");
    }
    
    if (intereses.length === 0) {
        errores.push("Debe seleccionar al menos un Interés");
    }
    
    if (errores.length > 0) {
        alert("Errores de validación:\n\n" + errores.join("\n"));
        return false;
    }
    
    return true;
};

const mostrarDatosEnModal = function() {
    bodyModal.innerHTML = "";
    
    const nombre = formulario.elements["idNombre"].value;
    const apellidos = formulario.elements["idApellidos"].value;
    const fechaNacimiento = formulario.elements["idFechaNac"].value;
    const correo = formulario.elements["idCorreo"].value;
    const password = formulario.elements["idPassword"].value;
    const carrera = formulario.elements["idRdCarrera"];
    const pais = formulario.elements["idCmPais"];
    const intereses = document.querySelectorAll('input[type="checkbox"]:checked');
    
    let carreraSeleccionada = "";
    for (let i = 0; i < carrera.length; i++) {
        if (carrera[i].checked) {
            carreraSeleccionada = carrera[i].nextElementSibling.textContent;
            break;
        }
    }
    
    const paisSeleccionado = pais.options[pais.selectedIndex].text;
    
    let interesesSeleccionados = "";
    for (let i = 0; i < intereses.length; i++) {
        interesesSeleccionados += intereses[i].nextElementSibling.textContent;
        if (i < intereses.length - 1) {
            interesesSeleccionados += ", ";
        }
    }
    
    const tabla = document.createElement("table");
    tabla.setAttribute("class", "table table-striped table-bordered");
    
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    
    const thCampo = document.createElement("th");
    const textoCampo = document.createTextNode("Campo");
    thCampo.appendChild(textoCampo);
    
    const thValor = document.createElement("th");
    const textoValor = document.createTextNode("Valor");
    thValor.appendChild(textoValor);
    
    trHead.appendChild(thCampo);
    trHead.appendChild(thValor);
    thead.appendChild(trHead);
    tabla.appendChild(thead);
    
    const tbody = document.createElement("tbody");
    
    const datos = [
        ["Nombre", nombre],
        ["Apellidos", apellidos],
        ["Fecha de Nacimiento", fechaNacimiento],
        ["Correo Electrónico", correo],
        ["Contraseña", password],
        ["Carrera", carreraSeleccionada],
        ["País de Origen", paisSeleccionado],
        ["Intereses", interesesSeleccionados]
    ];
    
    for (let i = 0; i < datos.length; i++) {
        const tr = document.createElement("tr");
        
        const tdCampo = document.createElement("td");
        const textoNombreCampo = document.createTextNode(datos[i][0]);
        tdCampo.appendChild(textoNombreCampo);
        
        const tdValor = document.createElement("td");
        const textoValorCampo = document.createTextNode(datos[i][1]);
        tdValor.appendChild(textoValorCampo);
        
        tr.appendChild(tdCampo);
        tr.appendChild(tdValor);
        tbody.appendChild(tr);
    }
    
    tabla.appendChild(tbody);
    bodyModal.appendChild(tabla);
    
    modal.show();
};

const recorrerFormulario = function() {
    if (validarFormulario()) {
        mostrarDatosEnModal();
    }
};

button.onclick = () => {
    recorrerFormulario();
};