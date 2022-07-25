import axios from 'axios';
import { Api, AxiosConfig } from 'GlobalDefine';
import {
  CHECK_LOGIN_REQUEST,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_FAILURE,
  CHECK_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_ERROR,
  UPDATE_USER,
} from '../actionTypes';

const checkLoginRequest = () => {
  return {
    type: CHECK_LOGIN_REQUEST,
  };
};

const checkLoginSuccess = (user) => {
  return {
    type: CHECK_LOGIN_SUCCESS,
    payload: user,
  };
};

const checkLoginFailure = () => {
  return {
    type: CHECK_LOGIN_FAILURE,
  };
};

const checkLoginError = (error) => {
  return {
    type: CHECK_LOGIN_ERROR,
    payload: error,
  };
};

const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

const userLoginSuccess = (user) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: user,
  };
};

const userLoginFailure = () => {
  return {
    type: USER_LOGIN_FAILURE,
  };
};

const userLoginError = (error) => {
  return {
    type: USER_LOGIN_ERROR,
    payload: error,
  };
};

const checkUserLogin = () => {
  return (dispatch) => {
    dispatch(checkLoginRequest);
    axios
      .get(`${Api.User.Check}`, AxiosConfig.User)
      .then((response) => {
        const isLogin = response.data.isLogin;
        if (isLogin === true) {
          dispatch(checkLoginSuccess(response.data));
        } else if (isLogin === false) {
          dispatch(checkLoginFailure());
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(checkLoginError(errorMsg));
      });
  };
};

const userLogin = (input) => {
  return (dispatch) => {
    dispatch(userLoginRequest);
    axios
      .post(`${Api.User.Check}`, input, AxiosConfig.User)
      .then((response) => {
        const isLogin = response.data.isLogin;
        if (isLogin === true) {
          dispatch(userLoginSuccess(response.data));
        } else if (isLogin === false) {
          dispatch(userLoginFailure());
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(userLoginError(errorMsg));
      });
  };
};

const updateUser = (data) => {
  return {
    type: UPDATE_USER,
    payload: data,
  };
};

export { checkUserLogin, updateUser, userLogin };
