import React, { useState, useEffect } from 'react';
import { Grid, Button, Dialog, DialogTitle } from '@mui/material';
import CardComponent from './CardComponent'; 

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [win, setWin] = useState(false);

  // Use effect to reset
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffledCards = shuffleCards();
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setWin(false);
  };

  const shuffleCards = () => {
    const cardValues = Array.from({ length: 18 }, (_, i) => i + 1);
    const deck = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
    return deck.map((value, index) => ({ id: index, value, flipped: false }));
  };

  const handleCardClick = (id) => {
    if (flipped.length < 2 && !flipped.includes(id)) {
      const newFlipped = [...flipped, id];
      setFlipped(newFlipped);
      if (newFlipped.length === 2) {
        checkMatch(newFlipped);
      }
    }
  };

  const checkMatch = (newFlipped) => {
    const [first, second] = newFlipped.map(id => cards.find(card => card.id === id));
    if (first.value === second.value) {
      setMatched([...matched, first.id, second.id]);
    }
    setTimeout(() => setFlipped([]), 1000);
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setWin(true);
    }
  }, [matched, cards]);

  return (
    <div style={{
      backgroundColor: '#334155', 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <Grid 
        container 
        spacing={2} 
        justifyContent="center" 
        style={{ maxWidth: '80vw', maxHeight: '80vh' }}
      >
        {cards.map((card) => (
          <Grid item xs={2} sm={2} md={2} key={card.id} style={{ height: '75px', width: '55px' }}>
            <CardComponent
              card={card}
              flipped={flipped.includes(card.id) || matched.includes(card.id)}
              onClick={() => handleCardClick(card.id)}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={win} onClose={() => setWin(false)}>
        <DialogTitle>Congratulations! You Won!</DialogTitle>
      </Dialog>

      {/* Centering the reset button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="contained" onClick={resetGame}>Reset Game</Button>
      </div>
    </div>
  );
};

export default Game;
