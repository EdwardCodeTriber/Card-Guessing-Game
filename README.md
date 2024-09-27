## Figma design
- https://www.figma.com/design/9UTtocLmvYKqqzxM2EfEa1/Untitled?node-id=0-1&node-type=canvas&t=p7LdKfitlM5KMGRf-0

## Card guessing game
# Installation 
# Backend
- cd backend
- npm init -y
- npm express
## To run
- node index.js
# Frontend
- cd frontend
- npn install @mui/material @emotion/react @emotion/styled @mui/icons-material
## To run 
- npm run dev
# About 
- This application matches 36 cards and gives a score after matching
- Player matches 2 cards at a time
## Requirements
# Plan, design and implement a card guessing game.
# Node.js Card Guessing Game:
# Objective:
- The objective of this project is to create a card guessing game using Node.js.
- Users should be able to select two cards at a time, if they match they remain open, if they don’t match they flip to hide their contents again.
- The game is won when all cards are successfully matched to their corresponding cards.
# Interface:
- Design a user-friendly interface that is intuitive for the game
- Include a total of 36 cards: 6 rows and 6 columns.
- This will bring the matching set to 18
- When the game starts, the cards should be set dynamically and remain in their selected positions until the game ends or is restarted by the user
# Features:
- When the page is opened, automatically set the cards and hide their contents.
- Users can reset the game whenever they choose, changing the position of the cards
- When the user wins, display a pop up to congratulate the user on winning.
# Persistence:
- No data is persisted
# Testing:
- Test the application thoroughly to ensure that all features work as expected
