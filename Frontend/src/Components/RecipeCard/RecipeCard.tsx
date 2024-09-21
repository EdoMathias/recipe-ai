import React from 'react';
import Card from '@mui/material/Card';
import { CardHeader } from '@mui/material';

export default function RecipeCard(): React.ReactElement {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title="Recipe" />
    </Card>
  );
}
