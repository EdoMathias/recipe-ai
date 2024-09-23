import React, { useCallback } from 'react';
import Card from '@mui/material/Card';
import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Grid2,
  Typography,
  Divider,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { RecipeCardInfo } from '../../Types/recipe-info';

type RecipeCardProps = {
  recipe: RecipeCardInfo;
};

export default function RecipeCard({
  recipe,
}: RecipeCardProps): React.ReactElement {
  const openRecipePage = useCallback(() => {
    console.log(`Opening recipe page for ${recipe.name}`);
  }, []);

  const difficultyBackgroundColor = useCallback(() => {
    switch (recipe.difficulty) {
      case 'Easy':
        return 'rgba(125, 191, 162, 0.1)';
      case 'Medium':
        return 'rgba(232, 142, 92, 0.1)';
      case 'Hard':
        return 'rgba(219, 53, 41, 0.1)';
      default:
        return 'rgb(0, 0, 0)';
    }
  }, []);

  const difficultyTextColor = useCallback(() => {
    switch (recipe.difficulty) {
      case 'Easy':
        return '#7dbfa2';
      case 'Medium':
        return '#e88e5c';
      case 'Hard':
        return '#db3529';
      default:
        return '#ffffff';
    }
  }, []);

  return (
    <Card
      sx={{
        maxWidth: 345,
        paddingTop: 2,
        textAlign: 'center',
        borderRadius: 3,
        boxShadow: 3,
        position: 'relative',
        '&:hover': {
          boxShadow: '0 0 10px rgba(219, 53, 41, 0.5)',
          cursor: 'pointer',
          '& .MuiButton-root': {
            backgroundColor: 'rgb(219, 53, 41)',
            color: '#ffffff',
          },
        },
      }}
      onClick={openRecipePage}
    >
      {/* Top Image as Avatar */}
      <Avatar
        alt={recipe.name}
        src="/path-to-image.jpg" // Replace with image source
        sx={{ width: 80, height: 80, margin: 'auto', marginBottom: 2 }}
      />

      {/* Recipe Title and Difficulty */}
      <CardHeader
        title={<Typography variant="h6">{recipe.name}</Typography>}
        subheader={
          <Typography
            variant="body2"
            color={difficultyTextColor()}
            sx={{
              backgroundColor: difficultyBackgroundColor(),
              display: 'inline-block',
              padding: '0 8px',
              borderRadius: 2,
              marginTop: 1,
            }}
          >
            {recipe.difficulty}
          </Typography>
        }
      />

      {/* Time and Type */}
      <Grid2
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {/* Time Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center',
          }}
        >
          <AccessTimeIcon />
          <Typography variant="body2" marginLeft={1}>
            {recipe.time}
          </Typography>
        </Box>

        {/* Vertical Divider centered */}
        <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />

        {/* Type Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center',
          }}
        >
          <RestaurantIcon />
          <Typography variant="body2" marginLeft={1}>
            {recipe.foodType}
          </Typography>
        </Box>
      </Grid2>

      {/* Divider between content and button */}
      <Divider sx={{ marginTop: 2, width: '100%', marginX: 0 }} />

      {/* Start Cooking Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          textTransform: 'none',
          backgroundColor: '#ffffff',
          color: '#000000',
        }}
      >
        Start Cooking
      </Button>
    </Card>
  );
}
