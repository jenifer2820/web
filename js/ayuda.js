function goToHelp() {
  document.getElementById("helpModal").style.display = "block";
}

function openPrivacy() {
  document.getElementById("privacyModal").style.display = "block";
}

function sendReport() {
  document.getElementById("reportModal").style.display = "block";
}

function showAppInfo() {
  document.getElementById("appInfoModal").style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

function closeHelp() {
  document.getElementById("helpModal").style.display = "none";
}

window.onclick = function(event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
};
document.getElementById("reportForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita recargar la página

    const tipo = document.getElementById("problemType").value;
    const descripcion = document.getElementById("description").value;

    if (tipo && descripcion) {
        // Aquí podrías enviar los datos a un servidor (backend/API)
        console.log("Reporte enviado:", tipo, descripcion);

        // Mostrar mensaje de éxito
        document.getElementById("reportSuccess").style.display = "block";

        // Limpiar el formulario
        this.reset();

        // Cerrar modal después de un tiempo (opcional)
        setTimeout(() => {
            closeModal('reportModal');
            document.getElementById("reportSuccess").style.display = "none";
        }, 2000);
    }
});
function openChat() {
    document.getElementById("chatModal").style.display = "block";
}

function closeChat() {
    document.getElementById("chatModal").style.display = "none";
}

function sendChatResponse() {
    const option = document.getElementById("chatOptions").value;
    const chatBox = document.getElementById("chatBox");

    if (option) {
        const userMsg = `<div class="msg user"><strong>Tú:</strong> ${option}</div>`;
        chatBox.innerHTML += userMsg;

        let response = "";

        switch (option) {
            case "No puedo acceder a una lección":
                response = "Por favor, verifica tu conexión y asegúrate de estar inscrito en esa lección. ¿Deseas que te redirija a la sección de lecciones?";
                break;
            case "Problemas con mi cuenta":
                response = "Puedes intentar cerrar sesión y volver a iniciar. Si el problema persiste, te ayudaremos a cambiar tu contraseña.";
                break;
            case "Error en la plataforma":
                response = "Lamentamos el inconveniente. Puedes enviar un reporte desde la sección 'Reportar un problema'.";
                break;
            case "Dudas sobre pagos":
                response = "Puedes consultar el historial en 'Pagos de inscripción'. Si tienes un cobro no reconocido, notifícanos de inmediato.";
                break;
            case "Deseo cambiar el idioma":
                response = "Puedes cambiar el idioma desde la sección de ajustes en tu perfil.";
                break;
            case "Otro problema":
                response = "Por favor, describe el problema con más detalle para que podamos ayudarte mejor.";
                break;
            default:
                response = "Gracias por tu mensaje. Un agente lo revisará pronto.";
        }

        chatBox.innerHTML += `<div class="msg support"><strong>Soporte:</strong> ${response}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
        document.getElementById("chatOptions").value = "";
    }
}
function sendChatResponse() {
    const option = document.getElementById("chatOptions").value;
    const chatBox = document.getElementById("chatBox");

    if (!option) return;

    // Mensaje del usuario
    const userMsg = `<div class="msg user"><strong>Tú:</strong> ${option}</div>`;
    chatBox.innerHTML += userMsg;

    // Respuesta automática
    let response = "";

    switch (option) {
        case "No puedo acceder a una lección":
            response = "Verifica tu conexión y asegúrate de estar inscrito en la lección.";
            break;
        case "Problemas con mi cuenta":
            response = "Intenta cerrar sesión y volver a iniciar. Si persiste, cambia tu contraseña.";
            break;
        case "Error en la plataforma":
            response = "Puedes enviar un reporte desde la sección 'Reportar un problema'.";
            break;
        case "Dudas sobre pagos":
            response = "Consulta tus métodos de pago en el perfil o contacta a soporte.";
            break;
        case "Deseo cambiar el idioma":
            response = "Ve a configuración de cuenta y selecciona el idioma deseado.";
            break;
        case "Otro problema":
            response = "Por favor, describe el problema detalladamente en la sección de reporte.";
            break;
        default:
            response = "Gracias por contactarnos. Te ayudaremos pronto.";
            break;
    }

    const supportMsg = `<div class="msg support"><strong>Soporte:</strong> ${response}</div>`;
    chatBox.innerHTML += supportMsg;

    // Limpiar opción seleccionada
    document.getElementById("chatOptions").value = "";

    // Desplazar hacia abajo
    chatBox.scrollTop = chatBox.scrollHeight;
}function sendChatResponse() {
    const option = document.getElementById("chatOptions").value;
    const chatBox = document.getElementById("chatBox");

    if (option) {
        const userMsg = `<p><strong>Tú:</strong> ${option}</p>`;
        chatBox.innerHTML += userMsg;

        let response = "";

        switch (option) {
        case "No puedo acceder a una lección":
            response = "Verifica tu conexión y asegúrate de estar inscrito en la lección.";
            break;
        case "Problemas con mi cuenta":
            response = "Intenta cerrar sesión y volver a iniciar. Si persiste, cambia tu contraseña.";
            break;
        case "Error en la plataforma":
            response = "Puedes enviar un reporte desde la sección 'Reportar un problema'.";
            break;
        case "Dudas sobre pagos":
            response = "Consulta tus métodos de pago en el perfil o contacta a soporte.";
            break;
        case "Deseo cambiar el idioma":
            response = "Ve a configuración de cuenta y selecciona el idioma deseado.";
            break;
        case "Otro problema":
            response = "Por favor, describe el problema detalladamente en la sección de reporte.";
            break;
        default:
            response = "Gracias por contactarnos. Te ayudaremos pronto.";
            break;
        }

        chatBox.innerHTML += `<p><strong>Soporte:</strong> ${response}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Desplaza hacia abajo
        document.getElementById("chatOptions").value = ""; // Reinicia selección
    }
}

function openChat() {
  document.getElementById("chatModal").style.display = "block";
}

function closeChat() {
  document.getElementById("chatModal").style.display = "none";
}
