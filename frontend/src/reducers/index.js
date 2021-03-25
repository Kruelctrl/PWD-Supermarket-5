import {combineReducers} from 'redux'

import {productReducer} from './productReducers'

const allReducer = combineReducers({
    product: productReducer
})

export default allReducer