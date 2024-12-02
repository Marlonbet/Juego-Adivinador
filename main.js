// Cambio de vistas dinámico
function changeView(viewId) {
  // Oculta todas las pantallas
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));
  
  // Muestra la pantalla seleccionada
  document.getElementById(viewId).classList.add('active');
}

// Recargar la página
function reloadPage() {
  location.reload();
}