
const cards = [];
let flippedCards = [];
let matchedPairs = 0;

document.addEventListener('DOMContentLoaded', () => {
  initializeGame();

  document.getElementById('resetButton').addEventListener('click', resetGame);
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('winModal').classList.remove('active');
  });
});

function initializeGame() {
  const cardValues = createShuffledCards();
  const gameGrid = document.getElementById('gameGrid');
  gameGrid.innerHTML = '';

  cardValues.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', () => flipCard(card, index));
    gameGrid.appendChild(card);
  });
}

function createShuffledCards() {
  const values = Array.from({ length: 18 }, (_, i) => i + 1);
  // Duplicate for matching pairs
  const cardValues = [...values, ...values]; 
  // Shuffle the array
  return cardValues.sort(() => Math.random() - 0.5); 
}

function flipCard(card, index) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    card.textContent = card.dataset.value;
    flippedCards.push({ card, index });

    // If statement to check matched 2 cards that are selected
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Function to match cards
function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  if (firstCard.card.dataset.value === secondCard.card.dataset.value) {
    matchedPairs++;
    if (matchedPairs === 18) {
      setTimeout(showWinModal, 500);
    }
    flippedCards = [];
  } else {
    setTimeout(() => {
      firstCard.card.classList.remove('flipped');
      secondCard.card.classList.remove('flipped');
      firstCard.card.textContent = '';
      secondCard.card.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

// Reset the game
function resetGame() {
  matchedPairs = 0;
  flippedCards = [];
  initializeGame();
}

function showWinModal() {
  document.getElementById('winModal').classList.add('active');
}
