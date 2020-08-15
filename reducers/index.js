// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import authReducer from './authReducer';
import itemsReducer from './itemsReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  itemsReducer: itemsReducer,
});
// Exports
export default rootReducer;
