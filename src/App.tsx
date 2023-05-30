import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './views/Layout';
import Home from './views/Home';
import Users from './views/Users';
import Recipes from './views/Recipes';
import { User } from './models/User';
import Recipe from './views/EditRecipe';
import EditUser from './views/EditUser';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'users', element: <Users /> },
      { path: 'users/:id', element: <EditUser /> },
      { path: 'recipes', element: <Recipes /> },
      { path: 'recipes/:id', element: <Recipe /> }
    ]
  }
]);

export const UserContext = createContext({ loggedUser: '', setLoggedUser: (user: string) => {} });

function App() {
  const [loggedUser, setLoggedUser] = useState('');
  const value = { loggedUser, setLoggedUser } as any;

  useEffect(() => {
    const user = sessionStorage.getItem('loggedUser');
    if (user) {
      setLoggedUser(user);
    }
  })

  return (
    <UserContext.Provider value={value}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;