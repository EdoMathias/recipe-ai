import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Typography } from '@mui/material';
import RecipeList from '../DataArea/List/RecipeList';
// import CreateRecipePage from './pages/CreateRecipePage';
// import AIChatPage from './pages/AIChatPage';
// import LogoutPage from './pages/LogoutPage';

export default function DashboardRoutes(): React.ReactElement {
  return (
    <Routes>
      {/* <Route path="create-recipe" element={<CreateRecipePage />} />
      <Route path="ask-ai" element={<AIChatPage />} />
      <Route path="logout" element={<LogoutPage />} /> */}
      <Route path="/recipes" element={<RecipeList />} />
      <Route
        path="/create-recipe"
        element={<Typography variant="h1">Create Recipe</Typography>}
      />
      <Route
        path="/ask-ai"
        element={<Typography variant="h1">Ask AI</Typography>}
      />
      <Route
        path="/logout"
        element={<Typography variant="h1">Logout</Typography>}
      />
    </Routes>
  );
}
