import React, { useMemo, useState } from "react";
import { Recipe } from "../models/Recipe";
import { Link, useSearchParams } from "react-router-dom";
import useAsyncEffect from "../hooks/useAsyncEffect";
import { RecipesClientService } from "../services/recipes-service";
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Recipes = () => {
  // const filteredRecipes = useMemo(
  //   () =>
  //     recipes.filter((recipe) => (!filter ? true : recipe.status === filter)),
  //   [recipes, filter]
  // );

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useAsyncEffect(async () => {
    try {
      const allRecipes = await RecipesClientService.findAll();
      setRecipes(allRecipes);
      return allRecipes;
    } catch (error) {
      console.log(error);
    }
  }, []);

  function deleteRecipe(id: number) {
    RecipesClientService.deleteById(id).then(() => setRecipes([...recipes.filter(recipe => recipe.id !== id)])).catch(error => console.log(error));
  }

  return (<Box sx={{ width: '100%', minHeight: 'calc(100vh - 128px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography variant='h3' textAlign={'center'} mt={'20px'}>Recipes List</Typography>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {recipes.map(recipe => (
        <ListItem alignItems="flex-start"
          key={recipe.id}
          secondaryAction={
            <>
              <Link to={`/recipes/${recipe.id}`}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton onClick={() => deleteRecipe(recipe.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={recipe.imageURL} />
          </ListItemAvatar>
          <ListItemText
            primary={recipe.title}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {'Author: ' + (recipe.author || 'unknown')}
                </Typography>
                {recipe.shortDescription && <Typography
                  sx={{ display: 'block' }}
                  component="span"
                  variant="body2"
                >
                  {recipe.shortDescription}</Typography>}
              </React.Fragment>
            }
          />
        </ListItem>))}

    </List>
  </Box>
  )
};

export default Recipes;
