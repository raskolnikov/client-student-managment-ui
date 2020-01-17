import { combineReducers } from 'redux';
import shelfReducer from './shelf/reducer';
import {reducer as formReducer} from 'redux-form';
//import cartReducer from './cart/reducer';
//import totalReducer from './total/reducer';
//import filterReducer from './filters/reducer';
//import sortReducer from './sort/reducer'


const reducers = {

    shelf: shelfReducer,
    form: formReducer,
    /*cart: cartReducer,
    total: totalReducer,
    filter: filterReducer,
    sort: sortReducer*/
}

const rootReducer = combineReducers(reducers);

export default rootReducer;




