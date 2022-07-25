import axios from 'axios';
import { Api, AxiosConfig } from 'GlobalDefine';
import {
  FETCH_TIRES_REQUEST,
  FETCH_TIRES_SUCCESS,
  FETCH_TIRES_FAILURE,
  FETCH_TIRES_ERROR,
  UPDATE_TIRES,
} from '../actionTypes';

const fetchTiresRequest = () => {
  return {
    type: FETCH_TIRES_REQUEST,
  };
};

const fetchTiresSuccess = (tires) => {
  return {
    type: FETCH_TIRES_SUCCESS,
    payload: tires,
  };
};

const fetchTiresFailure = () => {
  return {
    type: FETCH_TIRES_FAILURE,
  };
};

const fetchTiresError = (error) => {
  return {
    type: FETCH_TIRES_ERROR,
    payload: error,
  };
};

const fetchTires = (tire_info) => {
  return (dispatch) => {
    dispatch(fetchTiresRequest);
    axios
      .post(`${Api.Tires.GetTires}`, tire_info, AxiosConfig.General)
      .then((response) => {
        if (response.data) {
          dispatch(fetchTiresSuccess(response.data));
        } else {
          dispatch(fetchTiresFailure());
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchTiresError(errorMsg));
      });
  };
};

const updateTires = (data) => {
  return {
    type: UPDATE_TIRES,
    payload: data,
  };
};

export { fetchTires, updateTires };
