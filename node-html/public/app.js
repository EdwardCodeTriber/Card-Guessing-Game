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
    // Add an image element
    card.innerHTML = `<img src="${value}" alt="Card image" class="hidden" />`; 
    card.addEventListener('click', () => flipCard(card, index));
    gameGrid.appendChild(card);
  });
}

function createShuffledCards() {
  // List of 18 image 
  const images = [
    'images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg',
    'images/image4.jpg', 'images/image5.jpg', 'images/image6.jpg',
    'images/image7.jpg', 'images/image8.jpg', 'images/image9.jpg',
    'images/image10.jpg', 'images/image11.jpg', 'images/image12.jpg',
    'images/image13.jpg', 'images/image14.jpg', 'images/image15.jpg',
    'images/image16.jpg', 'images/image17.jpg', 'images/image18.jpg'
  ];

  // Duplicate images for matching pairs
  const cardValues = [...images, ...images]; 

  // Shuffle the array
  return cardValues.sort(() => Math.random() - 0.5); 
}

function flipCard(card, index) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    card.querySelector('img').classList.remove('hidden');
    flippedCards.push({ card, index });

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

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
      firstCard.card.querySelector('img').classList.add('hidden'); 
      secondCard.card.querySelector('img').classList.add('hidden'); 
      flippedCards = [];
    }, 1000);
  }
}

function resetGame() {
  matchedPairs = 0;
  flippedCards = [];
  initializeGame();
}

function showWinModal() {
  document.getElementById('winModal').classList.add('active');
}
