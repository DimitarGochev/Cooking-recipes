import React, { useEffect, useState } from 'react'
import { UsersClientService } from '../services/users-service';
import { User } from '../models/User';
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

type Props = {}


const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    UsersClientService.findAll().then((users: User[]) => setUsers(users)).catch(error => console.log(error));
  }, []);

  function deleteUser(userId: number) {
    UsersClientService.deleteById(userId).then(() => setUsers([...users.filter(user => user.id !== userId)])).catch(error => console.log(error))
  }

  return (<Box sx={{ width: '100%', minHeight: 'calc(100vh - 128px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography variant='h3' textAlign={'center'} mt={'20px'}>Users List</Typography>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {users.map(user => (
        <ListItem alignItems="flex-start"
          key={user.id}
          secondaryAction={
            <>
              <Link to={`/users/${user.id}`}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton onClick={() => deleteUser(user.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={user.imageURL} />
          </ListItemAvatar>
          <ListItemText
            primary={user.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {user.role}
                </Typography>
                {user.shortDescription && <Typography
                  sx={{ display: 'block' }}
                  component="span"
                  variant="body2"
                >
                  {user.shortDescription}</Typography>}
              </React.Fragment>
            }
          />
        </ListItem>))}

    </List>
  </Box>
  )
}

export default Users;