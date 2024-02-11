import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import { Container, Typography, TextField, Button, Box } from '@mui/material';


const SignIn = (props) => {

    let navigate = useNavigate();
    
    const [formValues, setFormValues] = useState({ email: '', password: '' })

    const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = await SignInUser(formValues);
        setFormValues({ email: '', password: '' })
        props.setUser(payload);
        navigate('/');
    }

    return (
        <div>
        <NavBar />
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
                    Log In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                        autoComplete="current-password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!formValues.email || !formValues.password}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
        </div>
    )
}

export default SignIn
