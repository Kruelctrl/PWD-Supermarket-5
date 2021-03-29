import {combineReducers} from 'redux'

import {productReducer} from './productReducers'
import { userReducer } from './userReducer'
import { cartReducer } from './cartReducer'

const allReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    cart: cartReducer
})

export default allReducer
