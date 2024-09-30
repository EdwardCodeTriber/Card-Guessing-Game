import React from 'react';
import { Card, CardContent } from '@mui/material';
import picture from '../assets/picture.jpg'; 

const CardComponent = ({ card, flipped, onClick }) => (
  <Card 
    onClick={onClick} 
    style={{
      height: '100px', 
      width: '100px', 
      backgroundImage: flipped ? 'none' : `url(${picture})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center'
    }}
  >
    <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      {flipped ? card.value : ''}
    </CardContent>
  </Card>
);

export default CardComponent;
