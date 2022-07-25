import React, { useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Api, AxiosConfig } from 'GlobalDefine';
import { checkUserLogin } from 'redux/actions';
import { useIdleTimer } from 'react-idle-timer';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    backgroundColor: theme.palette.grey[800],
    color: 'white',
  },
  textButton: {
    backgroundColor: theme.palette.grey[800],
    color: 'white',
    fontSize: '12pt',
    textAlign: 'center',
    margin: '5px 0px 0px',
    padding: 0,
    '&:hover': {
      backgroundColor: theme.palette.grey[800],
    },
  },
}));

const LoginButton = () => {
  const userStatus = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  const onClickLogout = useCallback(async () => {
    axios
      .get(`${Api.User.Logout}`, AxiosConfig.User)
      .then(() => {
        dispatch(checkUserLogin());
      })
      .catch((e) => {
        console.log('Error', e);
      });
  });

  const handleOnIdle = () => {
    console.log('user is idle');
    console.log('last active: ', new Date(getLastActiveTime()));
    onClickLogout();
  };

  const handleOnActive = () => {
    console.log('user is active');
    console.log('time remaining: ', new Date(getRemainingTime()));
  };

  const handleOnAction = () => {};

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 10 * 60,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  return !userStatus.isLogin ? (
    <IconButton href="/login" className={classes.iconButton} style={{ marginRight: '5px' }}>
      <AccountCircle style={{ color: 'white' }} />
    </IconButton>
  ) : (
    <Button className={classes.textButton} onClick={onClickLogout}>
      {'登出'}
    </Button>
  );
};

export default LoginButton;
