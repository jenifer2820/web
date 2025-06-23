document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (window.location.pathname.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });

    const currentPath = window.location.pathname;
    if (currentPath.includes('inicio.html') || currentPath.endsWith('/inicio/')) {
        document.querySelectorAll('.main-nav a').forEach(link => {
            if (link.getAttribute('href') === 'lecciones.html') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    const continueButton = document.querySelector('.recent-modules .continue-button');
    if (continueButton) {
        continueButton.addEventListener('click', function() {
            alert('Continuando con el Módulo 2 de Inglés (Nivel A1)...');
        });
    }

    const moduleButtons = document.querySelectorAll('.module-navigation .module-button');
    moduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            moduleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const dots = document.querySelectorAll('.module-progress-line .dot');
            const clickedModuleIndex = Array.from(moduleButtons).indexOf(this);
            dots.forEach((dot, index) => {
                if (index <= clickedModuleIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            alert(`Has seleccionado: ${this.textContent}`);
        });
    });

    const exerciseItems = document.querySelectorAll('.exercise-item');
    exerciseItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const exerciseType = this.querySelector('strong') ? this.querySelector('strong').textContent : 'este ejercicio';
            alert(`Comenzando: ${exerciseType}`);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  // ---------------- EJERCICIOS DE HABLA ----------------
  const frases = [
    "The weather is nice today.",
    "I would like a cup of coffee.",
    "She goes to school every morning.",
    "We are learning English together.",
    "Can you help me, please?"
  ];

  let indiceFrase = 0;

  const modalHabla = document.getElementById("modalHabla");
  const fraseElemento = document.getElementById("frase");
  const statusGrabacion = document.getElementById("statusGrabacion");

  const btnHabla = document.getElementById("btnHabla");
  const btnCerrarHabla = modalHabla.querySelector(".close");
  const btnMicrofono = document.getElementById("btnMicrofono");
  const btnEnviar = document.getElementById("btnEnviar");
  const btnContinuar = document.getElementById("btnContinuar");

  btnHabla.addEventListener("click", () => {
    indiceFrase = 0;
    fraseElemento.textContent = frases[indiceFrase];
    statusGrabacion.textContent = "Esperando grabación...";
    modalHabla.style.display = "block";
  });

  btnCerrarHabla.addEventListener("click", () => {
    modalHabla.style.display = "none";
  });

  btnMicrofono.addEventListener("click", () => {
    statusGrabacion.textContent = "🎙️ Grabando...";
    setTimeout(() => {
      statusGrabacion.textContent = "✅ Grabación completada.";
    }, 3000);
  });

  btnEnviar.addEventListener("click", () => {
    alert("Grabación enviada para revisión.");
  });

  btnContinuar.addEventListener("click", () => {
    indiceFrase++;
    if (indiceFrase < frases.length) {
      fraseElemento.textContent = frases[indiceFrase];
      statusGrabacion.textContent = "Esperando grabación...";
    } else {
      alert("¡Has completado todos los ejercicios!");
      modalHabla.style.display = "none";
    }
  });

  // ---------------- EJERCICIOS DE ESCUCHA ----------------
  const ejerciciosEscucha = [
    { texto: "The cat is on the table.", audio: "https://www.englishvoices.org/audio/the-cat-is-on-the-table.mp3" },
    { texto: "I am learning English.", audio: "https://www.englishvoices.org/audio/i-am-learning-english.mp3" },
    { texto: "Can you help me?", audio: "https://www.englishvoices.org/audio/can-you-help-me.mp3" }
  ];

  let indiceEscucha = 0;

  const modalEscucha = document.getElementById("modalEscucha");
  const btnEscucha = document.getElementById("btnEscucha");
  const closeEscucha = modalEscucha.querySelector(".close-escucha");
  const audioPlayer = document.getElementById("audioPlayer");
  const respuestaEscucha = document.getElementById("respuestaEscucha");
  const btnEnviarEscucha = document.getElementById("btnEnviarEscucha");
  const btnContinuarEscucha = document.getElementById("btnContinuarEscucha");

  btnEscucha.addEventListener("click", () => {
    indiceEscucha = 0;
    cargarEjercicioEscucha(indiceEscucha);
    modalEscucha.style.display = "block";
  });

  closeEscucha.addEventListener("click", () => {
    modalEscucha.style.display = "none";
  });

  btnEnviarEscucha.addEventListener("click", () => {
    const respuesta = respuestaEscucha.value.trim();
    if (respuesta) {
      alert("Respuesta enviada: " + respuesta);
    } else {
      alert("Por favor escribe tu respuesta.");
    }
  });

  btnContinuarEscucha.addEventListener("click", () => {
    indiceEscucha++;
    if (indiceEscucha < ejerciciosEscucha.length) {
      cargarEjercicioEscucha(indiceEscucha);
    } else {
      alert("¡Has completado todos los ejercicios de escucha!");
      modalEscucha.style.display = "none";
    }
  });

  function cargarEjercicioEscucha(indice) {
    audioPlayer.src = ejerciciosEscucha[indice].audio;
    respuestaEscucha.value = "";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const ejerciciosEscritura = [
    { esp: "El gato está en la mesa.", eng: "The cat is on the table." },
    { esp: "Estoy aprendiendo inglés.", eng: "I am learning English." },
    { esp: "¿Puedes ayudarme?", eng: "Can you help me?" }
  ];

  let indiceEscritura = 0;

  const modalEscritura = document.getElementById("modalEscritura");
  const btnEscritura = document.getElementById("btnEscritura");
  const closeEscritura = document.querySelector(".close-escritura");
  const fraseEscritura = document.getElementById("fraseEscritura");
  const respuestaEscritura = document.getElementById("respuestaEscritura");
  const btnEnviarEscritura = document.getElementById("btnEnviarEscritura");
  const btnContinuarEscritura = document.getElementById("btnContinuarEscritura");

  btnEscritura.addEventListener("click", () => {
    indiceEscritura = 0;
    cargarEjercicioEscritura(indiceEscritura);
    modalEscritura.style.display = "block";
  });

  closeEscritura.addEventListener("click", () => {
    modalEscritura.style.display = "none";
  });

  btnEnviarEscritura.addEventListener("click", () => {
    const respuesta = respuestaEscritura.value.trim();
    if (respuesta) {
      alert("Respuesta enviada: " + respuesta);
    } else {
      alert("Por favor escribe tu traducción.");
    }
  });

  btnContinuarEscritura.addEventListener("click", () => {
    indiceEscritura++;
    if (indiceEscritura < ejerciciosEscritura.length) {
      cargarEjercicioEscritura(indiceEscritura);
    } else {
      alert("¡Has completado todos los ejercicios de escritura!");
      modalEscritura.style.display = "none";
    }
  });

  function cargarEjercicioEscritura(indice) {
    fraseEscritura.textContent = ejerciciosEscritura[indice].esp;
    respuestaEscritura.value = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const modalExamen = document.getElementById("modalExamenes");
  const btnExamenes = document.getElementById("btnExamenes");
  const closeExamen = document.querySelector(".close-examen");
  const btnEnviarExamen = document.getElementById("btnEnviarExamen");
  const feedbackContainer = document.getElementById("feedbackExamen");

  // Mostrar modal
  btnExamenes.addEventListener("click", () => {
    modalExamen.style.display = "block";
    feedbackContainer.innerHTML = "";
  });

  // Cerrar modal
  closeExamen.addEventListener("click", () => {
    modalExamen.style.display = "none";
  });

  // Simular grabación
  document.querySelectorAll(".btn-simular-habla").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const feedbacks = document.querySelectorAll(".feedback-habla");
      btn.textContent = "🎙️ Grabando...";
      setTimeout(() => {
        btn.textContent = "✅ Grabación completada";
        feedbacks[i].textContent = "Grabación aceptada";
        feedbacks[i].style.color = "green";
      }, 2000);
    });
  });

  // Evaluar examen
  btnEnviarExamen.addEventListener("click", () => {
    let puntuacion = 0;
    let feedback = "<h3>Retroalimentación:</h3><ul>";

    // Verifica que todas las grabaciones estén hechas
    const grabaciones = document.querySelectorAll(".feedback-habla");
    grabaciones.forEach((f, i) => {
      if (f.textContent.includes("aceptada")) {
        puntuacion += 2.5;
        feedback += `<li>Habla ${i + 1}: ✅ Correcto (+2.5)</li>`;
      } else {
        feedback += `<li>Habla ${i + 1}: ❌ No se grabó</li>`;
      }
    });

    // Escucha
    const respuestasEscucha = document.querySelectorAll(".respuesta-escucha");
    const solucionesEscucha = [
      "The cat is on the table.",
      "I am learning English.",
      "Can you help me?"
    ];

    respuestasEscucha.forEach((textarea, i) => {
      if (textarea.value.trim().toLowerCase() === solucionesEscucha[i].toLowerCase()) {
        puntuacion += 2.5;
        feedback += `<li>Escucha ${i + 1}: ✅ Correcto (+2.5)</li>`;
      } else {
        feedback += `<li>Escucha ${i + 1}: ❌ "${textarea.value.trim()}"</li>`;
      }
    });

    // Escritura
    const respuestasEscritura = document.querySelectorAll(".respuesta-escritura");
    const solucionesEscritura = [
      "She is cooking dinner.",
      "We live in a big city.",
      "I am learning English every day."
    ];

    respuestasEscritura.forEach((input, i) => {
      if (input.value.trim().toLowerCase() === solucionesEscritura[i].toLowerCase()) {
        puntuacion += 2.5;
        feedback += `<li>Escritura ${i + 1}: ✅ Correcto (+2.5)</li>`;
      } else {
        feedback += `<li>Escritura ${i + 1}: ❌ "${input.value.trim()}"</li>`;
      }
    });

    feedback += `</ul><strong>Puntuación final: ${puntuacion.toFixed(1)} / 20</strong>`;
    feedbackContainer.innerHTML = feedback;
    feedbackContainer.style.borderTop = "2px solid #ccc";
    feedbackContainer.style.marginTop = "10px";
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const btnPanelProgreso = document.getElementById('btnPanelProgreso');
  if (btnPanelProgreso) {
    btnPanelProgreso.addEventListener('click', () => {
      window.open('dashboards-progreso.html', '_blank');
    });
  }
});