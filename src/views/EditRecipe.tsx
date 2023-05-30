import React, { useEffect, useState } from 'react'
import { Recipe } from '../models/Recipe';
import { useForm } from 'react-hook-form';
import { RecipesClientService } from '../services/recipes-service';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

type Props = {}

const EditRecipe = (props: Props) => {

  const [currentRecipe, setCurrentRecipe] = useState<Recipe>();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (recipe: any) => {
        recipe.id = id;
        recipe.dateOfLastModification = new Date();
        RecipesClientService.update(recipe).then((res: any) => navigate('/recipes')).catch((error) => console.log(error));
    }

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id)
            RecipesClientService.findById(Number(id)).then((recipe: Recipe) => setCurrentRecipe(recipe)).catch(error => console.log(error));
    }, []);

    return (
        <Box sx={{ minHeight: 'calc(100vh - 128px)' }}>
            {(currentRecipe && <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                placeContent: 'center',
                alignItems: 'center',
                gap: '10px',
                width: 500,
                minWidth: 300,
                height: 'fit-content',
                backgroundColor: 'white',
                boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.42)',
                borderRadius: '10px',
                padding: '20px',
                mt: '20px'
            }}>
                <Typography variant='h4' mb={'20px'}>Edit recipe</Typography>
                <Box component={'form'} onSubmit={handleSubmit(onSubmit)} autoComplete='off' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    placeContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <TextField {...register("title", { required: true, maxLength: 80 })} defaultValue={currentRecipe.title} label="Title" variant="outlined" />
                    {errors.title && <span>This field is required</span>}
                    <TextField {...register("shortDescription", { maxLength: 256 })} defaultValue={currentRecipe.shortDescription} label="Description" variant="outlined" />
                    <TextField {...register("cookingTime")} label="Cooking time" defaultValue={currentRecipe.cookingTime} variant="outlined" type='number'/>
                    {errors.cookingTime && <span>This field is required</span>}
                    <TextField {...register("productsNeeded", { maxLength: 256 })} defaultValue={currentRecipe.productsNeeded} label="Products" variant="outlined" />
                    {errors.productsNeeded && <span>This field is required</span>}
                    <TextField {...register("imageURL")} defaultValue={currentRecipe.imageURL} label="Image" variant="outlined" />
                    <TextField {...register("fullDescription", { maxLength: 2048 })} defaultValue={currentRecipe.fullDescription} label="Description" variant="outlined" />
                    {errors.fullDescription && <span>Exceeded max input length of 2048 chars</span>}
                    <TextField {...register("tags")} defaultValue={currentRecipe.tags} label="Tags" variant="outlined" />

                    <Button type='submit' variant="outlined" sx={{ width: '100%' }}>Save</Button>
                </Box>
            </Box>)}
        </Box>
    )

}

export default EditRecipe;