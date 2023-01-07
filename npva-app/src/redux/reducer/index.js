import basketReducer from './basketReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ basketReducer, userReducer });

export default rootReducer;