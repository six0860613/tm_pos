import {
  OPEN_INFO_SNACKBAR,
  OPEN_SUCCESS_INSERT_SNACKBAR,
  OPEN_SUCCESS_UPDATE_SNACKBAR,
  OPEN_WARNING_SNACKBAR,
  OPEN_ERROR_SNACKBAR,
  NOTIFY_SNACKBAR,
} from '../actionTypes';

const openInfoSnackbar = () => {
  return {
    type: OPEN_INFO_SNACKBAR,
    payload: '普通訊息',
  };
};

const openSuccessInsertSnackbar = () => {
  return {
    type: OPEN_SUCCESS_INSERT_SNACKBAR,
    payload: '成功插入一筆資料',
  };
};

const openSuccessUpdateSnackbar = (text = '') => {
  return {
    type: OPEN_SUCCESS_UPDATE_SNACKBAR,
    payload: text ? text : '成功編輯一筆資料',
  };
};

const openWarningSnackbar = () => {
  return {
    type: OPEN_WARNING_SNACKBAR,
    payload: '警告訊息',
  };
};

const openErrorSnackbar = (text = '') => {
  return {
    type: OPEN_ERROR_SNACKBAR,
    payload: text ? text : '資料輸入錯誤',
  };
};

const notifySnackbar = () => {
  return {
    type: NOTIFY_SNACKBAR,
  };
};

export {
  openInfoSnackbar,
  openSuccessInsertSnackbar,
  openSuccessUpdateSnackbar,
  openWarningSnackbar,
  openErrorSnackbar,
  notifySnackbar,
};
