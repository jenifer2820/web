const traducciones = {
  es: {
    inicio: "Inicio",
    perfil: "Perfil",
    lecciones: "Lecciones",
    notificaciones: "Notificaciones",
    mensajes: "Mensajes",
    foro: "Foro",
    pagos: "Pagos de Inscripción",
    ajustes: "Ajustes",
    ayuda: "Ayuda",
    titulo: "AJUSTES DEL SISTEMA",
    buscar: "Buscar",
    lenguaje: "LENGUAJE",
    lang_es: "Español",
    lang_en: "Inglés",
    lang_it: "Italiano",
    lang_fr: "Francés",
    opcion1: "Opción 1",
    opcion2: "Opción 2",
    opcion3: "Opción 3",
    opcion4: "Opción 4",
    contraste: "CONTRASTE",
    descanso: "DESCANSO VISUAL",
    temas: "TEMAS",
    privacidad: "AJUSTES DE PRIVACIDAD",
    priv_opcion1: "Mi perfil es visible para otros usuarios",
    priv_opcion2: "Mostrarme en clasificaciones y ranking",
    priv_opcion3: "Permitir recibir mensajes privados",
    priv_opcion4: "Mostrar mis logros y medallas públicamente",
  },
  en: {
    inicio: "Home",
    perfil: "Profile",
    lecciones: "Lessons",
    notificaciones: "Notifications",
    mensajes: "Messages",
    foro: "Forum",
    pagos: "Enrollment Payments",
    ajustes: "Settings",
    ayuda: "Help",
    titulo: "SYSTEM SETTINGS",
    buscar: "Search",
    lenguaje: "LANGUAGE",
    lang_es: "Spanish",
    lang_en: "English",
    lang_it: "Italian",
    lang_fr: "French",
    opcion1: "Option 1",
    opcion2: "Option 2",
    opcion3: "Option 3",
    opcion4: "Option 4",
    contraste: "CONTRAST",
    descanso: "EYE CARE",
    temas: "THEMES",
    privacidad: "PRIVACY SETTINGS",
    priv_opcion1: "My profile is visible to other users",
    priv_opcion2: "Show me in rankings and leaderboards",
    priv_opcion3: "Allow receiving private messages",
    priv_opcion4: "Show my achievements and badges publicly",
  },
  it: {
    inicio: "Inizio",
    perfil: "Profilo",
    lecciones: "Lezioni",
    notificaciones: "Notifiche",
    mensajes: "Messaggi",
    foro: "Forum",
    pagos: "Pagamenti di Iscrizione",
    ajustes: "Impostazioni",
    ayuda: "Aiuto",
    titulo: "IMPOSTAZIONI DI SISTEMA",
    buscar: "Cerca",
    lenguaje: "LINGUA",
    lang_es: "Spagnolo",
    lang_en: "Inglese",
    lang_it: "Italiano",
    lang_fr: "Francese",
    opcion1: "Opzione 1",
    opcion2: "Opzione 2",
    opcion3: "Opzione 3",
    opcion4: "Opzione 4",
    contraste: "CONTRASTO",
    descanso: "PAUSA VISIVA",
    temas: "TEMI",
    privacidad: "IMPOSTAZIONI DI PRIVACY",
    priv_opcion1: "Il mio profilo è visibile agli altri utenti",
    priv_opcion2: "Mostrami nelle classifiche e nei ranking",
    priv_opcion3: "Consenti la ricezione di messaggi privati",
    priv_opcion4: "Mostra pubblicamente i miei successi e badge",
  },
  fr: {
    inicio: "Accueil",
    perfil: "Profil",
    lecciones: "Leçons",
    notificaciones: "Notifications",
    mensajes: "Messages",
    foro: "Forum",
    pagos: "Paiements d'inscription",
    ajustes: "Paramètres",
    ayuda: "Aide",
    titulo: "PARAMÈTRES DU SYSTÈME",
    buscar: "Rechercher",
    lenguaje: "LANGUE",
    lang_es: "Espagnol",
    lang_en: "Anglais",
    lang_it: "Italien",
    lang_fr: "Français",
    opcion1: "Option 1",
    opcion2: "Option 2",
    opcion3: "Option 3",
    opcion4: "Option 4",
    contraste: "CONTRASTE",
    descanso: "REPOS VISUEL",
    temas: "THÈMES",
    privacidad: "PARAMÈTRES DE CONFIDENTIALITÉ",
    priv_opcion1: "Mon profil est visible par les autres utilisateurs",
    priv_opcion2: "M'afficher dans les classements et palmarès",
    priv_opcion3: "Autoriser la réception de messages privés",
    priv_opcion4: "Afficher publiquement mes succès et badges",
  }
};

document.querySelectorAll('input[name="lang"]').forEach(el => {
  el.addEventListener("change", () => {
    const lang = el.value;
    document.querySelectorAll("[data-i18n]").forEach(elem => {
      const key = elem.getAttribute("data-i18n");
      if (traducciones[lang][key]) elem.textContent = traducciones[lang][key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(elem => {
      const key = elem.getAttribute("data-i18n-placeholder");
      if (traducciones[lang][key]) elem.placeholder = traducciones[lang][key];
    });
  });
});

// Contraste
document.getElementById("contrastToggle").addEventListener("change", e => {
  document.body.classList.toggle("high-contrast", e.target.checked);
});

// Descanso visual con persistencia
const descansoToggle = document.getElementById("descansoToggle");

// Al cambiar, guardar en localStorage
descansoToggle.addEventListener("change", e => {
  const isChecked = e.target.checked;
  document.body.classList.toggle("descanso-visual", isChecked);
  localStorage.setItem("descansoVisual", isChecked ? "true" : "false");
});

// Al cargar la página, aplicar si estaba activado
if (localStorage.getItem("descansoVisual") === "true") {
  document.body.classList.add("descanso-visual");
  descansoToggle.checked = true;
}


document.querySelectorAll('input[name="notif"]').forEach(el => {
  el.addEventListener("change", () => {
    const sonido = el.value; // Obtiene 1, 2, 3 o 4
    const audio = new Audio(`recursos/sonido${sonido}.mp3`);
    audio.play();
  });
});

// Definición de temas
const temas = {
  magenta: {
    '--primary-color': 'magenta',
    '--background-color': '#ffe6f7',
    '--sidebar-color': '#80004d',
    '--text-color': '#2d001a',
    '--box-color': '#ffffff',
    '--search-border-color': '#80004d'
  },
  blue: {
    '--primary-color': 'blue',
    '--background-color': '#e6f0ff',
    '--sidebar-color': '#003366',
    '--text-color': '#001933',
    '--box-color': '#ffffff',
    '--search-border-color': '#003366'
  },
  orange: {
    '--primary-color': 'orange',
    '--background-color': '#fff3e6',
    '--sidebar-color': '#cc6600',
    '--text-color': '#331a00',
    '--box-color': '#ffffff',
    '--search-border-color': '#cc6600'
  },
  green: {
    '--primary-color': 'green',
    '--background-color': '#e6ffee',
    '--sidebar-color': '#006633',
    '--text-color': '#00261a',
    '--box-color': '#ffffff',
    '--search-border-color': '#006633'
  }
};

// Aplicar tema desde localStorage
const temaGuardado = localStorage.getItem('tema') || 'blue';
aplicarTema(temaGuardado);
marcarTemaSeleccionado(temaGuardado);

// Eventos para seleccionar tema
document.querySelectorAll('.theme').forEach(themeEl => {
  themeEl.addEventListener('click', () => {
    const nombreTema = themeEl.getAttribute('data-theme');
    aplicarTema(nombreTema);
    localStorage.setItem('tema', nombreTema);
    marcarTemaSeleccionado(nombreTema);
  });
});

// Función para aplicar tema
function aplicarTema(nombreTema) {
  if (nombreTema === 'white') {
    document.documentElement.removeAttribute('style');
  } else {
    const tema = temas[nombreTema];
    for (const variable in tema) {
      document.documentElement.style.setProperty(variable, tema[variable]);
    }
  }
}

// Marcar visualmente el tema seleccionado
function marcarTemaSeleccionado(nombreTema) {
  document.querySelectorAll('.theme').forEach(el => {
    el.classList.remove('selected');
    if (el.getAttribute('data-theme') === nombreTema) {
      el.classList.add('selected');
    }
  });
}

// Restaurar checkboxes de privacidad desde localStorage
const checkboxesPrivacidad = document.querySelectorAll('input[name="privacidad"]');
const privacidadSeleccionadas = JSON.parse(localStorage.getItem('privacidadSeleccionadas')) || [];

checkboxesPrivacidad.forEach(checkbox => {
  if (privacidadSeleccionadas.includes(checkbox.value)) {
    checkbox.checked = true;
  }

  checkbox.addEventListener('change', () => {
    const seleccionadas = Array.from(checkboxesPrivacidad)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    localStorage.setItem('privacidadSeleccionadas', JSON.stringify(seleccionadas));
  });
});
