import { combineReducers } from 'redux';
import shelfReducer from './shelf/reducer';
//import cartReducer from './cart/reducer';
//import totalReducer from './total/reducer';
//import filterReducer from './filters/reducer';
//import sortReducer from './sort/reducer'

export default combineReducers({

    shelf: shelfReducer,
    /*cart: cartReducer,
    total: totalReducer,
    filter: filterReducer,
    sort: sortReducer*/

})




