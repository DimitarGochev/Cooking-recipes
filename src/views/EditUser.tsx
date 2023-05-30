import { useForm } from "react-hook-form";
import { UsersClientService } from "../services/users-service";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { User } from "../models/User";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const [currentUser, setCurrentUser] = useState<User>();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (user: any) => {
        user.id = id;
        user.dateOfLastModification = new Date();
        UsersClientService.update(user).then((res: any) =>navigate('/users')).catch((error) => console.log(error));
    }

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id)
            UsersClientService.findById(Number(id)).then((user: User) => setCurrentUser(user)).catch(error => console.log(error));
    }, []);

    return (
        <Box sx={{ minHeight: 'calc(100vh - 128px)' }}>
            {(currentUser && <Box sx={{
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
                mt: '20px',
                mb: '20px'
            }}>
                <Typography variant='h4' mb={'20px'}>Edit user</Typography>
                <Box component={'form'} onSubmit={handleSubmit(onSubmit)} autoComplete='off' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    placeContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <TextField {...register("name", { required: true })} defaultValue={currentUser.name} label="Name" variant="outlined" />
                    {errors.name && <span>This field is required</span>}
                    <TextField {...register("username", { required: true, maxLength: 15 })} defaultValue={currentUser.username} label="Username" variant="outlined" />
                    {errors.username && <span>This field is required</span>}
                    <TextField {...register("password")} label="Password" variant="outlined" type="password" />
                    {errors.password && <span>This field is required</span>}
                    <FormControl fullWidth>
                        <InputLabel id="gender-select-label">Gender</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            label="Gender"
                            {...register("gender", { required: true })}
                            defaultValue={currentUser.gender}
                        >
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                            <MenuItem value={'other'}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.gender && <span>This field is required</span>}
                    <FormControl fullWidth>
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            label="User Role"
                            {...register("role", { required: true })}
                            defaultValue={currentUser.role}
                        >
                            <MenuItem value={'User'}>User</MenuItem>
                            <MenuItem value={'Admin'}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.role && <span>This field is required</span>}
                    <TextField {...register("imageURL")} defaultValue={currentUser.imageURL} label="Image" variant="outlined" />
                    <TextField {...register("shortDescription", { maxLength: 512 })} defaultValue={currentUser.shortDescription} label="Description" variant="outlined" />
                    {errors.shortDescription && <span>Exceeded max input length of 512 chars</span>}
                    <FormControl fullWidth>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            label="Status"
                            {...register("status", { required: true })}
                            defaultValue={currentUser.status}
                        >
                            <MenuItem value={'active'}>Active</MenuItem>
                            <MenuItem value={'suspended'}>Suspended</MenuItem>
                            <MenuItem value={'deactivated'}>Deactivated</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.status && <span>This field is required</span>}

                    <Button type='submit' variant="outlined" sx={{ width: '100%' }}>Save</Button>
                </Box>
            </Box>)}
        </Box>
    )

};

export default EditUser;