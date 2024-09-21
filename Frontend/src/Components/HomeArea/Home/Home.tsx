import React from 'react';
import './Home.css';
import RecipeCard from '../../RecipeCard/RecipeCard';
import { recipesMock } from '../../../DataMocks/RecipesMock';

function Home(): React.ReactElement {
  return (
    <div className="Home">
      <h2>Home Page...</h2>

      {recipesMock.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default Home;
