import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Login from '../widgets/Login';
import { UserContext } from '../App';
import Register from '../widgets/Register';
import AddNewRecipe from '../widgets/AddNewRecipe';

type Props = {}

const Home = (props: Props) => {
  const [showLogin, setShowLogin] = useState(false);
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  useEffect(() => {
    setShowLogin(!loggedUser);
  }, [loggedUser])

  return (<Box sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 168px)',
    padding: '20px'
  }}>
    {loggedUser
      ? (<Box>
        <Typography variant='h3' mt={'20px'} textAlign={'center'}>Welcome, {loggedUser}!</Typography>
        <AddNewRecipe loggedUser={loggedUser}/>
      </Box>)
      : (showLogin ?
        <Login onRegisterCallback={async () => setShowLogin(false)}></Login>
        : <Register onLoginCallback={async () => setShowLogin(true)}></Register>)}
  </Box>
  )
}

export default Home;