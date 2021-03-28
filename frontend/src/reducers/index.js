import { combineReducers } from 'redux'

import { userReducer } from './userReducer'
import  cartReducer  from './cartReducer'

const allReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

export default Reducers