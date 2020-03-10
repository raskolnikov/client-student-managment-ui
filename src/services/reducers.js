import { combineReducers } from 'redux';
import shelfReducer from './shelf/reducer';
import {reducer as formReducer} from 'redux-form';

const reducers = {

    shelf: shelfReducer,
    form: formReducer,
}

const rootReducer = combineReducers(reducers);

export default rootReducer;




