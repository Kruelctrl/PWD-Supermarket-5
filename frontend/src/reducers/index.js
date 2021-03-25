import {combineReducers} from 'redux'

import {productReducer} from './productReducers'
import { userReducer } from './userReducer'

const allReducer = combineReducers({
    user: userReducer,
    product: productReducer
})

export default allReducer