import { combineReducers } from 'redux';
import TiresReducer from './TiresReducer';
import UserReducer from './UserReducer';
import SnackbarReducer from './SnackbarReducer';

const allReducers = combineReducers({
  user: UserReducer,
  tires: TiresReducer,
  snackbar: SnackbarReducer,
});

export default allReducers;
