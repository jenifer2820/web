// script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Manejar la clase 'active' en la barra lateral ---
    // (Esta sección no necesita cambios y sigue funcionando para resaltar el enlace activo de la barra lateral)
    const currentPath = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo actual (ej. "inicio.html")
    const navLinks = document.querySelectorAll('.main-nav ul li a'); // Selecciona todos los enlaces de navegación

    navLinks.forEach(link => {
        // Si el href del enlace coincide con el archivo actual, añade la clase 'active'
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            // Si no, asegúrate de que no tenga la clase 'active'
            link.classList.remove('active');
        }
    });

    // --- 2. Manejar la redirección del botón "Registrarse" (el pequeño de arriba) ---
    const btnRegistrarseSmall = document.querySelector('.top-buttons .btn-primary-small');
    if (btnRegistrarseSmall) {
        btnRegistrarseSmall.addEventListener('click', function(event) {
            event.preventDefault(); // Previene el comportamiento por defecto del botón
            console.log('Botón "Registrarse" (pequeño) clickeado. Redirigiendo a resgistrarse.html');
            // Redirige al usuario a la página de registro
            window.location.href = 'resgistrarse.html'; // Usando resgistrarse.html
        });
    }

    // --- 3. Manejar la redirección del botón grande "Aprende gratis" (sección hero) ---
    const btnAprendeGratisMain = document.querySelector('.hero-content .btn-primary');
    if (btnAprendeGratisMain) {
        btnAprendeGratisMain.addEventListener('click', function(event) {
            event.preventDefault(); // Previene el comportamiento por defecto
            console.log('Botón "Aprende gratis" (principal) clickeado. Desplazando a la sección de idiomas.');
            // Desplaza a la sección de selección de idiomas en la misma página
            const languageSection = document.getElementById('language-selection'); // Asegúrate de que tu sección tenga este ID
            if (languageSection) {
                languageSection.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
            } else {
                // Fallback si no encuentra el ID, podrías redirigir a alguna parte
                window.location.href = '#'; // O simplemente no hacer nada
            }
        });
    }

    // --- 4. Manejar la redirección del botón "Aprende gratis" (el de la esquina superior) ---
    const btnAprendeGratisTop = document.querySelector('.top-buttons .btn-secondary');
    if (btnAprendeGratisTop) {
        btnAprendeGratisTop.addEventListener('click', function(event) {
            event.preventDefault(); // Previene el comportamiento por defecto
            console.log('Botón "Aprende gratis" (superior) clickeado. Desplazando a la sección de idiomas.');
            // Desplaza a la sección de selección de idiomas en la misma página
            const languageSection = document.getElementById('language-selection'); // Asegúrate de que tu sección tenga este ID
            if (languageSection) {
                languageSection.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
            } else {
                // Fallback si no encuentra el ID
                window.location.href = '#';
            }
        });
    }

    // --- 5. Manejar clics en los elementos de idioma de la cuadrícula (redirige a resgistrarse.html) ---
    const languageItems = document.querySelectorAll('.language-item');
    languageItems.forEach(item => {
        item.addEventListener('click', function() {
            const languageName = item.querySelector('span').textContent;
            console.log(`Clic en el curso de ${languageName}. Redirigiendo a resgistrarse.html`);
            // Redirige directamente a la página de registro
            window.location.href = 'resgistrarse.html'; // CAMBIADO A 'resgistrarse.html'
        });
    });

    // Puedes añadir más lógica JS aquí si la necesitas
});