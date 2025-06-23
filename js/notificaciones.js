document.addEventListener('DOMContentLoaded', function () {
    const notificacionesContainer = document.querySelector('.notification-list');
    const navLinks = document.querySelectorAll('.main-nav .nav-item');
    const tabItems = document.querySelectorAll('.notification-tabs .tab-item');
    const markAllReadButton = document.getElementById('markAllReadButton');
    const replyButton = document.getElementById('replyButton');
    const deleteSelectedButton = document.getElementById('deleteSelectedButton');

    // Función para obtener todas las notificaciones actualmente en el DOM
    const getAllNotifications = () => document.querySelectorAll('.notification-box');

    // Lógica para resaltar la opción activa en el menú lateral
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        const currentPath = window.location.pathname.split('/').pop();

        if (linkPath === currentPath) {
            navLinks.forEach(l => l.classList.remove('current-page'));
            link.classList.add('current-page');
        }
    });

    // Función para manejar el clic en una notificación (marcar como leída/no leída)
    const handleNotificationClick = (event) => {
        const notificationBox = event.currentTarget; // El 'notification-box'
        // Prevenir la acción si el clic fue en un botón de acción (archivar/posponer)
        if (event.target.closest('.icon-button')) {
            return;
        }
        notificationBox.classList.toggle('leida');
        applyCurrentFilter(); // Re-aplicar el filtro para actualizar la vista
    };

    // Aplicar listeners a notificaciones existentes y nuevas (si se añaden dinámicamente)
    const addNotificationListeners = () => {
        getAllNotifications().forEach(box => {
            // Remover listeners previos para evitar duplicados si se llama varias veces
            box.removeEventListener('click', handleNotificationClick);
            box.addEventListener('click', handleNotificationClick);

            const archiveButton = box.querySelector('.archive-button');
            const snoozeButton = box.querySelector('.snooze-button');

            if (archiveButton) {
                archiveButton.removeEventListener('click', handleArchiveClick);
                archiveButton.addEventListener('click', handleArchiveClick);
            }
            if (snoozeButton) {
                snoozeButton.removeEventListener('click', handleSnoozeClick);
                snoozeButton.addEventListener('click', handleSnoozeClick);
            }
        });
    };

    // Manejadores para los botones de acción individuales (archivar, posponer)
    const handleArchiveClick = (e) => {
        e.stopPropagation(); // Evitar que el clic en el botón active el evento de la caja principal
        const notificationBox = e.target.closest('.notification-box');
        if (notificationBox) {
            alert('Archivando notificación: ' + notificationBox.querySelector('h3').textContent);
            notificationBox.remove(); // O puedes añadir una clase 'archivada' y ocultarla con CSS
            applyCurrentFilter(); // Re-aplicar filtro si archivar afecta el conteo/vista
        }
    };

    const handleSnoozeClick = (e) => {
        e.stopPropagation(); // Evitar que el clic en el botón active el evento de la caja principal
        const notificationBox = e.target.closest('.notification-box');
        if (notificationBox) {
            alert('Posponiendo notificación: ' + notificationBox.querySelector('h3').textContent);
            // Implementa lógica para posponer (ej. ocultarla temporalmente, añadir a una lista de pospuestas)
            notificationBox.remove(); // Para este ejemplo, la removemos para simular posponerla fuera de la vista
            applyCurrentFilter();
        }
    };

    // Lógica para el botón "Marcar todas como leídas"
    if (markAllReadButton) {
        markAllReadButton.addEventListener('click', function() {
            getAllNotifications().forEach(box => {
                box.classList.add('leida');
            });
            applyCurrentFilter(); // Re-aplicar el filtro para actualizar la vista
        });
    }

    // Lógica para el botón "Responder"
    if (replyButton) {
        replyButton.addEventListener('click', function() {
            alert('Funcionalidad de Responder pendiente. Podrías abrir un modal o redirigir a una página de mensajes.');
        });
    }

    // Lógica para el botón "Eliminar" (elimina las notificaciones "leídas")
    if (deleteSelectedButton) {
        deleteSelectedButton.addEventListener('click', function() {
            const notificacionesLeidas = document.querySelectorAll('.notification-box.leida');
            if (notificacionesLeidas.length > 0) {
                if (confirm("¿Estás seguro de que quieres eliminar ${notificacionesLeidas.length} notificación(es) marcadas como leídas?")) {
                    notificacionesLeidas.forEach(noti => noti.remove());
                    applyCurrentFilter(); // Re-aplicar el filtro después de eliminar
                }
            } else {
                alert('No hay notificaciones marcadas como leídas para eliminar. Haz clic en una notificación para marcarla como leída.');
            }
        });
    }

    // ==== LÓGICA PARA LAS PESTAÑAS DE NOTIFICACIONES ====
    let currentFilter = 'all'; // Variable para mantener el filtro activo

    const applyCurrentFilter = () => {
        const notifications = getAllNotifications(); // Obtener las notificaciones actuales

        notifications.forEach(notification => {
            const isRead = notification.classList.contains('leida');
            const type = notification.dataset.type; // Usar data-type

            let shouldShow = false;

            if (currentFilter === 'all') {
                shouldShow = true;
            } else if (currentFilter === 'unread') {
                shouldShow = !isRead;
            } else if (currentFilter === 'messages') {
                shouldShow = (type === 'messages');
            } else if (currentFilter === 'settings') {
                shouldShow = (type === 'settings');
            }

            notification.style.display = shouldShow ? 'flex' : 'none';
        });
    };

    tabItems.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();

            // 1. Manejar la clase 'active' en las pestañas
            tabItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            // 2. Actualizar el filtro actual y aplicarlo
            currentFilter = this.dataset.filter; // Obtener el valor del atributo data-filter
            applyCurrentFilter();
        });
    });

    // Inicialización:
    // 1. Añadir listeners a las notificaciones al cargar la página
    addNotificationListeners();

    // 2. Activar la pestaña 'Todas' por defecto al cargar la página y aplicar el filtro inicial
    // Buscar la pestaña que tiene 'active' por defecto en el HTML (idealmente 'Todas')
    const activeTab = document.querySelector('.notification-tabs .tab-item.active');
    if (activeTab) {
        currentFilter = activeTab.dataset.filter;
        applyCurrentFilter();
    } else {
        // Si no hay ninguna activa en el HTML, activar la primera (Todas)
        tabItems[0].classList.add('active');
        currentFilter = tabItems[0].dataset.filter;
        applyCurrentFilter();
    }
});