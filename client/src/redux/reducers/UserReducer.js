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

const userDefault = {
  isLoading: true,
  isLogin: false,
  info: '',
  error: '',
};

const UserReducer = (state = userDefault, action) => {
  switch (action.type) {
    case CHECK_LOGIN_REQUEST:
      return {
        ...state,
      };
    case CHECK_LOGIN_SUCCESS:
      return {
        isLoading: false,
        isLogin: true,
        info: action.payload,
        error: '',
      };
    case CHECK_LOGIN_FAILURE:
      return {
        isLoading: false,
        isLogin: false,
        info: '',
        error: '',
      };
    case CHECK_LOGIN_ERROR:
      return {
        isLoading: false,
        isLogin: false,
        info: '',
        error: action.payload,
      };
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        isLoading: false,
        isLogin: true,
        info: action.payload,
        error: '',
      };
    case USER_LOGIN_FAILURE:
      return {
        isLoading: false,
        isLogin: false,
        info: '',
        error: 'Wrong info or password, please enter again.',
      };
    case USER_LOGIN_ERROR:
      return {
        isLoading: false,
        isLogin: false,
        info: '',
        error: action.payload,
      };
    case UPDATE_USER:
      return action.payload;
    default:
      break;
  }
  return state;
};

export default UserReducer;
