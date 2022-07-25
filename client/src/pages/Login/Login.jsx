import React, { useState, useCallback } from 'react';
import qs from 'qs';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Grid, Link, Paper, TextField } from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { userLogin } from 'redux/actions';
import styles from './loginStyle';

const useStyles = makeStyles(styles);

const Copyright = () => {
  const classes = useStyles();
  return (
    <div className={classes.text}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        {'輪胎大師'}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </div>
  );
};

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userStatus = useSelector((state) => state.user);

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const onClickLogin = useCallback(async (e) => {
    if (e && e.cancelable) {
      e.preventDefault();
    }
    const userInfo = {
      email: user.username,
      password: user.password,
    };
    dispatch(userLogin(qs.stringify(userInfo)));
  });

  if (userStatus.isLogin) {
    return <Redirect to="/" noThrow />;
  }

  return (
    <div className={classes.main}>
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <Avatar className={classes.avatar}>
            <AccountBox />
          </Avatar>
          <div className={classes.title}>{'登入'}</div>
          <form className={classes.form} noValidate onSubmit={onClickLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="account"
                  label="帳號"
                  name="account"
                  autoComplete="account"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="密碼"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </Grid>
              {!userStatus.isLoading && !userStatus.isLogin && userStatus.error !== '' && (
                <Grid item xs={12}>
                  <div className={classes.errorText}>{'帳號/密碼錯誤'}</div>
                </Grid>
              )}
              <Grid item xs={12} style={{ padding: '30px 8px 00px' }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {'登入'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Copyright />
      </Paper>
    </div>
  );
};

export default Login;
