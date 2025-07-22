console.log("Bienvenido al formulario de inscripción");
const submitFunction = (event) => {
  event.preventDefault(); // Evita envío por defecto

  if (!validarFormulario()) {
    return;
  }

  const form = document.getElementById("formulario");

  const mensaje = 
    `¿Deseás enviar el siguiente formulario?\n\n` +
    `Nombre: ${form.name.value}\n` +
    `Apellido: ${form.lastname.value}\n` +
    `Email: ${form.email.value}\n` +
    `Edad: ${form.edad.value}\n` +
    `Actividad: ${form.actividad.value}\n` +
    `Nivel de Estudio: ${form.nivelEstudio.value}\n`;

  const confirmar = confirm(mensaje);

  if (confirmar) {
    form.reset();
    alert("Formulario enviado con éxito.");
  } else {
    alert("Envío cancelado.");
  }
};

document
  .getElementById("formulario")
  .addEventListener("submit", submitFunction);

function validarFormulario() {
  /* VALIDACIÓN DE CAMPOS DE TEXTO */
  const campoTexto = document.querySelectorAll('input[type="text"]');
  let validacionCorrecta = true;
  campoTexto.forEach((campo) => {
    console.log(campo.id);
    let errorCampo = document.getElementById(`error${campo.id}`);
    if (campo.value === "") {
      mostrarError(errorCampo, "El campo no puede estar vacio");
      validacionCorrecta = false;
    } else if (campo.value.length > 0 && campo.value.length < 3) {
      mostrarError(errorCampo, "El campo debe tener al menos 3 caracteres");
      validacionCorrecta = false;
    } else {
      ocultarError(errorCampo);
    }
  });

  /* VALIDACIÓN DE EMAIL */
  const email = document.getElementById("email");
  let errorEmail = document.getElementById("erroremail");

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    // este regex valida que el formato del email se válido
    ocultarError(errorEmail);
  } else {
    mostrarError(errorEmail, "¡Ingrese un correo electrónico válido!");
  }

  /* VALIDACION EDAD */
  const edad = document.getElementById("edad");
  let errorEdad = document.getElementById("erroredad");
  if (edad.value < 18) {
    mostrarError(errorEdad, "Debe ser mayor de edad");
    validacionCorrecta = false;
  } else {
    ocultarError(errorEdad);
  }

  /* VALIDACION ACTIVIDAD */
  const camposSelect = document.querySelectorAll("select");
  camposSelect.forEach((select) => {
    let errorSelect = document.getElementById(`error${select.id}`);
    if (select.value === "") {
      mostrarError(errorSelect, "Debe seleccionar una opción");
      validacionCorrecta = false;
    } else {
      ocultarError(errorSelect);
    }
  });

  /* VALIDACIÓN DE CHECKBOX */
  const aceptoTerminos = document.getElementById("aceptoTerminos");
  let errorCheckbox = document.getElementById("erroraceptoTerminos");
  if (!aceptoTerminos.checked) {
    mostrarError(errorCheckbox, "Debe aceptar los términos y condiciones");
    validacionCorrecta = false;
  } else {
    ocultarError(errorCheckbox);
  }

  return validacionCorrecta;
}

const mostrarError = (el, mensaje) => {
  el.textContent = mensaje;
  el.style.display = "block";
};

const ocultarError = (el) => {
  el.textContent = "";
};

/* .charAt(0).toUpperCase() + campo.id.slice(1)) el id con la primera letra en mayuscula y el resto en minuscula */
