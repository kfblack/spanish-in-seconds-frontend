import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import { Container, Typography, TextField, Button, Box } from '@mui/material';


const Register = (setUser) => {

    let navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        avatar: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await RegisterUser({
            name: formValues.name,
            email: formValues.email,
            password: formValues.password,
        })
        setFormValues({
            name: '',
            email: '',
            password: '',
        })
        navigate('/signin')
    }

    return (
        <div>
            <NavBar setUser={setUser}/>
            <Container>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        placeholder="John Smith"
                        value={formValues.name}
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="avatar"
                        label="Avatar URL (Optional)"
                        name="avatar"
                        placeholder="Optional Image URL"
                        value={formValues.avatar}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="example@example.com"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!formValues.email || formValues.password !== formValues.confirmPassword}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
        </div>
    )
}

export default Register