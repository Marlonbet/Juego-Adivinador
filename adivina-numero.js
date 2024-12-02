// Variables del juego
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

function flashMessage(text, className) {
  const message = document.getElementById('message');
  message.textContent = text;
  message.className = `message ${className}`;
}

function checkGuess() {
  const guess = Number(document.getElementById('guess').value);

  if (!guess || guess < 1 || guess > 100) {
    flashMessage('Por favor, ingresa un número válido entre 1 y 100.', 'loser');
    return;
  }

  if (guess === secretNumber) {
    flashMessage(`¡🎉 Felicidades! Adivinaste el número ${secretNumber}.`, 'winner');
    disableInput();
  } else {
    attempts--;
    flashMessage(guess < secretNumber ? `El número es mayor que ${guess}.` : `El número es menor que ${guess}.`, '');
  }

  document.getElementById('attempts').textContent = attempts;
  document.getElementById('progress-bar').style.width = `${(attempts / 10) * 100}%`;

  if (attempts === 0) {
    flashMessage(`😢 Perdiste. El número era ${secretNumber}.`, 'loser');
    disableInput();
  }
}

function disableInput() {
  document.getElementById('guess').disabled = true;
  document.getElementById('check-btn').disabled = true;
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 10;
  document.getElementById('guess').disabled = false;
  document.getElementById('check-btn').disabled = false;
  document.getElementById('guess').value = '';
  document.getElementById('attempts').textContent = attempts;
  document.getElementById('progress-bar').style.width = '100%';
  flashMessage('', '');
}