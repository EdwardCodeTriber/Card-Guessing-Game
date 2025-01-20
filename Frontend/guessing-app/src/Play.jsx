import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { QuestionMark } from "@mui/icons-material";
import axios from "axios";

const Play = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  // Loading opt
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const response = await axios.get("http://localhost:5000/api/cards");
    setCards(response.data);
  };

  const handleCardClick = async (id) => {
    if (flipped.length < 2 && !flipped.includes(id)) {
      const newFlipped = [...flipped, id];
      setFlipped(newFlipped);
      await axios.post("http://localhost:5000/api/flip", { id });
      if (newFlipped.length === 2) {
        checkMatch(newFlipped);
      }
    }
  };

  const checkMatch = async (flippedCards) => {
    const [firstId, secondId] = flippedCards;
    const response = await axios.post("http://localhost:5000/api/check-match", {
      firstId,
      secondId,
    });
    setMatched(response.data.matched);
    setFlipped([]);
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setWin(true);
    }
  }, [matched, cards]);

  const resetGame = async () => {
    await axios.post("http://localhost:5000/api/reset");
    fetchCards();
    setFlipped([]);
    setMatched([]);
    setWin(false);
  };
  
  // Preload images when cards are fetched
  useEffect(() => {
    if (cards.length > 0) {
      const preloadImages = async () => {
        const imagePromises = cards.map((card) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = `http://localhost:5000/${card.image}`;
          });
        });

        try {
          await Promise.all(imagePromises);
          setImagesLoaded(true);
        } catch (error) {
          console.error("Error preloading images:", error);
        }
      };

      preloadImages();
    }
  }, [cards]);

  // Show loading state while images are loading
  if (!imagesLoaded) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#334155", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          {cards.map((card) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={card.id}>
              <Card
                sx={{
                  aspectRatio: "1",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => handleCardClick(card.id)}
              >
                {flipped.includes(card.id) || matched.includes(card.id) ? (
                  <CardMedia
                    component="img"
                    image={`http://localhost:5000/${card.image}`}
                    alt={`Card ${card.value}`}
                    sx={{ height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                      backgroundColor: "#1e293b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <QuestionMark sx={{ fontSize: 40, color: "white" }} />
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={resetGame}
            sx={{
              backgroundColor: "#1e293b",
              "&:hover": {
                backgroundColor: "#0f172a",
              },
            }}
          >
            Reset Game
          </Button>
        </Box>

        <Dialog
          open={win}
          onClose={() => setWin(false)}
          PaperProps={{
            sx: {
              backgroundColor: "#1e293b",
              color: "white",
              p: 2,
            },
          }}
        >
          <DialogTitle>Congratulations! You Won! 🎉</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                setWin(false);
                resetGame();
              }}
              sx={{ color: "white" }}
            >
              Play Again
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};
// const Play = () => {
//   const [cards, setCards] = useState([]);
//   const [flipped, setFlipped] = useState([]);
//   const [matched, setMatched] = useState([]);
//   const [win, setWin] = useState(false);

//   useEffect(() => {
//     fetchCards();
//   }, []);

//   const fetchCards = async () => {
//     const response = await axios.get('http://localhost:5000/api/cards');
//     setCards(response.data);
//   };

//   const handleCardClick = async (id) => {
//     if (flipped.length < 2 && !flipped.includes(id)) {
//       const newFlipped = [...flipped, id];
//       setFlipped(newFlipped);
//       await axios.post('http://localhost:5000/api/flip', { id });
//       if (newFlipped.length === 2) {
//         checkMatch(newFlipped);
//       }
//     }
//   };

//   const checkMatch = async (flippedCards) => {
//     const [firstId, secondId] = flippedCards;
//     const response = await axios.post('http://localhost:5000/api/check-match', { firstId, secondId });
//     setMatched(response.data.matched);
//     setFlipped([]);
//   };

//   useEffect(() => {
//     if (matched.length === cards.length && cards.length > 0) {
//       setWin(true);
//     }
//   }, [matched, cards]);

//   const resetGame = async () => {
//     await axios.post('http://localhost:5000/api/reset');
//     fetchCards();
//     setFlipped([]);
//     setMatched([]);
//     setWin(false);
//   };

//   return (
//     <div style={{ backgroundColor: '#334155', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <Grid container spacing={2} justifyContent="center">
//         {cards.map((card) => (
//           <Grid item xs={2} key={card.id}>
//             <Button onClick={() => handleCardClick(card.id)}>
//               {flipped.includes(card.id) || matched.includes(card.id) ? card.value : '?' }
//             </Button>
//           </Grid>
//         ))}
//       </Grid>
//       <Dialog open={win} onClose={() => setWin(false)}>
//         <DialogTitle>Congratulations! You Won!</DialogTitle>
//       </Dialog>
//       <Button onClick={resetGame}>Reset Game</Button>
//     </div>
//   );
// };

export default Play;
