document.addEventListener("DOMContentLoaded", () => {
  // Simular historial de exámenes
  const examenes = [
    { fecha: "2025-06-01", habla: 4.5, escucha: 5, escritura: 4 },
    { fecha: "2025-06-08", habla: 5, escucha: 4.5, escritura: 4.5 },
    { fecha: "2025-06-15", habla: 5, escucha: 4, escritura: 5 }
  ];

  const tbody = document.getElementById("tablaHistorial");
  examenes.forEach(exam => {
    const fila = document.createElement("tr");
    const total = (exam.habla + exam.escucha + exam.escritura).toFixed(1);
    fila.innerHTML = `
      <td>${exam.fecha}</td>
      <td>${exam.habla}</td>
      <td>${exam.escucha}</td>
      <td>${exam.escritura}</td>
      <td><strong>${total}</strong></td>
    `;
    tbody.appendChild(fila);
  });

  // Gráfico de rendimiento con Chart.js
  const ctx = document.getElementById('graficoProgreso').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: examenes.map(e => e.fecha),
      datasets: [
        {
          label: 'Habla',
          data: examenes.map(e => e.habla),
          borderColor: '#ff7043',
          fill: false
        },
        {
          label: 'Escucha',
          data: examenes.map(e => e.escucha),
          borderColor: '#42a5f5',
          fill: false
        },
        {
          label: 'Escritura',
          data: examenes.map(e => e.escritura),
          borderColor: '#66bb6a',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'Progreso por Habilidad (últimos exámenes)' }
      }
    }
  });
});

const ctxBarras = document.getElementById('graficoBarras').getContext('2d');

const graficoBarras = new Chart(ctxBarras, {
  type: 'bar',
  data: {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Habla',
        data: [65, 70, 75, 80],
        backgroundColor: '#42a5f5'
      },
      {
        label: 'Escucha',
        data: [60, 65, 60, 70],
        backgroundColor: '#66bb6a'
      },
      {
        label: 'Escritura',
        data: [70, 72, 78, 82],
        backgroundColor: '#ffa726'
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Puntaje (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Semana'
        }
      }
    }
  }
});


