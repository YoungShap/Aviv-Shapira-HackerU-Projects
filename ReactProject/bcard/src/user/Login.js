import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../App';
import { useContext, useState } from 'react';
import { RoleTypes } from '../Config';
import Joi from 'joi';



const defaultTheme = createTheme();

export default function Login() {
    const { setIsLoading, setUser, snackbar, setRoleType, isDark } = useContext(GeneralContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      
      const loginSchema = Joi.object({
          email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
          password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/)
            .message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*'),
          });
          const handleInputChange = ev => {
            const { id, value } = ev.target;
            let obj = {
              ...formData,
              [id]: value,
            };
        
            if (id === 'business') {
              obj = {
                ...formData,
                [id]: ev.target.checked
              }
            }
        
            const schema = loginSchema.validate(obj, { abortEarly: false });
            const err = { ...errors, [id]: undefined };
        
            if (schema.error) {
              const error = schema.error.details.find(e => e.context.key === id);
        
              if (error) {
                err[id] = error.message;
              }
              setIsValid(false);
            } else {
              setIsValid(true);
            }
        
            setFormData(obj);
            setErrors(err);
          };
      
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setIsLoading(true);
        
        

        fetch(`https://api.shipap.co.il/clients/login?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({

                email: data.get('email'),
                password: data.get('password'),
            }),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.text().then(x => {
                        throw new Error(x);
                    });
                }
            })
            .then(data => {
                setUser(data);
                setRoleType(RoleTypes.user);

                if (data.business) {
                    setRoleType(RoleTypes.business);
                } else if (data.admin) {
                    setRoleType(RoleTypes.admin);
                }

                snackbar(`${data.fullName} logged in successfully!`);
                navigate('/');
            })
            .catch(err => {
                snackbar(err.message);
                navigate('/error');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: isDark ? 'black' : 'purple' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ color: isDark ? 'white' : 'black' }}>
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, color: isDark ? 'white' : 'black', width:'100%' }}>
                        <TextField style={{ backgroundColor: isDark ? '#2b2b2b' : 'white' }}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        {errors.email ? <div className='fieldError'>{errors.email}</div> : ''}
                        <TextField style={{ backgroundColor: isDark ? '#2b2b2b' : 'white'}} 
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {errors.password ? <div className='fieldError'>{errors.password}</div> : ''}
                        <FormControlLabel
                            control={<Checkbox value="remember" style={{ color: isDark ? 'white' : 'black' }} />}
                            label="Remember me"
                        />
                        <Button style={{ backgroundColor: isDark ? '#121010' : 'blue' }}
                            // disabled={!isValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to="/signup" style={{ color: isDark ? '#ffffea' : 'black' }}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}