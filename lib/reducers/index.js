import { combineReducers } from 'redux';
import itemReducer from './item';
import cartReducer from './cart';

const rootReducer = combineReducers({
  itemReducer,
  cartReducer,
});

export default rootReducer;
