import React, { useContext, useEffect, useState } from 'react';
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
import {AppContext} from "../../App";

export default function SignInComponent() {
  const classes = useStyles();

  const appContext = useContext(AppContext);

  const registrationUsers = appContext.registrationUsers;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onInputChange = (event, setState) => {
    const value = event.target.value;

    setState(value);
  };

  const [countAttempt, setCountAttempt] = useState(3);
  const [errorMessageWhenCredentialsWrong, setErrorMessageWhenCredentialsWrong] = useState('');

  const onSignInClick = () => {
    const isCheckUser = registrationUsers.some(user => user.email === email && user.password === password);

    if (isCheckUser && email.length && password.length) {
      window.location.href = '/#/cv';
    }else {
      if (email.length && password.length) {
        setCountAttempt(count => count - 1);
        setErrorMessageWhenCredentialsWrong(`Credentials Incorrect, Attempts left(${countAttempt - 1})`);
      }
    }
  };

  const [countDown, setCountDown] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown > 0 && !countAttempt) {
        setErrorMessageWhenCredentialsWrong(`Locked on ${countDown - 1}`);

        setCountDown(count => count - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown, countAttempt]);

  useEffect(() => {
    if (!countDown) {
      setCountAttempt(3);
      setCountDown(60);
      setErrorMessageWhenCredentialsWrong('');
    }
  }, [countDown]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => onInputChange(event, setEmail)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => onInputChange(event, setPassword)}
          />
            <Grid item xs>
              <Typography style={{color: '#FF0000'}}>
                {errorMessageWhenCredentialsWrong}
              </Typography>
              <NavLink to="/">
                Registration
              </NavLink>
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSignInClick}
            disabled={countDown > 0 && !countAttempt}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};