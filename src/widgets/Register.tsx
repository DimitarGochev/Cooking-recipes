import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { UsersClientService } from "../services/users-service";

interface Props {
    onLoginCallback: (flag: boolean) => {};
}

const Register = ({ onLoginCallback }: Props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (user: any) => {
        user.dateOfCreation = new Date();
        console.log(user);
        UsersClientService.create(user).then((res: any) => reset({})).catch((error) => console.log(error));
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
            padding: '20px'
        }}>
            <Typography variant='h4' mb={'20px'}>Register</Typography>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)} autoComplete='off' style={{
                display: 'flex',
                flexDirection: 'column',
                placeContent: 'center',
                alignItems: 'center',
                gap: '10px',
            }}>
                <TextField {...register("name", { required: true })} label="Name" variant="outlined" />
                {errors.name && <span>This field is required</span>}
                <TextField {...register("username", { required: true, maxLength: 15 })} label="Username" variant="outlined" />
                {errors.username && <span>This field is required</span>}
                <TextField {...register("password", { required: true })} label="Password" variant="outlined" type="password" />
                {errors.password && <span>This field is required</span>}
                <FormControl fullWidth>
                    <InputLabel id="gender-select-label">Age</InputLabel>
                    <Select
                        labelId="gender-select-label"
                        label="Gender"
                        {...register("gender", { required: true })}
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
                    >
                        <MenuItem value={'User'}>User</MenuItem>
                        <MenuItem value={'Admin'}>Admin</MenuItem>
                    </Select>
                </FormControl>
                {errors.role && <span>This field is required</span>}
                <TextField {...register("imageURL")} label="Image" variant="outlined" />
                <TextField {...register("shortDescription", { maxLength: 512 })} label="Description" variant="outlined" />
                {errors.shortDescription && <span>Exceeded max input length of 512 chars</span>}
                <FormControl fullWidth>
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                        labelId="status-select-label"
                        label="Status"
                        {...register("status", { required: true })}
                    >
                        <MenuItem value={'active'}>Active</MenuItem>
                        <MenuItem value={'suspended'}>Suspended</MenuItem>
                        <MenuItem value={'deactivated'}>Deactivated</MenuItem>
                    </Select>
                </FormControl>
                {errors.status && <span>This field is required</span>}

                <Button type='submit' variant="outlined" sx={{ width: '100%' }}>Sign up</Button>
                <Button
                    size="medium"
                    variant="text"
                    sx={{ width: '100%' }}
                    onClick={() => onLoginCallback(true)}
                >Login</Button>
            </Box>
        </Box>
    )
}

export default Register;