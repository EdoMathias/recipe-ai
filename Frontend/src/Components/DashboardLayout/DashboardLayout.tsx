import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Navigation } from '@toolpad/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import DashboardRoutes from '../DashboardRoutes/DashboardRoutes';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Recipes',
  },
  {
    segment: 'recipes',
    title: 'Recipes',
    icon: <MenuBookIcon />,
  },
  {
    segment: 'create-recipe',
    title: 'Create Recipe',
    icon: <AddBoxIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'AI',
  },
  {
    segment: 'ask-ai',
    title: 'Ask AI',
    icon: <ChatIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Account',
  },
  {
    segment: 'logout',
    title: 'Logout',
    icon: <LogoutIcon />,
  },
];

const recipeAiTheme = createTheme({
  palette: {
    primary: {
      main: '#db3529',
    },
  },
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: false },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function RecipeAiDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  /* eslint-disable arrow-body-style */
  // Fix the navigate function to handle string and URL inputs
  const router = React.useMemo(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(),
      navigate: (url: string | URL) => {
        if (url instanceof URL) {
          navigate(url.pathname); // Convert URL object to string path
        } else {
          navigate(url); // Handle string path
        }
      },
    };
  }, [location, navigate]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={recipeAiTheme}
      branding={{ title: 'RECIPE AI', logo: <AutoStoriesIcon /> }}
    >
      <DashboardLayout>
        <Box sx={{ backgroundColor: '#fcf4f0', minHeight: '100vh' }}>
          <DashboardRoutes />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
