import basketReducer from './basketReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ basketReducer });

export default rootReducer;