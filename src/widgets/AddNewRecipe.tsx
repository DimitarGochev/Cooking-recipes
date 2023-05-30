import React, { useState } from 'react'
import { Recipe } from '../models/Recipe';
import { useForm } from 'react-hook-form';
import { RecipesClientService } from '../services/recipes-service';
import { Box, Button, TextField, Typography } from '@mui/material';

type Props = { loggedUser: string }

const AddNewRecipe = (props: Props) => {

    const [currentRecipe, setCurrentRecipe] = useState<Recipe>();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (recipe: any) => {
        recipe.author = props.loggedUser;
        recipe.dateOfCreation = new Date();
        RecipesClientService.create(recipe).then((res: any) => setCurrentRecipe(res)).catch((error) => console.log(error));
    }

    return (
        <Box sx={{
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
            <Typography variant='h4' mb={'20px'}>Add new recipe</Typography>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)} autoComplete='off' style={{
                display: 'flex',
                flexDirection: 'column',
                placeContent: 'center',
                alignItems: 'center',
                gap: '10px',
            }}>
                <TextField {...register("title", { required: true, maxLength: 80 })} label="Title" variant="outlined" />
                {errors.title && <span>This field is required</span>}
                <TextField {...register("shortDescription", { maxLength: 256 })} label="Description" variant="outlined" />
                <TextField {...register("cookingTime")} label="Cooking time" variant="outlined" type='number' />
                {errors.cookingTime && <span>This field is required</span>}
                <TextField {...register("productsNeeded", { maxLength: 256 })} label="Products" variant="outlined" />
                {errors.productsNeeded && <span>This field is required</span>}
                <TextField {...register("imageURL")} label="Image" variant="outlined" />
                <TextField {...register("fullDescription", { maxLength: 2048 })} label="Description" variant="outlined" />
                {errors.fullDescription && <span>Exceeded max input length of 2048 chars</span>}
                <TextField {...register("tags")} label="Tags" variant="outlined" />

                <Button type='submit' variant="outlined" sx={{ width: '100%' }}>Save</Button>
            </Box>
        </Box>
    )

}

export default AddNewRecipe;