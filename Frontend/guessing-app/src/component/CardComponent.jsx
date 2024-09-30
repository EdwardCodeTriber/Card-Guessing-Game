import React from 'react';
import { Card, CardContent } from '@mui/material';

const CardComponent = ({ card, flipped, onClick }) => (
  <Card onClick={onClick}>
    <CardContent>
      {flipped ? card.value : 'Hidden'}
    </CardContent>
  </Card>
);

export default CardComponent;
