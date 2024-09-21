import React from 'react';
import './Home.css';
import { Box, Grid2, Typography } from '@mui/material';
import RecipeCard from '../../RecipeCard/RecipeCard';
import { recipesMock } from '../../../DataMocks/RecipesMock';

function Home(): React.ReactElement {
  return (
    <div className="Home">
      <Typography variant="h2" gutterBottom>
        Which recipe would you like to cook today?
      </Typography>

      <Grid2 container spacing={2} justifyContent="center" sx={{ padding: 2 }}>
        {recipesMock.map((recipe) => (
          <Grid2
            key={recipe.id}
            sx={{
              flexGrow: 1,
              maxWidth: 345, // Set the fixed width for each card
              flexBasis: '345px', // Ensure each card takes up a fixed size
            }}
          >
            <Box sx={{ padding: 1 }}>
              <RecipeCard recipe={recipe} />
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}

export default Home;
