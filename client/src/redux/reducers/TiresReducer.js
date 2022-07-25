import {
  FETCH_TIRES_REQUEST,
  FETCH_TIRES_SUCCESS,
  FETCH_TIRES_FAILURE,
  FETCH_TIRES_ERROR,
  UPDATE_TIRES,
} from '../actionTypes';

const tiresDefault = {
  isLoading: true,
  data: [],
  error: '',
};

const TiresReducer = (state = tiresDefault, action) => {
  switch (action.type) {
    case FETCH_TIRES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_TIRES_SUCCESS:
      return {
        isLoading: false,
        data: action.payload,
        error: '',
      };
    case FETCH_TIRES_FAILURE:
      return {
        isLoading: false,
        data: [],
        error: '',
      };
    case FETCH_TIRES_ERROR:
      return {
        ...state,
        isLoading: false,
        data: [],
        error: action.payload,
      };
    case UPDATE_TIRES:
      return {
        ...state,
        data: action.payload,
      };
    default:
      break;
  }
  return state;
};

export default TiresReducer;
