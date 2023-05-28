import React, { useState } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './views/Layout';
import Home from './views/Home';
import Users from './views/Users';
import Recipes from './views/Recipes';
import { User } from './models/User';
import Recipe from './views/Recipe';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'users', element: <Users /> },
      { path: 'recipes', element: <Recipes /> },
      { path: 'recipes/:id', element: <Recipe /> }
    ]
  }
]);

function App() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;