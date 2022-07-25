import {
  OPEN_INFO_SNACKBAR,
  OPEN_SUCCESS_INSERT_SNACKBAR,
  OPEN_SUCCESS_UPDATE_SNACKBAR,
  OPEN_WARNING_SNACKBAR,
  OPEN_ERROR_SNACKBAR,
  NOTIFY_SNACKBAR,
} from '../actionTypes';
import { SnackbarType } from 'GlobalDefine';

const snackbarDefault = {
  open: false,
  type: SnackbarType.INFO,
  message: '普通訊息',
};

const SnackbarReducer = (state = snackbarDefault, action) => {
  switch (action.type) {
    case OPEN_INFO_SNACKBAR:
      return {
        ...state,
        open: true,
        type: SnackbarType.INFO,
        message: action.payload,
      };
    case OPEN_SUCCESS_INSERT_SNACKBAR:
    case OPEN_SUCCESS_UPDATE_SNACKBAR:
      return {
        ...state,
        open: true,
        type: SnackbarType.SUCCESS,
        message: action.payload,
      };
    case OPEN_WARNING_SNACKBAR:
      return {
        ...state,
        open: true,
        type: SnackbarType.WARNING,
        message: action.payload,
      };
    case OPEN_ERROR_SNACKBAR:
      return {
        ...state,
        open: true,
        type: SnackbarType.ERROR,
        message: action.payload,
      };
    case NOTIFY_SNACKBAR:
      return {
        ...state,
        open: false,
      };
    default:
      break;
  }
  return state;
};

export default SnackbarReducer;
