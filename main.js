// Cambio de vistas dinámico
function changeView(viewId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
}

// Recargar la página
function reloadPage() {
  location.reload();
}

// Mostrar alerta si no hay conexión
window.addEventListener('offline', () => {
  alert('Estás sin conexión. Algunas funciones pueden no estar disponibles.');
});
