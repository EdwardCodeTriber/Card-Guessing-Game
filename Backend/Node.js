// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Add this line to serve files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

let cards = [];
let matched = [];

const initializeGame = () => {
  const cardValues = Array.from({ length: 18 }, (_, i) => i + 1);
  const deck = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
  // cards = deck.map((value, index) => ({ id: index, value, flipped: false }));
  // matched = [];
  //Used pictures instead of numbers
  cards = deck.map((value, index) => ({
    id: index,
    value,
    flipped: false,
    image: `images/card-${value}.jpg` // Assign an image to each card
  }));
  matched = [];
};

// Initialize game at server start
initializeGame();

app.get('/api/cards', (req, res) => {
  res.json(cards);
});

app.post('/api/flip', (req, res) => {
  const { id } = req.body;
  if (cards[id].flipped || matched.includes(id)) {
    return res.status(400).json({ message: 'Invalid move' });
  }

  cards[id].flipped = true;
  res.json(cards);
});

app.post('/api/check-match', (req, res) => {
  const { firstId, secondId } = req.body;
  if (cards[firstId].value === cards[secondId].value) {
    matched.push(firstId, secondId);
  } else {
    cards[firstId].flipped = false;
    cards[secondId].flipped = false;
  }
  res.json({ matched });
});

app.post('/api/reset', (req, res) => {
  initializeGame();
  res.json({ message: 'Game reset' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
