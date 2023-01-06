import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import rootReducer from './reducer/index';
import logger from 'redux-logger';

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;