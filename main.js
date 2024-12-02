// Cambio de vistas dinámico
function changeView(viewId) {
  // Oculta todas las pantallas
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));
  // Muestra la pantalla seleccionada
  document.getElementById(viewId).classList.add('active');
}

// Variables del juego
let secretNumber = Math.floor(Math.random() * 100) + 1; // Genera el número secreto
let attempts = 10; // Intentos restantes

// Mostrar mensaje dinámico
function flashMessage(text, className) {
  const message = document.getElementById('message');
  message.textContent = text; // Actualiza el texto del mensaje
  message.className = `message ${className}`; // Aplica la clase para estilo
}

// Comprobar el número ingresado
function checkGuess() {
  const guess = Number(document.getElementById('guess').value); // Obtiene el número ingresado

  // Validación de entrada
  if (!guess || guess < 1 || guess > 100) {
    flashMessage('Por favor, ingresa un número válido entre 1 y 100.', 'loser');
    return;
  }

  // Comparación con el número secreto
  if (guess === secretNumber) {
    flashMessage(`¡🎉 Felicidades! Adivinaste el número ${secretNumber}.`, 'winner');
    disableInput();
  } else {
    attempts--;
    flashMessage(
      guess < secretNumber
        ? `El número es mayor que ${guess}.`
        : `El número es menor que ${guess}.`,
      ''
    );
  }

  // Actualiza los intentos restantes y la barra de progreso
  document.getElementById('attempts').textContent = attempts;
  document.getElementById('progress-bar').style.width = `${(attempts / 10) * 100}%`;

  // Verifica si el jugador perdió
  if (attempts === 0) {
    flashMessage(`😢 Perdiste. El número era ${secretNumber}.`, 'loser');
    disableInput();
  }
}

// Desactivar inputs
function disableInput() {
  document.getElementById('guess').disabled = true; // Desactiva el campo de entrada
  document.getElementById('check-btn').disabled = true; // Desactiva el botón de "Adivinar"
}

// Reiniciar el juego
function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1; // Genera un nuevo número secreto
  attempts = 10; // Reinicia los intentos
  // Reactiva los elementos desactivados
  document.getElementById('guess').disabled = false;
  document.getElementById('check-btn').disabled = false;
  // Limpia el campo de entrada y mensajes
  document.getElementById('guess').value = '';
  document.getElementById('attempts').textContent = attempts;
  flashMessage('', ''); // Limpia el mensaje dinámico
  // Reinicia la barra de progreso
  document.getElementById('progress-bar').style.width = '100%';
}

// Recargar la página
function reloadPage() {
  location.reload(); // Recarga la página actual
}