// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE
// TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidar = document.getElementById("idBtnValidar");

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// AGREGANDO FUNCIONES
const verificarTipoElemento = function() {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
};

const validarIdUnico = function(id) {
    const elementoExistente = document.getElementById(`id${id}`);
    if (elementoExistente) {
        alert(`El ID "${id}" ya existe. Por favor, ingrese un ID único para el control.`);
        return false;
    }
    return true;
};

const validarFormulario = function() {
    const elementos = newForm.elements;
    let errores = [];
    
    for (let i = 0; i < elementos.length; i++) {
        let elemento = elementos[i];
        
        if (elemento.tagName === "INPUT") {
            if (elemento.type === "text" || elemento.type === "number" || elemento.type === "date" || elemento.type === "password" || elemento.type === "email" || elemento.type === "color") {
                if (elemento.value.trim() === "") {
                    errores.push(`El campo "${elemento.placeholder}" está vacío`);
                }
            } else if (elemento.type === "radio" || elemento.type === "checkbox") {
                let nombre = elemento.name || elemento.id;
                let grupoSeleccionado = false;
                let radios = document.getElementsByName(nombre);
                
                for (let j = 0; j < radios.length; j++) {
                    if (radios[j].checked) {
                        grupoSeleccionado = true;
                        break;
                    }
                }
                
                if (!grupoSeleccionado && elemento.type === "radio") {
                    errores.push(`Debe seleccionar una opción del grupo "${nombre}"`);
                }
            }
        } else if (elemento.tagName === "SELECT") {
            if (elemento.selectedIndex === 0 || elemento.value === "") {
                errores.push(`Debe seleccionar una opción en el campo "${elemento.id}"`);
            }
        } else if (elemento.tagName === "TEXTAREA") {
            if (elemento.value.trim() === "") {
                errores.push(`El área de texto está vacía`);
            }
        }
    }
    
    if (errores.length > 0) {
        alert("Errores de validación:\n\n" + errores.join("\n"));
    } else {
        alert("¡Formulario validado correctamente! Todos los campos están completos.");
    }
};

const newSelect = function() {
    if (!validarIdUnico(nombreElemento.value)) return;
    
    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");

    for (let i = 1; i <= 10; i++){
        let addOption = document.createElement("option");
        addOption.value = i;
        let textoOpcion = document.createTextNode(`Opcion ${i}`);
        addOption.appendChild(textoOpcion);
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    let textoLabel = document.createTextNode(tituloElemento.value);
    labelElemento.appendChild(textoLabel);

    let labelId = document.createElement("span");
    let textoId = document.createTextNode(`ID de control: ${nombreElemento.value}`);
    labelId.appendChild(textoId);

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function(newElemento) {
    if (!validarIdUnico(nombreElemento.value)) return;
    
    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    let textoLabel = document.createTextNode(tituloElemento.value);
    labelElemento.appendChild(textoLabel);

    let labelId = document.createElement("span");
    let textoId = document.createTextNode(`ID de control : ${nombreElemento.value}`);
    labelId.appendChild(textoId);

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {
    if (!validarIdUnico(nombreElemento.value)) return;
    
    let addElemento =
        newElemento == "textarea"
        ? document.createElement("textarea")
        : document.createElement("input");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);
    
    if (newElemento != "textarea") {
        addElemento.setAttribute("type", newElemento);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    let textoLabel = document.createTextNode(tituloElemento.value);
    labelElemento.appendChild(textoLabel);

    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    let textoId = document.createTextNode(`ID de control : ${nombreElemento.value}`);
    labelId.appendChild(textoId);

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

buttonCrear.onclick = () => {
    verificarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

buttonValidar.onclick = () => {
    validarFormulario();
};

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});