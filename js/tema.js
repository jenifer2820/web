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

function aplicarTema(nombreTema) {
  if (nombreTema === 'white') {
    document.documentElement.removeAttribute('style');
  } else {
    const tema = temas[nombreTema];
    for (const variable in tema) {
      document.documentElement.style.setProperty(variable, tema[variable]);
    }
  }

  localStorage.setItem('tema', nombreTema);
}

// Aplicar tema guardado al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const temaGuardado = localStorage.getItem('tema');
  if (temaGuardado) {
    aplicarTema(temaGuardado);

    // Si estamos en la página con los botones de tema, marcar el seleccionado
    document.querySelectorAll('.theme').forEach(el => {
      el.classList.toggle('selected', el.getAttribute('data-theme') === temaGuardado);
    });
  }
  const descansoVisualActivo = localStorage.getItem('descansoVisual') === 'true';
  if (descansoVisualActivo) {
    document.body.classList.add('descanso-visual');
    const toggle = document.getElementById('descansoToggle');
    if (toggle) toggle.checked = true;
  }
});
