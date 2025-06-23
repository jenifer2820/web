document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.querySelector('.header-actions button:first-child');
    const saveButton = document.querySelector('.header-actions button:last-child');
    // Actualizado para incluir todos los inputs, select y textarea
    const formInputs = document.querySelectorAll('.info-item input, .info-item select, .info-item textarea');

    // --- NUEVAS REFERENCIAS PARA MOSTRAR DATOS DEL USUARIO ---
    const userAvatarName = document.getElementById('userAvatarName'); // Nombre en el avatar del sidebar
    const userAvatarEmail = document.getElementById('userAvatarEmail'); // Email en el avatar del sidebar
    const headerUserName = document.getElementById('headerUserName'); // Nombre en el header principal
    const profileNameInput = document.getElementById('nombre'); // Input del nombre en la sección personal
    const profileEmailInput = document.getElementById('email'); // Input del email en la sección de contacto
   


    // --- FUNCIÓN PARA CARGAR Y MOSTRAR INFORMACIÓN DEL USUARIO ---
    function loadAndDisplayUserInfo() {
        const currentUserJSON = localStorage.getItem('currentUser');
        if (currentUserJSON) {
            const currentUser = JSON.parse(currentUserJSON);

            // Actualizar nombre y email en el avatar del sidebar
            if (userAvatarName) userAvatarName.textContent = currentUser.name;
            if (userAvatarEmail) userAvatarEmail.textContent = currentUser.email;

            // Actualizar nombre en el header principal
            if (headerUserName) headerUserName.textContent = currentUser.name;

            // Actualizar los inputs de nombre y email en las secciones de información
            if (profileNameInput) profileNameInput.value = currentUser.name;
            if (profileEmailInput) profileEmailInput.value = currentUser.email;

        } else {
            // Si no hay usuario en localStorage, redirigir al login
            alert('No has iniciado sesión. Redirigiendo al login.');
            window.location.href = 'resgistrarse.html'; // Asegúrate de que esta URL sea correcta
        }
    }

    // --- FUNCIÓN PARA CERRAR SESIÓN ---
    function handleLogout() {
        localStorage.removeItem('currentUser'); // Eliminar la sesión del usuario
        alert('Sesión cerrada correctamente.');
        window.location.href = 'resgistrarse.html'; // Redirigir de vuelta al login
    }

    // Función para habilitar o deshabilitar los campos de entrada
    function toggleEditMode(enable) {
        formInputs.forEach(input => {
            // Excluir los campos de nombre y email para que siempre muestren la info cargada
            // y no sean editables directamente por el usuario desde aquí.
            if (input.id !== 'nombre' && input.id !== 'email') { 
                input.disabled = !enable; // Si 'enable' es true, disabled es false (habilitado)
                if (enable) {
                    input.classList.add('editable');
                } else {
                    input.classList.remove('editable');
                }
            }
        });
        // Mostrar/ocultar botones
        if (editButton) editButton.style.display = enable ? 'none' : 'inline-block';
        if (saveButton) saveButton.style.display = enable ? 'inline-block' : 'none';
    }

    // Al cargar la página, los campos están deshabilitados por defecto
    toggleEditMode(false); // Mantener el comportamiento original de los campos deshabilitados
    loadAndDisplayUserInfo(); // Cargar la información del usuario al inicio

    // Event listener para el botón "Editar"
    if (editButton) {
        editButton.addEventListener('click', function() {
            toggleEditMode(true);
        });
    }

    // Event listener para el botón "Guardar"
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Aquí iría la lógica para guardar los datos actualizados de los otros campos.
            // Los campos de nombre y email NO se guardarían aquí, ya que se cargan del login.
            alert('Perfil guardado exitosamente (simulado)!');
            toggleEditMode(false);
        });
    }
    
    // Asignar evento al botón de cerrar sesión
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    // Opcional: Resaltar el elemento de navegación activo
    const navLinks = document.querySelectorAll('.main-nav a');
    // const currentPath = window.location.pathname.split('/').pop(); // Obtener el nombre del archivo actual

    navLinks.forEach(link => {
        link.classList.remove('active'); // Limpia cualquier clase 'active' existente
        if (link.textContent.includes('Perfil')) { // Puedes usar href para mayor precisión
            link.classList.add('active');
        }
    });

    // Código para el tema (si lo tienes en tema.js)
    // Asumo que el archivo 'tema.js' sigue estando y funciona de forma independiente.
});