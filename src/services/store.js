import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {createPromise} from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import {createLogger} from 'redux-logger';



const middleware = composeWithDevTools(applyMiddleware(createPromise(), thunk, createLogger()));

export default createStore(rootReducer, middleware);


