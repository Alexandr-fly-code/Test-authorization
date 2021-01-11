import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from "./template.style";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../App";

export default function SignUpComponent() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onInputChange = (event, setState) => {
    const value = event.target.value;

    setState(value);
  };

  const appContext = useContext(AppContext);

  const setRegistrationUsers = appContext.setRegistrationUsers;
  const registrationUsers = appContext.registrationUsers;

  const onSignUpClick = () => {
    if (email.length && (password.length && password.length >= 8)) {
      setRegistrationUsers([...registrationUsers, { email, password }]);

      window.location.href = '/#/cv';
    }
  };

  const errorMarkupForPasswordInput = () => {
    return (
      <span style={{color: "#FF0000"}}>{password.length && password.length < 8 ? "Password should be at least 8 characters long" : ''}</span>
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => onInputChange(event, setEmail)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => onInputChange(event, setPassword)}
                helperText={errorMarkupForPasswordInput()}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSignUpClick}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/sign-in">
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};