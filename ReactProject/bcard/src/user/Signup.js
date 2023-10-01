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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { GeneralContext } from '../App';
import { useContext, useState } from 'react';
import { structure, signupSchema} from '../Config';

const defaultTheme = createTheme();
export default function Signup() {
  const { snackbar, setIsLoading, isDark } = useContext(GeneralContext);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    imgUrl: '',
    imgAlt: '',
    state: '',
    country: '',
    city: '',
    street: '',
    houseNumber: '',
    zip: '',
    business: false,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);


  const handleInputChange = ev => {  // a function that handles any input change made by the user and upadates the DOM accordingly  //
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

    const schema = signupSchema.validate(obj, { abortEarly: false }); // JOI validation (signupSchema is in the Config.js file) //
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

  function signup(ev) {
    ev.preventDefault();
    setIsLoading(true);
    fetch("https://api.shipap.co.il/clients/signup?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0", { // a function that handles signup requests //
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
            .then(() => {
              snackbar("User was created successfully")
              navigate('/login');
            })
        } else {
          return res.text()
            .then(x => {
              throw new Error(x);
            });
        }
      })
      .catch(err => {
        snackbar(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor:isDark? 'black' : 'purple'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: isDark ? 'white' : 'black' }}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={signup} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputChange}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
                {errors.firstName ? <div className='fieldError'>{errors.firstName}</div> : ''}
              </Grid>
              {
                structure.map(item =>
                  <Grid key={item.name} item xs={12} sm={item.block ? 6 : 12}>
                    <TextField
                      onChange={handleInputChange}
                      name={item.name}
                      type={item.type}
                      required={item.required}
                      fullWidth
                      id={item.name}
                      label={item.label}
                    />
                    {errors[item.name] ? <div className='fieldError'>{errors[item.name]}</div> : ''}
                  </Grid>)
              }
              <Grid item xs={12}>
                <FormControlLabel style={{color: isDark ? 'white' : 'black' }}
                  label="Sign up as Business"
                  control={<Checkbox
                    color="primary"
                    checked={formData.business}
                    onChange={handleInputChange}
                    id='business'
                    name='business'
                  />}
                />
              </Grid>
            </Grid>
            <Button style={{backgroundColor: isDark ? '#121010' : 'blue' , color:'white'}}  disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button >
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login" style={{color: isDark ? '#ffffea' : 'black' }}>
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}