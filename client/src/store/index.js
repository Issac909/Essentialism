import thunk from 'redux-thunk'
import logger from 'redux-logger';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);
