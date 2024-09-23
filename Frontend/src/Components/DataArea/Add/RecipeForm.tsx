import React, { useState } from 'react';
import {
  Typography,
  Container,
  Paper,
  Grid2,
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { Controller, useForm } from 'react-hook-form';
import {
  RecipeExtendedInfo,
  RecipeIngredients,
} from '../../../Types/recipe-info';
import { notify } from '../../../Utils/Notify';

function RecipeForm(): React.ReactElement {
  const { handleSubmit, control, getValues, setValue } =
    useForm<RecipeExtendedInfo>();

  const [ingredients, setIngredients] = useState<RecipeIngredients>([
    { id: '0', text: '', quantity: 0, units: '' },
  ]);

  function addIngredient() {
    const newIngredient = {
      id: ingredients.length.toString(),
      text: '',
      quantity: 0,
      units: '',
    };
    const updatedIngredients = [...ingredients, newIngredient];

    setIngredients(updatedIngredients);
    setValue('ingredients', updatedIngredients);
  }

  function removeIngredient(id: string) {
    if (ingredients.length > 1) {
      const updatedIngredients = ingredients.filter(
        (ingredient) => ingredient.id !== id,
      );

      setIngredients(updatedIngredients);
      setValue('ingredients', updatedIngredients);
    }
  }

  function handleIngredientChange(id: string, value: string) {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, text: value } : ingredient,
    );
    setIngredients(updatedIngredients);
    setValue('ingredients', updatedIngredients);

    let ingredientsFromForm: RecipeIngredients = getValues('ingredients') || [];

    ingredientsFromForm = ingredientsFromForm.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, text: value } : ingredient,
    );

    setValue('ingredients', ingredientsFromForm);
  }

  async function addRecipe(recipe: RecipeExtendedInfo) {
    try {
      console.log(recipe);
      notify.success('Recipe added successfully');

      /* typescript-eslint-disable no-explicit-any */
    } catch (error: any) {
      notify.error(error);
    }
  }

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Recipe
        </Typography>

        <form onSubmit={handleSubmit(addRecipe)}>
          <Grid2 container justifyContent="center" spacing={3}>
            {/* Recipe Name */}
            <Grid2>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    dir="rtl"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    label="שם המתכון"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid2>

            {/* Difficulty */}
            <Grid2>
              <Controller
                name="difficulty"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl>
                    <InputLabel>Difficulty</InputLabel>
                    <Select
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      label="Difficulty"
                      name={field.name}
                      required
                      sx={{
                        width: 210,
                      }}
                    >
                      <MenuItem value="Easy">Easy</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Hard">Hard</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid2>

            {/* Total time */}
            <Grid2>
              <Controller
                name="time"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    label="Total time in minutes"
                    type="number"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid2>

            {/* Food Type */}
            <Grid2>
              <Controller
                name="foodType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    dir="rtl"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    label="סוג אוכל"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid2>

            {/* Ingredients */}
            <Grid2>
              <Typography alignSelf="flex-end" variant="h6">
                מצרכים
              </Typography>
              {ingredients.map((ingredient, index) => (
                <Box key={ingredient.id} display="flex" alignItems="center">
                  <TextField
                    dir="rtl"
                    label={`מצרך ${index + 1}`}
                    value={ingredient.text}
                    onChange={(e) =>
                      handleIngredientChange(ingredient.id, e.target.value)
                    }
                    fullWidth
                    required
                  />
                  <IconButton
                    onClick={() => removeIngredient(ingredient.id)}
                    disabled={ingredients.length === 1}
                  >
                    <PlaylistRemoveIcon />
                  </IconButton>
                </Box>
              ))}
              {/* Buttons to add an ingredient */}
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <IconButton
                  onClick={() => {
                    addIngredient();
                  }}
                >
                  <Add />
                </IconButton>
              </Box>
            </Grid2>

            {/* Submit button */}
            <Grid2>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" type="submit">
                  Submit Recipe
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
}

export default RecipeForm;
