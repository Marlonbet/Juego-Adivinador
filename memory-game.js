const gameBoard = document.getElementById("gameBoard");
const timerDisplay = document.getElementById("timer");
const attemptsDisplay = document.getElementById("attempts");
const difficultySelect = document.getElementById("difficulty");
const startGameButton = document.getElementById("startGame");
const toggleThemeButton = document.getElementById("toggleTheme");

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
let timer;
let timeRemaining = 60;
let isBoardLocked = false;

function generateCards(size) {
    const totalCards = size * size;
    const cardValues = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
    const allValues = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);

    gameBoard.innerHTML = "";
    allValues.forEach(value => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;

        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");
        cardFront.textContent = value;

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        cardBack.textContent = "?";

        card.appendChild(cardFront);
        card.appendChild(cardBack);

        gameBoard.appendChild(card);
    });

    gameBoard.className = `game-board ${difficultySelect.value}`;
    cards = document.querySelectorAll(".card");
}

function startGame() {
    const difficulty = difficultySelect.value;
    const gridSize = difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 8;

    timeRemaining = difficulty === "easy" ? 60 : difficulty === "medium" ? 120 : 180;
    attempts = 0;
    matchedPairs = 0;

    timerDisplay.textContent = timeRemaining;
    attemptsDisplay.textContent = attempts;

    generateCards(gridSize);

    clearInterval(timer);
    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert("¡Tiempo agotado! Intenta de nuevo.");
            resetGame();
        }
    }, 1000);

    cards.forEach(card => card.addEventListener("click", handleCardClick));
}

function handleCardClick(e) {
    if (isBoardLocked) return;

    const clickedCard = e.target.closest(".card");

    if (!clickedCard || clickedCard.classList.contains("flipped") || clickedCard.classList.contains("matched")) {
        return;
    }

    clickedCard.classList.add("flipped");
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        isBoardLocked = true;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;
        checkWin();
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }, 1000);
    }

    flippedCards = [];
    attempts++;
    attemptsDisplay.textContent = attempts;
    isBoardLocked = false;
}

function checkWin() {
    if (matchedPairs === cards.length / 2) {
        clearInterval(timer);
        const score = Math.floor((timeRemaining * 10) - (attempts * 5));
        alert(`¡Ganaste! Tu puntaje: ${score}`);
        resetGame();
    }
}

function resetGame() {
    flippedCards = [];
    matchedPairs = 0;
    attempts = 0;
    timerDisplay.textContent = 60;
    attemptsDisplay.textContent = 0;
    generateCards(4); // Reinicia con la configuración básica
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

startGameButton.addEventListener("click", startGame);
toggleThemeButton.addEventListener("click", toggleTheme);