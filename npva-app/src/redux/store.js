import rootReducer                                          from './reducer/index';
import logger                                               from 'redux-logger';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;