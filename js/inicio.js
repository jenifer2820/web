document.addEventListener('DOMContentLoaded', function() {
    // Referencias a los elementos del DOM para el dropdown del usuario
    const userToggle = document.getElementById('user-toggle');
    const userMenu = document.getElementById('user-menu');

    // Referencias a los elementos del DOM para el selector de idioma (NUEVO)
    const languageToggle = document.getElementById('language-toggle');
    const languageMenu = document.getElementById('language-menu');

    // Función para cerrar el dropdown del usuario
    function closeUserDropdown() {
        if (userMenu) {
            userMenu.classList.remove('show'); // Usar 'show' para consistencia
        }
    }

    // Función para cerrar el dropdown de idioma
    function closeLanguageDropdown() {
        if (languageMenu) {
            languageMenu.classList.remove('show');
        }
    }

    // Event listener para el clic en el icono de usuario
    if (userToggle && userMenu) {
        userToggle.addEventListener('click', function(event) {
            event.stopPropagation(); // Evita que el clic se propague al documento
            closeLanguageDropdown(); // Cierra el menú de idioma si está abierto
            userMenu.classList.toggle('show'); // Alternar la clase 'show'
        });
    }

    // Event listener para el clic en el icono de idioma (NUEVO)
    if (languageToggle && languageMenu) {
        languageToggle.addEventListener('click', function(event) {
            event.stopPropagation(); // Evita que el clic se propague al documento
            closeUserDropdown(); // Cierra el menú de usuario si está abierto
            languageMenu.classList.toggle('show'); // Alternar la clase 'show'
        });
    }

    // Event listener global para cerrar ambos dropdowns cuando se hace clic fuera de ellos
    document.addEventListener('click', function(event) {
        // Cierra el menú de usuario si está abierto y el clic no fue dentro de él ni en su toggle
        if (userMenu && userMenu.classList.contains('show') && !userMenu.contains(event.target) && event.target !== userToggle) {
            closeUserDropdown();
        }
        // Cierra el menú de idioma si está abierto y el clic no fue dentro de él ni en su toggle
        if (languageMenu && languageMenu.classList.contains('show') && !languageMenu.contains(event.target) && event.target !== languageToggle) {
            closeLanguageDropdown();
        }
    });

    // Event listeners para las opciones del menú de usuario
    const dropdownItems = userMenu ? userMenu.querySelectorAll('.dropdown-item') : [];
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar el comportamiento por defecto del enlace
            const itemText = item.textContent.trim();
            console.log(`Has seleccionado: ${itemText}`);

            // Aquí puedes añadir la lógica para cada opción
            if (item.classList.contains('logout')) {
                // Lógica para cerrar sesión
                alert('Sesión cerrada. Redirigiendo a la página principal...');
                window.location.href = 'resgistrarse.html'; // Ejemplo: Redirigir a la página de inicio de sesión o principal
            } else if (itemText === 'Ajustes del perfil') {
                window.location.href = 'perfil.html'; // Ejemplo: Redirigir a la página de perfil
            } else if (itemText === 'Ayuda') {
                window.location.href = 'ayuda.html'; // Redirige a la página de ayuda ya existente
            }

            closeUserDropdown(); // Cerrar el menú de usuario después de hacer clic en una opción
        });
    });

    // Event listeners para las opciones del menú de idioma (NUEVO)
    const languageMenuItems = languageMenu ? languageMenu.querySelectorAll('.dropdown-item') : [];
    languageMenuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Evita la navegación por defecto del <a>

            // Opcional: Eliminar 'active-lang' de todos los ítems y añadirlo al clicado
            languageMenuItems.forEach(i => i.classList.remove('active-lang'));
            this.classList.add('active-lang');

            // Opcional: Cambiar la bandera en el toggle principal
            const newFlagSrc = this.querySelector('img').src;
            languageToggle.src = newFlagSrc;

            console.log("Idioma seleccionado:", this.textContent.trim()); // Solo para depuración

            closeLanguageDropdown(); // Cierra el menú de idioma después de la selección
            // En una aplicación real, aquí integrarías la lógica para cambiar el idioma global de la app.
            // Esto podría implicar:
            // 1. Recargar la página con un parámetro de idioma en la URL.
            // 2. Usar localStorage para guardar la preferencia y que un backend cargue el contenido.
            // 3. Usar un framework de i18n para cambiar los textos dinámicamente sin recargar.
        });
    });
});

